// import React, { useEffect } from 'react';
// import {useNavigate  , useRoutes} from 'react-router-dom';

// import Login from './components/auth/Login';
// import Signup from './components/auth/Signup';
// import Dashboard from './components/dashboard/Dashboard';
// import Profile from './components/user/Profile';

// import { useAuth } from './authContext';

// function ProjectRoutes() {
//     const {currUser ,setCurrUser} = useAuth();
//     const navigate =  useNavigate();

//     useEffect(()=>{
//         const userId = localStorage.getItem('userId');
//         if(userId && !currUser){
//             setCurrUser(userId);
//         }
//         if(!userId && !["/auth" , "/signup"].includes(window.location.pathname)){
//             navigate("/auth");
//         }
//         if(userId && window.location.pathname == '/auth'){
//             navigate("/");
//         }
//     },[currUser , navigate , setCurrUser]);

//     const element =  useRoutes([
//         {
//             path:"/",
//             element:<Dashboard/>
//         },
//         {
//             path:"/auth",
//             element:<Login/>
//         },
//         {
//             path:"/signup",
//             element:<Signup/>
//         },
//         {
//             path:"/profile",
//             element:<Profile/>
//         }


//     ]);

//     return element;
// }

// export default ProjectRoutes;









// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/auth/Login';
// import Signup from './components/auth/Signup';
// import Dashboard from './components/dashboard/Dashboard';
// import Profile from './components/user/Profile';
// import { useAuth } from './authContext';

// function PrivateRoute({ children }) {
//     const { token } = useAuth();
//     return token ? children : <Navigate to="/" />;
// }

// function ProjectRoutes() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//                 <Route
//                     path="/dashboard"
//                     element={
//                         <PrivateRoute>
//                             <Dashboard />
//                         </PrivateRoute>
//                     }
//                 />
//                 <Route
//                     path="/profile"
//                     element={
//                         <PrivateRoute>
//                             <Profile />
//                         </PrivateRoute>
//                     }
//                 />
//             </Routes>
//         </Router>
//     );
// }

// export default ProjectRoutes;










import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/user/Profile';
import { useAuth } from './authContext';

function PrivateRoute({ children }) {
    const { token } = useAuth();
    return token ? children : <Navigate to="/" />;
}

function ProjectRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default ProjectRoutes;