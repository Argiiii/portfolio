# Portfolio Application - Development Notes

## Project Overview
- **Type**: Personal Portfolio Website
- **Tech Stack**: React 19 + Vite, Tailwind CSS 4, Framer Motion, Lucide React, EmailJS
- **Node.js**: ESM modules (`"type": "module"` in package.json)

---

## Commands

### Development
```bash
npm run dev
```
Runs at `http://localhost:5173` (or next available port).

### Build for Production
```bash
npm run build
```
Output in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```
ESLint with flat config. Ignores `dist/` and `server/` directories.
- `no-unused-vars` is disabled (use `_` prefix for unused args)

### Server (Backend API)
```bash
npm run server
```
Express server at `http://localhost:3001`.

### Running a Single Test (if tests configured)
```bash
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

## Common Tasks

### Adding a New Component
1. Create file in `components/` or `components/common/`
2. Export as default
3. Import and add to `App.jsx`
4. Add translations in `translations.js`

### Adding CRUD Functionality
- Create custom hook in `hooks/` directory
- Use `localStorage` for frontend persistence

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

## Project Data
Project data is stored in `src/hooks/useProjects.js` (no database).

| # | Title | GitHub | Live Demo |
|---|-------|--------|-----------|
| 1 | Ada.com | github.com/Argiiii/ada.com | adaacom.vercel.app |
| 2 | Smart Saving App | github.com/Argiiii/smart.app | smart-saving-app.vercel.app |
| 3 | Portfolio Website | github.com | demo.com |
| 4 | Mobile Banking App | github.com | demo.com |
| 5 | E-commerce ShopFlex | github.com/Argiiii/ecommerce | e-commerce-shopflex.vercel.app |
| 6 | Fitness Tracker | github.com | demo.com |

---

## Recent Changes

### Removed Database (SQLite)
- Project data is stored directly in `src/hooks/useProjects.js`
- No Express server needed for frontend-only development

### Project Card Styling
- Compact cards with smaller height
- GitHub/Live Demo buttons in single row (flex-1)
- GitHub: slate-800 background, gray text
- Live Demo: gradient blue-to-purple background, white text
- Tags: smaller and compact
- Description uses line-clamp-2

### Project Buttons (Projects.jsx)
- Button teks: "Link GitHub" dan "Live Demo"
- Ukuran lebih kecil dan profesional (py-2, text-xs, icon 14px)
- Hover effect halus dengan scale
- Tidak ada label "Teknologi:" pada tags
