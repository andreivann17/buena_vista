const fs = require("fs");
const path = require("path");

const TEMP_MODELS_DIR = path.join(__dirname, "../uploads/tempmodels");
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 horas

function cleanOldTempModels() {
  if (!fs.existsSync(TEMP_MODELS_DIR)) return;

  const now = Date.now();

  fs.readdirSync(TEMP_MODELS_DIR).forEach((folder) => {
    const fullPath = path.join(TEMP_MODELS_DIR, folder);

    try {
      const stats = fs.statSync(fullPath);
      const age = now - stats.ctimeMs;

      if (age > MAX_AGE_MS) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`🧹 Temp model deleted: ${folder}`);
      }
    } catch (err) {
      console.error(`❌ Error checking folder ${folder}:`, err);
    }
  });
}

module.exports = cleanOldTempModels;
