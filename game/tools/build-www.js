#!/usr/bin/env node
/* Copie les sources du jeu dans www/, dossier servi par l'application mobile. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const www = path.join(root, 'www');
const files = ['index.html', 'style.css', 'game.js', 'ads.js', 'ads.config.js',
               'manifest.webmanifest', 'sw.js'];

fs.mkdirSync(www, { recursive: true });
for (const f of files) {
  fs.copyFileSync(path.join(root, f), path.join(www, f));
}
// Les icônes web suivent si elles existent.
const icons = path.join(root, 'icons');
if (fs.existsSync(icons)) {
  const dest = path.join(www, 'icons');
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(icons)) fs.copyFileSync(path.join(icons, f), path.join(dest, f));
}
// le manifeste généré par @capacitor/assets ferait doublon
const dup = path.join(www, 'manifest.json');
if (fs.existsSync(dup)) fs.unlinkSync(dup);
{
}
console.log('www/ prêt :', files.join(', '));
