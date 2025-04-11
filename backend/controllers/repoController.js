const mongoose = require('mongoose');
const User = require("../models/userModel");
const Repo = require("../models/repoModel");
const Issue = require("../models/issueModel");
const Repository = require("../models/repoModel");

require('dotenv').config();


mongoose
    .connect(process.env.MONGO_URI, { dbName: 'github' })
    .then(() => console.log('MongoDB Connected to speakX database'))
    .catch((err) => console.error('MongoDB connection error:', err));

async function createRepository(req, res) {
    const { owner, name, issue, content, description, visibility } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ error: "Repository name is required!" });
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Invalid User ID!" });
        }

        const newRepo = new Repo({
            name,
            description,
            visibility,
            owner,
            content,
            issue
        })
        const result = await newRepo.save();

        res.status(201).json({
            message: "repo created",
            repoID: result._id
        })

    } catch (err) {

        console.error("Error during repository creation : ", err.message);
        res.status(500).send(err);
    }
}

const getAllRepository = async (req, res) => {
    try {
        const allRepos = await Repository.find()
            .populate("owner")
            .populate("issues");
        res.status(200).json(allRepos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


async function fetchRepoByID(req, res) {
    const { id } = req.params;
    try {
        const repoDet = await Repo.findById(id)
            .populate("owner")
            .populate("issues");

        res.json(repoDet);

    } catch (err) {
        console.error("Error during fetching repositories : ", err.message);
        res.status(500).json({ message: err.message });
    }
}

async function fetchRepoByName(req, res) {
    const { name } = req.params;
    try {
        const repository = await Repository.find({ name })
            .populate("owner")
            .populate("issues");

        res.json(repository);
    } catch (err) {
        console.error("Error during fetching repository : ", err.message);
        res.status(500).send("Server error");
    }
}

async function fetchRepoForCurrentUser(req, res) {
    console.log(req.params);
    const { userID } = req.params;

    try {
        const repositories = await Repository.find({ owner: userID });

        if (!repositories || repositories.length == 0) {
            return res.status(404).json({ error: "User Repositories not found!" });
        }
        console.log(repositories);
        res.json({ message: "Repositories found!", repositories });
    } catch (err) {
        console.error("Error during fetching user repositories : ", err.message);
        res.status(500).send("Server error");
    }
}

async function updateRepoById(req, res) {
    const { id } = req.params;
    const { content, description } = req.body;

    try {
        const repo = await Repo.findById(id);

        if (!repo) {
            return res.status(404).json({ error: "Repository not found!" });
        }

        // Ensure content is an array
        if (!repo.content) {
            repo.content = [];
        }

        // Only push if new content is provided
        if (content) {
            repo.content.push(content);
        }

        if (description) {
            repo.description = description;
        }

        const updatedRepo = await repo.save();

        // Fetch with populated owner and issues
        const populatedRepo = await Repo.findById(updatedRepo._id)
            .populate("owner")
            .populate("issues");

        res.json({
            message: "Repository updated successfully!",
            repository: populatedRepo,
        });
    } catch (err) {
        console.error("Error during updating repository:", err.message);
        res.status(500).json({ message: err.message });
    }
}


async function deleteRepoById(req, res) {
    const { id } = req.params;
    try {
        const repository = await Repository.findByIdAndDelete(id);
        if (!repository) {
            return res.status(404).json({ error: "Repository not found!" });
        }

        res.json({ message: "Repository deleted successfully!" });
    } catch (err) {
        console.error("Error during deleting repository : ", err.message);
        res.status(500).send("Server error");
    }
}

async function toogleVisById(req, res) {
    const { id } = req.params;
    try {
        const repositorie = await Repository.findById(id);
        if (!repositorie) {
            return res.status(404).json({ error: "Repository not found!" });
        }


        repositorie.visibility = !repositorie.visibility;
        const updateVis = await repositorie.save();
        const repoDet = await Repo.findById(id)
            .populate("owner")
            .populate("issues");
 
        res.json({
            message: "Repository visibility toggled successfully!",
            repoDet
        });

    } catch (err) {
        console.error("Error during deleting repository : ", err.message);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createRepository,
    getAllRepository,
    fetchRepoByID,
    fetchRepoByName,
    fetchRepoForCurrentUser,
    updateRepoById,
    deleteRepoById,
    toogleVisById
}