# Portfolio Application - Development Notes

## Project Overview
- **Type**: Personal Portfolio Website
- **Tech Stack**: React 19 + Vite, Tailwind CSS 4, Framer Motion, Lucide React, EmailJS, Express backend
- **Node.js**: ESM modules (`"type": "module"` in package.json)

---

## Commands

### Development
```bash
cd portfolio && npm run dev
```
Runs at `http://localhost:5173` (or next available port).

### Build for Production
```bash
cd portfolio && npm run build
```
Output in `portfolio/dist` folder.

### Preview Production Build
```bash
cd portfolio && npm run preview
```

### Linting
```bash
cd portfolio && npm run lint
```
ESLint with flat config. Ignores `dist/` and `server/` directories. `no-unused-vars` is disabled (use `_` prefix for unused args).

### Server (Backend API)
```bash
cd portfolio && npm run server
```
Express server at `http://localhost:3001`.

### Testing
No test framework configured. To add tests:
```bash
npm install -D vitest @testing-library/react jsdom
# Add to package.json: "test": "vitest run"
npx vitest run src/components/Navbar.test.jsx
```

---

## Code Style Guidelines

### General Principles
- Use functional components with hooks exclusively
- Prefer `const` over `let`; avoid `var`
- Use arrow functions for callbacks
- Destructure props and values when possible

### Naming Conventions
- **Components**: PascalCase (`Navbar.jsx`, `ProjectForm.jsx`)
- **Hooks**: camelCase with `use` prefix (`useProjects.js`, `useLanguage`)
- **Files**: kebab-case for non-component files (`translations.js`)
- **Constants**: SCREAMING_SNAKE_CASE (`STORAGE_KEY`)
- **CSS Classes**: Tailwind utilities (kebab-case)

### Imports Order
React → Third-party → Local components → Local hooks → Local utilities.
```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Navbar from './components/Navbar';
import { useLanguage } from '../i18n/LanguageContext';
```

### JSX Formatting
- Double quotes for JSX attributes, single quotes for JavaScript
- Multi-line JSX: one prop per line with proper indentation
- Self-closing tags: `<Component />` (with space)

### Types
Use PropTypes for component props:
```jsx
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};
```

### Error Handling
- Wrap `JSON.parse` in try-catch for localStorage
- Provide fallback values when data might be undefined

### State Management
- Use `useState` for local component state
- Use custom hooks (`useProjects`, `useStats`) for shared/persistent state
- Use `localStorage` for persistence (key format: `portfolio_*`)

### Tailwind CSS
- Use `slate-*` for grays (slate-950 for dark backgrounds)
- Use `glass` class for glassmorphism effect
- Responsive: `md:`, `lg:` prefixes

---

## Project Structure

```
portfolio/
├── src/
│   ├── components/ (Navbar, Hero, About, Skills, Projects, Contact, Footer)
│   ├── components/common/ (Modal, ProjectForm, StatForm)
│   ├── hooks/ (useProjects.js, useStats.js)
│   ├── i18n/ (LanguageContext.jsx, translations.js)
│   ├── api/ (index.js)
│   ├── App.jsx
│   └── main.jsx
├── server/index.cjs (Express API with SQLite)
├── vite.config.js
└── package.json
```

---

## API Endpoints (Express + SQLite)

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- Similar endpoints for `/api/stats`

---

## Common Tasks

### Adding a New Component
1. Create file in `components/` or `components/common/`
2. Export as default
3. Import and add to `App.jsx`
4. Add translations in `translations.js`

### Adding CRUD Functionality
- Create custom hook in `hooks/` directory
- Use `localStorage` for frontend persistence
- Use Express API routes in `server/index.cjs` for backend

---

## Section Spacing Guidelines
- Section padding: `py-16` (64px)
- Title margins: `mb-6` (24px)
- Grid gaps: `gap-2`, `gap-3`, `gap-6`
- Content padding: `p-6 lg:p-8`

---

## EmailJS Configuration
- Service ID: `service_7pl1bih`
- Template ID: `template_k7h81gi`
- Public Key: `GacV_1zdXIPDZCRxq`
- Recipient: `argich034@gmail.com`

---

## Project Data (SQLite + useProjects.js)

Default projects yang tersimpan di database SQLite dan fallback di `src/hooks/useProjects.js`:

| No | Title | Description | GitHub | Live Demo |
|----|-------|-------------|--------|-----------|
| 1 | Ada.com | Aplikasi hotel dan traveling komprehensif dengan fitur pemesanan kamar, reservasi pesawat, rencana perjalanan, dan pembayaran aman. | https://github.com/Argiiii/ada.com | https://adaacom.vercel.app/ |
| 2 | Smart Saving App | Aplikasi manajemen keuangan pribadi berbasis digital yang dirancang untuk membantu pengguna mengelola, merencanakan, dan meningkatkan kebiasan secara cerdas dengan dukungan teknologi AI. | https://github.com/Argiiii/smart.app | https://smart-saving-app.vercel.app/ |
| 3 | Portfolio Website | Website portofolio responsif dengan animasi modern dan design yang elegan. | https://github.com | https://argichanaffi.vercel.app |
| 4 | Mobile Banking App | Aplikasi banking mobile dengan fitur transfer, tagihan, dan investasi. | https://github.com | https://demo.com |
| 5 | E-commerce ShopFlex | Platform e-commerce modern yang dirancang untuk memberikan pengalaman belanja online yang fleksibel, cerdas, dan personal. | https://github.com/Argiiii/ecommerce | https://e-commerce-shopflex.vercel.app |
| 6 | Fitness Tracker | Aplikasi pelacak kebugaran dengan fitur workout plans dan progress tracking. | https://github.com | https://demo.com |

### Update Project di Database
```bash
# Via Node.js script
node -e "const Database = require('better-sqlite3'); const db = new Database('./server/database.sqlite'); db.prepare('UPDATE projects SET title = ?, description = ?, github = ?, live = ? WHERE title = ?').run('New Title', 'Description', 'https://github.com/...', 'https://demo.com/', 'Old Title'); console.log('Updated'); db.close();"
```

### Delete Project di Database
```bash
node -e "const Database = require('better-sqlite3'); const db = new Database('./server/database.sqlite'); db.prepare('DELETE FROM projects WHERE id = ?').run('1'); console.log('Deleted'); db.close();"
```

### Verifikasi Data Database
```bash
node -e "const Database = require('better-sqlite3'); const db = new Database('./server/database.sqlite'); console.log(JSON.stringify(db.prepare('SELECT * FROM projects').all(), null, 2)); db.close();"
```