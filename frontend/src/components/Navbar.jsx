// import React from "react";
// import { Link } from "react-router-dom";
// import "./navbar.css";

// const Navbar = () => {
//   return (
//     <nav>
//       <Link to="/">
//         <div>
//           <img
//             src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
//             alt="GitHub Logo"
//           />
//           <h3>GitHub</h3>
//         </div>
//       </Link>
//       <div>
//         <Link to="/create">
//           <p>Create a Repository</p>
//         </Link>
//         <Link to="/profile">
//           <p>Profile</p>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;










import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import "./navbar.css";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/dashboard">
        <div className="logo-container">
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div className="nav-links">
        {token && (
          <>
            <Link to="/create">
              <p>Create a Repository</p>
            </Link>
            <Link to="/profile">
              <p>Profile</p>
            </Link>
            <button onClick={() => { logout(); navigate("/"); }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;