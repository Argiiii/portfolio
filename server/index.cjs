require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dbPath = process.env.DB_PATH || path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

function initDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS stats (
        id TEXT PRIMARY KEY,
        icon TEXT DEFAULT '💼',
        value TEXT NOT NULL,
        label TEXT NOT NULL,
        label_en TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT DEFAULT 'web',
        image TEXT DEFAULT '🚀',
        tags TEXT,
        github TEXT,
        live TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const checkStats = "SELECT COUNT(*) as count FROM stats";
    db.get(checkStats, (err, row) => {
      if (row.count === 0) {
        const insertStats = `
          INSERT INTO stats (id, icon, value, label, label_en) VALUES 
          (?, ?, ?, ?, ?),
          (?, ?, ?, ?, ?),
          (?, ?, ?, ?, ?),
          (?, ?, ?, ?, ?)
        `;
        db.run(insertStats, [
          '1', '💼', '5+', 'Tahun Pengalaman', 'Years of Experience',
          '2', '🎯', '50+', 'Proyek Selesai', 'Projects Completed',
          '3', '🏆', '10+', 'Sertifikasi', 'Certifications',
          '4', '⭐', '100%', 'Kepuasan Klien', 'Client Satisfaction'
        ]);
      }
    });

    const checkProjects = "SELECT COUNT(*) as count FROM projects";
    db.get(checkProjects, (err, row) => {
      if (row.count === 0) {
        const insertProjects = `
          INSERT INTO projects (id, title, description, category, image, tags, github, live) VALUES
          (?, ?, ?, ?, ?, ?, ?, ?),
          (?, ?, ?, ?, ?, ?, ?, ?),
          (?, ?, ?, ?, ?, ?, ?, ?),
          (?, ?, ?, ?, ?, ?, ?, ?),
          (?, ?, ?, ?, ?, ?, ?, ?),
          (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.run(insertProjects, [
          '1', 'E-Commerce Platform', 'Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk.', 'web', '🛒', '["React.js", "Node.js", "MongoDB", "Stripe"]', 'https://github.com', 'https://demo.com',
          '2', 'Task Management App', 'Aplikasi manajemen tugas dengan fitur drag-and-drop, kolaborasi tim, dan notifikasi real-time.', 'web', '📋', '["Next.js", "TypeScript", "PostgreSQL", "Socket.io"]', 'https://github.com', 'https://demo.com',
          '3', 'Portfolio Website', 'Website portofolio responsif dengan animasi modern dan design yang elegan.', 'web', '🎨', '["React.js", "Tailwind CSS", "Framer Motion"]', 'https://github.com', 'https://demo.com',
          '4', 'Mobile Banking App', 'Aplikasi banking mobile dengan fitur transfer, tagihan, dan investasi.', 'mobile', '🏦', '["React Native", "Firebase", "Redux"]', 'https://github.com', 'https://demo.com',
          '5', 'AI Chat Application', 'Aplikasi chat dengan integrasi AI untuk assistance dan automated responses.', 'ai', '🤖', '["Python", "OpenAI API", "FastAPI", "React"]', 'https://github.com', 'https://demo.com',
          '6', 'Fitness Tracker', 'Aplikasi pelacak kebugaran dengan fitur workout plans dan progress tracking.', 'mobile', '💪', '["React Native", "Node.js", "MongoDB"]', 'https://github.com', 'https://demo.com'
        ]);
      }
    });
  });
}

// Stats API
app.get('/api/stats', (req, res) => {
  db.all('SELECT * FROM stats ORDER BY id', (err, rows) => {
    if (err) {
      console.error('Error fetching stats:', err);
      res.status(500).json({ error: 'Failed to fetch stats' });
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/stats', (req, res) => {
  const { icon, value, label, label_en } = req.body;
  const id = require('crypto').randomUUID();
  
  db.run(
    'INSERT INTO stats (id, icon, value, label, label_en) VALUES (?, ?, ?, ?, ?)',
    [id, icon, value, label, label_en],
    function(err) {
      if (err) {
        console.error('Error creating stat:', err);
        res.status(500).json({ error: 'Failed to create stat' });
      } else {
        db.get('SELECT * FROM stats WHERE id = ?', [id], (err, row) => {
          res.status(201).json(row);
        });
      }
    }
  );
});

app.put('/api/stats/:id', (req, res) => {
  const { id } = req.params;
  const { icon, value, label, label_en } = req.body;
  
  db.run(
    'UPDATE stats SET icon = ?, value = ?, label = ?, label_en = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [icon, value, label, label_en, id],
    function(err) {
      if (err) {
        console.error('Error updating stat:', err);
        res.status(500).json({ error: 'Failed to update stat' });
      } else {
        db.get('SELECT * FROM stats WHERE id = ?', [id], (err, row) => {
          res.json(row);
        });
      }
    }
  );
});

app.delete('/api/stats/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM stats WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting stat:', err);
      res.status(500).json({ error: 'Failed to delete stat' });
    } else {
      res.json({ message: 'Stat deleted successfully' });
    }
  });
});

// Projects API
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error('Error fetching projects:', err);
      res.status(500).json({ error: 'Failed to fetch projects' });
    } else {
      const projects = rows.map(p => ({
        ...p,
        tags: p.tags ? JSON.parse(p.tags) : []
      }));
      res.json(projects);
    }
  });
});

app.post('/api/projects', (req, res) => {
  const { title, description, category, image, tags, github, live } = req.body;
  const id = require('crypto').randomUUID();
  
  db.run(
    'INSERT INTO projects (id, title, description, category, image, tags, github, live) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, title, description, category, image, JSON.stringify(tags), github, live],
    function(err) {
      if (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ error: 'Failed to create project' });
      } else {
        db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
          const project = {
            ...row,
            tags: row.tags ? JSON.parse(row.tags) : []
          };
          res.status(201).json(project);
        });
      }
    }
  );
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, category, image, tags, github, live } = req.body;
  
  db.run(
    'UPDATE projects SET title = ?, description = ?, category = ?, image = ?, tags = ?, github = ?, live = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [title, description, category, image, JSON.stringify(tags), github, live, id],
    function(err) {
      if (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ error: 'Failed to update project' });
      } else {
        db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
          const project = {
            ...row,
            tags: row.tags ? JSON.parse(row.tags) : []
          };
          res.json(project);
        });
      }
    }
  );
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting project:', err);
      res.status(500).json({ error: 'Failed to delete project' });
    } else {
      res.json({ message: 'Project deleted successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});