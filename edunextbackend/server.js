const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory storage for testing (remove this later)
let users = [];
let userId = 1;

// JWT Secret
const JWT_SECRET = 'your_jwt_secret_key';

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// SIMPLE SIGNUP (without database)
app.post('/api/signup', async (req, res) => {
    console.log('📨 Signup request received:', req.body.email);
    
    try {
        const { full_name, email, role, institution_name, password } = req.body;

        // Validate required fields
        if (!full_name || !email || !role || !institution_name || !password) {
            return res.status(400).json({ 
                success: false,
                error: 'All fields are required'
            });
        }

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                error: 'User already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create new user
        const newUser = {
            id: userId++,
            full_name,
            email,
            role,
            institution_name,
            password: hashedPassword,
            created_at: new Date().toISOString()
        };

        users.push(newUser);
        
        console.log('✅ User created successfully:', email);
        console.log('📊 Total users:', users.length);

        res.status(201).json({
            success: true,
            message: 'Registration successful! Please login.',
            user: {
                id: newUser.id,
                full_name: newUser.full_name,
                email: newUser.email,
                role: newUser.role,
                institution_name: newUser.institution_name
            }
        });

    } catch (error) {
        console.error('❌ Signup error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error: ' + error.message
        });
    }
});

// SIMPLE LOGIN (without database)
app.post('/api/login', async (req, res) => {
    console.log('🔐 Login attempt for:', req.body.email);
    
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // Find user
        const user = users.find(u => u.email === email);
        
        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'User not found'
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                error: 'Incorrect password'
            });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('✅ Login successful for:', email);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
                institution_name: user.institution_name
            }
        });

    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error: ' + error.message
        });
    }
});

// Get all users (for testing)
app.get('/api/users', (req, res) => {
    res.json({
        success: true,
        users: users.map(user => ({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            institution_name: user.institution_name
        }))
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
    console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
    console.log(`👥 Test endpoint: http://localhost:${PORT}/api/test`);
});