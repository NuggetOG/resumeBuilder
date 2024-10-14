const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const jwtSecret = '12345'; // Hard-coded JWT secret password

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure MIME types
const mimeTypes = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'application/javascript',
  'ico': 'image/x-icon'
};

// Middleware to set the correct MIME type
app.use((req, res, next) => {
  const filePath = path.join(__dirname, 'public', req.url);
  const ext = path.extname(filePath).slice(1);

  if (mimeTypes[ext]) {
    res.setHeader('Content-Type', mimeTypes[ext]);
  }

  next();
});

mongoose.connect('mongodb+srv://user22:fLTZMzwH8YcrM75S@cluster0.7allcoi.mongodb.net/user_app2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to database'))
  .catch(err => {
    console.log('Database connection error:', err);
    process.exit(1); // Exit the process with a non-zero code
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'homepage', 'index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user1 = new User({ email: req.body.email, password: hashedPassword });
    await user1.save();
    console.log('user created and saved successfully');
    res.status(201).send(user1);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ msg: 'Invalid username or password' });
    }
    const token = jwt.sign({ email: user.email }, jwtSecret);
    // Set the Authorization header
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({ msg: 'Login successful' });
  } catch (err) {
    console.log('Error during login:', err);
    res.status(500).send('Error during login');
  }
});

app.get('/main', function (req, res) {
  const token = req.query.token;
  console.log('Token received in query string:', token);
  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.email;
    // Redirect to the landing page if token is valid
    return res.sendFile(path.join(__dirname, 'public', 'mainpage', 'resume.html'));
  } catch (err) {
    return res.status(403).json({ msg: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});