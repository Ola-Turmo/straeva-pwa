import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import http from "node:http";

const root = process.cwd();
const port = process.env.PORT || 4173;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  const isAppRoute = pathname === "/app" || pathname === "/app/";
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, safePath === "/" ? "index.html" : safePath);

  if (isAppRoute) {
    filePath = join(root, "app.html");
  }

  if (!existsSync(filePath)) {
    filePath = isAppRoute ? join(root, "app.html") : join(root, "index.html");
  }

  try {
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      filePath = join(filePath, "index.html");
    }
  } catch {
    filePath = join(root, "index.html");
  }

  if (!existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const ext = extname(filePath);
  const isServiceWorker = filePath.endsWith("sw.js");

  res.writeHead(200, {
    "Cache-Control": isServiceWorker ? "no-cache" : "public, max-age=0, must-revalidate",
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Service-Worker-Allowed": "/"
  });

  createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
  console.log(`Stræva PWA running at http://localhost:${port}`);
});
