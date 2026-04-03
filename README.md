# Vibekit Studio

Vibekit Studio is a React + Vite starter application that provides serverless page management and user authentication via Netlify Functions and MongoDB. This document describes installation, environment configuration, API contracts, and deployment.

## 🚀 Project Overview

- Frontend
  - React 19, Vite 8
  - React Router DOM for page routing
  - Tailwind CSS for styling
- Backend
  - Netlify Functions in `netlify/functions/` (serverless endpoints)
  - JWT authentication (`jsonwebtoken`)
  - Password hashing (`bcryptjs`)
- Database
  - MongoDB driver (`mongodb`) using `MONGODB_URI`
  - Collections: `users`, `pages`
- Core Features
  - User sign-up and sign-in
  - Create, read, update, delete (CRUD) pages
  - Publish pages with unique slugs
  - Public page view endpoint with read count

## 🗂️ Folder Structure (Detailed)

```
project/vibekit-studio/
  .env                      # local environment variables (not committed)
  .gitignore
  package.json
  README.md
  netlify.toml
  vite.config.js
  postcss.config.js
  tailwind.config.js
  eslint.config.js

  public/
    _redirects               # Netlify redirect rules

  src/
    main.jsx                # React entry point
    index.css
    themes.js
    App.jsx                 # app-wide routes and layout

    components/
      Preview.jsx           # preview component for page builder
      ProtectedRoute.jsx    # auth-enabled route wrapper

    pages/
      Landing.jsx           # public landing page
      Login.jsx             # login page UI
      Signup.jsx            # registration page UI
      Dashboard.jsx         # user dashboard + page list
      Editor.jsx            # page editor interface
      PublicPage.jsx        # render published page content

    utils/
      auth.js               # frontend auth helper (token storage, headers)

  netlify/functions/
    auth-signup.js          # register new user, return JWT
    auth-login.js           # authenticate user, return JWT
    pages-create.js         # create draft page, authenticated
    pages-get.js            # get user pages, authenticated
    pages-update.js         # update page content, authenticated
    pages-delete.js         # delete page, authenticated + ownership
    pages-publish.js        # publish draft page + slug generation
    page-public.js          # retrieve published page by slug
    utils/
      db.js                 # MongoDB connection helper

  .netlify/
    functions-serve/        # Netlify dev runtime output (auto-generated)
```

## 🛠️ Environment Setup

Create `.env` in `vibekit-studio/`:

```
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<secure-random-secret>
RESEND_API_KEY=<your-resend-api-key>
```

### Recommended values

- `MONGODB_URI`: e.g. `mongodb+srv://<user>:<pass>@cluster0.mongodb.net/vibekit?retryWrites=true&w=majority`
- `JWT_SECRET`: 32+ random chars
- `RESEND_API_KEY`: key from https://resend.com/dashboard/api-keys (for contact form email delivery)

## ⚙️ Installation

```bash
cd project/vibekit-studio
npm install
```

### Run development server

```bash
npm run dev
```

APP URL: `http://localhost:5173`

### Netlify local functions (optional)

```bash
npx netlify dev
```

## 🔐 API Auth Flow

- Signup: `POST /.netlify/functions/auth-signup`
  - Request JSON: `{ "email": "...", "password": "..." }`
  - Success: `200 { "token": "...", "message": "User created" }`
- Login: `POST /.netlify/functions/auth-login`
  - Request JSON: `{ "email": "...", "password": "..." }`
  - Success: `200 { "token": "..." }`

Authenticated requests must include:

`Authorization: Bearer <token>`

## 📄 Page CRUD API Contract

- `GET /.netlify/functions/pages-get`
  - Auth required
  - Response: array of user pages
- `POST /.netlify/functions/pages-create`
  - Auth required
  - Request JSON: `{ "title": "..." }`
  - Response: inserted page document
- `PUT /.netlify/functions/pages-update`
  - Auth required
  - Request JSON: `{ "pageId": "...", "title": "...", "theme": "...", "sections": {...} }`
- `DELETE /.netlify/functions/pages-delete`
  - Auth required
  - Request JSON: `{ "pageId": "..." }`
- `POST /.netlify/functions/pages-publish`
  - Auth required
  - Request JSON: `{ "pageId": "...", "title": "..." }`
  - Response: `{ "slug": "..." }`
- `GET /.netlify/functions/page-public?slug=<slug>`
  - Public access
  - Response: published page object (and increments `viewCount`)
- `POST /.netlify/functions/contact-submit`
  - Public access (no auth required)
  - Request JSON: `{ "pageId": "...", "name": "...", "email": "...", "message": "..." }`
  - Behavior:
    - validates page contact email
    - stores submission in `submissions` collection
    - sends email via Resend API to `page.sections.contact.email`

## 📧 Resend Email Integration

- Uses `resend` library and endpoint: `netlify/functions/contact-submit`
- Requires environment variable: `RESEND_API_KEY`
- Email template (HTML) includes sender name, sender email, and message

## 🌐 Deployed URL

- Deployed on Netlify: `https://vibekit-studio-y.netlify.app/`

## 🧪 Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## 📦 Production Deployment (Netlify)

1. Connect repository to Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Set environment variables in Netlify dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `RESEND_API_KEY`

## 🔒 Production Considerations

- Add server-side validation for payloads.
- Enforce strong password policy and confirm email flows.
- Add CSRF/Rate limiting for function endpoints.
- Ensure JWT expires and supports refresh tokens if needed.
- Harden `page-public` so optional missing slugs return `404`.
- Sanitize and escape content before rendering in frontend.
- Gallery images will accept:
  - URLs ending in `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
  - gstatic image URLs (`*.gstatic.com`), e.g. encrypted-tbn0 links
  - URLs with image format references in query parameters

1. Copy `.env` example (create if missing):

   - `MONGODB_URI` – MongoDB connection string
   - `JWT_SECRET` – secure random secret for JWT tokens
   - `RESEND_API_KEY` - Resend API key for contact form email delivery

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run local dev server:

   ```bash
   npm run dev
   ```

4. Open the app:

   - `http://localhost:5173`

5. (Optional) Run APIs locally with Netlify CLI:

   ```bash
   npx netlify dev
   ```

## 🔐 Auth flow

- Signup: `POST /.netlify/functions/auth-signup`
  - payload: `{email, password}`
  - creates user in `users` collection
  - returns `{token}`

- Login: `POST /.netlify/functions/auth-login`
  - payload: `{email, password}`
  - returns `{token}`

Token header is `Authorization: Bearer <token>` for authenticated endpoints.

## 📄 Page CRUD APIs

- `GET /.netlify/functions/pages-get` (authorized)
- `POST /.netlify/functions/pages-create` (authorized)
  - payload: `{title}`
- `PUT /.netlify/functions/pages-update` (authorized)
  - payload: `{pageId, title, theme, sections}`
- `DELETE /.netlify/functions/pages-delete` (authorized)
  - payload: `{pageId}`
- `POST /.netlify/functions/pages-publish` (authorized)
  - payload: `{pageId, title}`
  - sets `status: published` and unique slug
- `GET /.netlify/functions/page-public?slug=<slug>` (public)
  - returns published page data and increments `viewCount`

## 💡 Common env values

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/vibekit?retryWrites=true&w=majority
JWT_SECRET=some-long-secure-random-string
RESEND_API_KEY=your-resend-api-key
```

## 🧪 Lint + build

- `npm run lint`
- `npm run build`
- `npm run preview`

## 📦 Deploy

1. Connect repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set Netlify env vars: `MONGODB_URI`, `JWT_SECRET`, `RESEND_API_KEY`

 
