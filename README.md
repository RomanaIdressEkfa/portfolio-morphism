# Romana Idress Ekfa — Portfolio (Vercel deploy)

A same-to-same static mirror of the existing portfolio, ready to deploy to Vercel's free tier.
It ships the exact production build (`assets/index-*.js` + `assets/index-*.css`) and reads live
content (profile, projects, skills, experience, testimonials) from the same Supabase backend,
so the deployed site looks and behaves identically.

## Files
- `index.html` — app shell
- `assets/` — production JS/CSS bundle + images
- `favicon.png`, `portrait.png`, `robots.txt`
- `vercel.json` — SPA routing (so `/about`, `/projects/...`, etc. work on refresh) + asset caching

## Deploy — Option A: Vercel CLI (fastest)
```bash
npm i -g vercel      # or: npx vercel
cd c:/laragon/www/romanaidress
vercel               # first run: log in + link a new project (accept defaults)
vercel --prod        # promote to production
```
When asked for settings: framework = **Other**, build command = **(leave empty)**,
output directory = **.** (current directory). It's a static site, no build step.

## Deploy — Option B: GitHub + Vercel dashboard
1. `git init && git add . && git commit -m "Portfolio mirror"`
2. Push to a new GitHub repo.
3. On vercel.com → **Add New Project** → import the repo.
4. Framework preset: **Other**. No build command. Output directory: **.**
5. Deploy.

## After deploying — two things to update
1. **Social preview (OG tags).** In `index.html`, `og:url`/`og:image`/`twitter:image` still point to
   the old `romanaidress.lovable.app` domain. Update them to your new Vercel URL after you know it.
2. **Admin login (`/admin`).** The passkey/WebAuthn login and Supabase Auth redirect URLs are tied to
   the original domain. The public portfolio works from any domain, but to log into `/admin` from the
   new URL you must add the new Vercel domain under **Supabase → Authentication → URL Configuration**
   (Site URL + Redirect URLs), and WebAuthn requires registering a passkey from the new origin.

## Note
The public site reads data from your Supabase project via its public `anon` key (this is normal and safe
as long as your Row Level Security policies only expose public read data). No secrets are stored here.
