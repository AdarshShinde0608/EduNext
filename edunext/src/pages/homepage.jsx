import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [activeSection, setActiveSection] = useState('dashboard');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const gotopost = () => {
        navigate('/post');
        setActiveSection('projects');
    };

    const goToProfile = () => {
        navigate('/UserProfile');
        setActiveSection('profile');
    };

    const gotocollaborators = () => {
        navigate('/collaborators');
        setActiveSection('collaborate');
    };

    const gotoquestions = () => {
        navigate('/questions');
        setActiveSection('questions');
    };

    const gotoleaderboard = () => {
        navigate('/leaderboard');
        setActiveSection('leaderboard');
    };

    const goToDashboard = () => {
        setActiveSection('dashboard');
    };

    return (
        <div className="homepage">
            {/* Top Navigation Bar */}
            <nav className="top-navbar">
                <div className="nav-brand">
                    <i className="fas fa-graduation-cap"></i>
                    <h2>Edunext</h2>
                </div>
                <div className="nav-user">
                    <span>Welcome, {user?.full_name}!</span>
                    <button onClick={goToProfile} className="profile-btn">
                        <i className="fas fa-user-circle"></i>
                    </button>
                    <button onClick={handleLogout} className="logout-btn">
                        <img src="" alt="" />
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </nav>

            <div className="main-container">
                {/* Sidebar Navigation */}
                <div className="sidebar">
                    <div className="sidebar-menu">
                        <div 
                            className={`menu-item ${activeSection === 'dashboard' ? 'active' : ''}`}
                            onClick={goToDashboard}
                        >
                            <i className="fas fa-home"></i>
                            <span>Dashboard</span>
                        </div>
                        <div 
                            className={`menu-item ${activeSection === 'projects' ? 'active' : ''}`}
                            onClick={gotopost}
                        >
                            <i className="fas fa-project-diagram"></i>
                            <span>Projects</span>
                        </div>
                        <div 
                            className={`menu-item ${activeSection === 'collaborate' ? 'active' : ''}`}
                            onClick={gotocollaborators}
                        >
                            <i className="fas fa-hands-helping"></i>
                            <span>Collaborate</span>
                        </div>
                        <div 
                            className={`menu-item ${activeSection === 'questions' ? 'active' : ''}`}
                            onClick={gotoquestions}
                        >
                            <i className="fas fa-question-circle"></i>
                            <span>Q&A Forum</span>
                        </div>
                        <div 
                            className={`menu-item ${activeSection === 'leaderboard' ? 'active' : ''}`}
                            onClick={gotoleaderboard}
                        >
                            <i className="fas fa-trophy"></i>
                            <span>Leaderboard</span>
                        </div>
                        <div 
                            className={`menu-item ${activeSection === 'profile' ? 'active' : ''}`}
                            onClick={goToProfile}
                        >
                            <i className="fas fa-user-cog"></i>
                            <span>Profile</span>
                        </div>
                    </div>

                    <div className="sidebar-footer">
                        <div className="user-info">
                            <div className="user-avatar">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="user-details">
                                <span className="user-name">{user?.full_name}</span>
                                <span className="user-role">{user?.role || 'Student'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="content-area">
                    {activeSection === 'dashboard' && (
                        <div className="dashboard-content">
                            <div className="content-header">
                                <h1>Welcome to Edunext Platform!</h1>
                                <p>Bridging Students & Staff Across India</p>
                            </div>

                            <div className="quick-stats">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-project-diagram"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h3>500+</h3>
                                        <p>Active Projects</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-users"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h3>1,200+</h3>
                                        <p>Registered Users</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-handshake"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h3>300+</h3>
                                        <p>Collaborations</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <i className="fas fa-university"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h3>50+</h3>
                                        <p>Institutions</p>
                                    </div>
                                </div>
                            </div>

                            <div className="features-grid">
                                <div className="feature-card" onClick={gotopost}>
                                    <div className="feature-icon">
                                        <i className="fas fa-project-diagram"></i>
                                    </div>
                                    <h3>Share Projects</h3>
                                    <p>Showcase your work and get feedback from peers and mentors</p>
                                    <button className="feature-btn">Explore Projects</button>
                                </div>
                                
                                <div className="feature-card" onClick={gotocollaborators}>
                                    <div className="feature-icon">
                                        <i className="fas fa-hands-helping"></i>
                                    </div>
                                    <h3>Collaborate</h3>
                                    <p>Work together on academic initiatives and research</p>
                                    <button className="feature-btn">Find Collaborators</button>
                                </div>
                                
                                <div className="feature-card" onClick={gotoquestions}>
                                    <div className="feature-icon">
                                        <i className="fas fa-question-circle"></i>
                                    </div>
                                    <h3>Ask Questions</h3>
                                    <p>Get help from the community without hesitation</p>
                                    <button className="feature-btn">Visit Q&A</button>
                                </div>
                                
                                <div className="feature-card" onClick={gotoleaderboard}>
                                    <div className="feature-icon">
                                        <i className="fas fa-trophy"></i>
                                    </div>
                                    <h3>Earn Recognition</h3>
                                    <p>Gain points and recognition for your contributions</p>
                                    <button className="feature-btn">View Leaderboard</button>
                                </div>
                            </div>

                            <div className="recent-activity">
                                <h2>Recent Activity</h2>
                                <div className="activity-list">
                                    <div className="activity-item">
                                        <div className="activity-icon">
                                            <i className="fas fa-plus-circle"></i>
                                        </div>
                                        <div className="activity-content">
                                            <p><strong>John Doe</strong> posted a new project</p>
                                            <span className="activity-time">2 hours ago</span>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon">
                                            <i className="fas fa-comment"></i>
                                        </div>
                                        <div className="activity-content">
                                            <p><strong>Sarah Smith</strong> answered your question</p>
                                            <span className="activity-time">5 hours ago</span>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <div className="activity-icon">
                                            <i className="fas fa-handshake"></i>
                                        </div>
                                        <div className="activity-content">
                                            <p><strong>Alex Johnson</strong> requested to collaborate</p>
                                            <span className="activity-time">1 day ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Homepage;