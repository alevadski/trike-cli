# Creating and Optimizing CLAUDE.md

## What It Is

CLAUDE.md is a markdown file in your project root that documents your project specifically for me. It's automatically injected into every conversation, so I start with this context without you having to explain it repeatedly.

Think of it as a README written specifically for Claude Code, focusing on decisions and constraints rather than user-facing documentation.

## Why It Matters

**Without CLAUDE.md:**
- You re-explain your tech stack every conversation
- I give generic advice that doesn't match your patterns
- I might suggest approaches you don't use
- Wasted tokens on explanations instead of actual work
- No shared vocabulary about your project

**With CLAUDE.md:**
- I understand your project immediately
- Suggestions match your patterns and constraints
- Fewer clarification questions
- More tokens available for actual code analysis
- Consistent advice across conversations

**Real impact:**
A well-written CLAUDE.md saves 10-15 minutes per conversation and results in 30-40% more relevant advice.

## Structure and Sections

### Header Section

```markdown
# Project Name

**Repository:** [GitHub URL or internal path]
**Tech Stack:** [primary framework/language version]
**Status:** [Active development / Maintenance / Archive]
```

This immediately orients me to what I'm looking at.

### Tech Stack Section (Essential)

Document your framework, language, and key dependencies:

```markdown
## Tech Stack

### Frontend (if applicable)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.x
- **State Management:** React Query 5.x
- **Testing:** Vitest + React Testing Library
- **Package Manager:** npm (pnpm preferred locally)

### Backend (if applicable)
- **Runtime:** Node.js 20.x
- **Framework:** Express.js or Fastify
- **Database:** PostgreSQL 15
- **ORM:** Prisma 5.x
- **API:** REST (or GraphQL, gRPC, etc.)
- **Authentication:** JWT via httpOnly cookies

### Infrastructure
- **Hosting:** Vercel (frontend), Railway (backend)
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry, LogRocket
```

**Why versions matter:**
Different versions have different patterns. Next.js 12 vs 14 are fundamentally different. Prisma 4 vs 5 have different type inference. React Query 4 vs 5 have different APIs.

### Architecture Section (Essential)

Show me the folder structure and key design decisions:

```markdown
## Architecture

### Folder Structure
```
project/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── dashboard/         # Protected pages
│   ├── api/               # API routes
│   └── components/        # App-level components
├── src/
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and helpers
│   ├── types/             # TypeScript type definitions
│   └── styles/            # Global styles
├── tests/                 # Test files (Vitest)
├── public/                # Static assets
└── CLAUDE.md             # This file
```

### Design Patterns
- **Components:** Functional components with hooks only
- **State Management:** Server Components by default, Client Components for interactivity
- **Data Fetching:** Server Components for backend data, React Query for client-side
- **Forms:** React Hook Form with Zod validation
- **Routing:** File-based routing (Next.js App Router conventions)
- **API:** RESTful endpoints in /api routes, returning JSON
```

**Why structure matters:**
I can better understand relationships when I know where things live. "Component in app/components" tells me it's for the app level, not a single page.

**Why patterns matter:**
Knowing you prefer Server Components means I won't suggest useEffect for data fetching. Knowing you use React Hook Form means I won't suggest Formik.

### Constraints and Guardrails Section (Critical)

This is where you prevent bad suggestions:

```markdown
## Constraints and Guidelines

### Do's (Preferred Patterns)
- ✅ Use Server Components for rendering initial content
- ✅ Use React Query for client-side data fetching
- ✅ Keep API routes minimal (just HTTP handlers)
- ✅ Use Zod schemas for runtime validation
- ✅ Place server logic in /lib utilities
- ✅ Use TypeScript strict mode
- ✅ Component testing over snapshot testing

### Don'ts (Anti-patterns)
- ❌ Don't use Pages Router (App Router only)
- ❌ Don't use Redux (use React Query + Context instead)
- ❌ Don't use styled-components (Tailwind CSS only)
- ❌ Don't fetch data in useEffect on the client
- ❌ Don't create prop-drilling chains (use Context or Query client)
- ❌ Don't use async server actions (keep them pure)
- ❌ Don't commit env files
```

**Why this matters:**
This prevents me from suggesting Pages Router patterns, Redux setups, or other anti-patterns in YOUR project. It's the most impactful section.

### Database/API Section (If Applicable)

```markdown
## Data and APIs

### Database
- **Type:** PostgreSQL 15
- **ORM:** Prisma 5.x
- **Schema:** Auto-generated from Prisma schema
- **Key Models:**
  - User (email, name, role)
  - Post (title, content, authorId, publishedAt)
  - Comment (content, postId, authorId)
- **Patterns:** Always use relations, no circular dependencies
- **Constraints:** Never access DB directly (use Prisma only)

### API Design
- **Base:** /api/v1/
- **Auth:** Bearer token in Authorization header
- **Error Format:**
  ```json
  {
    "error": "message",
    "code": "ERROR_CODE",
    "details": {}
  }
  ```
- **Pagination:** Offset-based with limit param
- **Versioning:** URL-based (v1, v2) for major changes
```

**Why it matters:**
I can suggest API endpoints that match your conventions and query patterns that respect your ORM preferences.

### Testing Section (If Applicable)

```markdown
## Testing Strategy

### Unit Tests
- **Framework:** Vitest
- **Location:** tests/unit/[feature]/
- **Pattern:** One test file per component/utility
- **Coverage:** Aim for 80% overall
- **Mocking:** Use vi.mock() for dependencies
- **Example structure:**
  ```
  tests/unit/
  ├── components/
  ├── hooks/
  └── lib/
  ```

### Integration Tests
- **Framework:** Playwright
- **Location:** tests/e2e/
- **Scope:** User workflows across multiple components
- **Setup:** Run against test database with seeds

### Test Data
- **Fixtures:** Use factories from factories/
- **Seeds:** DB seeding via Prisma in test setup
- **Cleanup:** Each test is isolated, DB reset between runs
```

**Why it matters:**
I'll suggest tests matching your existing patterns, not generic examples.

### Development Workflow Section

```markdown
## Development Workflow

### Local Setup
```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Run database migrations
npm run db:migrate

# Start dev server
npm run dev
```

### Code Quality
- **Linting:** ESLint (run before commit)
- **Formatting:** Prettier (auto on save)
- **Type checking:** TypeScript strict mode
- **Pre-commit:** Husky hooks run lint + type check

### Git Conventions
- **Branches:** feature/, bugfix/, chore/
- **Commits:** Conventional commits (feat:, fix:, chore:, etc.)
- **PRs:** Feature -> main, must pass CI, require 1 approval
- **Releases:** Semantic versioning, tags auto-generated
```

**Why it matters:**
I'll make commits in the right format, suggest PRs that match your conventions, and understand your branch structure.

### Known Issues or Gotchas Section

```markdown
## Known Issues and Gotchas

### Performance
- Avoid fetching > 100 items in a single query (paginate instead)
- Large image uploads process slowly (> 5MB)
- PDF generation is synchronous (don't do in user request)

### Compatibility
- Safari 14 and older not supported (uses ES2020+ syntax)
- IE11 not supported
- Android < 8 has rendering issues with CSS Grid

### Integration Notes
- Stripe webhook handling: use event type, not amount
- Email service has 100/minute rate limit
- OAuth refresh tokens expire after 30 days
```

**Why it matters:**
I won't suggest patterns that cause known issues or incompatibilities in your project.

### Deployment and Environment Section

```markdown
## Deployment

### Environments
- **Development:** Local machine, .env.local
- **Staging:** Vercel Preview deployments, .env.staging
- **Production:** Vercel Production, .env.production

### Deployment Process
1. Push to feature branch
2. Automated tests run via GitHub Actions
3. Vercel creates preview deployment
4. Manual testing on preview
5. Merge to main
6. Automatic production deployment to Vercel
7. Database migrations run post-deploy

### Environment Variables
- Database URL (Postgres connection string)
- API keys (Stripe, OpenAI, SendGrid)
- CORS origins (hardcoded for security)
- Feature flags (for gradual rollouts)

### Rollback Procedure
- Revert commit on main
- Vercel auto-redeploys
- If database migration issue: manual migration rollback via Prisma
```

**Why it matters:**
I understand the deployment constraints and won't suggest changes that would fail during deployment.

## CLAUDE.md Examples by Project Type

### React + TypeScript + Next.js App Router

```markdown
# E-commerce Frontend

**Repository:** https://github.com/org/ecommerce-fe
**Framework:** Next.js 14 (App Router)
**Status:** Active development

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript 5.3
- React 18.2
- Tailwind CSS 3.3
- React Query 5.x
- Zod for validation
- React Hook Form for forms
- Vitest + React Testing Library

## Architecture

### Folder Structure
```
app/
├── (marketing)/      # Landing, about, etc.
├── (auth)/          # Login, signup, reset
├── (shop)/          # Product browsing
├── account/         # User account pages
├── api/             # API routes (lightweight proxies)
├── components/      # Shared components
└── layout.tsx

src/
├── components/      # Reusable UI components
├── hooks/          # Custom hooks
├── lib/            # Utilities
└── types/          # TypeScript types
```

### Patterns
- Server Components by default (fetch in server)
- Client Components only for interactivity (forms, filters)
- React Query for client-side caching
- Middleware for auth checks
- API routes as proxies to backend

## Constraints

### Do's
- ✅ Server Components for initial render
- ✅ React Query for async state
- ✅ Zod + React Hook Form for forms
- ✅ CSS Modules or Tailwind (no styled-components)
- ✅ TypeScript strict mode

### Don'ts
- ❌ Don't use Pages Router
- ❌ Don't fetch in useEffect (use React Query or Server Components)
- ❌ Don't use Redux
- ❌ Don't use styled-components
- ❌ Don't create circular component dependencies
```

### Django REST Framework Backend

```markdown
# API Backend

**Repository:** https://github.com/org/api-backend
**Framework:** Django 4.2 + Django REST Framework
**Status:** Active maintenance

## Tech Stack

### Backend
- Python 3.11
- Django 4.2
- Django REST Framework 3.14
- Django ORM (no SQLAlchemy)
- Celery for async tasks
- PostgreSQL 15
- Redis for caching
- pytest-django for testing

### Key Libraries
- django-cors-headers for CORS
- drf-spectacular for OpenAPI docs
- python-decouple for environment variables
- Pydantic for serialization (minimal use)

## Architecture

### Project Structure
```
api/
├── users/              # User app
│   ├── models.py
│   ├── views.py        # ViewSet-based
│   ├── serializers.py
│   └── tests.py
├── products/           # Product app
├── orders/
├── core/               # Shared utilities
├── settings.py         # Configuration
├── urls.py
└── wsgi.py
```

### Patterns
- Class-based views (ViewSets) not function-based
- Always use ModelSerializer
- Pagination for large result sets
- Custom permissions (not just authentication)
- Celery tasks for background jobs
- Soft deletes on core models

## Constraints

### Do's
- ✅ Use ViewSets + Routers
- ✅ Always use ModelSerializer
- ✅ Create custom permissions
- ✅ Use signals for cross-model updates
- ✅ Test with pytest-django

### Don'ts
- ❌ Don't use function-based views
- ❌ Don't bypass serializers
- ❌ Don't add business logic in models
- ❌ Don't use raw SQL (ORM only)
- ❌ Don't commit with print() statements

## Database

### Key Models
- User (extends AbstractUser)
- Product (name, sku, price)
- Order (user, created_at, status)
- OrderItem (order, product, quantity)

### Patterns
- Soft deletes via is_deleted field
- Timestamps on all models (created_at, updated_at)
- Use managers for common queries
- Indexes on foreign keys and status fields

## Testing

### Coverage: 85% minimum
- Unit tests for models and utilities
- Integration tests for API endpoints
- Use pytest fixtures from conftest.py
```

## Common Mistakes to Avoid

### 1. Making CLAUDE.md Too Long
**Problem:** 200+ lines nobody reads
**Solution:** Keep it to 80 lines max. Focus on:
- Tech stack
- Key architecture decisions
- Critical constraints

Details go in code comments, not CLAUDE.md.

### 2. Being Too Vague
**Problem:** "We use modern tech stack"
**Solution:** Be specific:
- React 18.2, not "React"
- TypeScript strict mode, not "TypeScript"
- Prisma ORM, not "database layer"

Specificity prevents wrong suggestions.

### 3. Outdated Information
**Problem:** CLAUDE.md says Python 3.8 but you're on 3.11
**Solution:** Update CLAUDE.md when you upgrade major dependencies

Outdated CLAUDE.md is worse than no CLAUDE.md.

### 4. Missing Constraints
**Problem:** No mention of "don't use Redux"
**Solution:** Add a "Don'ts" section listing anti-patterns

This prevents the most common bad suggestions.

## How to Create CLAUDE.md (Step by Step)

### Step 1: Copy Template
Use the template provided in references/util/claude-md-template.md as a starting point.

### Step 2: Fill in Tech Stack
List exactly what you're using:
```markdown
## Tech Stack
- Framework: Next.js 14.0.4
- Language: TypeScript 5.3.2
- Package Manager: npm
- Database: PostgreSQL 15
```

### Step 3: Document Architecture
Show folder structure and key patterns:
```markdown
## Architecture

### Folder Structure
[paste your actual folder structure]

### Key Patterns
- API: REST endpoints in /api routes
- State: React Query for server state
- Forms: React Hook Form + Zod
```

### Step 4: List Constraints
Be explicit about what NOT to suggest:
```markdown
## Constraints

### Do's
- ✅ Server Components
- ✅ Tailwind CSS

### Don'ts
- ❌ Pages Router
- ❌ styled-components
```

### Step 5: Save and Test
```bash
# Save CLAUDE.md in project root
cat > CLAUDE.md << 'EOF'
# Your Project
[content]
EOF

# Test in Claude Code
/context
```

Should see CLAUDE.md loaded in context output.

## Maintaining CLAUDE.md

### When to Update
- Major dependency upgrades (Next.js 13→14, React 17→18)
- Architecture changes (e.g., moving from Redux to React Query)
- New patterns becoming standard (e.g., Server Components)
- Adding new constraint or guideline

### Update Checklist
- [ ] Tech stack versions updated
- [ ] Architecture changes reflected
- [ ] New constraints listed
- [ ] Removed obsolete patterns
- [ ] Tested with `/context` command

### Review Cadence
- **New projects:** Update after 2-4 weeks of development (once patterns settle)
- **Ongoing projects:** Quarterly review or after major changes
- **Mature projects:** Update on dependency version changes only

## CLAUDE.md vs Code Comments

**CLAUDE.md covers:**
- Framework versions
- Architecture decisions
- Project-wide constraints
- Tech stack choices

**Code comments cover:**
- Why specific implementation chosen
- Complex logic explanations
- Gotchas in particular functions
- TODO items and known limitations

Both are needed—CLAUDE.md for context, comments for details.

## Summary

A well-written CLAUDE.md:
1. **Saves time:** I understand your project immediately
2. **Improves advice:** Suggestions match your patterns
3. **Prevents mistakes:** Constraints prevent anti-patterns
4. **Enables consistency:** Same advice across conversations

Invest 30 minutes creating a good CLAUDE.md, and every conversation becomes more productive.

Start with the template, fill in your specifics, and update quarterly as your project evolves.
