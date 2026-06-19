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

// About / founder / generic
write('about/story.svg', svg({ label: 'The Big Ad Truck', sub: 'Pune · Mumbai', w: 1400, h: 1000 }));
write('about/founder.svg', svg({ label: 'V. Vyas', sub: 'Founder & CEO', w: 1000, h: 1200, accent: SKY }));
write('og-cover.svg', svg({ label: 'Bigadtruck Group', sub: 'A truckload of ideas, delivered.', w: 1200, h: 630 }));

console.log('\nPlaceholders generated.');
