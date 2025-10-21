import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Simple in-memory store. On serverless, this is not durable.
const users = [];
let nextUserId = 1;

const JWT_SECRET = process.env.JWT_SECRET || 'dev_insecure_jwt_secret_change_me';

function json(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // Guard against too large bodies
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
  // Enable CORS for all requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname; // e.g., /api/login
  const method = req.method || 'GET';

  // Health
  if (method === 'GET' && pathname === '/api/health') {
    return json(res, 200, {
      status: 'OK',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
    });
  }

  // Test
  if (method === 'GET' && pathname === '/api/test') {
    return json(res, 200, { message: 'API is working!' });
  }

  // Users (sanitized)
  if (method === 'GET' && pathname === '/api/users') {
    return json(res, 200, {
      success: true,
      users: users.map(u => ({
        id: u.id,
        full_name: u.full_name,
        email: u.email,
        role: u.role,
        institution_name: u.institution_name,
      })),
    });
  }

  // Signup
  if (method === 'POST' && pathname === '/api/signup') {
    try {
      const { full_name, email, role, institution_name, password } = await readJsonBody(req);

      if (!full_name || !email || !role || !institution_name || !password) {
        return json(res, 400, { success: false, error: 'All fields are required' });
      }

      const existing = users.find(u => u.email === email);
      if (existing) {
        return json(res, 400, { success: false, error: 'User already exists' });
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

      return json(res, 201, {
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
      return json(res, 500, { success: false, error: 'Server error: ' + err.message });
    }
  }

  // Login
  if (method === 'POST' && pathname === '/api/login') {
    try {
      const { email, password } = await readJsonBody(req);
      if (!email || !password) {
        return json(res, 400, { success: false, error: 'Email and password are required' });
      }

      const user = users.find(u => u.email === email);
      if (!user) {
        return json(res, 400, { success: false, error: 'User not found' });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return json(res, 400, { success: false, error: 'Incorrect password' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

      return json(res, 200, {
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          institution_name: user.institution_name,
        },
      });
    } catch (err) {
      return json(res, 500, { success: false, error: 'Server error: ' + err.message });
    }
  }

  // 404 for everything else
  return json(res, 404, { error: 'Not found' });
}
