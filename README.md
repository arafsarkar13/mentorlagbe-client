# MentorLagbe - Smart Tuition & Mentorship Platform (Client)

MentorLagbe is a full-stack, role-based tuition platform. Qualified **tutors** post subject-wise tuition batches or
1-on-1 mentorship, **students** search, apply and track their applications, and **admins** moderate listings, users and
Stripe payments.

**Purpose:** students and parents struggle to find verified tutors by subject, class level, mode and budget, while
tutors lack a structured place to show their batches. MentorLagbe solves both in one place.

## Live Links
- **Live site:** https://mentorlaaagbe.vercel.app
- **Server API:** https://mentorlaaagbe-server.vercel.app
- **Client repository:** https://github.com/arafsarkar13/mentorlagbe-client
- **Server repository:** https://github.com/arafsarkar13/mentorlagbe-server

## Demo Accounts
| Role | Email | Password |
|---|---|---|
| Admin | mentorlagbe@gmail.com | mentor12345 |
| Tutor (Pro) | tutor@mentorlagbe.com | Tutor@12345 |
| Student | student@mentorlagbe.com | Student@12345 |

Stripe runs in **test mode**. Use the test card `4242 4242 4242 4242` with any future date and any CVC.

## Key Features
**Public**
- Home page: hero with search, 6 latest approved tuitions (equal-height cards), how it works, top subjects, live platform counters, pricing, testimonials
- Browse Tuitions: server-side search (title / subject), filters (subject, class level, mode) and pagination
- Tuition details with tutor summary and a student-only apply form (duplicate applications are blocked)
- Pricing page with Stripe checkout for Pro plans (Tutor $15, Student $10)
- Custom loading skeletons, 404 page and error page, toast notifications everywhere

**Authentication**
- BetterAuth with MongoDB adapter, role selection at sign up (student / tutor), form validation
- JWT sent to the Express API and verified with `verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`
- Logged-in users stay signed in after reloading any private route

**Student dashboard:** overview stats, my applications (cancel while pending), update profile
**Tutor dashboard:** overview stats, post tuition (ImgBB banner upload, free plan limit of 2), my tuitions (edit, close / reopen, delete), applicants (accept / reject)
**Admin dashboard:** platform stats, user role management, tuition approval, Stripe transactions

**Other**
- Responsive dashboard with a collapsible sidebar, top bar and profile summary
- ImgBB image upload for profile pictures and tuition banners (through the server, key stays private)
- Server-side pagination and a seed script with realistic connected data
- New **X** logo in the footer

## Tech Stack
Next.js (App Router), React, Tailwind CSS, DaisyUI, BetterAuth, MongoDB, JWT, Stripe, ImgBB, Vercel

## NPM Packages Used
- `@tailwindcss/postcss`
- `better-auth`
- `daisyui`
- `jsonwebtoken`
- `mongodb`
- `next`
- `react`
- `react-dom`
- `react-hot-toast`
- `tailwindcss`

## Run Locally
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values
3. `npm run dev` and open http://localhost:3000

## Environment Variables (`.env.local`)
| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Address of the Express server |
| `MONGODB_URI` / `DB_NAME` | MongoDB connection used by BetterAuth |
| `BETTER_AUTH_SECRET` | Secret used by BetterAuth |
| `BETTER_AUTH_URL` | Address of this client app |
| `JWT_SECRET` | Must be the same value as on the server |

Secrets are never committed. `.env.local` is listed in `.gitignore`.
