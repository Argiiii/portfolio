require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dbPath = process.env.DB_PATH || path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS stats (
      id TEXT PRIMARY KEY,
      icon TEXT DEFAULT '💼',
      value TEXT NOT NULL,
      label TEXT NOT NULL,
      label_en TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT DEFAULT 'web',
      image TEXT DEFAULT '🚀',
      tags TEXT,
      github TEXT,
      live TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const statsCount = db.prepare('SELECT COUNT(*) as count FROM stats').get();
  if (statsCount.count === 0) {
    const insertStat = db.prepare('INSERT INTO stats (id, icon, value, label, label_en) VALUES (?, ?, ?, ?, ?)');
    insertStat.run('1', '💼', '2+', 'Tahun Pengalaman', 'Years of Experience');
    insertStat.run('2', '🎯', '10+', 'Proyek Selesai', 'Projects Completed');
    insertStat.run('3', '🏆', '2+', 'Sertifikasi', 'Certifications');
    insertStat.run('4', '⭐', '100%', 'Kepuasan Klien', 'Client Satisfaction');
  }

  const projectsCount = db.prepare('SELECT COUNT(*) as count FROM projects').get();
  if (projectsCount.count === 0) {
    const insertProject = db.prepare('INSERT INTO projects (id, title, description, category, image, tags, github, live) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    insertProject.run('1', 'e-commerce-ada.com', 'Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk.', 'web', '🛒', '["React.js", "Node.js", "MongoDB", "Stripe"]', 'https://github.com/Argiiii/ada.com.git', 'https://adaacom.vercel.app/');
    insertProject.run('2', 'Task Management App', 'Aplikasi manajemen tugas dengan fitur drag-and-drop, kolaborasi tim, dan notifikasi real-time.', 'web', '📋', '["Next.js", "TypeScript", "PostgreSQL", "Socket.io"]', 'https://github.com', 'https://taskmanager-demo.vercel.app');
    insertProject.run('3', 'Portfolio Website', 'Website portofolio responsif dengan animasi modern dan design yang elegan.', 'web', '🎨', '["React.js", "Tailwind CSS", "Framer Motion"]', 'https://github.com', 'https://argichanaffi.vercel.app');
    insertProject.run('4', 'Mobile Banking App', 'Aplikasi banking mobile dengan fitur transfer, tagihan, dan investasi.', 'mobile', '🏦', '["React Native", "Firebase", "Redux"]', 'https://github.com', 'https://banking-demo.vercel.app');
    insertProject.run('5', 'AI Chat Application', 'Aplikasi chat dengan integrasi AI untuk assistance dan automated responses.', 'ai', '🤖', '["Python", "OpenAI API", "FastAPI", "React"]', 'https://github.com', 'https://ai-chat-demo.vercel.app');
    insertProject.run('6', 'Fitness Tracker', 'Aplikasi pelacak kebugaran dengan fitur workout plans dan progress tracking.', 'mobile', '💪', '["React Native", "Node.js", "MongoDB"]', 'https://github.com', 'https://fitness-demo.vercel.app');
    insertProject.run('7', 'Ada.com - Hotel & Travel', 'Aplikasi hotel dan traveling komprehensif dengan fitur pemesanan kamar, reservasi pesawat, rencana perjalanan, dan pembayaran aman.', 'web', '✈️', '["React.js", "Node.js", "Vercel"]', 'https://github.com/Argiiii/ada.com', 'https://adaacom.vercel.app');
  }

  console.log('Database initialized successfully');
}

// Stats API
app.get('/api/stats', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM stats ORDER BY id').all();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.post('/api/stats', (req, res) => {
  try {
    const { icon, value, label, label_en } = req.body;
    const id = crypto.randomUUID();
    db.prepare('INSERT INTO stats (id, icon, value, label, label_en) VALUES (?, ?, ?, ?, ?)').run(id, icon || '💼', value, label, label_en);
    const row = db.prepare('SELECT * FROM stats WHERE id = ?').get(id);
    res.status(201).json(row);
  } catch (error) {
    console.error('Error creating stat:', error);
    res.status(500).json({ error: 'Failed to create stat' });
  }
});

app.put('/api/stats/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { icon, value, label, label_en } = req.body;
    db.prepare('UPDATE stats SET icon = ?, value = ?, label = ?, label_en = ? WHERE id = ?').run(icon, value, label, label_en, id);
    const row = db.prepare('SELECT * FROM stats WHERE id = ?').get(id);
    res.json(row);
  } catch (error) {
    console.error('Error updating stat:', error);
    res.status(500).json({ error: 'Failed to update stat' });
  }
});

app.delete('/api/stats/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM stats WHERE id = ?').run(id);
    res.json({ message: 'Stat deleted successfully' });
  } catch (error) {
    console.error('Error deleting stat:', error);
    res.status(500).json({ error: 'Failed to delete stat' });
  }
});

// Projects API
app.get('/api/projects', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
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

app.post('/api/projects', (req, res) => {
  try {
    const { title, description, category, image, tags, github, live } = req.body;
    const id = crypto.randomUUID();
    db.prepare('INSERT INTO projects (id, title, description, category, image, tags, github, live) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(id, title, description, category || 'web', image || '🚀', JSON.stringify(tags || []), github || '', live || '');
    const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    const project = {
      ...row,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags
    };
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, image, tags, github, live } = req.body;
    db.prepare('UPDATE projects SET title = ?, description = ?, category = ?, image = ?, tags = ?, github = ?, live = ? WHERE id = ?').run(title, description, category, image, JSON.stringify(tags || []), github || '', live || '', id);
    const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    const project = {
      ...row,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags
    };
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initDatabase();
});
