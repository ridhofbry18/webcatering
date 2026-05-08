# Restaurant Kurnia Catering Website

Website profesional untuk Restaurant Kurnia, menyediakan informasi paket catering terlengkap dengan interface yang modern dan responsif.

## Tech Stack

- **React 18** - UI Library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16"
  }
}
```

## Setup & Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Deployment ke Vercel

1. Push repository ke GitHub
2. Connect repository di [Vercel Dashboard](https://vercel.com)
3. Vercel akan otomatis detect Vite setup dan deploy
4. Atau gunakan Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
webcatering/
├── src/
│   ├── App.jsx           # Main component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML entry
├── package.json          # Dependencies
├── vercel.json           # Vercel config
├── vite.config.js        # Vite config
├── tailwind.config.js    # Tailwind config
└── postcss.config.js     # PostCSS config
```

## Features

✓ Responsive design (mobile, tablet, desktop)
✓ Tab-based menu filtering
✓ Smooth carousel slider
✓ Sticky navigation
✓ Contact integration (WhatsApp)
✓ Halal certification badge
✓ Optimized images & fonts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Restaurant Kurnia. All rights reserved.
