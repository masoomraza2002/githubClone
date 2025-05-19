import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './authContext';

function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;
