# ArquitectoChile - Architecture Services Platform

## Overview
ArquitectoChile is a full-stack web application for an architecture services company in Chile, serving as a comprehensive digital presence, marketing tool, and business management system. It features interactive calculators, project showcases, client testimonials, and lead generation capabilities. The platform's vision is to become a lead generation machine, leveraging advanced lead magnets and conversion optimization techniques based on methodologies from Alex Hormozi, Russell Brunson, and Vilma Núñez. It offers unique home design, legal peace of mind, 3D visualization, and comprehensive support, targeting individuals like "Juan Carlos" (45-year-old family man in Santiago with good economic standing). The platform supports a 3-stage sales process (Qualification → Presentation/Closing → Follow-up) and integrates AI agents for automated business processes, enhancing user experience and scalability. It includes full Google My Business integration for enhanced local SEO and credibility.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
The platform features a mobile-first responsive design with a **Technical Minimalism** aesthetic (February 2026 redesign). Branding uses text-based "ArquitectoChile.com" wordmark.

**Design System (Technical Minimalism - Feb 2026)**:
- **Color Palette**: Navy #1e293b (headings/text), white (backgrounds), #f97316 orange (CTAs only), gray-200 borders
- **Typography**: Inter only (sans-serif) for all headings and body text. No serif fonts.
- **Backgrounds**: Blueprint grid texture (40px grid, 3-5% opacity lines) via `.bg-blueprint` and `.bg-blueprint-dark` CSS classes
- **Spacing**: Generous section padding (py-16 sm:py-20 lg:py-24), max-w-6xl containers
- **Cards**: Thin 1px borders, generous padding (p-8), line icons (strokeWidth 1.5), hover:shadow-lg transitions
- **Buttons**: All rounded-md, CTA uses bg-[#f97316] with shadow-lg shadow-orange-500/20
- **Section Headers**: Uppercase tracking-[0.2em] orange label + bold navy heading + gray-500 subtitle
- **Components**: Navigation (clean minimal), Hero (dark blueprint bg, no stock photos), Services (3 minimalist cards), Footer (4-column clean layout)
- **Removed**: Floating chatbot, Playfair Display serif font, "Sobre el Arquitecto" dropdown, admin bar in nav

The navigation features a clean single-row layout with text wordmark, centered links, and a prominent orange CTA button. Design leverages Tailwind CSS, Radix UI, and shadcn/ui.

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
- **TidyCal**: Integration for automated booking and scheduling.
- **Nodemailer**: Email notifications for new leads (SMTP).

### Lead Capture (`/api/lead`)
- **Validation**: nombre + email required (Zod schema)
- **Anti-spam**: Honeypot field (hidden input, rejects if filled)
- **Classification**: VIP (empresas, ITO, revisoría, industrial) vs NUEVO (regular)
- **Email**: Sends notification to LEADS_NOTIFY_EMAIL via SMTP; if SMTP not configured, responds `ok: true, emailSent: false` (no crash)
- **DB**: Saves to PostgreSQL leads table (graceful fallback if DB error)
- **CRM future**: Odoo integration planned via `ODOO_WEBHOOK_URL` or JSON-RPC to `/jsonrpc`

### Environment Variables (Email Only)
| Variable | Required | Description |
|---|---|---|
| `LEADS_NOTIFY_EMAIL` | Yes | Destination for lead emails (default: contacto@arquitectochile.com) |
| `SMTP_HOST` | For email | SMTP server hostname |
| `SMTP_PORT` | For email | SMTP port (default: 587) |
| `SMTP_USER` | For email | SMTP username |
| `SMTP_PASS` | For email | SMTP password |
| `SMTP_FROM` | Optional | From address (defaults to SMTP_USER) |
| `SEND_AUTOREPLY` | Optional | Set to "true" to auto-reply to lead's email |

### Legal Safety
- **CRITICAL**: Never use guarantee language for DOM/permit approvals (e.g., "garantiza aprobación", "imposible que rechacen"). Use "gestión profesional", "respaldo experto", "compromiso" instead.
- All CTA buttons across the site link to `/contacto` (no WhatsApp/phone CTAs)
- Contact emails: contacto@arquitectochile.com, arquitectopatriciobecar@gmail.com