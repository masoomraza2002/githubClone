const express  = require('express');
const app   =  express();
app.use(express.json());

const jwt = require('jsonwebtoken');
const bycrpt = require('bcrypt');
const mongoose = require('mongoose'); 
const User = require("../models/userModel");

require('dotenv').config();

// console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, { dbName: 'github' })
  .then(() => console.log('MongoDB Connected to speakX database'))
  .catch((err) => console.error('MongoDB connection error:', err));


async function signup(req, res) {
    const { username, password, email } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).send("User already exists");
        }

        const salt = await bycrpt.genSalt(10);
        const hashed = await bycrpt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashed,
            email,
            repositories: [],
            followedUsers: [],
            starRepos: []
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ token, userID: newUser._id });
    } catch (err) {
        console.error("Error in creating user:", err);
        res.status(500).send(err);
    }
}



async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ messege: "invalud credentila" });
        }

        const isMatch = await bycrpt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, userID: user._id });

    } catch (err) {
        console.log("erro", err);
        res.status(500).send(err);
    }
}


async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log("erro while fecthign data", err);
        res.status(500).send("server error");
    }
}

async function getUserProfile(req, res) {
    const currID = req.params.id;
    try {
        const user = await User.findById(currID);

        if (!user) {
            return res.status(500).json({ messege: "user not found" });
        }

        res.send(user);
    } catch (err) {
        console.log("erro while fecthign data", err);
        res.status(500).send("server error");
    }
}

async function updateUserProfile(req, res) {
    const currID = req.params.id;
    const { email, password } = req.body;

    try {
        const updateFiels = { email };
        if (password) {
            const salt = await bycrpt.genSalt(10);
            const hashedPass = await bycrpt.hash(password, salt);
            updateFiels.password = hashedPass;
        }

        const user = await User.findByIdAndUpdate(currID, updateFiels , {new:true});
        if (!user) {
            return res.status(500).json({ messege: "user not found" });
        }
        res.json(user);
    } catch (err) {
        console.log("erro while fecthign data", err);
        res.status(500).send("server error");
    }
}

async function deleteUserProfile(req, res) {
    const currID = req.params.id;
    try {
        const result = await User.findByIdAndDelete(currID);

        if (!result) {
            return res.status(500).json({ messege: "user not found" });
        }

        res.json({ messege: 'user deleted' });
    } catch (err) {
        console.log("erro while fecthign data", err);
        res.status(500).send("server error");
    }

}

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};

