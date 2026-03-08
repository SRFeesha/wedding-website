import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load .env.local into process.env so the API handler can read them
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      {
        name: "api-dev-server",
        configureServer(server) {
          server.middlewares.use("/api/rsvp", async (req, res) => {
            if (req.method !== "POST") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Method not allowed" }));
              return;
            }

            const chunks = [];
            req.on("data", (chunk) => chunks.push(chunk));
            req.on("end", async () => {
              try {
                req.body = JSON.parse(Buffer.concat(chunks).toString());

                const { default: handler } = await import("./api/rsvp.js");

                // Adapt Node http res to match Vercel's res.status().json() API
                res.status = (code) => {
                  res.statusCode = code;
                  return res;
                };
                res.json = (data) => {
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(data));
                };

                await handler(req, res);
              } catch (err) {
                console.error("[api/rsvp]", err);
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Internal server error" }));
              }
            });
          });
        },
      },
    ],
  };
});
