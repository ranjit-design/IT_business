# Ranjit Agency - Business Agency Website

## Overview

Ranjit Agency is a modern, premium business agency website built to showcase digital services, portfolio projects, and company information. The application features a sophisticated design with smooth animations, responsive layouts, and a focus on visual impact. Built with React, TypeScript, Express, and PostgreSQL (via Drizzle ORM), it provides both a compelling frontend experience and a functional backend for contact form submissions and content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**React Single-Page Application (SPA)**
- Built with React 18+ and TypeScript for type safety
- Wouter for lightweight client-side routing
- Framer Motion for animations and page transitions
- TanStack Query for server state management and API integration

**Design System**
- Shadcn/ui component library (New York variant)
- Tailwind CSS for utility-first styling with custom design tokens
- Support for light/dark theme switching
- Premium aesthetic inspired by Stripe, Linear, and Vercel
- Glassmorphism effects and gradient overlays throughout

**Animation Strategy**
- Motion-first design with animations on all interactions
- Custom animation variants for fade-ins, slides, hovers, and transitions
- Page transition animations between routes
- Scroll-reveal animations using Framer Motion viewport detection
- Floating elements and glow effects for visual depth

**Component Architecture**
- Layout components (Container, SectionWrapper, Navbar, Footer, Layout)
- Page components (Home, About, Services, Portfolio, Contact, NotFound)
- Reusable section components (Hero, ServicesSection, PortfolioSection, TestimonialsSection, etc.)
- Extensive UI component library from Shadcn/ui (Button, Card, Form, Dialog, etc.)

### Backend Architecture

**Express.js REST API**
- Node.js server with Express framework
- TypeScript throughout for consistency
- RESTful API endpoints for services, projects, and contact submissions
- Built-in request logging with timestamps
- Static file serving for production builds

**API Endpoints**
- `POST /api/contact` - Submit contact form with validation
- `GET /api/services` - Retrieve service offerings
- `GET /api/projects` - Retrieve portfolio projects

**Data Layer**
- In-memory storage implementation (IStorage interface)
- Mock data for services, projects, testimonials, team members, and timeline
- Designed for easy swap to database-backed storage
- Zod schemas for runtime validation

### Database Design

**Schema Definition**
- Drizzle ORM with PostgreSQL dialect
- Schema file: `shared/schema.ts`
- Tables:
  - `users` - User authentication (id, username, password)
  - `contact_submissions` - Contact form entries (id, name, email, phone, subject, message, createdAt)
- Shared TypeScript types between frontend and backend
- Zod integration for schema validation

**Current Implementation**
- Application uses in-memory storage via `server/storage.ts`
- Database schema defined but migrations not yet applied
- Ready for PostgreSQL integration via `DATABASE_URL` environment variable

### Build & Development

**Development Mode**
- Vite dev server with HMR for fast development
- Server runs with `tsx` for TypeScript execution
- Automatic reload on file changes
- Development-only plugins (error overlay, cartographer, dev banner)

**Production Build**
- Client: Vite builds React app to `dist/public`
- Server: esbuild bundles server code to `dist/index.cjs`
- Selective bundling of dependencies to reduce cold start times
- Single Node.js process serves both API and static files

**Path Aliases**
- `@/` maps to `client/src/`
- `@shared/` maps to `shared/`
- `@assets/` maps to `attached_assets/`

## External Dependencies

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework with custom configuration
- **Shadcn/ui** - Component library built on Radix UI primitives
- **Radix UI** - Unstyled, accessible UI primitives (20+ components)
- **Framer Motion** - Animation library for React
- **Lucide React** - Icon library

### State & Data Management
- **TanStack Query** - Server state management and caching
- **React Hook Form** - Form state management with validation
- **Zod** - Schema validation for forms and API data
- **@hookform/resolvers** - Integration between React Hook Form and Zod

### Backend Framework
- **Express** - Web application framework
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **@neondatabase/serverless** - PostgreSQL driver for serverless environments
- **Drizzle Kit** - Migration tool for Drizzle ORM

### Routing & Navigation
- **Wouter** - Minimal routing library for React

### Development Tools
- **Vite** - Build tool and dev server
- **esbuild** - JavaScript bundler for production builds
- **TypeScript** - Type safety across the entire stack
- **tsx** - TypeScript execution for Node.js

### Design References
- Inspired by premium agency websites (Stripe, Linear, Vercel)
- Unsplash for hero images and project thumbnails
- Google Fonts (Inter, Plus Jakarta Sans)

### Potential Integrations
- PostgreSQL database (schema defined, ready for connection)
- Email service for contact form notifications
- CMS for managing projects and services
- Analytics platform for tracking user interactions