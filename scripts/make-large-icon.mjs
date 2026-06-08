import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

await sharp(join(root, 'assets', 'nm-logo-icon.png'))
  .resize(256, 256, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toFile(join(root, 'assets', 'nm-logo-large-icon.png'));

console.log('Large icon created: assets/nm-logo-large-icon.png (256x256)');
