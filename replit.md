# ArquitectoChile - Architecture Services Platform

## Overview
ArquitectoChile is a full-stack web application for an architecture services company in Chile, serving as a comprehensive digital presence, marketing tool, and business management system. It features interactive calculators, project showcases, client testimonials, and lead generation capabilities. The platform's vision is to become a lead generation machine, leveraging advanced lead magnets and conversion optimization techniques based on methodologies from Alex Hormozi, Russell Brunson, and Vilma Núñez. It offers unique home design, legal peace of mind, 3D visualization, and comprehensive support, targeting individuals like "Juan Carlos" (45-year-old family man in Santiago with good economic standing). The platform supports a 3-stage sales process (Qualification → Presentation/Closing → Follow-up) and integrates AI agents for automated business processes, enhancing user experience and scalability. It includes full Google My Business integration for enhanced local SEO and credibility.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
The platform features a full mobile-first responsive design with an **architectural elegant aesthetic** (October 2025 redesign). Branding is consistent with a custom ArquitectoChile logo. 

**Design System (Architectural Elegant Style)**:
- **Color Palette**: Steel blue primary (hsl(210,15%,30%)), terracotta accent (hsl(14,70%,50%)), architectural grays for depth
- **Typography**: Playfair Display (serif) for headings providing elegance, Inter (sans-serif) for body text ensuring readability
- **Spacing Philosophy**: Generous breathing room throughout (py-24, gap-10, increased margins) for sophisticated architectural feel
- **Visual Details**: Refined shadows (shadow-xl), smooth transitions (transition-all duration-300), premium hover states
- **Components Updated**: Navigation, hero sections, service cards, testimonials, footer all reflect the cohesive architectural design system

The navigation is optimized with a prominent logo header, centered links, and grouped action buttons. The hero section is optimized with a VSL (Video Sales Letter) structure. Design leverages Tailwind CSS for styling, Radix UI primitives, and shadcn/ui for components, ensuring accessibility and a modern aesthetic.

### Technical Implementations
- **Frontend**: React 18 with TypeScript, Vite for build, TanStack Query for server state, Wouter for routing, React Hook Form with Zod for forms.
- **Backend**: Node.js with Express.js, TypeScript with ESM modules, PostgreSQL with Neon for database, Drizzle ORM for type-safe operations.
- **API Design**: RESTful API with JSON responses, optimized for both human and AI agent consumption.
- **Security Stack** (Production-Ready):
  - **CSRF Protection**: Double-submit cookie pattern with HMAC validation using server-side secret, timing-safe comparison (crypto.timingSafeEqual) to prevent timing attacks
  - **Security Headers**: Helmet middleware with Content-Security-Policy, Strict-Transport-Security (HSTS), X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff)
  - **Rate Limiting**: Multi-tier strategy with express-rate-limit (general API: 100 req/15min, forms: 10 req/hour, auth: 5 req/15min)
  - **Webhook Security**: HMAC verification with SHA-256, bearer token authentication, replay attack protection with timestamp validation
- **AI Agent Integration**: Modular design supporting AI integration, with API endpoints designed for N8N/MAKE webhook consumption, enabling business process automation for lead qualification, scheduling, permit tracking, and client communication.
- **Lead Generation System**: Comprehensive lead magnet system based on the $100M Leads methodology, integrating advanced lead magnets (AI Calculator, Permits Checklist, MasterClass, Templates), multi-step contact forms, calculator integration for lead capture, and robust lead tracking with source attribution.
- **Conversion Optimization**: Integration of Triple Elite Methodology (Alex Hormozi, Russell Brunson, Vilma Núñez) for conversion optimization, including real-time behavioral triggers, A/B testing, exit-intent technology, automated webinar systems (WebinarKit integration), social proof integration, urgency and scarcity messaging, and advanced nurturing sequences.
- **Automated Budgeting System**: AI agent-driven quote generation via webhooks, utilizing standardized pricing templates and dynamic pricing based on area and complexity.
- **Client Management**: Revolutionary client portal with secure access, document management, payment tracking, and project timelines. Comprehensive admin panel for lead and quote management with real-time analytics.
- **Collaborator Platform**: B2B platform for collaborators with project bidding, payment tracking, and integrated communication.

### System Design Choices
The application follows a monorepo structure with shared types and schemas between frontend and backend, ensuring type safety and clear separation of concerns. It adopts an API-first approach. Performance optimization is achieved through query caching, optimized bundle sizes, and progressive enhancement.

## External Dependencies

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL for production data storage.

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework.
- **Radix UI**: Accessible component primitives.
- **Lucide React**: Icon library.

### Third-Party Services
- **Unsplash**: Stock photography for content.
- **WhatsApp API**: Direct messaging integration for customer communication.
- **TidyCal**: Integration for automated booking and scheduling.
- **WebinarKit**: Integration for automated webinar system.
- **N8N/MAKE**: For AI agent integration and business process automation via webhooks.