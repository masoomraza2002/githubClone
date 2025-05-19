// import React, { createContext, useContext, useEffect, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () =>{
//     return useContext(AuthContext);
// }

// export const AuthProvider = ({children})=>{
//     const [currUser , setCurrUser] = useState(null);

//     useEffect(()=>{
//         const userId = localStorage.getItem('userId');
//         if(userId){
//             setCurrUser(userId);
//         }
//     },[]);

//     const value = {
//         currUser ,setCurrUser
//     }

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

// }






// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(localStorage.getItem('token') || null);

//     const login = (newToken) => {
//         setToken(newToken);
//         localStorage.setItem('token', newToken);
//     };

//     const logout = () => {
//         setToken(null);
//         localStorage.removeItem('token');
//     };

//     return (
//         <AuthContext.Provider value={{ token, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);




import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const login = async (token, userData) => {
        setToken(token);
        setCurrentUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ 
            token, 
            currentUser,
            login, 
            logout,
            setCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);