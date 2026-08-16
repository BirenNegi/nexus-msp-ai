# NEXUS MSP AI — Prototype

Interactive prototype of an AI-native MSP operations platform (Phase 1: Overview,
AI Command Center, Customers, Devices, Monitoring, Incidents, Tickets — fully wired,
including the AI Action Gateway approval → execution → verification workflow).

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Deploy publicly on GitHub Pages

1. Create a new **public** repo on GitHub, e.g. `nexus-msp-ai`.
2. If your repo name is NOT `nexus-msp-ai`, edit `vite.config.js` and change
   `base: "/nexus-msp-ai/"` to `base: "/your-repo-name/"`.
3. Push this folder to the repo:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: NEXUS MSP AI prototype"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nexus-msp-ai.git
   git push -u origin main
   ```

4. On GitHub: go to **Settings → Pages** → under "Build and deployment", set
   **Source** to **GitHub Actions**. (You don't need to pick a branch/folder —
   the workflow in `.github/workflows/deploy.yml` handles the build.)
5. Go to the **Actions** tab and confirm the "Deploy to GitHub Pages" run finishes
   green (takes ~1 minute).
6. Your site will be live at:

   ```
   https://<your-username>.github.io/nexus-msp-ai/
   ```

Every future `git push` to `main` will automatically rebuild and redeploy.

## Notes

- This uses **Vite + React**, not Create React App, for faster builds.
- `lucide-react` (icons) is the only external dependency beyond React itself.
- All data is mocked client-side — nothing is sent to any backend, so it's safe
  to host publicly as-is.
