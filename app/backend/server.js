const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // Enter Your Database name
  password: '4683@2001MySQL', // Enter Your database password
  database: 'finance_app'
});

// File upload config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create new user
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const [result] = await pool.query('INSERT INTO users (name) VALUES (?)', [name]);
  res.json({ userId: result.insertId, name });
});

// Get all users alphabetical
app.get('/api/users', async (req, res) => {
  const [users] = await pool.query('SELECT user_id, name FROM users ORDER BY name');
  res.json(users);
});

// Upload Excel file (supports multiple users)
app.post('/api/finances/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);

  let newUsers = 0;
  let newRecords = 0;

  try {
    for (let row of rows) {
      let { Name, Year, Month, Amount } = row;

      if (!Name || !Year || !Month || Amount == null) continue;

      // Check or create user
      let [users] = await pool.query('SELECT user_id FROM users WHERE name = ?', [Name]);
      let userId;
      if (users.length === 0) {
        const [result] = await pool.query('INSERT INTO users (name) VALUES (?)', [Name]);
        userId = result.insertId;
        newUsers++;
      } else {
        userId = users[0].user_id;
      }

      // Check if record already exists
      let [existing] = await pool.query(
        'SELECT record_id FROM financial_records WHERE user_id=? AND year=? AND month=?',
        [userId, Year, Month]
      );

      if (existing.length === 0) {
        await pool.query(
          'INSERT INTO financial_records (user_id, year, month, amount) VALUES (?, ?, ?, ?)',
          [userId, Year, Month, Amount]
        );
        newRecords++;
      }
    }
    res.json({ message: 'Excel processed successfully', newUsers, newRecords });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process Excel file' });
  }
});

// Get financial records for a user/year
app.get('/api/finances/:userId/:year', async (req, res) => {
  const { userId, year } = req.params;
  const [records] = await pool.query(
    'SELECT month, amount FROM financial_records WHERE user_id=? AND year=?',
    [userId, year]
  );
  res.json(records);
});

app.listen(5000, () => console.log('Server running on port 5000'));
