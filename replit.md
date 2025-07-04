# VisualFind - Product Discovery Platform

## Overview

VisualFind is a modern full-stack web application that provides visual product discovery capabilities. Built with React, Express.js, and PostgreSQL, it enables users to browse products, leave reviews, and discover items through visual search functionality. The application features a clean, responsive design with shadcn/ui components and TailwindCSS styling.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: TailwindCSS with custom CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Storage**: In-memory storage implementation with interface for database migration

### Project Structure
```
├── client/           # React frontend application
├── server/           # Express.js backend API
├── shared/           # Shared TypeScript schemas and types
├── migrations/       # Database migration files
└── dist/            # Production build output
```

## Key Components

### Database Schema
The application uses four main entities:
- **Products**: Core product information with pricing, descriptions, and ratings
- **Reviews**: User reviews linked to products with ratings and comments
- **Testimonials**: Customer testimonials with avatars and roles
- **Newsletter Subscriptions**: Email subscriptions for marketing

### API Endpoints
- `GET /api/products` - Fetch products with optional filtering
- `GET /api/products/:id` - Get single product details
- `GET /api/products/:id/reviews` - Get product reviews
- `POST /api/products/:id/reviews` - Create new review
- `POST /api/newsletter/subscribe` - Newsletter subscription

### Frontend Pages
- **Home**: Product browsing, visual search, testimonials, newsletter signup
- **Product Detail**: Individual product view with reviews and detailed information
- **404**: Not found page with helpful messaging

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

- July 04, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.