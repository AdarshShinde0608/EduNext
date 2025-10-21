import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Simple in-memory store. On serverless, this is not durable.
const users = [];
let nextUserId = 1;

const JWT_SECRET = process.env.JWT_SECRET || 'dev_insecure_jwt_secret_change_me';

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { full_name, email, role, institution_name, password } = await readJsonBody(req);

    if (!full_name || !email || !role || !institution_name || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'All fields are required'
      });
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(400).json({ 
        success: false,
        error: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = {
      id: nextUserId++,
      full_name,
      email,
      role,
      institution_name,
      password: hashedPassword,
      created_at: new Date().toISOString(),
    };
    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please login.',
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
        institution_name: newUser.institution_name,
      },
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error: ' + err.message 
    });
  }
}
