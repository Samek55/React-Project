import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root   = join(__dirname, '..');
const srcDir = join(root, 'release', 'screenshots');
const outDir = join(root, 'release', 'store-listing');

mkdirSync(outDir, { recursive: true });

const W = 1080, H = 1920;

// ─── Palette ────────────────────────────────────────────────────────────────
const BG_A   = '#05180e';   // very dark forest green (top)
const BG_B   = '#0b2e1a';   // slightly lighter (bottom)
const ACCENT = '#2fe8a8';   // bright mint — highlight + chips
const WHITE  = '#ffffff';
const W62    = 'rgba(255,255,255,0.62)';
const W88    = 'rgba(255,255,255,0.88)';

// ─── Type scale ─────────────────────────────────────────────────────────────
const FS = 92;     // headline px
const LH = 110;    // headline line height

// ─── Screen data ────────────────────────────────────────────────────────────
const screens = [
  {
    file: '01-exchange.jpg.png', out: '01-exchange-store.png',
    tag:   'VEHICLE EXCHANGE',
    line1: 'Upgrade to',
    line2: 'EV Today',
    sub:   'Trade your fuel car for a modern electric vehicle — full support included',
    chips: ['Free Valuation', 'EV Expert Team', '3+ Cities'],
  },
  {
    file: '02-buy.jpg.png', out: '02-buy-store.png',
    tag:   'BUY USED CARS',
    line1: 'Find Your',
    line2: 'Perfect Car',
    sub:   'Browse 100% verified used cars with transparent pricing across Nepal',
    chips: ['Verified Listings', 'Best Prices', 'All Nepal'],
  },
  {
    file: '03-testdrive.jpg.png', out: '03-testdrive-store.png',
    tag:   'FREE TEST DRIVE',
    line1: 'Test Drive',
    line2: 'For Free',
    sub:   'Book a free test drive at your preferred location — no commitment needed',
    chips: ['100% Free', 'Expert Guide', 'All Models'],
  },
  {
    file: '04-sell.jpg.png', out: '04-sell-store.png',
    tag:   'SELL YOUR CAR',
    line1: 'Sell at the',
    line2: 'Best Price',
    sub:   'Quick valuation & honest market-based offer for your used vehicle',
    chips: ['Fast Valuation', 'Fair Pricing', 'Trusted Buyers'],
  },
  {
    file: '05-faqs.jpg.png', out: '05-faqs-store.png',
    tag:   'QUICK ANSWERS',
    line1: 'Get All Your',
    line2: 'Answers Fast',
    sub:   'Everything you need to know about exchange, buying & selling cars',
    chips: ['Exchange FAQs', 'Buy & Sell', 'Dealer Info'],
  },
  {
    file: '06-about.jpg.png', out: '06-about-store.png',
    tag:   'ABOUT NEPAL MOTOR',
    line1: "Nepal's #1",
    line2: 'Car Platform',
    sub:   '3+ branches · 100% verified listings · trusted by thousands nationwide',
    chips: ['3+ Branches', '100% Verified', '24/7 Support'],
  },
  {
    file: '07-dealers.jpg.png', out: '07-dealers-store.png',
    tag:   'DEALER NETWORK',
    line1: 'Grow Your',
    line2: 'Business',
    sub:   "Register free and connect with thousands of buyers across Nepal",
    chips: ['Free to Join', 'National Reach', 'Partner Support'],
  },
  {
    file: '08-glossary.jpg.png', out: '08-glossary-store.png',
    tag:   'AUTO DICTIONARY',
    line1: 'Know Every',
    line2: 'Car Term',
    sub:   'Master car, EV & market terminology from A to Z — simple & clear',
    chips: ['A–Z Car Terms', 'EV Guide', 'Market Terms'],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Build ───────────────────────────────────────────────────────────────────
async function make(s) {
  const srcPath = join(srcDir, s.file);
  const meta    = await sharp(srcPath).metadata();

  // Layout
  const ascH    = Math.round(FS * 0.78);
  const descH   = FS - ascH;
  const subFS   = 26;
  const subAscH = Math.round(subFS * 0.78);

  const tagTop  = 52;
  const tagH    = 44;
  const tagBot  = tagTop + tagH;

  const h1Y     = tagBot + 26 + ascH;           // headline line-1 baseline
  const h2Y     = h1Y + LH;                     // headline line-2 baseline
  const subY    = h2Y + descH + 24 + subAscH;   // subtitle baseline
  const chipTop = subY + (subFS - subAscH) + 26;
  const chipH   = 44;
  const phoneTop = chipTop + chipH + 38;

  const phoneAreaH = H - phoneTop - 44;
  const scale      = Math.min((W * 0.86) / meta.width, phoneAreaH / meta.height);
  const scaledW    = Math.round(meta.width  * scale);
  const scaledH    = Math.round(meta.height * scale);
  const phoneX     = Math.round((W - scaledW) / 2);
  const phoneY     = phoneTop;
  const phoneCX    = phoneX + scaledW / 2;
  const glowCY     = phoneY + Math.round(scaledH * 0.32);

  // Tag pill
  const tagW    = Math.max(s.tag.length * 12 + 64, 160);
  const tagX    = Math.round((W - tagW) / 2);
  const tagMidY = tagTop + Math.round(tagH * 0.68);

  // Feature chips (3 equal-width pills centred)
  const chipW   = 296;
  const chipGap = 16;
  const rowW    = 3 * chipW + 2 * chipGap;
  const rowX    = Math.round((W - rowW) / 2);
  const chipTY  = chipTop + Math.round(chipH * 0.66);

  // ── Background SVG (everything BEHIND the phone) ─────────────────────────
  const bgSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
<defs>

  <!-- Page gradient -->
  <linearGradient id="bg" x1="0" y1="0" x2="${Math.round(W * 0.55)}" y2="${H}" gradientUnits="userSpaceOnUse">
    <stop offset="0%"   stop-color="${BG_A}"/>
    <stop offset="100%" stop-color="${BG_B}"/>
  </linearGradient>

  <!-- Subtle dot-grid texture -->
  <pattern id="dots" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
    <circle cx="22" cy="22" r="1.3" fill="rgba(255,255,255,0.045)"/>
  </pattern>

  <!-- Colour blobs -->
  <radialGradient id="blobTL" gradientUnits="userSpaceOnUse"
      cx="-80" cy="300" r="580">
    <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0.22"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="blobBR" gradientUnits="userSpaceOnUse"
      cx="${W + 80}" cy="${H - 260}" r="520">
    <stop offset="0%"   stop-color="#7c3aed" stop-opacity="0.18"/>
    <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="blobMid" gradientUnits="userSpaceOnUse"
      cx="${W - 60}" cy="${Math.round(H * 0.38)}" r="340">
    <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>

  <!-- Phone halo (dual-tone: mint + purple offset) -->
  <radialGradient id="haloA" gradientUnits="userSpaceOnUse"
      cx="${phoneCX}" cy="${glowCY}" r="${Math.round(scaledW * 0.75)}">
    <stop offset="0%"   stop-color="${ACCENT}" stop-opacity="0.24"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="haloB" gradientUnits="userSpaceOnUse"
      cx="${Math.round(phoneCX + scaledW * 0.3)}" cy="${Math.round(glowCY + scaledH * 0.14)}" r="${Math.round(scaledW * 0.58)}">
    <stop offset="0%"   stop-color="#7c3aed" stop-opacity="0.16"/>
    <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
  </radialGradient>

  <!-- Ground shadow -->
  <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
    <stop offset="0%"   stop-color="#000000" stop-opacity="0.38"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
  </radialGradient>

</defs>

<!-- ── Base layers ── -->
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#dots)"/>

<!-- ── Large ring outlines (decorative) ── -->
<circle cx="${W + 140}" cy="-100"        r="600" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="2"/>
<circle cx="${W + 140}" cy="-100"        r="440" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1.5"/>
<circle cx="-120"       cy="${H + 100}"  r="540" fill="none" stroke="rgba(47,232,168,0.05)"   stroke-width="2"/>
<circle cx="-120"       cy="${H + 100}"  r="380" fill="none" stroke="rgba(47,232,168,0.035)"  stroke-width="1.5"/>

<!-- ── Colour blobs ── -->
<circle cx="-80"        cy="300"          r="580" fill="url(#blobTL)"/>
<circle cx="${W + 80}"  cy="${H - 260}"   r="520" fill="url(#blobBR)"/>
<circle cx="${W - 60}"  cy="${Math.round(H * 0.38)}" r="340" fill="url(#blobMid)"/>

<!-- ── Phone halo ── -->
<circle cx="${phoneCX}"                              cy="${glowCY}"                                r="${Math.round(scaledW * 0.75)}" fill="url(#haloA)"/>
<circle cx="${Math.round(phoneCX + scaledW * 0.3)}" cy="${Math.round(glowCY + scaledH * 0.14)}" r="${Math.round(scaledW * 0.58)}" fill="url(#haloB)"/>

<!-- ── Ground shadow ── -->
<ellipse cx="${phoneCX}" cy="${phoneY + scaledH + 18}"
         rx="${Math.round(scaledW * 0.36)}" ry="28" fill="url(#shadow)"/>

<!-- ── Feature tag (glass pill) ── -->
<rect x="${tagX}" y="${tagTop}" width="${tagW}" height="${tagH}" rx="${tagH / 2}"
      fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" stroke-width="1"/>
<text x="${W / 2}" y="${tagMidY}" text-anchor="middle"
      font-family="Arial,sans-serif" font-size="18" font-weight="700"
      fill="${W88}" letter-spacing="3.5">${esc(s.tag)}</text>

<!-- ── Headline (white line 1, mint line 2) ── -->
<text x="${W / 2}" y="${h1Y}" text-anchor="middle"
      font-family="Arial Black,Arial,sans-serif" font-size="${FS}" font-weight="900"
      fill="${WHITE}" letter-spacing="-1">${esc(s.line1)}</text>
<text x="${W / 2}" y="${h2Y}" text-anchor="middle"
      font-family="Arial Black,Arial,sans-serif" font-size="${FS}" font-weight="900"
      fill="${ACCENT}" letter-spacing="-1">${esc(s.line2)}</text>

<!-- ── Subtitle ── -->
<text x="${W / 2}" y="${subY}" text-anchor="middle"
      font-family="Arial,sans-serif" font-size="${subFS}" font-weight="400"
      fill="${W62}">${esc(s.sub)}</text>

<!-- ── Feature chips ── -->
${s.chips.map((chip, i) => {
  const cx = rowX + i * (chipW + chipGap);
  return `<rect x="${cx}" y="${chipTop}" width="${chipW}" height="${chipH}" rx="${chipH / 2}"
      fill="rgba(47,232,168,0.09)" stroke="rgba(47,232,168,0.32)" stroke-width="1"/>
<text x="${cx + chipW / 2}" y="${chipTY}" text-anchor="middle"
      font-family="Arial,sans-serif" font-size="17" font-weight="600"
      fill="rgba(255,255,255,0.82)" letter-spacing="0.5">${esc(chip)}</text>`;
}).join('\n')}

</svg>`;

  // ── Overlay SVG (bottom vignette + wordmark, composited ABOVE phone) ────────
  const overlaySvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stop-color="${BG_B}" stop-opacity="0"/>
    <stop offset="100%" stop-color="${BG_B}" stop-opacity="0.78"/>
  </linearGradient>
</defs>
<rect x="0" y="${H - 230}" width="${W}" height="230" fill="url(#fade)"/>
<text x="${W / 2}" y="${H - 26}" text-anchor="middle"
      font-family="Arial,sans-serif" font-size="19" font-weight="700"
      fill="rgba(255,255,255,0.32)" letter-spacing="6">NEPAL MOTOR</text>
</svg>`;

  // ── Sharp composite ──────────────────────────────────────────────────────────
  const phoneBuf   = await sharp(srcPath).resize(scaledW, scaledH).toBuffer();
  const overlayBuf = Buffer.from(overlaySvg);

  const mid = await sharp(Buffer.from(bgSvg))
    .composite([{ input: phoneBuf, left: phoneX, top: phoneY }])
    .toBuffer();

  await sharp(mid)
    .composite([{ input: overlayBuf }])
    .png()
    .toFile(join(outDir, s.out));

  console.log(`✓ ${s.out}   phone ${scaledW}×${scaledH}   phoneTop=${phoneTop}`);
}

for (const s of screens) {
  await make(s);
}
console.log(`\nDone → release/store-listing/   (${screens.length} images · 1080×1920)`);
