# Ranjit Agency Website

A modern, fully responsive agency website built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ Fully mobile responsive design
- ✅ Modern UI with Tailwind CSS
- ✅ Framer Motion animations
- ✅ Contact form with validation
- ✅ Portfolio showcase
- ✅ Services section
- ✅ Team section
- ✅ Testimonials carousel
- ✅ Timeline section

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **Validation:** Zod, React Hook Form
- **State Management:** React Query
- **Routing:** Wouter
- **Deployment:** Render-ready

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
NODE_ENV=production
PORT=10000
```

## Deployment on Render

1. Push your code to GitHub
2. Connect your repository to Render
3. Render will automatically detect the `render.yaml` configuration
4. Set environment variables in Render dashboard
5. Deploy!

### Render Configuration

The project includes `render.yaml` for automatic deployment:
- Builds and serves the full-stack application
- Health check at `/api/health`
- Auto-deploys on push to main branch

## Notes

- Current storage is in-memory (resets on restart)
- For production, consider adding a database (Render Postgres)
- All components are fully mobile responsive
- Contact form submissions are stored in memory

## License

MIT
