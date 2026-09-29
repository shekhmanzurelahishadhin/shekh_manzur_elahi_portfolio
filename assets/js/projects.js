/* ============================================================
   PROJECT DATA — single source of truth
   Consumed by both index.html (featured subset) and
   projects.html (full archive). Cards and detail modals are
   both rendered from these entries.
   ============================================================ */
window.PROJECT_DATA = [
  {
    key: 'erp',
    cat: 'laravel fullstack',
    tone: 'pb-1',
    icon: 'fa-cubes',
    title: 'ERP & VMS Systems',
    blurb: 'ERP and Vendor Management modules for Paragon, Sattar Metal, Sharif Metal, Parts Bazar, Elco and many more — HRM, Finance, Inventory and CRM built on Laravel and Yii2 against MySQL and SQL Server.',
    chips: ['Laravel', 'Yii2', 'SQL Server', 'MySQL'],
    role: 'Software Engineer · Multibrand Group',
    desc: 'A family of ERP and Vendor Management modules delivered for Multibrand Group companies — Paragon, Sattar Metal, Sharif Metal, Parts Bazar, Elco and many more — spanning manufacturing, metal trading and retail, each tailored to the client\'s workflow but sharing a common role-based core.',
    points: [
      'Delivered for Paragon, Sattar Metal, Sharif Metal, Parts Bazar, Elco and many more',
      'Modules covering HRM, Payroll, Finance, Inventory, CRM and Project Management',
      'Built on Laravel and Yii2 against both MySQL and SQL Server backends',
      'Stored procedures keep heavy reporting queries fast at scale',
      'Cron jobs and database triggers automate reporting, data sync and notifications',
      'Granular role and permission layer so each department sees only its own data'
    ],
    stack: ['Laravel', 'Yii2', 'PHP', 'SQL Server', 'MySQL', 'Stored Procedures', 'Cron Jobs'],
    links: []
  },
  {
    key: 'resumematch',
    cat: 'ai nextjs react laravel fullstack',
    tone: 'pb-9',
    icon: 'fa-wand-magic-sparkles',
    title: 'AI Resume Matchmaker',
    blurb: 'A full AI-powered hiring platform. Job seekers get a match score against every open job and can build a resume with AI assistance; recruiters get ranked candidates, an applicant pipeline and built-in messaging.',
    chips: ['Laravel 11', 'Next.js 16', 'TypeScript', 'Groq', 'TanStack Query'],
    role: 'Full Stack Developer · Laravel 11 + Next.js 16',
    desc: 'An AI-powered resume ↔ job matching platform that has grown into a small hiring platform. Job seekers get a 0–100% match score for every open job with matched and missing skills, plus an AI-assisted resume builder; recruiters get ranked candidates, an applicant pipeline and direct messaging — all behind light and dark themes, responsive down to phone width.',
    points: [
      'Laravel 11 / PHP 8.2 REST API (67 endpoints) paired with a Next.js 16 App Router frontend in TypeScript',
      'Resume parsing and job matching through Groq and Hugging Face, with a dictionary-based fallback when neither is available',
      'AI resume builder: 8 themed templates, live preview, AI enhance/tailor, version history, and PDF/DOCX/HTML export',
      'Recruiters see structured candidate profiles built from the parsed data — never the raw resume text',
      'Full application lifecycle: apply, track status, and a recruiter-side pipeline to move candidates through stages',
      'In-app messaging between recruiters and matched candidates, plus a notification center',
      'Push notifications via Firebase Cloud Messaging with a scheduled email digest fallback',
      'Dashboards with animated stat counters for both seekers and recruiters',
      'Light/dark theme with next-themes, fully responsive to phone width',
      'TanStack Query and Table on the frontend; react-hook-form with zod validation; shadcn/ui on Radix primitives'
    ],
    stack: ['Laravel 11', 'PHP 8.2', 'Next.js 16', 'React 19', 'TypeScript', 'MySQL', 'Redis', 'Groq', 'Hugging Face', 'Sanctum', 'Firebase FCM', 'AWS S3'],
    links: [{ href: 'https://github.com/shekhmanzurelahishadhin/ai_resume_match_maker', icon: 'fab fa-github', label: 'GitHub' }]
  },
  {
    key: 'realestate',
    cat: 'nextjs react laravel fullstack',
    tone: 'pb-8',
    icon: 'fa-city',
    title: 'Meridian — Real Estate Studio',
    blurb: 'A cinematic Next.js 16 real-estate marketing site, server-rendered with ISR against a Laravel 12 API — plus a hand-written Blade admin panel for managing every piece of content, no Filament.',
    chips: ['Next.js 16', 'Laravel 12', 'TypeScript', 'GSAP', 'Tailwind v4'],
    role: 'Full Stack Developer · Next.js 16 + Laravel 12',
    desc: 'A full-stack real-estate studio site: a cinematic Next.js 16 frontend driven entirely by a Laravel 12 REST API, with a custom Blade admin panel (styled after Horizon UI) for managing every piece of content — no Filament involved.',
    points: [
      'Every page is server-rendered and pulled from the API with ISR (revalidate: 60), not client-fetched',
      'GSAP-pinned horizontal scrolling, scroll-reveal animation, and a lazily-loaded hero video',
      'Light/dark theme applied pre-paint by an inline script — no flash on load — with the whole palette defined as CSS custom properties mapped through Tailwind v4\'s @theme inline',
      'Hero video only loads on desktop, with motion allowed, on a 4G+ connection without data-saver; a poster image stands in otherwise',
      'Featured-work rail becomes a swipeable, scroll-snapped carousel on phones',
      'A custom useInViewOnce hook (native IntersectionObserver) replaces framer-motion\'s broken whileInView in v13',
      'The backend is a hand-written Blade + Tailwind admin panel managing Properties, Projects, Services, Process Steps, Stats, Testimonials, Messages and global Site Settings',
      'Nine Eloquent models; images upload to local storage and are resolved to absolute URLs at the API boundary'
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'GSAP', 'Framer Motion', 'Laravel 12', 'Blade', 'MySQL'],
    links: [{ href: 'https://github.com/shekhmanzurelahishadhin/realestead-studio', icon: 'fab fa-github', label: 'GitHub' }]
  },
  {
    key: 'assetErp',
    cat: 'nextjs react laravel fullstack',
    tone: 'pb-10',
    icon: 'fa-boxes-stacked',
    title: 'Asset ERP — Workshop Asset & Tool Management',
    blurb: 'Enterprise asset and tool management across three integrated platforms — a Laravel 11 API, a Next.js 16 web admin and a Flutter mobile app — sharing one backend, one database, one auth system and one audit trail.',
    chips: ['Laravel 11', 'Next.js 16', 'Flutter', 'JWT', 'TypeScript'],
    role: 'Software Engineer · Multibrand Group',
    desc: 'An enterprise workshop asset and tool management system spanning three platforms that share a single backend API, database, auth system, RBAC layer and audit trail: a Laravel 11 API, a Next.js 16 web admin, and a Flutter mobile app for the workshop floor.',
    points: [
      'Laravel 11 API with 51 controllers, 87 models and 170+ endpoints across 50+ tables',
      'Next.js 16 admin in TypeScript — 32 pages built from 167 components, installable as a PWA',
      'Flutter mobile app with QR scanning, offline sync via a Hive queue and retry engine, and Riverpod state',
      'JWT auth with 2FA OTP, device registration and remote wipe',
      'Full asset lifecycle: assignment, multi-stage transfer approval, maintenance work orders, depreciation (4 methods), revaluation and disposal',
      'Audit plans with offline scan submission, CAPA tracking and compliance scoring',
      'Purchase workflow from PR → PO → GRN → capitalisation',
      'Consumables with bins, auto-reorder, plus vehicle fitness, tax, permit and fuel tracking',
      '20+ report types including ageing, idle, utilisation, MTBF/MTTR and cost scorecards',
      'Webhooks across 17 event types, with HRM sync and GL journal integration'
    ],
    stack: ['Laravel 11', 'Next.js 16', 'TypeScript', 'Flutter', 'Dart', 'JWT', 'MySQL', 'Tailwind', 'Riverpod', 'Hive'],
    links: [{ private: true, icon: 'fas fa-lock', label: 'Private Repo' }]
  },
  {
    key: 'taskmanager',
    cat: 'laravel fullstack',
    tone: 'pb-6',
    icon: 'fa-diagram-project',
    title: 'All-in-One Work Management Platform',
    blurb: 'A ClickUp-style project and work management platform on Laravel 11 — tasks, sprints, tickets, docs, whiteboards and 25+ reports, with seven user types each getting their own dashboard, menu and report set.',
    chips: ['Laravel 11', 'Sanctum', 'MySQL', 'Firebase FCM', 'Tailwind'],
    role: 'Full Stack Developer · Laravel 11',
    desc: 'A ClickUp-style all-in-one work management platform. Every module is wired end to end — routes, controllers, models and views — covering projects, tasks, sprints, tickets, documentation and reporting in a single system.',
    points: [
      'Seven user types (Super Admin, Admin, Project Manager, Team Lead, Developer, QA, Customer), each with its own dashboard, sidebar and report set',
      'Visibility driven by project members and task assignees, with admin routes guarded by an EnsureUserType middleware',
      'Slide-over task panel with inline editing and debounced auto-save — no page reloads',
      'Per-task live timer (start / pause / resume / stop) that rolls tracked time into logged entries',
      'Subtasks, checklists, dependencies, watchers, story points, multi-assignee, reviewer and QA fields',
      '@mentions with notifications, file attachments on tasks and comments, and rich-text editing',
      'Agile sprints with goals, velocity and burndown tracking',
      'Support tickets with SLA tracking and one-click Convert to Task',
      'Collaborative whiteboard — shapes, sticky notes, drag, zoom and JSON export, all persisted',
      '25+ reports with PDF export, including employee productivity, KPI, velocity, workload and task aging',
      'Firebase Cloud Messaging push notifications signed server-side, delivered per user',
      'Searchable activity log, knowledge base with voting, and nested docs/wiki pages'
    ],
    stack: ['Laravel 11', 'PHP 8.2+', 'Sanctum', 'MySQL / SQLite', 'Tailwind', 'Firebase FCM', 'Vite'],
    links: [{ private: true, icon: 'fas fa-lock', label: 'Private Repo' }]
  },
  {
    key: 'mddl',
    cat: 'laravel',
    tone: 'pb-11',
    icon: 'fa-file-invoice-dollar',
    title: 'MDDL — Financial Accounting System',
    blurb: 'A double-entry accounting platform covering chart of accounts, journal vouchers, cheque management, cost centres, currency rates and tax provisioning, with role-based access and Docker-based deployment.',
    chips: ['Laravel', 'Spatie Permission', 'Yajra DataTables', 'MySQL', 'Docker'],
    role: 'Software Engineer · Multibrand Group',
    desc: 'A double-entry financial accounting system covering the full voucher and ledger cycle, built for multi-company use with cost-centre tracking and containerised deployment.',
    points: [
      'Chart of accounts with opening balances and configurable voucher number formats',
      'Journal vouchers with line-level entries and period adjustments',
      'Complete cheque lifecycle — cheque books, entries, signatories and a deletion audit log',
      'Bank, bank branch and bank account management',
      'Cost categories and cost centres for departmental cost allocation',
      'Multi-currency support through maintained currency rates',
      'Cash flow setup, provision for tax and pay-to configuration',
      'Role and permission control via Spatie, with server-side DataTables for large ledgers',
      'Reporting module over the full accounting dataset',
      'Dockerised with docker-compose for reproducible deployment'
    ],
    stack: ['Laravel', 'PHP', 'Spatie Permission', 'Yajra DataTables', 'MySQL', 'Docker', 'Bootstrap'],
    links: [{ private: true, icon: 'fas fa-lock', label: 'Private Repo' }]
  },
  {
    key: 'fleet',
    cat: 'laravel fullstack',
    tone: 'pb-12',
    icon: 'fa-truck-fast',
    title: 'Fleet Management System',
    blurb: 'A vehicle-fleet ERP covering the full asset lifecycle — procurement, documents, workshop repair estimates, fuel, trips and route planning, through to disposal by auction. 70+ models across 12 modules.',
    chips: ['Laravel', 'Spatie Permission', 'Yajra DataTables', 'PhpSpreadsheet', 'Alpine.js'],
    role: 'Software Engineer · Multibrand Group',
    desc: 'A comprehensive Laravel fleet-management ERP built around the full life of a vehicle: purchase, registration and documents, day-to-day trips and fuel, workshop repairs with an estimate approval workflow, and eventual disposal by auction — all under company/department-scoped role-based access.',
    points: [
      'Vehicle core: brand/model/type catalogue, ownership, transfer and receipt records, plus document tracking (registration, tax, fitness) with expiry-driven service reminders',
      'Workshop repair estimates — parts, sublet work and service charges are itemised and routed through an approval workflow before billing',
      'Complaint handling with category/sub-category/head classification feeding into work requisitions and vehicle inspections',
      'Fuel management: per-station issue tracking, price setup and mileage logs for consumption reporting',
      'Trip and route planning — usage requisitions with linked vehicles and trips, route locations, transport-facility requests and passenger manifests',
      'Procurement through disposal: purchase orders tied to specific vehicles, supplier and product catalogues, and an auction module (declare, bid, bidder) for retiring assets',
      'Billing and budgeting with cost centres, expense heads, configurable voucher prefixes, and dedicated expense/pool/VMS/workshop reports',
      'Company, department, division and designation hierarchy with Spatie roles/permissions plus a separate per-unit access-approval layer',
      'Server-side DataTables throughout for large fleet datasets; Excel import/export via PhpSpreadsheet'
    ],
    stack: ['Laravel', 'PHP', 'Spatie Permission', 'Yajra DataTables', 'PhpSpreadsheet', 'MySQL', 'Tailwind', 'Bootstrap', 'Alpine.js', 'jQuery'],
    links: [{ private: true, icon: 'fas fa-lock', label: 'Private Repo' }]
  },

  {
    key: 'landport',
    cat: 'laravel fullstack',
    tone: 'pb-2',
    icon: 'fa-warehouse',
    title: 'Land Port Management System',
    blurb: 'Product stock tracking with modules for inventory, scaling, assessment, and gate exit. Built with Laravel, Breeze, Spatie, MySQL, Ajax, and jQuery.',
    chips: ['Laravel', 'Breeze', 'Spatie', 'MySQL', 'jQuery'],
    role: 'Full Stack Developer',
    desc: 'An end-to-end product stock tracking platform for land port operations, following goods from arrival through weighing, assessment and gate exit.',
    points: [
      'Inventory, scaling, assessment and gate-exit modules in a single workflow',
      'Authentication with Laravel Breeze and permissions handled through Spatie',
      'Ajax and jQuery deliver live table updates without full page reloads',
      'Reporting views for daily movement and stock reconciliation'
    ],
    stack: ['Laravel', 'Breeze', 'Spatie', 'MySQL', 'Ajax', 'jQuery'],
    links: [{ href: 'https://landportmanagement.saniatulhaque.com/', icon: 'fas fa-link', label: 'Live Link' }]
  },
  {
    key: 'jkkniu',
    cat: 'laravel',
    tone: 'pb-3',
    icon: 'fa-university',
    title: 'Jatiya Kabi Kazi Nazrul Islam University Website',
    blurb: 'Multi-role system for students, faculty, and admins with fully dynamic content management from dashboard.',
    chips: ['Laravel', 'MySQL', 'Bootstrap', 'Ajax'],
    role: 'Jr Programmer · PeopleNTech Ltd',
    desc: 'The official website for Jatiya Kabi Kazi Nazrul Islam University — a fully dynamic, multi-role platform serving students, faculty and administrators.',
    points: [
      'Separate dashboards and permissions for students, faculty and admins',
      'Every page, notice and department section editable from the admin panel',
      'Notice board, events and downloads managed without developer involvement',
      'Built to serve public traffic across the whole university'
    ],
    stack: ['Laravel', 'MySQL', 'Bootstrap', 'Ajax', 'jQuery'],
    links: [{ href: 'https://jkkniu.edu.bd/', icon: 'fas fa-link', label: 'Live Link' }]
  },
  {
    key: 'blog',
    cat: 'react fullstack laravel',
    tone: 'pb-4',
    icon: 'fa-blog',
    title: 'Blog Site Using React.js & Laravel',
    blurb: 'Dynamic blog platform with React.js frontend and Laravel REST API backend. Includes post creation, image upload, categories, SEO meta fields, and Sanctum-based authentication.',
    chips: ['React.js', 'Laravel', 'Sanctum', 'REST API', 'Axios'],
    role: 'Personal Project',
    desc: 'A decoupled blog platform: a React.js single-page frontend talking to a Laravel REST API, built to practise clean API design and token authentication.',
    points: [
      'React.js SPA frontend consuming a Laravel REST API',
      'Token authentication via Laravel Sanctum',
      'Post creation with image upload and categories',
      'SEO meta fields editable per post',
      'Axios service layer with React Router for client-side navigation'
    ],
    stack: ['React.js', 'Laravel', 'Sanctum', 'REST API', 'Axios', 'React Router'],
    links: [{ href: 'https://github.com/shekhmanzurelahishadhin/blog-site.git', icon: 'fab fa-github', label: 'GitHub' }]
  },
  {
    key: 'shebaralo',
    cat: 'laravel fullstack',
    tone: 'pb-5',
    icon: 'fa-heartbeat',
    title: 'Shebar Alo Health',
    blurb: 'Dynamic CMS with appointment booking and admin control using Laravel, Bootstrap, MySQL, Ajax, and jQuery.',
    chips: ['Laravel', 'Bootstrap', 'MySQL', 'Ajax'],
    role: 'Full Stack Developer',
    desc: 'A healthcare CMS with patient-facing appointment booking and a complete administrative back office.',
    points: [
      'Appointment booking flow with scheduling and confirmation',
      'Fully dynamic CMS — pages, doctors and services managed from the dashboard',
      'Admin control panel for bookings and content',
      'Ajax-driven forms for a smoother booking experience'
    ],
    stack: ['Laravel', 'Bootstrap', 'MySQL', 'Ajax', 'jQuery'],
    links: [{ href: 'https://github.com/shekhmanzurelahishadhin/shebar_alo_health', icon: 'fab fa-github', label: 'GitHub' }]
  },
  {
    key: 'kazilaw',
    cat: 'laravel',
    tone: 'pb-7',
    icon: 'fa-gavel',
    title: 'Kazi Law Chamber',
    blurb: 'Upgraded legacy Laravel 5 system to Laravel 9, added custom modules, improved UI, and enhanced performance.',
    chips: ['Laravel 9', 'PHP', 'MySQL', 'Migration'],
    role: 'Jr Programmer · PeopleNTech Ltd',
    desc: 'A legacy modernisation project: a Laravel 5 system for a law chamber, migrated forward to Laravel 9 and extended with new functionality.',
    points: [
      'Migrated and refactored a legacy Laravel 5 codebase to Laravel 9',
      'Added custom modules on top of the modernised foundation',
      'Reworked the UI for a cleaner, more current presentation',
      'Performance gains from the framework upgrade and query cleanup'
    ],
    stack: ['Laravel 9', 'PHP', 'MySQL', 'Legacy Migration'],
    links: [{ href: 'https://www.kazilawchamber.com/', icon: 'fas fa-link', label: 'Live Link' }]
  }
];
