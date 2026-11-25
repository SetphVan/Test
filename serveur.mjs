// Petit serveur, sans dépendance, pour ouvrir l'app : npm start, puis http://localhost:3006
// (un navigateur refuse les modules JavaScript ouverts en double-cliquant sur index.html).
// Il n'écoute que sur cette machine (127.0.0.1) et ne sert jamais un fichier ou un dossier caché (.git, .opencode).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = fileURLToPath(new URL(".", import.meta.url));
const PORT = Number(process.env.PORT) || 3006;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

createServer(async (req, res) => {
  let chemin;
  try {
    chemin = decodeURIComponent(new URL(req.url, "http://x").pathname);
  } catch {
    return res
      .writeHead(400, { "Content-Type": "text/plain; charset=utf-8" })
      .end("Adresse invalide");
  }
  if (chemin.includes("\\") || chemin.split("/").some((segment) => segment.startsWith("."))) {
    return res
      .writeHead(403, { "Content-Type": "text/plain; charset=utf-8" })
      .end("Interdit");
  }
  const fichier = normalize(
    join(RACINE, chemin === "/" ? "index.html" : chemin),
  );
  if (!fichier.startsWith(RACINE)) return res.writeHead(403).end();
  try {
    const contenu = await readFile(fichier);
    res
      .writeHead(200, {
        "Content-Type": TYPES[extname(fichier)] ?? "application/octet-stream",
      })
      .end(contenu);
  } catch {
    res
      .writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
      .end("Introuvable");
  }
}).listen(PORT, "127.0.0.1", () =>
  console.log(
    `La Cagnotte tourne sur http://localhost:${PORT}  (Ctrl+C pour arrêter)`,
  ),
);
