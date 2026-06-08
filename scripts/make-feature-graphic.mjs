import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root   = join(__dirname, '..');
const outDir = join(root, 'release', 'store-listing');
mkdirSync(outDir, { recursive: true });

// ─── Canvas ──────────────────────────────────────────────────────────────────
const W = 1024, H = 500;

// ─── Palette (same as store screenshots) ─────────────────────────────────────
const BG_A   = '#05180e';
const BG_B   = '#0b2e1a';
const ACCENT = '#2fe8a8';
const WHITE  = '#ffffff';
const W88    = 'rgba(255,255,255,0.88)';
const W60    = 'rgba(255,255,255,0.60)';

// ─── Left column — brand identity (x: 0 – 480, centred at x=240) ─────────────
const LCX = 240;   // left-column centre x  (logo + text all centred here)

// Logo white disc
const LCY  = 138;  // logo disc centre y
const LR   = 54;   // disc radius  (was 72)
const LSZ  = 96;   // logo image size (was 128)

// Typography
const BRAND_FS = 44, BRAND_LH = 52;  // was 56/66
const SUB_FS   = 18;                  // was 22

// Vertical layout — content height 368 px, top/bottom margin = 66 px each
// logo block (144) + gap(20) + NEPAL(56) + gap(10) + MOTOR(56) + gap(12) + sub(22) + gap(16) + chips(32)
const H1_Y    = LCY + LR + 20 + Math.round(BRAND_FS * 0.78);          // 274
const H2_Y    = H1_Y + BRAND_LH;                                        // 340
const SUB_Y   = H2_Y + Math.round(BRAND_FS * 0.22) + 12 + Math.round(SUB_FS * 0.78); // 381
const CHIP_TOP = SUB_Y + Math.round(SUB_FS * 0.22) + 16;               // 402
const CHIP_H  = 32;

// Feature chips (3, centred at LCX)
const CHIPS  = ['Exchange to EV', 'Buy & Sell Cars', 'Find Dealers'];
const CHW    = 136, CHG = 8;
const CHROWW = CHIPS.length * CHW + (CHIPS.length - 1) * CHG;  // 424 px
const CHROWX = Math.round(LCX - CHROWW / 2);                   // 28
const CHTY   = CHIP_TOP + Math.round(CHIP_H * 0.66);

// Glass location tag (above logo)
const TAG_TEXT = 'KATHMANDU · NEPAL';
const TAG_W    = Math.max(TAG_TEXT.length * 11 + 56, 140);
const TAG_H    = 34;
const TAG_TOP  = LCY - LR - TAG_H - 18;
const TAG_X    = Math.round(LCX - TAG_W / 2);
const TAG_MY   = TAG_TOP + Math.round(TAG_H * 0.68);

// ─── Right column — two phone screenshots ────────────────────────────────────
// Phones are composited as separate Sharp layers; their halos live in the SVG
const BACK_W  = 185, BACK_H  = 351;   // back phone (slightly smaller)
const BACK_X  = 524, BACK_Y  = 75;

const FRONT_W = 218, FRONT_H = 413;   // front phone (larger, main focus)
const FRONT_X = 744, FRONT_Y = 43;

// Halo focal points for each phone
const backHCX  = Math.round(BACK_X  + BACK_W  / 2);
const backHCY  = Math.round(BACK_Y  + BACK_H  * 0.35);
const frontHCX = Math.round(FRONT_X + FRONT_W / 2);
const frontHCY = Math.round(FRONT_Y + FRONT_H * 0.35);

// ─── Helpers ─────────────────────────────────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;');
}

// ─── Build ───────────────────────────────────────────────────────────────────
async function make() {
  const logoPath  = join(root, 'assets', 'nm-logo-large-icon.png');
  const backPath  = join(root, 'release', 'screenshots', '01-exchange.jpg.png');
  const frontPath = join(root, 'release', 'screenshots', '06-about.jpg.png');

  // 1 ── Circular-crop the Nepal Motor logo ───────────────────────────────────
  const roundLogo = await sharp(logoPath)
    .resize(LSZ, LSZ)
    .composite([{
      input: Buffer.from(
        `<svg width="${LSZ}" height="${LSZ}" xmlns="http://www.w3.org/2000/svg">
           <circle cx="${LSZ / 2}" cy="${LSZ / 2}" r="${LSZ / 2}" fill="white"/>
         </svg>`
      ),
      blend: 'dest-in',
    }])
    .png()
    .toBuffer();

  // 2 ── Resize phone screenshots ─────────────────────────────────────────────
  const backBuf  = await sharp(backPath) .resize(BACK_W,  BACK_H,  { fit: 'fill' }).toBuffer();
  const frontBuf = await sharp(frontPath).resize(FRONT_W, FRONT_H, { fit: 'fill' }).toBuffer();

  // 3 ── Background SVG (everything drawn BEHIND the photos) ──────────────────
  const bgSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
<defs>

  <linearGradient id="bg" x1="0" y1="0" x2="${Math.round(W * 0.7)}" y2="${H}" gradientUnits="userSpaceOnUse">
    <stop offset="0%"   stop-color="${BG_A}"/>
    <stop offset="100%" stop-color="${BG_B}"/>
  </linearGradient>

  <pattern id="dots" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
    <circle cx="22" cy="22" r="1.3" fill="rgba(255,255,255,0.045)"/>
  </pattern>

  <!-- Colour blobs -->
  <radialGradient id="blobTL" gradientUnits="userSpaceOnUse" cx="-60" cy="160" r="380">
    <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0.22"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="blobBR" gradientUnits="userSpaceOnUse" cx="${W + 60}" cy="${H + 40}" r="420">
    <stop offset="0%"   stop-color="#7c3aed" stop-opacity="0.20"/>
    <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="blobMid" gradientUnits="userSpaceOnUse" cx="${Math.round(W * 0.75)}" cy="${Math.round(H * 0.28)}" r="270">
    <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0.09"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>

  <!-- Logo glow + disc edge -->
  <radialGradient id="logoHalo" gradientUnits="userSpaceOnUse" cx="${LCX}" cy="${LCY}" r="${Math.round(LR * 2.2)}">
    <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0.30"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="discGlow" gradientUnits="userSpaceOnUse" cx="${LCX}" cy="${LCY}" r="${LR + 14}">
    <stop offset="55%"  stop-color="${ACCENT}" stop-opacity="0"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0.40"/>
  </radialGradient>

  <!-- Phone halos -->
  <radialGradient id="haloBack" gradientUnits="userSpaceOnUse" cx="${backHCX}" cy="${backHCY}" r="${Math.round(BACK_W * 0.9)}">
    <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0.18"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="haloFrontA" gradientUnits="userSpaceOnUse" cx="${frontHCX}" cy="${frontHCY}" r="${Math.round(FRONT_W * 1.0)}">
    <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0.26"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="haloFrontB" gradientUnits="userSpaceOnUse" cx="${Math.round(frontHCX + FRONT_W * 0.28)}" cy="${Math.round(frontHCY + FRONT_H * 0.18)}" r="${Math.round(FRONT_W * 0.72)}">
    <stop offset="0%"   stop-color="#7c3aed" stop-opacity="0.16"/>
    <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
  </radialGradient>

  <!-- Ground shadows under phones -->
  <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
    <stop offset="0%"   stop-color="#000000" stop-opacity="0.35"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
  </radialGradient>

</defs>

<!-- Base -->
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#dots)"/>

<!-- Ring outlines -->
<circle cx="${W + 100}" cy="-50"       r="480" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="2"/>
<circle cx="${W + 100}" cy="-50"       r="340" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1.5"/>
<circle cx="-80"        cy="${H + 60}" r="400" fill="none" stroke="rgba(47,232,168,0.055)"  stroke-width="1.5"/>

<!-- Colour blobs -->
<circle cx="-60"                        cy="160"                        r="380" fill="url(#blobTL)"/>
<circle cx="${W + 60}"                  cy="${H + 40}"                  r="420" fill="url(#blobBR)"/>
<circle cx="${Math.round(W * 0.75)}"    cy="${Math.round(H * 0.28)}"   r="270" fill="url(#blobMid)"/>

<!-- Phone halos (behind phones) -->
<circle cx="${backHCX}"                              cy="${backHCY}"                              r="${Math.round(BACK_W  * 0.9)}" fill="url(#haloBack)"/>
<circle cx="${frontHCX}"                             cy="${frontHCY}"                             r="${Math.round(FRONT_W * 1.0)}" fill="url(#haloFrontA)"/>
<circle cx="${Math.round(frontHCX + FRONT_W * 0.28)}" cy="${Math.round(frontHCY + FRONT_H * 0.18)}" r="${Math.round(FRONT_W * 0.72)}" fill="url(#haloFrontB)"/>

<!-- Ground shadows -->
<ellipse cx="${BACK_X  + Math.round(BACK_W  / 2)}" cy="${BACK_Y  + BACK_H  + 10}" rx="${Math.round(BACK_W  * 0.32)}" ry="14" fill="url(#groundShadow)"/>
<ellipse cx="${FRONT_X + Math.round(FRONT_W / 2)}" cy="${FRONT_Y + FRONT_H + 10}" rx="${Math.round(FRONT_W * 0.32)}" ry="16" fill="url(#groundShadow)"/>

<!-- Divider -->
<line x1="492" y1="68" x2="492" y2="432" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

<!-- Logo: halo + white disc -->
<circle cx="${LCX}" cy="${LCY}" r="${Math.round(LR * 2.2)}" fill="url(#logoHalo)"/>
<circle cx="${LCX}" cy="${LCY}" r="${LR}"      fill="${WHITE}"/>
<circle cx="${LCX}" cy="${LCY}" r="${LR + 10}" fill="url(#discGlow)"/>

<!-- Brand name: NEPAL (white) + MOTOR (mint) -->
<text x="${LCX}" y="${H1_Y}" text-anchor="middle"
      font-family="Arial Black,Arial,sans-serif" font-size="${BRAND_FS}" font-weight="900"
      fill="${WHITE}" letter-spacing="-1">NEPAL</text>
<text x="${LCX}" y="${H2_Y}" text-anchor="middle"
      font-family="Arial Black,Arial,sans-serif" font-size="${BRAND_FS}" font-weight="900"
      fill="${ACCENT}" letter-spacing="-1">MOTOR</text>

<!-- Tagline -->
<text x="${LCX}" y="${SUB_Y}" text-anchor="middle"
      font-family="Arial,sans-serif" font-size="${SUB_FS}" font-weight="400"
      fill="${W60}">Nepal&#39;s Most Trusted Car Platform</text>

<!-- Feature chips -->
${CHIPS.map((chip, i) => {
  const cx = CHROWX + i * (CHW + CHG);
  return `<rect x="${cx}" y="${CHIP_TOP}" width="${CHW}" height="${CHIP_H}" rx="${CHIP_H / 2}"
      fill="rgba(47,232,168,0.09)" stroke="rgba(47,232,168,0.32)" stroke-width="1"/>
<text x="${cx + CHW / 2}" y="${CHTY}" text-anchor="middle"
      font-family="Arial,sans-serif" font-size="14" font-weight="600"
      fill="rgba(255,255,255,0.82)" letter-spacing="0.3">${esc(chip)}</text>`;
}).join('\n')}

</svg>`;

  // 4 ── Overlay SVG (front-phone glow border + right vignette, drawn ABOVE photos) ─
  const overlaySvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="rv" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%"   stop-color="${BG_B}" stop-opacity="0"/>
    <stop offset="100%" stop-color="${BG_B}" stop-opacity="0.55"/>
  </linearGradient>
</defs>
<!-- Right-edge vignette keeps canvas from looking cut off -->
<rect x="${W - 88}" y="0" width="88" height="${H}" fill="url(#rv)"/>
</svg>`;

  // 5 ── Composite: bg → logo → back phone → front phone → overlay ─────────────
  const logoX = Math.round(LCX - LSZ / 2);
  const logoY = Math.round(LCY - LSZ / 2);

  const s1 = await sharp(Buffer.from(bgSvg))
    .composite([{ input: roundLogo, left: logoX, top: logoY }])
    .toBuffer();

  const s2 = await sharp(s1)
    .composite([{ input: backBuf,  left: BACK_X,  top: BACK_Y  }])
    .toBuffer();

  const s3 = await sharp(s2)
    .composite([{ input: frontBuf, left: FRONT_X, top: FRONT_Y }])
    .toBuffer();

  await sharp(s3)
    .composite([{ input: Buffer.from(overlaySvg) }])
    .flatten({ background: { r: 5, g: 24, b: 14 } })  // remove alpha — Play Store requirement
    .png()
    .toFile(join(outDir, 'feature-graphic.png'));

  console.log('✓ feature-graphic.png  (1024×500)');
  console.log('  Upload: Play Console → Store listing → Featured graphic');
}

make().catch(e => { console.error(e); process.exit(1); });
