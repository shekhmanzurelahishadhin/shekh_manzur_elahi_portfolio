/* ============================================================
   PROJECT DATA — single source of truth
   Consumed by both index.html (featured subset) and
   projects.html (full archive). Cards and detail modals are
   both rendered from these entries.
   ============================================================ */
window.PROJECT_DATA = [
  {
    key: 'resumematch',
    cat: 'ai nextjs react laravel fullstack',
    tone: 'pb-9',
    icon: 'fa-wand-magic-sparkles',
    title: 'AI Resume Matchmaker',
    blurb: 'AI-powered resume ↔ job matching platform. Job seekers upload PDF resumes and get compatibility scores against job descriptions, while recruiters post jobs and receive ranked, scored candidate lists.',
    chips: ['Laravel 12', 'Next.js 16', 'TypeScript', 'Hugging Face', 'Redis'],
    role: 'Full Stack Developer · Laravel 12 + Next.js 16',
    desc: 'An AI-powered resume ↔ job matching platform with two audiences in one system. Job seekers upload PDF resumes and receive compatibility scores against job descriptions; recruiters post jobs and get back ranked, scored candidate lists.',
    points: [
      'Laravel 12 / PHP 8.3 REST API paired with a Next.js 16 App Router frontend in TypeScript',
      'Resume ↔ job scoring through the Hugging Face Inference API, with a deterministic fallback when the model is unavailable',
      'Sanctum authentication supporting both bearer tokens and session cookies',
      'Resume generation across six templates with HTML, PDF and DOCX output',
      'Queued jobs handle parsing, matching and notifications; a scheduler sends daily digests',
      'Push notifications via Firebase Cloud Messaging with an email fallback',
      'Tiered rate limiting — 60 requests/min, 5 uploads/hr, 10 generations/hr',
      'GDPR data export and account deletion built in',
      'Redis caching, pagination and eager loading throughout; covered by PHPUnit and Vitest suites'
    ],
    stack: ['Laravel 12', 'PHP 8.3', 'Next.js 16', 'TypeScript', 'MySQL', 'Redis', 'Hugging Face', 'Sanctum', 'Firebase FCM', 'S3 / MinIO'],
    links: [{ href: 'https://github.com/shekhmanzurelahishadhin/ai_resume_match_maker', icon: 'fab fa-github', label: 'GitHub' }]
  },
  {
    key: 'realestate',
    cat: 'nextjs react laravel fullstack',
    tone: 'pb-8',
    icon: 'fa-city',
    title: 'RealEstate Studio',
    blurb: 'A headless real-estate showcase platform — an animated Next.js 16 frontend for properties, projects and services, driven entirely by a Laravel REST API with a fully manageable content backend.',
    chips: ['Next.js 16', 'React 19', 'TypeScript', 'Laravel', 'GSAP'],
    role: 'Full Stack Developer · Next.js 16 + Laravel',
    desc: 'A headless real-estate showcase platform. An animated Next.js frontend presents properties, projects and services, while every piece of content — listings, testimonials, stats, process steps and site settings — is served from a Laravel REST API.',
    points: [
      'Decoupled architecture: Next.js 16 App Router frontend consuming a Laravel API',
      'React 19 with TypeScript, styled in Tailwind CSS',
      'Motion work handled by GSAP and Framer Motion for scroll and transition animation',
      'Dynamic detail routes for individual properties and projects',
      'Nine Eloquent models covering properties, projects, services, testimonials, process steps, stats and settings',
      'Image upload endpoint plus a contact-message pipeline',
      'Sanctum-secured API with content fully manageable from the backend'
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Laravel', 'Sanctum', 'MySQL'],
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
    key: 'erp',
    cat: 'laravel fullstack',
    tone: 'pb-1',
    icon: 'fa-cubes',
    title: 'ERP & VMS Systems',
    blurb: 'Developed ERP modules for HRM, Finance, Inventory, and CRM using Laravel and Yii2, integrated with MySQL and SQL Server across various industries.',
    chips: ['Laravel', 'Yii2', 'SQL Server', 'MySQL'],
    role: 'Software Engineer · Multibrand Group',
    desc: 'A family of ERP and Vendor Management modules built for companies across manufacturing, retail and services — each tailored to the client\'s workflow but sharing a common role-based core.',
    points: [
      'Modules delivered for HRM, Payroll, Finance, Inventory, CRM and Project Management',
      'Built on Laravel and Yii2 against both MySQL and SQL Server backends',
      'Stored procedures keep heavy reporting queries fast at scale',
      'Cron jobs and database triggers automate reporting, data sync and notifications',
      'Granular role and permission layer so each department sees only its own data'
    ],
    stack: ['Laravel', 'Yii2', 'PHP', 'SQL Server', 'MySQL', 'Stored Procedures', 'Cron Jobs'],
    links: []
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
