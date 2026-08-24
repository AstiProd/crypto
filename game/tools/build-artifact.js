#!/usr/bin/env node
/* Assemble le jeu en une page HTML autonome (aucune ressource externe
   hormis la police Google Fonts) prête à être publiée ou partagée. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'game.js'), 'utf8');

const m = html.match(/<div id="app">[\s\S]*<\/div>\s*<script/);
if (!m) { console.error('Impossible de trouver le bloc #app dans index.html'); process.exit(1); }
const markup = m[0].replace(/\s*<script$/, '');

const out = `<title>Astro Base Tycoon</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&display=swap" rel="stylesheet">
<style>
${css}
</style>
${markup}
<script>
${js}
</script>
`;

const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });
const file = path.join(dist, 'astro-base-tycoon.html');
fs.writeFileSync(file, out);
console.log('Page autonome écrite :', file, '(' + Math.round(out.length / 1024) + ' Ko)');
