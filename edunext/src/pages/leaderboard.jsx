import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './leaderboard.css';
import { 
    FaTrophy, 
    FaMedal, 
    FaUserGraduate, 
    FaUniversity, 
    FaStar,
    FaSearch,
    FaFilter,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa';

const Leaderboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [timeFrame, setTimeFrame] = useState('all-time');

    const leaderboardData = [
        {
            id: 1,
            rank: 1,
            name: "Dr. Priya Sharma",
            role: "Professor - Data Science",
            institution: "IIT Delhi",
            points: 2850,
            projects: 12,
            collaborations: 8,
            answers: 45,
            badge: "platinum",
            trend: "up"
        },
        {
            id: 2,
            rank: 2,
            name: "Rajesh Kumar",
            role: "PhD Researcher",
            institution: "IIIT Hyderabad",
            points: 2420,
            projects: 8,
            collaborations: 12,
            answers: 38,
            badge: "platinum",
            trend: "up"
        },
        {
            id: 3,
            rank: 3,
            name: "Anita Desai",
            role: "M.Tech Student",
            institution: "NIT Trichy",
            points: 2180,
            projects: 6,
            collaborations: 10,
            answers: 42,
            badge: "gold",
            trend: "down"
        },
        {
            id: 4,
            rank: 4,
            name: "Prof. Amit Patel",
            role: "Faculty - Electronics",
            institution: "BITS Pilani",
            points: 1950,
            projects: 9,
            collaborations: 7,
            answers: 28,
            badge: "gold",
            trend: "up"
        },
        {
            id: 5,
            rank: 5,
            name: "Sneha Reddy",
            role: "Research Scholar",
            institution: "IISc Bangalore",
            points: 1720,
            projects: 7,
            collaborations: 9,
            answers: 35,
            badge: "silver",
            trend: "up"
        },
        {
            id: 6,
            rank: 6,
            name: "Vikram Singh",
            role: "B.Tech Student",
            institution: "DTU Delhi",
            points: 1480,
            projects: 5,
            collaborations: 6,
            answers: 22,
            badge: "silver",
            trend: "down"
        },
        {
            id: 7,
            rank: 7,
            name: "Meera Nair",
            role: "Assistant Professor",
            institution: "IIT Bombay",
            points: 1250,
            projects: 4,
            collaborations: 8,
            answers: 18,
            badge: "bronze",
            trend: "up"
        },
        {
            id: 8,
            rank: 8,
            name: "Karan Malhotra",
            role: "M.Tech Student",
            institution: "NIT Warangal",
            points: 980,
            projects: 3,
            collaborations: 5,
            answers: 15,
            badge: "bronze",
            trend: "up"
        }
    ];

    const currentUserRank = leaderboardData.find(item => item.name === user?.full_name) || {
        rank: 15,
        name: user?.full_name,
        role: "Student",
        institution: "Your Institution",
        points: 650,
        projects: 2,
        collaborations: 3,
        answers: 8,
        badge: "bronze",
        trend: "up"
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const goToProfile = () => {
        navigate('/UserProfile');
    };

    const getBadgeIcon = (badge) => {
        switch (badge) {
            case 'platinum':
                return <FaTrophy className="badge platinum" />;
            case 'gold':
                return <FaMedal className="badge gold" />;
            case 'silver':
                return <FaMedal className="badge silver" />;
            case 'bronze':
                return <FaMedal className="badge bronze" />;
            default:
                return <FaStar className="badge bronze" />;
        }
    };

    const getTrendIcon = (trend) => {
        return trend === 'up' ? 
            <FaArrowUp className="trend-up" /> : 
            <FaArrowDown className="trend-down" />;
    };

    const filteredData = leaderboardData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="leaderboard-page">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-brand">
                    <i className="fas fa-graduation-cap"></i>
                    <h2>Edunext Leaderboard</h2>
                </div>
                <div className="nav-links">
                    <a href="#global">Global</a>
                    <a href="#monthly">Monthly</a>
                    <a href="#institutions">Institutions</a>
                    <a href="#achievements">Achievements</a>
                </div>
                <div className="nav-user">
                    <span>Welcome, {user?.full_name}!</span>
                    <button onClick={goToProfile} className="profile-btn">
                        User Profile
                    </button>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </nav>

            <div className="leaderboard-content">
                {/* Header Section */}
                <div className="leaderboard-header">
                    <div className="header-content">
                        <h1>Community Leaderboard</h1>
                        <p>Celebrating excellence and contributions across our platform</p>
                    </div>
                    <div className="header-stats">
                        <div className="stat-badge">
                            <FaTrophy className="stat-icon" />
                            <div>
                                <h3>Top 3</h3>
                                <p>Elite Contributors</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current User Rank Card */}
                <div className="user-rank-card">
                    <div className="user-rank-info">
                        <div className="rank-badge">
                            <span className="rank-number">#{currentUserRank.rank}</span>
                            <span className="rank-label">Your Rank</span>
                        </div>
                        <div className="user-details">
                            <h3>{currentUserRank.name}</h3>
                            <p>{currentUserRank.role} • {currentUserRank.institution}</p>
                        </div>
                        <div className="user-points">
                            <span className="points">{currentUserRank.points} pts</span>
                            {getTrendIcon(currentUserRank.trend)}
                        </div>
                    </div>
                    <div className="user-stats">
                        <div className="stat">
                            <span className="stat-value">{currentUserRank.projects}</span>
                            <span className="stat-label">Projects</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{currentUserRank.collaborations}</span>
                            <span className="stat-label">Collaborations</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{currentUserRank.answers}</span>
                            <span className="stat-label">Answers</span>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="leaderboard-controls">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name, institution, or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-controls">
                        <select 
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)}
                            className="time-filter"
                        >
                            <option value="all-time">All Time</option>
                            <option value="monthly">This Month</option>
                            <option value="weekly">This Week</option>
                        </select>
                        <div className="filter-tabs">
                            <button 
                                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                <FaFilter /> All
                            </button>
                            <button 
                                className={`filter-tab ${activeFilter === 'students' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('students')}
                            >
                                <FaUserGraduate /> Students
                            </button>
                            <button 
                                className={`filter-tab ${activeFilter === 'faculty' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('faculty')}
                            >
                                <FaUniversity /> Faculty
                            </button>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="leaderboard-table">
                    <div className="table-header">
                        <div className="header-rank">Rank</div>
                        <div className="header-user">User</div>
                        <div className="header-institution">Institution</div>
                        <div className="header-stats">Projects</div>
                        <div className="header-stats">Collaborations</div>
                        <div className="header-stats">Answers</div>
                        <div className="header-points">Points</div>
                    </div>

                    <div className="table-body">
                        {filteredData.map((user) => (
                            <div key={user.id} className={`table-row ${user.rank <= 3 ? 'top-three' : ''}`}>
                                <div className="cell rank">
                                    <div className="rank-display">
                                        {user.rank <= 3 ? getBadgeIcon(user.badge) : null}
                                        <span className={`rank-number ${user.rank <= 3 ? `top-${user.rank}` : ''}`}>
                                            #{user.rank}
                                        </span>
                                        {getTrendIcon(user.trend)}
                                    </div>
                                </div>
                                <div className="cell user-info">
                                    <div className="avatar">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="user-details">
                                        <h4>{user.name}</h4>
                                        <p>{user.role}</p>
                                    </div>
                                </div>
                                <div className="cell institution">
                                    <span>{user.institution}</span>
                                </div>
                                <div className="cell stat">
                                    <span className="stat-value">{user.projects}</span>
                                </div>
                                <div className="cell stat">
                                    <span className="stat-value">{user.collaborations}</span>
                                </div>
                                <div className="cell stat">
                                    <span className="stat-value">{user.answers}</span>
                                </div>
                                <div className="cell points">
                                    <span className="points-value">{user.points}</span>
                                    <span className="points-label">pts</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="leaderboard-stats">
                    <div className="stat-card">
                        <FaUserGraduate className="stat-icon" />
                        <h3>1,200+</h3>
                        <p>Active Contributors</p>
                    </div>
                    <div className="stat-card">
                        <FaTrophy className="stat-icon" />
                        <h3>45K+</h3>
                        <p>Total Points Earned</p>
                    </div>
                    <div className="stat-card">
                        <FaUniversity className="stat-icon" />
                        <h3>50+</h3>
                        <p>Institutions</p>
                    </div>
                    <div className="stat-card">
                        <FaStar className="stat-icon" />
                        <h3>300+</h3>
                        <p>Projects Completed</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;