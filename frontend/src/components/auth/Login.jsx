// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../authContext";
// import "./auth.css";
// import logo from "../../assets/github-mark-white.svg";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { setCurrentUser } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:3002/login", {
//         email: email,
//         password: password,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userId", res.data.userId);

//       setCurrentUser(res.data.userId);
//       setLoading(false);

//       window.location.href = "/";
//     } catch (err) {
//       console.error(err);
//       alert("Login Failed!");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-logo-container">
//         <img className="logo-login" src={logo} alt="Logo" />
//       </div>

//       <div className="login-box-wrapper">
//         <div className="login-heading">
//           <h2 style={{ textAlign: "center", color: "#f1f6fd" }}>Sign In</h2>
//         </div>

//         <div className="login-box">
//           <div>
//             <label className="label">Email address</label>
//             <input
//               autoComplete="off"
//               name="Email"
//               id="Email"
//               className="input"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="label">Password</label>
//             <input
//               autoComplete="off"
//               name="Password"
//               id="Password"
//               className="input"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button
//             className="submit-btn"
//             disabled={loading}
//             onClick={handleLogin}
//           >
//             {loading ? "Loading..." : "Login"}
//           </button>
//         </div>

//         <div className="pass-box">
//           <p>
//             New to GitHub? <Link to="/signup">Create an account</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;







// import React, { useState } from 'react';
// import './auth.css';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../authContext';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             const res = await fetch('http://localhost:5000/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 setError(data.message || 'Login failed');
//                 return;
//             }

//             login(data.token); 
//             navigate('/dashboard');
//         } catch (err) {
//             setError('Network error. Please try again.');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//                 {error && <p className="error">{error}</p>}
//             </form>
//             <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
//         </div>
//     );
// }

// export default Login;







import React, { useState } from 'react';
import './auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../authContext';
import logo from '../../assets/github-mark-white.svg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            login(data.token, { id: data.userID }); // Changed to match backend response
            navigate('/dashboard');
        } catch (err) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-logo-container">
                <img className="logo-login" src={logo} alt="Logo" />
            </div>

            <div className="login-box-wrapper">
                <div className="login-heading">
                    <h2 style={{ textAlign: 'center', color: '#f1f6fd' }}>Sign In</h2>
                </div>

                <form className="login-box" onSubmit={handleSubmit}>
                    <div>
                        <label className="label">Email address</label>
                        <input
                            autoComplete="off"
                            name="Email"
                            id="Email"
                            className="input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label">Password</label>
                        <input
                            autoComplete="off"
                            name="Password"
                            id="Password"
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="submit-btn" type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>

                <div className="pass-box">
                    <p>
                        New to GitHub? <Link to="/signup">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
