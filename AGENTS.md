# Portfolio Application - Development Notes

## Project Overview
- **Type**: Personal Portfolio Website
- **Tech Stack**: React 19 + Vite, Tailwind CSS 4, Framer Motion, Lucide React, EmailJS
- **Location**: `C:\Users\User\portfolio`
- **Node.js**: ESM modules (`"type": "module"` in package.json)

---

## Commands

### Development
```bash
cd portfolio
npm run dev
```
Runs at `http://localhost:5173` (or next available port if busy).

### Build for Production
```bash
cd portfolio
npm run build
```
Output in `portfolio/dist` folder.

### Preview Production Build
```bash
cd portfolio
npm run preview
```

### Linting
```bash
cd portfolio
npm run lint
```
ESLint with flat config using `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.

### Testing
No test framework configured. If adding tests, use Vitest with React Testing Library.

```bash
# Run single test file
npx vitest run src/components/Navbar.test.jsx

# Watch mode
npx vitest
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

### Imports
Order: React → Third-party → Local components → Local hooks → Local utilities.

```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import Navbar from './components/Navbar';
import { useLanguage } from '../i18n/LanguageContext';
```

### JSX Formatting
- Double quotes for JSX attributes, single quotes for JavaScript
- Multi-line JSX: one prop per line with proper indentation
- Self-closing tags: `<Component />` (with space)

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="flex items-center gap-4"
>
```

### State Management
- Use `useState` for local component state
- Use custom hooks (`useProjects`, `useStats`) for shared/persistent state
- Use `localStorage` for persistence (key format: `portfolio_*`)

```jsx
const [projects, setProjects] = useState(() => {
  const stored = localStorage.getItem('portfolio_projects');
  return stored ? JSON.parse(stored) : defaultValue;
});
```

### Error Handling
- Wrap `JSON.parse` in try-catch for localStorage
- Provide fallback values when data might be undefined

```jsx
try {
  return JSON.parse(stored);
} catch {
  return defaultProjects;
}
```

### Tailwind CSS
- Use `slate-*` for grays (slate-950 for dark backgrounds)
- Use `glass` class for glassmorphism effect
- Use `gradient-text` and `gradient-bg` for accent gradients
- Responsive: `md:`, `lg:` prefixes

### ESLint Rules
- `no-unused-vars`: Error for unused vars except those starting with uppercase
- React Hooks: Enforce rules of hooks
- React Refresh: Ensure components are refreshable

### Accessibility
- Use semantic HTML elements
- Include alt text for images
- Ensure keyboard navigation works
- Use proper contrast ratios

---

## Common Tasks

### Adding a New Component
1. Create file in appropriate folder (`components/` or `components/common/`)
2. Export as default
3. Import and add to `App.jsx`
4. Add translations if needed in `translations.js`

### Adding CRUD Functionality
- Create custom hook in `hooks/` directory
- Use `localStorage` for persistence
- Follow patterns in `useProjects.js`

### Adding Translations
1. Add keys to both `en` and `id` objects in `translations.js`
2. Use `useLanguage()` hook to access `t()` function
3. Keys follow pattern: `section.element` (e.g., `nav.home`, `projects.title`)

---

## Personal Information
- **Name**: Argi Chanaffi, S.Kom.
- **Email**: argich034@gmail.com
- **Phone**: +62 851 5772 8073
- **Location**: Jakarta, Indonesia

## Technologies Used
- React.js, Node.js, TypeScript, JavaScript
- Tailwind CSS, MongoDB, PostgreSQL
- Git, Docker, VS Code, Linux
