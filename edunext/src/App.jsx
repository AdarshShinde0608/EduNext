// In App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/homepage'; // lowercase 'pages'
import Collaborators from './pages/Collaborators';
import Login from './pages/login'; // Make sure this matches your actual file name
import UserProfile from './pages/UserProfile';
import Post from './pages/post';
import Questions from './pages/questions'; // Make sure file name matches
import Leaderboard from './pages/leaderboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route 
                    path='/leaderboard' 
                    element={
                        <ProtectedRoute>
                            <Leaderboard/>
                        </ProtectedRoute>
                    }/>
                <Route 
                    path="/homepage" 
                    element={
                        <ProtectedRoute>
                            <Homepage />
                        </ProtectedRoute>
                    } 
                />
                <Route
                    path="/questions"
                    element={
                        <ProtectedRoute>
                            <Questions />
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/collaborators" 
                    element={
                        <ProtectedRoute>
                            <Collaborators />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/userprofile"  // lowercase for consistency
                    element={
                        <ProtectedRoute>
                            <UserProfile />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/post" 
                    element={
                        <ProtectedRoute>
                            <Post />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;