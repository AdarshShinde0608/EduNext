import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Make sure this file exists

const Login = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        login: { email: '', password: '' },
        signup: { 
            full_name: '', 
            email: '', 
            role: '', 
            institution_name: '', 
            password: '', 
            confirmPassword: '' 
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const navigate = useNavigate();
    // Use Vite env var if provided (set VITE_API_BASE_URL in Vercel)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setError('');
        setSuccess('');
    };

    const handleInputChange = (formType, field, value) => {
        setFormData(prev => ({
            ...prev,
            [formType]: {
                ...prev[formType],
                [field]: value
            }
        }));
        setError('');
        setSuccess('');
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const { email, password } = formData.login;

            if (!email || !password) {
                setError('❌ Please fill in all fields');
                setLoading(false);
                return;
            }

            console.log('🔐 Attempting login...');

            const response = await axios.post(`${API_BASE_URL}/login`, { 
                email, 
                password 
            }, {
                timeout: 8000
            });
            
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                setSuccess('✅ Login successful! Redirecting...');
                
                setTimeout(() => {
                    navigate('/homepage');
                }, 1000);
            }
            
        } catch (err) {
            console.error('Login error:', err);
            
            if (err.code === 'ECONNABORTED') {
                setError('❌ Request timeout. Please check if server is running.');
            } else if (err.response?.data?.error) {
                setError(`❌ ${err.response.data.error}`);
            } else if (err.code === 'NETWORK_ERROR' || err.message?.includes('Network Error')) {
                setError('❌ Cannot connect to server. Please make sure the backend is running on port 5000.');
            } else if (err.code === 'ECONNREFUSED') {
                setError('❌ Connection refused. Please start the backend server.');
            } else {
                setError('❌ Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        const { full_name, email, role, institution_name, password, confirmPassword } = formData.signup;
        
        // Quick validation
        if (!full_name || !email || !role || !institution_name || !password || !confirmPassword) {
            setError("❌ Please fill in all fields!");
            return;
        }

        if (password !== confirmPassword) {
            setError("❌ Passwords don't match!");
            return;
        }

        if (password.length < 6) {
            setError("❌ Password must be at least 6 characters!");
            return;
        }

        setLoading(true);

        try {
            // Remove confirmPassword from the data sent to backend
            const { confirmPassword: _, ...signupData } = formData.signup;
            
            console.log('📝 Attempting signup...');
            
            const response = await axios.post(`${API_BASE_URL}/signup`, signupData, {
                timeout: 8000
            });
            
            if (response.data.success) {
                setSuccess('✅ Registration successful! Switching to login...');
                
                // Clear form
                setFormData(prev => ({
                    ...prev,
                    signup: { 
                        full_name: '', 
                        email: '', 
                        role: '', 
                        institution_name: '', 
                        password: '', 
                        confirmPassword: '' 
                    },
                    login: {
                        email: signupData.email,
                        password: ''
                    }
                }));
                
                // Switch to login after short delay
                setTimeout(() => {
                    setActiveTab('login');
                }, 1500);
            }
            
        } catch (err) {
            console.error('Signup error:', err);
            
            if (err.code === 'ECONNABORTED') {
                setError('❌ Request timeout. Server might be busy. Please try again.');
            } else if (err.response?.data?.error) {
                setError(`❌ ${err.response.data.error}`);
            } else if (err.code === 'NETWORK_ERROR' || err.message?.includes('Network Error')) {
                setError('❌ Cannot connect to server. Please check if backend is running.');
            } else {
                setError('❌ Signup failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Test connection function - FIXED
    const testConnection = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/health`, {
                timeout: 5000
            });
            setSuccess(`✅ Server is running: ${response.data.status}`);
        } catch (err) {
            setError('❌ Server is not responding. Please start the backend server.',err); // Fixed syntax error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="container">
                <div className="welcome-section">
                    <h1>Edunext - Bridging Students & Staff</h1>
                    <p>Showcase projects, collaborate, and grow academically.</p>
                    
                    <div className="features">
                        <div className="feature">
                            <i className="fas fa-project-diagram"></i>
                            <span>Share projects</span>
                        </div>
                        <div className="feature">
                            <i className="fas fa-hands-helping"></i>
                            <span>Collaborate</span>
                        </div>
                        <div className="feature">
                            <i className="fas fa-question-circle"></i>
                            <span>Ask questions</span>
                        </div>
                    </div>

                    {/* Connection Test Button */}
                    {/* <button 
                        onClick={testConnection} 
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            background: 'rgba(255,255,255,0.2)',
                            border: '1px solid white',
                            color: 'white',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Testing...' : 'Test Server Connection'}
                    </button> */}
                </div>
                
                <div className="form-section">
                    <div className="logo">
                        <i className="fas fa-graduation-cap"></i>
                        <h2>ConnectEd</h2>
                    </div>

                    <div className="card">
                    {success && (
                        <div className="success-message" role="status" aria-live="polite">
                            <i className="fas fa-check-circle" aria-hidden="true"></i>
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="error-message" role="alert" aria-live="assertive">
                            <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                            {error}
                        </div>
                    )}

                    <div className="tabs">
                        <div 
                            className={`tab ${activeTab === 'login' ? 'active' : ''}`} 
                            onClick={() => handleTabClick('login')}
                            role="button"
                            tabIndex={0}
                        >
                            Login
                        </div>
                        <div 
                            className={`tab ${activeTab === 'signup' ? 'active' : ''}`} 
                            onClick={() => handleTabClick('signup')}
                            role="button"
                            tabIndex={0}
                        >
                            Sign Up
                        </div>
                    </div>

                    <div className="form-container">
                        {/* Login Form */}
                        <form 
                            className={`form ${activeTab === 'login' ? 'active' : ''}`} 
                            onSubmit={handleLoginSubmit}
                        >
                            <h3>Welcome Back!</h3>
                            
                            <div className="input-group">
                                <i className="fas fa-envelope"></i>
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    required 
                                    value={formData.login.email}
                                    onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            
                            <div className="input-group">
                                <i className="fas fa-lock"></i>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    required 
                                    value={formData.login.password}
                                    onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            
                            <button type="submit" className="btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>

                            <div className="switch-form">
                                <p>No account? <span onClick={() => handleTabClick('signup')}>Sign up</span></p>
                            </div>
                        </form>
                        
                        {/* Signup Form */}
                        <form 
                            className={`form ${activeTab === 'signup' ? 'active' : ''}`} 
                            onSubmit={handleSignupSubmit}
                        >
                            <h3>Join ConnectEd!</h3>
                            
                            <div className="input-group">
                                <i className="fas fa-user"></i>
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    required 
                                    value={formData.signup.full_name}
                                    onChange={(e) => handleInputChange('signup', 'full_name', e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            
                            <div className="input-group">
                                <i className="fas fa-envelope"></i>
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    required 
                                    value={formData.signup.email}
                                    onChange={(e) => handleInputChange('signup', 'email', e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            
                            <div className="input-group">
                                <i className="fas fa-user-tag"></i>
                                <select 
                                    required
                                    value={formData.signup.role}
                                    onChange={(e) => handleInputChange('signup', 'role', e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Select Role</option>
                                    <option value="student">Student</option>
                                    <option value="staff">Staff</option>
                                    <option value="researcher">Researcher</option>
                                </select>
                            </div>
                            
                            <div className="input-group">
                                <i className="fas fa-university"></i>
                                <input 
                                    type="text" 
                                    placeholder="Institution Name" 
                                    required 
                                    value={formData.signup.institution_name}
                                    onChange={(e) => handleInputChange('signup', 'institution_name', e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            
                            <div className="input-group">
                                <i className="fas fa-lock"></i>
                                <input 
                                    type="password" 
                                    placeholder="Password (min. 6 characters)" 
                                    required 
                                    value={formData.signup.password}
                                    onChange={(e) => handleInputChange('signup', 'password', e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            
                            <div className="input-group">
                                <i className="fas fa-lock"></i>
                                <input 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    required 
                                    value={formData.signup.confirmPassword}
                                    onChange={(e) => handleInputChange('signup', 'confirmPassword', e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            
                            <button type="submit" className="btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            <div className="switch-form">
                                <p>Have an account? <span onClick={() => handleTabClick('login')}>Login</span></p>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;