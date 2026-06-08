import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// 1440x720 notification banner image
const W = 1440, H = 720;

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f4c3a;stop-opacity:1" />
      <stop offset="60%" style="stop-color:#1a6b5a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#22897a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.12" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.04" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="1300" cy="80"  r="180" fill="#ffffff" fill-opacity="0.04"/>
  <circle cx="1380" cy="600" r="140" fill="#ffffff" fill-opacity="0.05"/>
  <circle cx="60"   cy="600" r="200" fill="#ffffff" fill-opacity="0.03"/>

  <!-- Card panel on right -->
  <rect x="780" y="60" width="580" height="600" rx="32" fill="url(#card)" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5"/>

  <!-- Left: Logo area circle -->
  <circle cx="340" cy="320" r="210" fill="#ffffff" fill-opacity="0.07"/>
  <circle cx="340" cy="320" r="170" fill="#ffffff" fill-opacity="0.06"/>

  <!-- Nepal Motor logo paths (circle + M shape) white -->
  <g transform="translate(195, 175) scale(2.9)" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="50" cy="50" r="42"/>
    <polyline points="8,56 20,68 36,34 46,52 60,26 92,52"/>
  </g>

  <!-- Welcome text -->
  <text x="80" y="565" font-family="Arial, sans-serif" font-size="22" fill="#a8d5c8" letter-spacing="4">NEPAL MOTOR</text>

  <!-- Right card content -->
  <!-- Tag -->
  <rect x="820" y="110" width="160" height="36" rx="18" fill="#ffffff" fill-opacity="0.15"/>
  <text x="900" y="133" font-family="Arial, sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="600" letter-spacing="1">WELCOME</text>

  <!-- Headline -->
  <text x="820" y="215" font-family="Arial, sans-serif" font-size="48" fill="#ffffff" font-weight="800">Your Journey</text>
  <text x="820" y="270" font-family="Arial, sans-serif" font-size="48" fill="#ffffff" font-weight="800">to EV Starts</text>
  <text x="820" y="325" font-family="Arial, sans-serif" font-size="48" fill="#a8e6cf" font-weight="800">Here.</text>

  <!-- Divider -->
  <rect x="820" y="355" width="60" height="4" rx="2" fill="#a8e6cf"/>

  <!-- Subtext -->
  <text x="820" y="405" font-family="Arial, sans-serif" font-size="22" fill="#d4f0e8">Exchange · Sell · Buy Used Cars</text>
  <text x="820" y="440" font-family="Arial, sans-serif" font-size="20" fill="#a8d5c8">Get the best deal in Nepal today.</text>

  <!-- CTA Button -->
  <rect x="820" y="490" width="260" height="60" rx="30" fill="#a8e6cf"/>
  <text x="950" y="527" font-family="Arial, sans-serif" font-size="20" fill="#0f4c3a" text-anchor="middle" font-weight="700">Get Started Now</text>

  <!-- Small car icon (simple line art) -->
  <g transform="translate(110, 260)" fill="none" stroke="white" stroke-opacity="0.3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 10 40 L 20 15 Q 22 10 30 10 L 90 10 Q 98 10 100 15 L 110 40 Z"/>
    <rect x="5" y="40" width="110" height="25" rx="6"/>
    <circle cx="30" cy="68" r="10"/>
    <circle cx="90" cy="68" r="10"/>
    <path d="M 25 10 L 30 40"/>
    <path d="M 60 10 L 60 40"/>
    <path d="M 95 10 L 90 40"/>
  </g>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(join(root, 'assets', 'notification-welcome-banner.png'));

console.log('Created: assets/notification-welcome-banner.png (1440x720)');
