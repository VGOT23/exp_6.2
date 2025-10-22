const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// --- Secret key for JWT signing ---
const JWT_SECRET = 'supersecretkey';

// --- Hardcoded user credentials (for demo) ---
const USER = {
  username: 'user123',
  password: 'password123',
};

// --- Fake user balance (in-memory variable) ---
let accountBalance = 1000;

// --- Middleware: Verify JWT token ---
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token not provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// --- Route: Login to get token ---
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== USER.username || password !== USER.password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const payload = { username };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

// --- Protected Route: View Balance ---
app.get('/balance', authenticateToken, (req, res) => {
  res.json({ username: req.user.username, balance: accountBalance });
});

// --- Protected Route: Deposit Money ---
app.post('/deposit', authenticateToken, (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) return res.status(400).json({ error: 'Deposit amount must be positive' });

  accountBalance += amount;
  res.json({ message: `Deposited ₹${amount}`, newBalance: accountBalance });
});

// --- Protected Route: Withdraw Money ---
app.post('/withdraw', authenticateToken, (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) return res.status(400).json({ error: 'Withdrawal amount must be positive' });
  if (amount > accountBalance) return res.status(400).json({ error: 'Insufficient balance' });

  accountBalance -= amount;
  res.json({ message: `Withdrawn ₹${amount}`, newBalance: accountBalance });
});

// --- Fallback route ---
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Banking API running on http://localhost:${PORT}`));
