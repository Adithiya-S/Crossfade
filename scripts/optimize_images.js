
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');

// Configuration
const MAX_WIDTH = 1920;
const QUALITY = 80;

const processDirectory = async (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
            await optimizeImage(fullPath);
        }
    }
};

const optimizeImage = async (filePath) => {
    try {
        const metadata = await sharp(filePath).metadata();
        const stats = fs.statSync(filePath);

        // Skip small files (e.g. < 200KB) unless dimensions are huge
        if (stats.size < 200 * 1024 && metadata.width < 2000) {
            console.log(`Skipping small file: ${path.basename(filePath)}`);
            return;
        }

        console.log(`Optimizing: ${path.basename(filePath)} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

        const buffer = await sharp(filePath)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality: QUALITY })
            .toBuffer();

        fs.writeFileSync(filePath, buffer);

        const newStats = fs.statSync(filePath);
        console.log(`Saved: ${(newStats.size / 1024 / 1024).toFixed(2)} MB`);
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }
};

console.log("Starting image optimization...");
processDirectory(ASSETS_DIR).then(() => {
    console.log("Validation complete.");
});
