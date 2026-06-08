import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Read the existing logo and convert to white-on-transparent for Android notification icon
const logoPath = join(root, 'assets', 'nm-logo-adaptive-fg.png');
const outputPath = join(root, 'assets', 'nm-notification-icon.png');

await sharp(logoPath)
  .resize(96, 96)
  // Make all non-white pixels white, and make the white background transparent
  // by: threshold the image to get the shape, then output white on alpha
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;
    const output = Buffer.alloc(width * height * 4);

    for (let i = 0; i < width * height; i++) {
      const r = data[i * channels];
      const g = data[i * channels + 1];
      const b = data[i * channels + 2];
      // If pixel is close to white (background), make transparent
      const isBackground = r > 220 && g > 220 && b > 220;
      const idx = i * 4;
      if (isBackground) {
        output[idx] = 0;
        output[idx + 1] = 0;
        output[idx + 2] = 0;
        output[idx + 3] = 0; // transparent
      } else {
        // Non-background pixels → white (Android tints them anyway)
        output[idx] = 255;
        output[idx + 1] = 255;
        output[idx + 2] = 255;
        output[idx + 3] = 255; // opaque
      }
    }

    return sharp(output, { raw: { width, height, channels: 4 } })
      .png()
      .toFile(outputPath);
  });

console.log('Notification icon created at assets/nm-notification-icon.png');
