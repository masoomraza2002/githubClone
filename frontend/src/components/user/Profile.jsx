// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./profile.css";
// import Navbar from "../Navbar";
// import { useAuth } from "../../authContext";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState({ username: "username" });
//   const { setCurrentUser } = useAuth();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const userId = localStorage.getItem("userId");

//       if (userId) {
//         try {
//           const response = await axios.get(
//             `http://localhost:3002/userProfile/${userId}`
//           );
//           setUserDetails(response.data);
//         } catch (err) {
//           console.error("Cannot fetch user details: ", err);
//         }
//       }
//     };
//     fetchUserDetails();
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div className="nav-tabs">
//         <span className="nav-tab active">Overview</span>
//         <span className="nav-tab" onClick={() => navigate("/repo")}>
//           Starred Repositories
//         </span>
//       </div>

//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           localStorage.removeItem("userId");
//           setCurrentUser(null);
//           window.location.href = "/auth";
//         }}
//         className="logout-btn"
//       >
//         Logout
//       </button>

//       <div className="profile-page-wrapper">
//         <div className="user-profile-section">
//           <div className="profile-image"></div>

//           <div className="name">
//             <h3>{userDetails.username}</h3>
//           </div>

//           <button className="follow-btn">Follow</button>

//           <div className="follower">
//             <p>10 Followers</p>
//             <p>3 Following</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;










import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { useAuth } from "../../authContext";

const Profile = () => {
    const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(currentUser || { username: "username" });

 

  return (
    <>
      <Navbar />

      <div className="nav-tabs">
        <span className="nav-tab active">Overview</span>
        <span className="nav-tab" onClick={() => navigate("/repo")}>
          Starred Repositories
        </span>
      </div>

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="logout-btn"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Followers</p>
            <p>3 Following</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;











