# Aditya Hari Saputra - Personal Portfolio Website

## Overview

A modern, responsive personal portfolio website for Aditya Hari Saputra, showcasing expertise in Software Development and IoT (Internet of Things). Built with vanilla HTML, CSS, and JavaScript, featuring smooth animations, dark mode toggle, and mobile-responsive design.

## System Architecture

### Frontend Architecture
- **Framework**: Vanilla HTML, CSS, and JavaScript
- **Styling**: Custom CSS with CSS variables for theming and dark mode
- **Typography**: Inter font family from Google Fonts
- **Icons**: Font Awesome 6.0 icon library
- **Animations**: CSS keyframe animations and Intersection Observer API
- **Responsive Design**: CSS Grid and Flexbox with mobile-first approach

### Backend Architecture
- **Runtime**: Node.js with Express.js framework (simple static file server)
- **Language**: JavaScript (ES6+)
- **Serving**: Static file serving for HTML, CSS, and JavaScript assets

### Project Structure
```
├── client/           # Frontend portfolio website
│   ├── index.html   # Main HTML structure
│   └── src/
│       ├── index.css # Styles with dark mode support
│       └── main.js   # Interactive functionality
├── server/          # Simple Express server
│   └── simple.js    # Static file server
```

## Key Components

### Website Sections
The portfolio website includes five main sections:
- **Hero Section**: Introduction with name, title, bio, and call-to-action buttons
- **Skills Section**: Technical expertise displayed in interactive cards
- **Portfolio Section**: Featured projects with descriptions and technology tags
- **Contact Section**: Contact information, social links, and functional contact form
- **Footer**: Simple branding and copyright information

### Featured Projects
1. **Smart Clothes Dryer Monitoring System**: IoT-based automation using LDR and rain sensors with Blynk integration
2. **Telemedicine Slide Scanner Viewer**: Medical image viewer using OpenSlide and OpenSeadragon
3. **Smart Security System**: ESP32-CAM based home security with vibration and door sensors

### Interactive Features
- **Dark Mode Toggle**: Persistent theme switching with localStorage
- **Smooth Scrolling**: Navigation between sections with smooth animations
- **Contact Form**: Functional form with validation and success notifications
- **Responsive Design**: Mobile-friendly layout with hamburger menu

## Data Flow

1. **Client Requests**: React components use TanStack Query hooks to fetch data
2. **API Layer**: Express.js routes handle HTTP requests and business logic
3. **Storage Layer**: MemStorage class provides in-memory data persistence
4. **Database Migration**: Drizzle ORM configured for PostgreSQL migration
5. **Response Handling**: Structured JSON responses with proper error handling

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **Backend**: Express.js, Node.js with TypeScript support
- **Database**: Drizzle ORM, Neon serverless PostgreSQL
- **UI Library**: Radix UI components, shadcn/ui, TailwindCSS
- **State Management**: TanStack Query for server state
- **Validation**: Zod for schema validation
- **Date Handling**: date-fns for date manipulation

### Development Tools
- **Build Tools**: Vite, esbuild for production builds
- **Development**: tsx for TypeScript execution, Replit integration
- **Code Quality**: TypeScript strict mode, ESLint configuration

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` starts both frontend and backend
- **Hot Reloading**: Vite HMR for frontend, tsx watch mode for backend
- **Database**: Drizzle migrations with `npm run db:push`

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Static Assets**: Served by Express in production mode
- **Environment**: NODE_ENV-based configuration switching

### Database Configuration
- **Development**: Uses DATABASE_URL environment variable
- **Schema**: Centralized in `shared/schema.ts` with Drizzle definitions
- **Migrations**: Automatic migration generation and deployment

## Changelog

- July 04, 2025: Portfolio website completed for Aditya Hari Saputra
  - Built responsive HTML/CSS/JS portfolio with dark mode
  - Added hero section, skills, portfolio, contact form
  - Implemented smooth animations and mobile navigation
  - Featured 3 IoT and software development projects

## User Preferences

Preferred communication style: Simple, everyday language.