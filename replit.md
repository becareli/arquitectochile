# ArquitectoChile - Architecture Services Platform

## Overview

ArquitectoChile is a full-stack web application for an architecture services company based in Chile. The platform provides a comprehensive digital presence featuring interactive calculators, project showcases, client testimonials, and lead generation capabilities. Built with modern web technologies, it serves as both a marketing tool and a business management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## AI Agent Integration Requirements

The platform architecture must support AI agents via N8N or MAKE for automated business processes:
- **Agent-Ready Architecture**: Modular design supporting AI integration for each business aspect
- **Enhanced UX Focus**: AI agents will provide exceptional user experience differentiation
- **Responsive Design**: Full mobile-first responsive architecture across all components
- **API-First Approach**: RESTful APIs designed for both human and AI agent consumption
- **Business Process Automation**: Future AI agents will handle lead qualification, appointment scheduling, permit tracking, and client communication

## Recent Changes

✓ **Lead Magnet Integration (Jan 15, 2025)**: Added existing ebook "Cómo Ampliar o Remodelar Tu Vivienda en Santiago" as lead magnet section
✓ **Enhanced Navigation**: Added "Ebook Gratis" to main navigation and hero CTA
✓ **Lead Generation**: Integrated ebook download form with database lead capture
✓ **Google Maps Reviews Integration**: Added authentic customer reviews from Google Maps business profile (4.9 stars, 29 reviews)
✓ **Additional Services**: Added Estudio de Cabidas, Permiso de Edificación, and Recepción Final services

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API with JSON responses optimized for AI agent consumption
- **Session Management**: Express sessions with PostgreSQL storage
- **AI Agent Integration**: API endpoints designed for N8N/MAKE webhook consumption
- **Webhook Support**: Real-time event handling for AI agent triggers

### Development Environment
- **Package Manager**: npm
- **Code Style**: TypeScript strict mode with path aliases
- **Hot Reload**: Vite HMR for frontend, tsx for backend development
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation

## Key Components

### Interactive Calculators
- **Construction Calculator**: Estimates project costs based on type, size, materials, and region
- **Energy Calculator**: Calculates potential energy savings with efficiency improvements
- Both calculators capture leads by requiring email addresses and store results in the database

### Content Management
- **Projects Portfolio**: Showcases completed architecture projects with images and details
- **Client Testimonials**: Displays customer reviews with ratings and optional video testimonials
- **Blog System**: Content marketing platform for architecture tips and company updates

### Lead Generation System
- **Contact Forms**: Multi-step forms for different service inquiries
- **Calculator Integration**: Captures leads through interactive tools
- **Lead Storage**: Comprehensive lead tracking with source attribution and status management

### Service Presentation
- **Service Cards**: Detailed presentation of architecture services with pricing
- **Featured Service**: Highlighted "Arquitecto a Domicilio" service at $40,000
- **WhatsApp Integration**: Direct communication channel for immediate inquiries

## Data Flow

### User Interactions
1. Users navigate through single-page application with smooth scrolling
2. Interactive calculators collect user inputs and display instant results
3. Form submissions trigger API calls to store leads and calculator results
4. Real-time validation provides immediate feedback on form inputs

### Data Processing
1. Frontend forms validate data using Zod schemas
2. API endpoints process requests with proper error handling
3. Drizzle ORM manages database operations with type safety
4. Query client caches responses for improved performance

### Content Delivery
1. Static content served through Vite's development server
2. Dynamic content fetched via TanStack Query with fallback data
3. Images optimized through Unsplash integration for placeholder content
4. Responsive design adapts to mobile and desktop viewports

## External Dependencies

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL for production data storage
- **WebSocket Support**: Real-time database connections using ws library

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom color palette
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Consistent icon library for UI elements

### Development Tools
- **Replit Integration**: Development environment with live preview capabilities
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Third-Party Services
- **Unsplash**: Stock photography for project showcases and blog content
- **WhatsApp API**: Direct messaging integration for customer communication

## Deployment Strategy

### Production Build
- Frontend assets compiled and optimized through Vite
- Backend bundled as ESM modules using esbuild
- Static files served from dist/public directory
- Environment variables managed through .env files

### Development Workflow
- Hot module replacement for rapid frontend development
- Automatic server restart with tsx for backend changes
- Database migrations managed through Drizzle Kit
- Path aliases configured for clean import statements

### Performance Optimization
- Query caching with TanStack Query for reduced API calls
- Infinite stale time for static content like projects and testimonials
- Optimized bundle sizes through modern JavaScript features
- Progressive enhancement with fallback content

The application follows a monorepo structure with shared types and schemas between frontend and backend, ensuring type safety across the entire stack while maintaining clear separation of concerns between client and server code.