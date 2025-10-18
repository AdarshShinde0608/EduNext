import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './questions.css';
import { 
    FaSearch, 
    FaQuestionCircle, 
    FaReply, 
    FaThumbsUp, 
    FaPlus,
    FaFilter,
    FaUserGraduate,
    FaClock
} from 'react-icons/fa';

const Questions = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAskForm, setShowAskForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        title: '',
        description: '',
        category: 'general'
    });

    const questions = [
        {
            id: 1,
            title: "How to implement machine learning algorithms for educational data?",
            description: "I'm working on a project to analyze student performance data using ML. What are the best algorithms to start with?",
            author: "Dr. Priya Sharma",
            role: "Professor - Data Science",
            votes: 24,
            answers: 8,
            tags: ["Machine Learning", "Python", "Education"],
            category: "technical",
            timestamp: "2 hours ago",
            solved: false
        },
        {
            id: 2,
            title: "Best practices for collaborative coding in student projects?",
            description: "Looking for advice on tools and methodologies for effective collaboration in group coding projects.",
            author: "Raj Kumar",
            role: "M.Tech Student",
            votes: 15,
            answers: 12,
            tags: ["Collaboration", "Git", "Tools"],
            category: "collaboration",
            timestamp: "1 day ago",
            solved: true
        },
        {
            id: 3,
            title: "How to secure research funding for AI in education?",
            description: "Seeking guidance on writing successful grant proposals for AI-based educational research projects.",
            author: "Prof. Amit Patel",
            role: "Research Head",
            votes: 31,
            answers: 5,
            tags: ["Funding", "Research", "AI"],
            category: "research",
            timestamp: "3 days ago",
            solved: false
        },
        {
            id: 4,
            title: "Recommended resources for learning React.js for beginners?",
            description: "Complete beginner here. What are the best tutorials and resources to learn React.js for educational projects?",
            author: "Student Developer",
            role: "B.Tech Student",
            votes: 42,
            answers: 15,
            tags: ["React", "Web Development", "Tutorials"],
            category: "technical",
            timestamp: "5 days ago",
            solved: true
        }
    ];

    // REMOVED the unused answers array

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const goToProfile = () => {
        navigate('/UserProfile');
    };

    const handleAskQuestion = () => {
        setShowAskForm(true);
    };

    const handleSubmitQuestion = (e) => {
        e.preventDefault();
        // Handle question submission logic here
        console.log('New question:', newQuestion);
        setShowAskForm(false);
        setNewQuestion({ title: '', description: '', category: 'general' });
        alert('Question posted successfully!');
    };

    const handleVote = (questionId, type) => {
        // Handle voting logic
        console.log(`Voted ${type} on question ${questionId}`);
    };

    const filteredQuestions = questions.filter(question => {
        const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            question.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesFilter = activeFilter === 'all' || 
                            question.category === activeFilter ||
                            (activeFilter === 'solved' && question.solved) ||
                            (activeFilter === 'unsolved' && !question.solved);
        
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="questions-page">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-brand">
                    <i className="fas fa-graduation-cap"></i>
                    <h2>Edunext Q&A</h2>
                </div>
                <div className="nav-links">
                    <a href="#recent">Recent</a>
                    <a href="#popular">Popular</a>
                    <a href="#unanswered">Unanswered</a>
                    <a href="#categories">Categories</a>
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

            <div className="questions-content">
                {/* Header Section */}
                <div className="questions-header">
                    <div className="header-content">
                        <h1>Community Q&A</h1>
                        <p>Get answers from students, faculty, and researchers across India</p>
                    </div>
                    <button className="ask-btn" onClick={handleAskQuestion}>
                        <FaPlus /> Ask Question
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="search-filters">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search questions, topics, or keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-tabs">
                        <button 
                            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            <FaFilter /> All Questions
                        </button>
                        <button 
                            className={`filter-tab ${activeFilter === 'solved' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('solved')}
                        >
                            <FaQuestionCircle /> Solved
                        </button>
                        <button 
                            className={`filter-tab ${activeFilter === 'unsolved' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('unsolved')}
                        >
                            <FaQuestionCircle /> Unsolved
                        </button>
                        <button 
                            className={`filter-tab ${activeFilter === 'technical' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('technical')}
                        >
                            Technical
                        </button>
                        <button 
                            className={`filter-tab ${activeFilter === 'research' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('research')}
                        >
                            Research
                        </button>
                    </div>
                </div>

                {/* Questions List */}
                <div className="questions-list">
                    {filteredQuestions.map(question => (
                        <div key={question.id} className={`question-card ${question.solved ? 'solved' : ''}`}>
                            <div className="question-votes">
                                <button 
                                    className="vote-btn upvote"
                                    onClick={() => handleVote(question.id, 'up')}
                                >
                                    <FaThumbsUp />
                                </button>
                                <span className="vote-count">{question.votes}</span>
                                <button 
                                    className="vote-btn downvote"
                                    onClick={() => handleVote(question.id, 'down')}
                                >
                                    <FaThumbsUp style={{ transform: 'rotate(180deg)' }} />
                                </button>
                            </div>
                            
                            <div className="question-content">
                                <div className="question-header">
                                    <h3>{question.title}</h3>
                                    {question.solved && <span className="solved-badge">Solved</span>}
                                </div>
                                <p className="question-description">{question.description}</p>
                                
                                <div className="question-tags">
                                    {question.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                
                                <div className="question-meta">
                                    <div className="author-info">
                                        <FaUserGraduate />
                                        <span>{question.author} • {question.role}</span>
                                    </div>
                                    <div className="question-stats">
                                        <span className="answers">
                                            <FaReply /> {question.answers} answers
                                        </span>
                                        <span className="timestamp">
                                            <FaClock /> {question.timestamp}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="qa-stats">
                    <div className="stat-card">
                        <FaQuestionCircle className="stat-icon" />
                        <h3>500+</h3>
                        <p>Questions Asked</p>
                    </div>
                    <div className="stat-card">
                        <FaReply className="stat-icon" />
                        <h3>1,200+</h3>
                        <p>Answers Provided</p>
                    </div>
                    <div className="stat-card">
                        <FaUserGraduate className="stat-icon" />
                        <h3>300+</h3>
                        <p>Active Contributors</p>
                    </div>
                    <div className="stat-card">
                        <FaThumbsUp className="stat-icon" />
                        <h3>95%</h3>
                        <p>Questions Solved</p>
                    </div>
                </div>
            </div>

            {/* Ask Question Modal */}
            {showAskForm && (
                <div className="modal-overlay">
                    <div className="ask-modal">
                        <div className="modal-header">
                            <h2>Ask a Question</h2>
                            <button 
                                className="close-btn"
                                onClick={() => setShowAskForm(false)}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmitQuestion}>
                            <div className="form-group">
                                <label>Question Title</label>
                                <input
                                    type="text"
                                    placeholder="Be specific and imagine you're asking a question to another person..."
                                    value={newQuestion.title}
                                    onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    placeholder="Include all the information someone would need to answer your question..."
                                    value={newQuestion.description}
                                    onChange={(e) => setNewQuestion({...newQuestion, description: e.target.value})}
                                    rows="6"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={newQuestion.category}
                                    onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                                >
                                    <option value="general">General</option>
                                    <option value="technical">Technical</option>
                                    <option value="research">Research</option>
                                    <option value="collaboration">Collaboration</option>
                                    <option value="academic">Academic</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowAskForm(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Post Question
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Questions;