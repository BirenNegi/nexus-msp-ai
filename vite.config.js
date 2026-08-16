import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: base must match your GitHub repo name exactly, wrapped in slashes.
// e.g. if your repo is github.com/yourname/nexus-msp-ai -> base: "/nexus-msp-ai/"
// If you deploy to a custom domain or a user/org page (yourname.github.io), set base: "/"
export default defineConfig({
  plugins: [react()],
  base: "/nexus-msp-ai/",
});
