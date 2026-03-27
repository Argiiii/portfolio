require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initDatabase() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS stats (
        id VARCHAR(36) PRIMARY KEY,
        icon VARCHAR(10) DEFAULT '💼',
        value VARCHAR(50) NOT NULL,
        label VARCHAR(100) NOT NULL,
        label_en VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        category VARCHAR(50) DEFAULT 'web',
        image VARCHAR(10) DEFAULT '🚀',
        tags JSON,
        github VARCHAR(500),
        live VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const [stats] = await connection.query('SELECT COUNT(*) as count FROM stats');
    if (stats[0].count === 0) {
      await connection.query(`
        INSERT INTO stats (id, icon, value, label, label_en) VALUES 
        (?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?)
      `, [
        '1', '💼', '5+', 'Tahun Pengalaman', 'Years of Experience',
        '2', '🎯', '50+', 'Proyek Selesai', 'Projects Completed',
        '3', '🏆', '10+', 'Sertifikasi', 'Certifications',
        '4', '⭐', '100%', 'Kepuasan Klien', 'Client Satisfaction'
      ]);
    }

    const [projects] = await connection.query('SELECT COUNT(*) as count FROM projects');
    if (projects[0].count === 0) {
      await connection.query(`
        INSERT INTO projects (id, title, description, category, image, tags, github, live) VALUES
        (?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        '1', 'E-Commerce Platform', 'Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk.', 'web', '🛒', '["React.js", "Node.js", "MongoDB", "Stripe"]', 'https://github.com', 'https://demo.com',
        '2', 'Task Management App', 'Aplikasi manajemen tugas dengan fitur drag-and-drop, kolaborasi tim, dan notifikasi real-time.', 'web', '📋', '["Next.js", "TypeScript", "PostgreSQL", "Socket.io"]', 'https://github.com', 'https://demo.com',
        '3', 'Portfolio Website', 'Website portofolio responsif dengan animasi modern dan design yang elegan.', 'web', '🎨', '["React.js", "Tailwind CSS", "Framer Motion"]', 'https://github.com', 'https://demo.com',
        '4', 'Mobile Banking App', 'Aplikasi banking mobile dengan fitur transfer, tagihan, dan investasi.', 'mobile', '🏦', '["React Native", "Firebase", "Redux"]', 'https://github.com', 'https://demo.com',
        '5', 'AI Chat Application', 'Aplikasi chat dengan integrasi AI untuk assistance dan automated responses.', 'ai', '🤖', '["Python", "OpenAI API", "FastAPI", "React"]', 'https://github.com', 'https://demo.com',
        '6', 'Fitness Tracker', 'Aplikasi pelacak kebugaran dengan fitur workout plans dan progress tracking.', 'mobile', '💪', '["React Native", "Node.js", "MongoDB"]', 'https://github.com', 'https://demo.com'
      ]);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    connection.release();
  }
}

// Stats API
app.get('/api/stats', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stats ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.post('/api/stats', async (req, res) => {
  try {
    const { icon, value, label, label_en } = req.body;
    const id = crypto.randomUUID();
    await pool.query(
      'INSERT INTO stats (id, icon, value, label, label_en) VALUES (?, ?, ?, ?, ?)',
      [id, icon || '💼', value, label, label_en]
    );
    const [rows] = await pool.query('SELECT * FROM stats WHERE id = ?', [id]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating stat:', error);
    res.status(500).json({ error: 'Failed to create stat' });
  }
});

app.put('/api/stats/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { icon, value, label, label_en } = req.body;
    await pool.query(
      'UPDATE stats SET icon = ?, value = ?, label = ?, label_en = ? WHERE id = ?',
      [icon, value, label, label_en, id]
    );
    const [rows] = await pool.query('SELECT * FROM stats WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating stat:', error);
    res.status(500).json({ error: 'Failed to update stat' });
  }
});

app.delete('/api/stats/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM stats WHERE id = ?', [id]);
    res.json({ message: 'Stat deleted successfully' });
  } catch (error) {
    console.error('Error deleting stat:', error);
    res.status(500).json({ error: 'Failed to delete stat' });
  }
});

// Projects API
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    const projects = rows.map(p => ({
      ...p,
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags
    }));
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, category, image, tags, github, live } = req.body;
    const id = crypto.randomUUID();
    await pool.query(
      'INSERT INTO projects (id, title, description, category, image, tags, github, live) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, title, description, category || 'web', image || '🚀', JSON.stringify(tags || []), github || '', live || '']
    );
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    const project = {
      ...rows[0],
      tags: typeof rows[0].tags === 'string' ? JSON.parse(rows[0].tags) : rows[0].tags
    };
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, image, tags, github, live } = req.body;
    await pool.query(
      'UPDATE projects SET title = ?, description = ?, category = ?, image = ?, tags = ?, github = ?, live = ? WHERE id = ?',
      [title, description, category, image, JSON.stringify(tags || []), github || '', live || '', id]
    );
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    const project = {
      ...rows[0],
      tags: typeof rows[0].tags === 'string' ? JSON.parse(rows[0].tags) : rows[0].tags
    };
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDatabase();
});