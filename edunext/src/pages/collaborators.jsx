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
            <nav className="collaborate-nav">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <FaHandshake /> Back to Home
                </button>
                <h1>Find Collaborators</h1>
                <div className="nav-actions">
                    <button className="primary-btn" onClick={handlePostCollaboration}>
                        <FaPeopleGroup /> Post Collaboration
                    </button>
                </div>
            </nav>

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
    );
};

export default Collaborate;