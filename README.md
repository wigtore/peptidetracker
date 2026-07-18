# Peptide Tracker

A private two-profile dose tracker, weigh-in log, and reconstitution calculator
for Victor and Jen. Deploys to Netlify from GitHub, with cross-device sync via
Netlify Blobs (no third-party database account needed).

## Deploy (one time, ~5 minutes)

1. **Push this folder to GitHub.** Create a new repository (private is fine),
   then from inside this folder:

   ```
   git init
   git add .
   git commit -m "Peptide tracker"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/peptide-tracker.git
   git push -u origin main
   ```

2. **Connect it to Netlify.** In Netlify: *Add new site → Import an existing
   project → GitHub*, pick the repo, and click Deploy. The settings are read
   automatically from `netlify.toml` — no build command changes needed.

3. **Open your new link** (something.netlify.app). You can rename it under
   *Site settings → Change site name*.

## First run — set your household code

The first time each of you opens the site, it asks for a **household code**.
Pick any private phrase (at least 4 characters) and use the *same code on both
phones* — that's what links your devices to the same data. Anyone with the
link *and* the code can see the data, so treat the code like a password.

After that, everything syncs automatically: doses marked on one phone show up
on the other within about 30 seconds (or instantly on refresh).

## Updating the app later

Edit `public/index.html`, commit, and push — Netlify redeploys automatically.
