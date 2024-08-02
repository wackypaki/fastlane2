const express = require('express');
<<<<<<< HEAD
const mysql = require('mysql');
const app = express();
const port = 3000;

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'vehicle_db'
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Create an endpoint to fetch vehicle data
app.get('/api/vehicle', (req, res) => {
    let sql = 'SELECT * FROM vehicles WHERE id = 1'; // Adjust the query as needed
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
=======
const cors = require('cors');
const path = require('path'); // Required to resolve paths
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.static('public')); // Serve static files from 'public' directory

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fastlane',
  password: 'B0n3rsh!tz',
  port: 5432,
});

// Serve your index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html')); // Replace with the correct path if necessary
});


app.get('/makes/:generation', async (req, res) => {
  const generation = req.params.generation;
  try {
    const query = `
      SELECT DISTINCT mk.name
      FROM makes mk
      JOIN models m ON mk.id = m.make_id
      JOIN generations g ON m.id = g.model_id
      WHERE g.name = $1;
    `;
    const { rows } = await pool.query(query, [generation]);
    res.json(rows.map(row => row.name));
  } catch (error) {
    console.error('Error fetching makes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/models/:generation/:make', async (req, res) => {
  const generation = req.params.generation;
  const make = req.params.make;
  try {
    const query = `
      SELECT DISTINCT m.name
      FROM models m
      JOIN generations g ON m.id = g.model_id
      JOIN makes mk ON m.make_id = mk.id
      WHERE g.name = $1 AND mk.name = $2;
    `;
    const { rows } = await pool.query(query, [generation, make]);
    res.json(rows.map(row => row.name));
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
>>>>>>> origin/main
});