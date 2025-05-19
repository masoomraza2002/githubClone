// import React,{useState} from 'react';
// import axios from "axios";
// import { useAuth } from '../../authContext';
// import './auth.css';
// import logo from '../../assets/github-mark-white.svg';
// import { Link } from "react-router-dom";

// function Signup() {
//     const [email, setEmail] = useState("");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);

//     const { setCurrentUser } = useAuth();


//     const handleSignup = async (e) => {
//         e.preventDefault();

//         try {
//             setLoading(true);
//             const res = await axios.post("http://localhost:3002/signup", {
//                 email,
//                 username,
//                 password,
//             });

//             localStorage.setItem("token", res.data.token);
//             localStorage.setItem("userId", res.data.userId);
//             setCurrentUser(res.data.userId);
//             setLoading(false);
//             window.location.href = "/";
//         } catch (err) {
//             console.error(err);
//             alert("Signup Failed!");
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="login-wrapper">
//             <div className="login-logo-container">
//                 <img className="logo-login" src={logo} alt="Logo" />
//             </div>

//             <div className="login-box-wrapper">
//                 <div className="login-heading">
//                     <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Sign Up</h2>
//                 </div>

//                 <div className="login-box">
//                     <div>
//                         <label className="label">Username</label>
//                         <input
//                             autoComplete="off"
//                             className="input"
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                     </div>

//                     <div>
//                         <label className="label">Email address</label>
//                         <input
//                             autoComplete="off"
//                             className="input"
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     <div>
//                         <label className="label">Password</label>
//                         <input
//                             autoComplete="off"
//                             className="input"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>

//                     <button
//                         className="submit-btn login-btn"
//                         disabled={loading}
//                         onClick={handleSignup}
//                     >
//                         {loading ? "Loading..." : "Signup"}
//                     </button>
//                 </div>

//                 <div className="pass-box">
//                     <p>
//                         Already have an account? <Link to="/auth">Login</Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;







// import React, { useState } from 'react';
// import './auth.css';
// import { useNavigate, Link } from 'react-router-dom';

// function Signup() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             const res = await fetch('http://localhost:5000/signup', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, email, password }),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 setError(data.message || 'Signup failed');
//                 return;
//             }

//             alert('Signup successful. Please login.');
//             navigate('/');
//         } catch (err) {
//             setError('Network error. Please try again.');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>Sign Up</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
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
//                 <button type="submit">Sign Up</button>
//                 {error && <p className="error">{error}</p>}
//             </form>
//             <p>Already have an account? <Link to="/">Login</Link></p>
//         </div>
//     );
// }

// export default Signup;








import React, { useState } from 'react';
import './auth.css';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/github-mark-white.svg'; // Adjust path if needed

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Signup failed');
                setLoading(false);
                return;
            }

            alert('Signup successful. Please login.');
            navigate('/');
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-logo-container">
                <img className="logo-login" src={logo} alt="Logo" />
            </div>

            <div className="login-box-wrapper">
                <div className="login-heading">
                    <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Sign Up</h2>
                </div>

                <form className="login-box" onSubmit={handleSubmit}>
                    <div>
                        <label className="label">Username</label>
                        <input
                            autoComplete="off"
                            className="input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label">Email address</label>
                        <input
                            autoComplete="off"
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
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="submit-btn login-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Signup"}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>

                <div className="pass-box">
                    <p>
                        Already have an account? <Link to="/">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
