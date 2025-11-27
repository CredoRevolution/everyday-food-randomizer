# Everyday Food Randomizer

This is a Vue 3 + TypeScript + Vite application.

## Deploy to GitHub Pages

This project is configured to deploy to GitHub Pages using the `gh-pages` npm package.

Prerequisites:
- The repo is pushed to GitHub at `https://github.com/<YOUR_GH_USERNAME>/everyday-food-randomizer`.
- GitHub Pages is enabled for the repository (Settings → Pages → Source: Deploy from a branch → Branch: `gh-pages`).

Commands:
- Build the project: `npm run build`
- Deploy to GitHub Pages: `npm run deploy`

Notes:
- The Vite `base` is set to `/everyday-food-randomizer/` in `vite.config.ts` so assets resolve correctly on Pages.
- After build, `index.html` is copied to `404.html` to support SPA routing on GitHub Pages.
