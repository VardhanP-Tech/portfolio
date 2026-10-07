# Vishnu portfolio (React + TypeScript + Vite)

Dark navy theme with a soft animated blue background, lift-on-hover cards and a cursor glow.

## Run locally
    npm install
    npm run dev

## Deploy to GitHub Pages
1. Push all of these files to the `main` branch of your repo, keeping the folders (`src/`, `.github/`).
2. In the repo, go to Settings > Pages and set Source to "GitHub Actions".
3. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push.

## Edit your content
Projects, skills and contact details live in `src/data.ts`. Add a `link` to any project to show a GitHub link.

## Motion
The "Motion on/off" button in the header controls the background and cube animations. It defaults to your
device's reduced-motion setting, and the visitor's choice is remembered.
