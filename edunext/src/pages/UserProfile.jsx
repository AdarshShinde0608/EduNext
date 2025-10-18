// UserProfile.jsx
import React, { useState } from 'react';
import './UserProfile.css'; // Assuming CSS is in a separate file
import { FaArrowLeft, FaCog, FaTrophy } from 'react-icons/fa'; // Using react-icons for Font Awesome equivalents

const UserProfile = () => {
  const [ActiveTab, SetActiveTab] = useState('activity'); // Default to Recent Activity

  const user = {
    avatar: '🦄', // Emoji as per ASCII
    username: 'HiddenUsername',
    level: 5,
    credits: 1428,
    posts: 87,
    comments: 42,
    title: 'Level 5 Contributor',
  };

  const recentActivities = [
    {
      type: 'Asked',
      content: '"Best practices for scalable web apps?"',
      upvotes: 24,
      comments: 8,
      time: '1d ago',
    },
    {
      type: 'Commented',
      content: 'on "AI tips for beginners"',
      upvotes: 12,
      comments: null,
      time: '2d ago',
    },
    {
      type: 'Shared',
      content: '"New compression algorithm"',
      upvotes: 56,
      comments: 14,
      time: '3d ago',
    },
  ];

  const sidebarItems = [
    { icon: '🏠', label: 'Global Feed', key: 'global-feed' },
    { icon: '🔥', label: 'Trending', key: 'trending' },
    { icon: '💬', label: 'My Posts', key: 'my-posts', active: true }, // Highlight My Posts for profile context
    { icon: '⭐', label: 'Saved', key: 'saved' },
    { icon: '👥', label: 'Communities', key: 'communities' },
  ];

  const bottomItems = [
    { icon: '👤', label: 'Profile', active: false },
    { icon: '🏆', label: 'Leaderboard' },
    { icon: '⚙️', label: 'Settings' },
  ];

  const handleSidebarClick = (key) => {
    // Navigate to other pages; for now, just log
    console.log(`Navigating to ${key}`);
  };

  const handleBackClick = () => {
    // Navigate back; for now, log
    console.log('Go back');
  };

  const handleEditClick = () => {
    // Open edit modal or navigate; for now, log
    console.log('Edit profile');
  };

  return (
    <div className="app-container">
      {/* Profile-Specific Header */}
      <header className="profile-header">
        <div className="header-left">
          <button className="back-btn" onClick={handleBackClick}>
            <FaArrowLeft /> Back
          </button>
        </div>
        <div className="header-right">
          <button className="edit-btn" onClick={handleEditClick}>
            <FaCog /> Edit
          </button>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar - Same as before */}
        <aside className="sidebar">
          <div className="app-title">
            🚀 Dyness App
          </div>
          <nav className="sidebar-nav">
            {sidebarItems.map((item) => (
              <div
                key={item.key}
                className={`nav-item ${item.active ? 'active' : ''}`}
                onClick={() => handleSidebarClick(item.key)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </div>
            ))}
          </nav>
          <div className="divider"></div>
          <nav className="sidebar-bottom-nav">
            {bottomItems.map((item, index) => (
              <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </div>
            ))}
          </nav>
          <div className="divider"></div>
          <div className="sidebar-footer">
            <div className="help-section">
              <div className="nav-item">
                <span className="nav-icon">🆘</span>
                <span className="nav-label">Help & FAQ</span>
              </div>
              <div className="nav-item">
                <span className="nav-icon">📱</span>
                <span className="nav-label">About</span>
              </div>
            </div>
            <div className="credits">
              <div>[{user.credits}] Credits</div>
              <div>Level {user.level}</div>
            </div>
          </div>
        </aside>

        {/* Main Content - User Profile */}
        <main className="main-content">
          {/* Profile Info */}
          <div className="profile-info-section">
            <div className="profile-avatar">
              <span className="avatar-placeholder">{user.avatar}</span>
            </div>
            <h1 className="username">{user.username}</h1>
            <p className="level-title">
              <FaTrophy /> {user.title}
            </p>
          </div>

          {/* Stats Box */}
          <div className="stats-box">
            <div className="stat-item">
              <div className="stat-number">{user.credits.toLocaleString()}</div>
              <div className="stat-label">Credits</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{user.posts}</div>
              <div className="stat-label">Posts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{user.comments}</div>
              <div className="stat-label">Comments</div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="activity-section">
            <h2>Recent Activity</h2>
            <div className="activities-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-type">▸ {activity.type}:</div>
                  <div className="activity-content">{activity.content}</div>
                  <div className="activity-actions">
                    {activity.upvotes && <span>🔼 {activity.upvotes}</span>}
                    {activity.comments && <span>💬 {activity.comments}</span>}
                    <span>⏰ {activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;