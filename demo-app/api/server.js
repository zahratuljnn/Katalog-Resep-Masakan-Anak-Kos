// API manual Resep Anak Kos (tanpa library tambahan, cukup Node.js)
// Jalankan: node api/server.js   (atau: npm run api)
//
// Endpoint:
//   GET /recipes                      -> semua resep
//   GET /recipes?q=telur              -> cari berdasarkan nama
//   GET /recipes?category=nasi        -> filter kategori
//   GET /recipes/:id                  -> satu resep
//   GET /images/<nama-file>           -> foto dari folder assets/images
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = process.env.PORT || 3000;
const IMAGE_DIR = path.join(__dirname, "..", "assets", "images");
const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

// Data dibaca setiap request, jadi edit recipes.json langsung terlihat tanpa restart server
const loadRecipes = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "recipes.json"), "utf-8"));

function sendJson(res, status, success, data, message) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify({ success, data, message }));
}

// Mengubah nama file gambar menjadi URL lengkap (atau null jika tidak ada foto)
function withImageUrl(recipe, host) {
  const { image, ...rest } = recipe;
  const exists =
    image && fs.existsSync(path.join(IMAGE_DIR, path.basename(image)));
  return {
    ...rest,
    imageUrl: exists ? `http://${host}/images/${image}` : null,
  };
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname.split("/").filter(Boolean);
  console.log(new Date().toLocaleTimeString(), req.method, req.url);

  if (req.method !== "GET") {
    return sendJson(res, 405, false, null, "Hanya mendukung GET");
  }

  if (parts[0] === "recipes" && parts.length === 1) {
    const q = (url.searchParams.get("q") || "").toLowerCase().trim();
    const category = (url.searchParams.get("category") || "")
      .toLowerCase()
      .trim();
    const result = loadRecipes()
      .filter((r) => !q || r.name.toLowerCase().includes(q))
      .filter((r) => !category || r.category === category)
      .map((r) => withImageUrl(r, req.headers.host));
    return sendJson(res, 200, true, result, `${result.length} resep ditemukan`);
  }

  if (parts[0] === "recipes" && parts.length === 2) {
    const found = loadRecipes().find((r) => r.id === parts[1]);
    if (!found) return sendJson(res, 404, false, null, "Resep tidak ditemukan");
    return sendJson(
      res,
      200,
      true,
      withImageUrl(found, req.headers.host),
      "OK",
    );
  }

  if (parts[0] === "images" && parts.length === 2) {
    const file = path.join(IMAGE_DIR, path.basename(parts[1])); // basename: cegah ../
    if (!fs.existsSync(file))
      return sendJson(res, 404, false, null, "Gambar tidak ada");
    res.writeHead(200, {
      "Content-Type":
        MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
    });
    return fs.createReadStream(file).pipe(res);
  }

  sendJson(res, 404, false, null, "Endpoint tidak ditemukan");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`API resep berjalan di port ${PORT}`);
  console.log(
    "Isi API_BASE_URL di src/constants/config.ts dengan salah satu alamat ini:",
  );
  for (const list of Object.values(os.networkInterfaces())) {
    for (const net of list || []) {
      if (net.family === "IPv4" && !net.internal)
        console.log(`  http://${net.address}:${PORT}`);
    }
  }
  console.log("  http://10.0.2.2:" + PORT + "   (khusus emulator Android)");
});
