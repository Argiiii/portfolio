-- MySQL Database Schema for Portfolio
-- Run this script in MySQL to create the database and tables

CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Stats table
CREATE TABLE IF NOT EXISTS stats (
    id VARCHAR(36) PRIMARY KEY,
    icon VARCHAR(10) NOT NULL DEFAULT '💼',
    value VARCHAR(50) NOT NULL,
    label VARCHAR(100) NOT NULL,
    label_en VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects table
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
);

-- Insert default stats if empty
INSERT INTO stats (id, icon, value, label, label_en) VALUES 
('1', '💼', '5+', 'Tahun Pengalaman', 'Years of Experience'),
('2', '🎯', '50+', 'Proyek Selesai', 'Projects Completed'),
('3', '🏆', '10+', 'Sertifikasi', 'Certifications'),
('4', '⭐', '100%', 'Kepuasan Klien', 'Client Satisfaction')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- Insert default projects if empty
INSERT INTO projects (id, title, description, category, image, tags, github, live) VALUES
('1', 'E-Commerce Platform', 'Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk.', 'web', '🛒', '["React.js", "Node.js", "MongoDB", "Stripe"]', 'https://github.com', 'https://demo.com'),
('2', 'Task Management App', 'Aplikasi manajemen tugas dengan fitur drag-and-drop, kolaborasi tim, dan notifikasi real-time.', 'web', '📋', '["Next.js", "TypeScript", "PostgreSQL", "Socket.io"]', 'https://github.com', 'https://demo.com'),
('3', 'Portfolio Website', 'Website portofolio responsif dengan animasi modern dan design yang elegan.', 'web', '🎨', '["React.js", "Tailwind CSS", "Framer Motion"]', 'https://github.com', 'https://demo.com'),
('4', 'Mobile Banking App', 'Aplikasi banking mobile dengan fitur transfer, tagihan, dan investasi.', 'mobile', '🏦', '["React Native", "Firebase", "Redux"]', 'https://github.com', 'https://demo.com'),
('5', 'AI Chat Application', 'Aplikasi chat dengan integrasi AI untuk assistance dan automated responses.', 'ai', '🤖', '["Python", "OpenAI API", "FastAPI", "React"]', 'https://github.com', 'https://demo.com'),
('6', 'Fitness Tracker', 'Aplikasi pelacak kebugaran dengan fitur workout plans dan progress tracking.', 'mobile', '💪', '["React Native", "Node.js", "MongoDB"]', 'https://github.com', 'https://demo.com')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;