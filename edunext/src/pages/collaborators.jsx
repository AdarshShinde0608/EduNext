import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './collaborators.css';
// Correct import for Font Awesome 6
import {
    FaMagnifyingGlass,  // Instead of FaSearch
    FaPeopleGroup,      // Instead of FaUsers
    FaHandshake,        // This one exists
    FaCalendarDays,     // Instead of FaCalendarAlt
    FaLocationDot       // Instead of FaMapMarkerAlt
} from 'react-icons/fa6';

const Collaborate = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    // missing runtime variables/handlers (added to prevent render errors)
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const [activeSection, setActiveSection] = useState('collaborate');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const gotopost = () => {
        setActiveSection('projects');
        navigate('/post');
    };

    const goToProfile = () => {
        setActiveSection('profile');
        navigate('/UserProfile');
    };

    const gotocollaborators = () => {
        setActiveSection('collaborate');
        // stay on this page
    };

    const gotoquestions = () => {
        setActiveSection('questions');
        navigate('/questions');
    };

    const gotoleaderboard = () => {
        setActiveSection('leaderboard');
        navigate('/leaderboard');
    };

    const goToDashboard = () => {
        setActiveSection('dashboard');
        navigate('/homepage');
    };

    const collaborators = [
        {
            id: 1,
            name: "Dr. Sarah Chen",
            role: "Professor - Computer Science",
            institution: "IIT Delhi",
            skills: ["AI/ML", "Python", "Research"],
            projects: "AI in Education, Neural Networks",
            availability: "Available for collaboration",
            rating: 4.8
        },
        {
            id: 2,
            name: "Rajesh Kumar",
            role: "PhD Researcher",
            institution: "IIIT Hyderabad",
            skills: ["Data Science", "TensorFlow", "Statistics"],
            projects: "Data Analytics, Predictive Modeling",
            availability: "Open to projects",
            rating: 4.5
        },
        {
            id: 3,
            name: "Priya Sharma",
            role: "M.Tech Student",
            institution: "NIT Trichy",
            skills: ["Web Development", "React", "Node.js"],
            projects: "EdTech Platforms, LMS",
            availability: "Looking for team",
            rating: 4.7
        },
        {
            id: 4,
            name: "Prof. Amit Patel",
            role: "Faculty - Electronics",
            institution: "BITS Pilani",
            skills: ["IoT", "Embedded Systems", "Arduino"],
            projects: "Smart Devices, Robotics",
            availability: "Mentoring available",
            rating: 4.9
        }
    ];

    const collaborationRequests = [
        {
            id: 1,
            title: "Need ML Developer for Education Project",
            description: "Looking for a machine learning developer to help build an adaptive learning system.",
            skills: ["Python", "TensorFlow", "ML"],
            deadline: "15 days",
            budget: "Grant-funded"
        },
        {
            id: 2,
            title: "UI/UX Designer for Student Portal",
            description: "Seeking a designer to create intuitive interfaces for our student management portal.",
            skills: ["Figma", "UI/UX", "Design"],
            deadline: "30 days",
            budget: "Paid"
        }
    ];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleConnect = (collabId) => {
        alert(`Connecting with collaborator ${collabId}`);
        // Add your connection logic here
    };

    const handleMessage = (collabId) => {
        alert(`Messaging collaborator ${collabId}`);
        // Add your messaging logic here
    };

    const handleApply = (requestId) => {
        alert(`Applying to request ${requestId}`);
        // Add your application logic here
    };

    const handlePostCollaboration = () => {
        alert('Opening collaboration posting form');
        // Add your post collaboration logic here
    };

    return (
        <div className="collaborate-page">
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

                <div className="collaborate-content">
                    {/* Search Section */}
                    <div className="search-section">
                        <div className="search-bar">
                            <FaMagnifyingGlass className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by skills, institution, or project..."
                                className="search-input"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="filter-tabs">
                            <button
                                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                All
                            </button>
                            <button
                                className={`filter-tab ${activeFilter === 'students' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('students')}
                            >
                                Students
                            </button>
                            <button
                                className={`filter-tab ${activeFilter === 'faculty' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('faculty')}
                            >
                                Faculty
                            </button>
                            <button
                                className={`filter-tab ${activeFilter === 'researchers' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('researchers')}
                            >
                                Researchers
                            </button>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="collaborate-grid">
                        {/* Collaborators List */}
                        <div className="collaborators-section">
                            <h2>Available Collaborators</h2>
                            <div className="collaborators-list">
                                {collaborators.map(collab => (
                                    <div key={collab.id} className="collaborator-card">
                                        <div className="collab-header">
                                            <div className="avatar">
                                                {collab.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="collab-info">
                                                <h3>{collab.name}</h3>
                                                <p className="role">{collab.role}</p>
                                                <p className="institution">
                                                    <FaLocationDot /> {collab.institution}
                                                </p>
                                            </div>
                                            <div className="rating">
                                                ⭐ {collab.rating}
                                            </div>
                                        </div>
                                        <div className="skills">
                                            {collab.skills.map(skill => (
                                                <span key={skill} className="skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                        <p className="projects">{collab.projects}</p>
                                        <p className="availability">
                                            <FaCalendarDays /> {collab.availability}
                                        </p>
                                        <div className="collab-actions">
                                            <button
                                                className="connect-btn"
                                                onClick={() => handleConnect(collab.id)}
                                            >
                                                Connect
                                            </button>
                                            <button
                                                className="message-btn"
                                                onClick={() => handleMessage(collab.id)}
                                            >
                                                Message
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Collaboration Requests */}
                        <div className="requests-section">
                            <h2>Collaboration Requests</h2>
                            <div className="requests-list">
                                {collaborationRequests.map(request => (
                                    <div key={request.id} className="request-card">
                                        <h3>{request.title}</h3>
                                        <p>{request.description}</p>
                                        <div className="request-skills">
                                            {request.skills.map(skill => (
                                                <span key={skill} className="skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                        <div className="request-details">
                                            <span>
                                                <FaCalendarDays /> Deadline: {request.deadline}
                                            </span>
                                            <span>Budget: {request.budget}</span>
                                        </div>
                                        <button
                                            className="apply-btn"
                                            onClick={() => handleApply(request.id)}
                                        >
                                            Apply to Collaborate
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Stats */}
                            <div className="collab-stats">
                                <div className="stat-card">
                                    <FaPeopleGroup className="stat-icon" />
                                    <h3>150+</h3>
                                    <p>Active Collaborators</p>
                                </div>
                                <div className="stat-card">
                                    <FaHandshake className="stat-icon" />
                                    <h3>45</h3>
                                    <p>Successful Projects</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

            export default Collaborate;