import React, { useState, useRef, useEffect } from 'react';
import './post.css';

const PostCreator = () => {
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [postType, setPostType] = useState('question');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [isPosting, setIsPosting] = useState(false);
    
    const fileInputRef = useRef(null);

    const handlePostTypeChange = (type) => {
        setPostType(type);
    };

    const triggerFileInput = (acceptTypes) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = acceptTypes.join(',');
            fileInputRef.current.click();
        }
    };

    const handleFileSelection = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = [];
        
        for (let file of files) {
            if (attachedFiles.length + validFiles.length >= 5) {
                alert('Maximum 5 files allowed');
                break;
            }
            
            if (file.size > 10 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Maximum size is 10MB.`);
                continue;
            }
            
            validFiles.push(file);
        }
        
        if (validFiles.length > 0) {
            setAttachedFiles(prev => [...prev, ...validFiles]);
        }
        
        // Reset file input
        event.target.value = '';
    };

    const removeFile = (index) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const hasUnsavedChanges = () => {
        return content.trim().length > 0 || title.trim().length > 0 || attachedFiles.length > 0;
    };

    const goBack = () => {
        if (hasUnsavedChanges()) {
            if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
                window.history.back();
            }
        } else {
            window.history.back();
        }
    };

    const submitPost = async () => {
        if (!content && attachedFiles.length === 0) {
            alert('Please add some content or attachments to your post.');
            return;
        }

        setIsPosting(true);

        try {
            // Simulate API call
            await mockAPICall({
                type: postType,
                title: title.trim() || null,
                content: content.trim() || null,
                attachments: attachedFiles,
                visibility: visibility
            });

            alert('Post created successfully!');
            goBack();
            
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        } finally {
            setIsPosting(false);
        }
    };

    const mockAPICall = (postData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Post created:', postData);
                resolve({ success: true, id: Math.random().toString(36).substr(2, 9) });
            }, 2000);
        });
    };

    const getContentPlaceholder = () => {
        switch (postType) {
            case 'question':
                return 'What would you like to ask the community?';
            case 'project':
                return 'Share your project idea and what you\'re looking for...';
            case 'autogrammetry':
                return 'Describe your autogrammetry project and share your findings...';
            default:
                return 'What\'s on your mind?';
        }
    };

    const isPostButtonEnabled = () => {
        return content.trim().length > 0 || attachedFiles.length > 0;
    };

    // Prevent accidental navigation
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (hasUnsavedChanges()) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [content, title, attachedFiles]);

    return (
        <div className="app-container">
            {/* Top Navigation Bar */}
            <nav className="top-navbar">
                <div className="nav-brand">
                    <i className="fas fa-graduation-cap"></i>
                    <h2>Edunext</h2>
                </div>
                <div className="nav-user">
                    <span>Create New Post</span>
                    <button className="profile-btn">
                        <i className="fas fa-user-circle"></i>
                    </button>
                </div>
            </nav>

            <div className="main-container">
                {/* Sidebar Navigation */}
                <div className="sidebar">
                    <div className="sidebar-menu">
                        <div className="menu-item active">
                            <i className="fas fa-home"></i>
                            <span>Global Feed</span>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-fire"></i>
                            <span>Trending</span>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-file-alt"></i>
                            <span>My Posts</span>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-star"></i>
                            <span>Saved</span>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-users"></i>
                            <span>Communities</span>
                        </div>
                        
                        <div className="menu-divider"></div>
                        
                        <div className="menu-item">
                            <i className="fas fa-project-diagram"></i>
                            <span>Projects</span>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-hands-helping"></i>
                            <span>Collaborate</span>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-question-circle"></i>
                            <span>Q&A Forum</span>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-trophy"></i>
                            <span>Leaderboard</span>
                        </div>
                        
                        <div className="menu-divider"></div>
                        
                        <div className="menu-item">
                            <i className="fas fa-user-cog"></i>
                            <span>Profile</span>
                        </div>
                        <div className="menu-item">
                            <i className="fas fa-cog"></i>
                            <span>Settings</span>
                        </div>
                    </div>

                    <div className="sidebar-footer">
                        <div className="user-info">
                            <div className="user-avatar">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="user-details">
                                <span className="user-name">Current User</span>
                                <span className="user-role">Student</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="main-content">
                    <header className="content-header">
                        <button className="btn btn-secondary" onClick={goBack}>
                            <i className="fas fa-arrow-left"></i> Cancel
                        </button>
                        <button 
                            className="btn btn-primary" 
                            onClick={submitPost}
                            disabled={!isPostButtonEnabled() || isPosting}
                        >
                            {isPosting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Posting...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-paper-plane"></i> Post
                                </>
                            )}
                        </button>
                    </header>

                    <div className="create-post-container">
                        <h1 className="page-title">Create New Post</h1>
                        
                        {/* Post Type Selection */}
                        <div className="form-section">
                            <label className="section-label">Post Type</label>
                            <div className="post-type-selector">
                                <label className={`radio-option ${postType === 'question' ? 'active' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="postType" 
                                        value="question" 
                                        checked={postType === 'question'}
                                        onChange={(e) => handlePostTypeChange(e.target.value)}
                                    />
                                    <span className="radio-custom"></span>
                                    <i className="fas fa-question-circle"></i>
                                    Ask Question
                                </label>
                                <label className={`radio-option ${postType === 'project' ? 'active' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="postType" 
                                        value="project" 
                                        checked={postType === 'project'}
                                        onChange={(e) => handlePostTypeChange(e.target.value)}
                                    />
                                    <span className="radio-custom"></span>
                                    <i className="fas fa-project-diagram"></i>
                                    Share Project Idea
                                </label>
                                <label className={`radio-option ${postType === 'autogrammetry' ? 'active' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="postType" 
                                        value="autogrammetry" 
                                        checked={postType === 'autogrammetry'}
                                        onChange={(e) => handlePostTypeChange(e.target.value)}
                                    />
                                    <span className="radio-custom"></span>
                                    <i className="fas fa-cube"></i>
                                    Post Autogrammetry
                                </label>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="form-section">
                            <label className="section-label">Content</label>
                            <div className="content-area">
                                <input 
                                    type="text" 
                                    className="title-input" 
                                    placeholder="Title (optional)" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <textarea 
                                    className="content-textarea" 
                                    placeholder={getContentPlaceholder()}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows="6"
                                />
                            </div>
                        </div>

                        {/* Attachments */}
                        <div className="form-section">
                            <label className="section-label">Attachments</label>
                            <div className="attachment-actions">
                                <button 
                                    className="btn btn-outline" 
                                    onClick={() => triggerFileInput(['.pdf', '.doc', '.docx', '.txt'])}
                                >
                                    <i className="fas fa-file"></i> Add Document
                                </button>
                                <button 
                                    className="btn btn-outline" 
                                    onClick={() => triggerFileInput(['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov'])}
                                >
                                    <i className="fas fa-image"></i> Add Media
                                </button>
                            </div>
                            <div className="attachment-preview">
                                {attachedFiles.length === 0 ? (
                                    <div className="no-attachments">
                                        <i className="fas fa-paperclip"></i>
                                        No files attached
                                    </div>
                                ) : (
                                    attachedFiles.map((file, index) => (
                                        <div key={index} className="file-item">
                                            <i className="fas fa-file"></i>
                                            <span className="file-name">{file.name}</span>
                                            <span className="file-size">
                                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                            </span>
                                            <button 
                                                className="remove-file" 
                                                onClick={() => removeFile(index)}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Visibility */}
                        <div className="form-section">
                            <label className="section-label">Visibility</label>
                            <div className="visibility-selector">
                                <select 
                                    className="visibility-dropdown" 
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value)}
                                >
                                    <option value="public">
                                        <i className="fas fa-globe"></i> Public - Visible to everyone
                                    </option>
                                    <option value="community">
                                        <i className="fas fa-users"></i> Community - Visible to community members
                                    </option>
                                    <option value="private">
                                        <i className="fas fa-lock"></i> Private - Only visible to you
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Hidden file input */}
            <input 
                type="file" 
                ref={fileInputRef}
                multiple 
                style={{ display: 'none' }}
                onChange={handleFileSelection}
            />
        </div>
    );
};

export default PostCreator;