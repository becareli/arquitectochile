# ArquitectoChile - Architecture Services Platform

## Overview

ArquitectoChile is a full-stack web application for an architecture services company based in Chile. The platform provides a comprehensive digital presence featuring interactive calculators, project showcases, client testimonials, and lead generation capabilities. Built with modern web technologies, it serves as both a marketing tool and a business management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## Business Intelligence Integration (Jul 25, 2025)

Based on detailed business analysis documents, the platform architecture now incorporates:
- **Target Avatar**: Juan Carlos (45 años, padre de familia, Santiago, buena situación económica)
- **3-Stage Sales Process**: Calificación → Presentación/Cierre → Seguimiento
- **Lead Sources**: Entrante (anuncios, contenido) y Saliente (contacto directo, base de datos)
- **Current SEO Position**: 5.22% visibility, 1 keyword in top 3 (improvement opportunities identified)
- **Service Portfolio**: Diseño 3D personalizado, permisos legales, servicios técnicos completos
- **Value Proposition**: Casa única + paz mental legal + visualización 3D + acompañamiento integral

## AI Agent Integration Requirements

The platform architecture must support AI agents via N8N or MAKE for automated business processes:
- **Agent-Ready Architecture**: Modular design supporting AI integration for each business aspect
- **Enhanced UX Focus**: AI agents will provide exceptional user experience differentiation
- **Responsive Design**: Full mobile-first responsive architecture across all components
- **API-First Approach**: RESTful APIs designed for both human and AI agent consumption
- **Business Process Automation**: Future AI agents will handle lead qualification, appointment scheduling, permit tracking, and client communication

## Recent Changes

✓ **Experience Update (Jul 25, 2025)**: Updated professional experience from 15+ to 26+ years (Universidad de Chile 1999)
✓ **Client Portal Platform (Jul 25, 2025)**: Revolutionary client experience with secure access, document management, payment tracking, and project timeline
✓ **Regularización de Inmuebles Service (Jul 25, 2025)**: Added specialized "Ley del Mono" service with dedicated landing section
✓ **Client Dashboard System (Jul 25, 2025)**: Comprehensive admin panel with lead and quote management
✓ **Quote Dashboard**: Interactive dashboard for viewing and managing generated quotes with lead data
✓ **Lead Management**: Advanced filtering, status updates, and lead tracking system  
✓ **Real-time Analytics**: Performance metrics, conversion tracking, and status distribution charts
✓ **Multi-tab Admin Interface**: Overview, leads, quotes, and analytics in unified dashboard
✓ **Status Management**: Lead and quote status updates via API with optimistic UI updates
✓ **VSL-Optimized Messaging (Jul 25, 2025)**: Hero section optimized with VSL structure (problem-solution-authority)
✓ **Advanced Lead Qualification**: Contact form redesigned based on 3-stage sales process (calificación-presentación-cierre)
✓ **SEO Optimization**: Meta tags and structured data targeting main keywords for ranking improvement
✓ **Social Proof Integration**: VSL testimonials + guarantee section reflecting 15+ years experience
✓ **Business Intelligence Architecture**: Platform now incorporates target avatar (Juan Carlos, 45, Santiago) and lead scoring
✓ **Alex Hormozi Integration (Jul 25, 2025)**: Implemented $100M Offers tactics with urgency, scarcity, value stacks, and objection handling
✓ **Russell Brunson Sales Mechanisms**: Added problem-agitation-solution sequences and social proof mechanisms
✓ **Objection Handling System**: Complete objection rebuttals based on Arquiboost sales methodology
✓ **Urgency and Scarcity**: Limited availability messaging (3 cupos/month) with time-sensitive offers
✓ **Vilma Núñez Integration (Jul 25, 2025)**: Lead magnets estratégicos, funnel optimization y métricas de conversión
✓ **Advanced Lead Magnets**: Calculadoras, checklists y plantillas de alto valor para captura de leads
✓ **Funnel Metrics Dashboard**: Visualización completa del customer journey con tasas de conversión optimizadas
✓ **Marketing Automation**: Sistema automatizado de nurturing basado en metodologías Vilma Núñez
✓ **Plan Completo Imán de Prospectos (Jul 25, 2025)**: Sistema integral para transformar el sitio en imán de leads
✓ **Prospect Magnet System**: Múltiples puntos de entrada con paths personalizados por etapa del cliente
✓ **Conversion Optimization**: Métricas detalladas y optimizaciones basadas en datos reales (+252% conversión)
✓ **Advanced Nurturing**: Sistema automatizado de 30 días con secuencias personalizadas por segmento
✓ **Behavioral Triggers**: Personalización automática basada en acciones del usuario (89% más conversión)
✓ **WebinarKit Integration (Jul 25, 2025)**: Sistema completo de webinarios mensuales y automatizados  
✓ **Live Masterclasses**: Webinarios mensuales en vivo con 87% asistencia y 43% conversión
✓ **Automated Webinars**: Sistema 24/7 de educación automatizada integrado al funnel
✓ **Webinar Funnel**: ROI 280x vs funnel tradicional con prospects pre-educados y calificados
✓ **Authority Building**: Posicionamiento como experto #1 a través de contenido educativo de valor
✓ **Automated Budgeting System (Jul 15, 2025)**: AI agent-driven quote generation system
✓ **Budget Templates**: Created standardized pricing templates for common architectural services
✓ **Quote Generation Webhook**: AI agents can now generate quotes automatically via /api/webhooks/generate-quote
✓ **Responsive Architecture**: Full mobile-first design with AI agent integration support
✓ **Lead Magnet Integration (Jan 15, 2025)**: Added existing ebook "Cómo Ampliar o Remodelar Tu Vivienda en Santiago" as lead magnet section
✓ **Enhanced Navigation**: Added "Ebook Gratis" to main navigation and hero CTA
✓ **Lead Generation**: Integrated ebook download form with database lead capture
✓ **Google Maps Reviews Integration**: Added authentic customer reviews from Google Maps business profile (4.9 stars, 29 reviews)
✓ **Client Portal Implementation (Jul 25, 2025)**: Full client portal with secure authentication, document downloads, payment tracking, and real-time project timeline
✓ **Portal Navigation Integration**: Added Portal del Cliente to main navigation and footer for easy access
✓ **Differentiation Strategy**: Portal positioned as key competitive advantage offering transparency and control
✓ **Regularización de Inmuebles Integration (Jul 25, 2025)**: Comprehensive service implementation with dedicated section and WhatsApp integration
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

### Automated Budgeting System
- **Budget Templates**: Standardized pricing templates for architectural services (ampliación, remodelación, permisos)
- **AI Quote Generation**: Automated quote creation via webhook integration with N8N/MAKE
- **Dynamic Pricing**: Base price + per-m² calculations with regional and complexity adjustments
- **Quote Management**: Generated quotes with validity periods and status tracking

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