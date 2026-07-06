/**
 * Generates branded placeholder SVGs (navy/blue gradient + truck motif + label)
 * so the site renders before real photography is dropped in. Re-run any time:
 *   node scripts/gen-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

const NAVY = '#0a1a2b';
const NAVY2 = '#13314e';
const ACCENT = '#2e5bff';
const SKY = '#38bdf8';

function svg({ label, sub = '', w = 1200, h = 900, accent = ACCENT }) {
  const id = Math.abs(hash(label)) % 1000;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}">
  <defs>
    <linearGradient id="g${id}" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${NAVY2}"/>
    </linearGradient>
    <radialGradient id="r${id}" cx="0.8" cy="0.15" r="0.9">
      <stop stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${id})"/>
  <rect width="${w}" height="${h}" fill="url(#r${id})"/>
  <path d="M0 ${h * 0.7} C ${w * 0.25} ${h * 0.7}, ${w * 0.3} ${h * 0.45}, ${w * 0.55} ${h * 0.45} S ${w * 0.85} ${h * 0.25}, ${w + 40} ${h * 0.25}"
        stroke="${accent}" stroke-opacity="0.5" stroke-width="3" fill="none" stroke-dasharray="2 18" stroke-linecap="round"/>
  <g transform="translate(${w * 0.08} ${h * 0.62})" fill="#fff" opacity="0.92">
    <rect x="0" y="0" width="86" height="52" rx="5"/>
    <path d="M86 16 h34 l22 22 v14 h-56 z"/>
    <circle cx="26" cy="62" r="13" fill="#fff"/><circle cx="26" cy="62" r="5" fill="${NAVY}"/>
    <circle cx="116" cy="62" r="13" fill="#fff"/><circle cx="116" cy="62" r="5" fill="${NAVY}"/>
    <circle cx="120" cy="40" r="6" fill="${accent}"/>
  </g>
  <text x="${w * 0.5}" y="${h * 0.5}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${Math.round(w / 22)}" font-weight="700" fill="#ffffff">${esc(label)}</text>
  ${sub ? `<text x="${w * 0.5}" y="${h * 0.5 + Math.round(w / 22)}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${Math.round(w / 48)}" fill="#93a6ba">${esc(sub)}</text>` : ''}
</svg>`;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h;
}
function write(rel, content) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log('wrote', rel);
}

// Divisions
const divisions = [
  ['bigadtruck', 'Bigadtruck — Core', ACCENT],
  ['buzzmore', 'Buzzmore Media', SKY],
  ['dpr', 'DPR Creation', ACCENT],
  ['architecture', 'Architectural Services', SKY],
  ['project-management', 'Project Management', ACCENT],
];
for (const [slug, label, accent] of divisions) {
  write(`divisions/${slug}.svg`, svg({ label, sub: 'Bigadtruck Group', w: 1200, h: 800, accent }));
}

// Work covers
const work = [
  ['retail-relaunch', 'Retail Relaunch', ACCENT],
  ['admissions', 'University Admissions', SKY],
  ['govt-awareness', 'Public Awareness', SKY],
  ['dealership', 'Dealership Social', SKY],
  ['proptech', 'Property Portal', ACCENT],
  ['architecture', 'Mixed-Use Visualization', SKY],
  ['dpr', 'Infrastructure DPR', ACCENT],
];
for (const [slug, label, accent] of work) {
  write(`work/${slug}.svg`, svg({ label, sub: 'Case study', w: 1600, h: 1000, accent }));
}

// Gallery fillers
['a', 'b', 'c'].forEach((g, i) =>
  write(`work/gallery-${g}.svg`, svg({ label: `Gallery ${g.toUpperCase()}`, w: 1200, h: 900, accent: i % 2 ? SKY : ACCENT })),
);

// Digital BAT — editorial covers with a topic-specific motif per article.
function motif(kind, accent) {
  const a = accent;
  switch (kind) {
    case 'billboard': // OOH — a hoarding on posts
      return `<g stroke="#fff" stroke-opacity="0.9" stroke-width="6" fill="none">
        <rect x="520" y="250" width="560" height="300" rx="10" fill="${a}" fill-opacity="0.18"/>
        <line x1="600" y1="550" x2="600" y2="720"/><line x1="1000" y1="550" x2="1000" y2="720"/>
        <line x1="470" y1="720" x2="1130" y2="720"/>
        <circle cx="1010" cy="320" r="26" fill="${a}" stroke="none"/>
      </g>`;
    case 'chat': // WhatsApp — two chat bubbles
      return `<g fill="none" stroke="#fff" stroke-opacity="0.9" stroke-width="6">
        <path d="M470 300 h360 a26 26 0 0 1 26 26 v150 a26 26 0 0 1 -26 26 h-250 l-70 60 v-60 h-40 a26 26 0 0 1 -26 -26 v-150 a26 26 0 0 1 26 -26 z" fill="${a}" fill-opacity="0.2"/>
        <path d="M760 470 h360 a26 26 0 0 1 26 26 v130 a26 26 0 0 1 -26 26 h-40 v55 l-70 -55 h-250 a26 26 0 0 1 -26 -26 v-130 a26 26 0 0 1 26 -26 z" fill="#fff" fill-opacity="0.08"/>
      </g>`;
    case 'ai': // AI — a node network
      return `<g stroke="#fff" stroke-opacity="0.55" stroke-width="4">
        <line x1="620" y1="300" x2="800" y2="450"/><line x1="620" y1="600" x2="800" y2="450"/>
        <line x1="800" y1="450" x2="1000" y2="330"/><line x1="800" y1="450" x2="1000" y2="560"/>
        <line x1="1000" y1="330" x2="1120" y2="450"/><line x1="1000" y1="560" x2="1120" y2="450"/>
      </g>
      <g fill="${a}">
        <circle cx="620" cy="300" r="20"/><circle cx="620" cy="600" r="20"/>
        <circle cx="800" cy="450" r="28" fill="#fff"/>
        <circle cx="1000" cy="330" r="20"/><circle cx="1000" cy="560" r="20"/><circle cx="1120" cy="450" r="20"/>
      </g>`;
    case 'doc': // DPR — a document with chart bars
      return `<g fill="none" stroke="#fff" stroke-opacity="0.9" stroke-width="6">
        <rect x="600" y="250" width="400" height="470" rx="14" fill="${a}" fill-opacity="0.16"/>
        <line x1="660" y1="330" x2="880" y2="330"/><line x1="660" y1="390" x2="940" y2="390"/>
        <g stroke="none" fill="#fff" fill-opacity="0.9">
          <rect x="660" y="560" width="50" height="110"/><rect x="740" y="510" width="50" height="160"/>
          <rect x="820" y="470" width="50" height="200"/><rect x="900" y="540" width="50" height="130"/>
        </g>
      </g>`;
    default: // generic — a dotted signal
      return `<g fill="${a}"><circle cx="700" cy="450" r="16"/><circle cx="800" cy="450" r="16" fill="#fff"/><circle cx="900" cy="450" r="16"/></g>`;
  }
}

function editorialSvg({ title, kind, accent = ACCENT, w = 1600, h = 900 }) {
  const id = Math.abs(hash(title)) % 1000;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(title)}">
  <defs>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop stop-color="${NAVY}"/><stop offset="1" stop-color="${NAVY2}"/>
    </linearGradient>
    <radialGradient id="gl${id}" cx="0.75" cy="0.2" r="0.9">
      <stop stop-color="${accent}" stop-opacity="0.4"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg${id})"/>
  <rect width="${w}" height="${h}" fill="url(#gl${id})"/>
  ${motif(kind, accent)}
  <text x="80" y="${h - 150}" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="3" fill="${accent}">DIGITAL BAT</text>
  <text x="80" y="${h - 90}" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="700" fill="#ffffff">${esc(title)}</text>
</svg>`;
}

const blogCovers = [
  ['ooh-advertising', 'Out-of-Home advertising', 'billboard', ACCENT],
  ['whatsapp-marketing', 'WhatsApp & performance', 'chat', SKY],
  ['ai-advertising', 'AI in advertising', 'ai', ACCENT],
  ['dpr-bankable', 'Bankable DPRs', 'doc', SKY],
  ['insight', 'Insights', 'default', ACCENT],
];
for (const [slug, title, kind, accent] of blogCovers) {
  write(`blog/${slug}.svg`, editorialSvg({ title, kind, accent }));
}

// About / founder / generic
write('about/story.svg', svg({ label: 'The Big Ad Truck', sub: 'Pune · Mumbai', w: 1400, h: 1000 }));
write('about/founder.svg', svg({ label: 'Apoorva Vyas', sub: 'Founder & CEO', w: 1000, h: 1200, accent: SKY }));
write('og-cover.svg', svg({ label: 'Bigadtruck Group', sub: 'A truckload of ideas, delivered.', w: 1200, h: 630 }));

console.log('\nPlaceholders generated.');
