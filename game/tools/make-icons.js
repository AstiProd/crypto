#!/usr/bin/env node
/* Génère l'icône (1024²) et l'écran de lancement (2732²) de l'application.
   Tout est dessiné au code, comme le jeu : aucun fichier source à maintenir.
   Puis `npx @capacitor/assets generate` décline toutes les tailles iOS/Android. */
const path = require('path');
const fs = require('fs');

const PW = process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright';
const { chromium } = require(PW);

const draw = `
function icon(ctx, S, withBg) {
  const c = S / 2;
  if (withBg) {
    const g = ctx.createRadialGradient(S * 0.34, S * 0.28, S * 0.05, c, c, S * 0.78);
    g.addColorStop(0, '#2a2c63'); g.addColorStop(0.55, '#181a44'); g.addColorStop(1, '#0b0c24');
    ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#ffffff';
    const stars = [[.12,.16,.9],[.86,.2,1.2],[.78,.74,.8],[.2,.82,1],[.5,.09,.7],[.92,.5,.75],[.08,.5,.85],[.64,.9,.9]];
    for (const [x, y, r] of stars) {
      ctx.globalAlpha = 0.35 + r * 0.35;
      ctx.beginPath(); ctx.arc(x * S, y * S, r * S * 0.006, 0, 6.2832); ctx.fill();
    }
    ctx.globalAlpha = 1;
    // anneau orbital
    ctx.save();
    ctx.translate(c, c * 1.06); ctx.rotate(-0.42);
    ctx.strokeStyle = 'rgba(120,200,255,.18)'; ctx.lineWidth = S * 0.028;
    ctx.beginPath(); ctx.ellipse(0, 0, S * 0.42, S * 0.15, 0, 0, 6.2832); ctx.stroke();
    ctx.restore();
  }
  // halo
  const hg = ctx.createRadialGradient(c, c * 0.98, S * 0.05, c, c * 0.98, S * 0.42);
  hg.addColorStop(0, 'rgba(72,226,198,.35)'); hg.addColorStop(1, 'rgba(72,226,198,0)');
  ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(c, c * 0.98, S * 0.42, 0, 6.2832); ctx.fill();

  // casque
  const R = S * 0.29;
  ctx.beginPath(); ctx.arc(c, c * 0.98, R, 0, 6.2832);
  const sg = ctx.createLinearGradient(c - R, c - R, c + R, c + R);
  sg.addColorStop(0, '#ffffff'); sg.addColorStop(1, '#c3cee4');
  ctx.fillStyle = sg; ctx.fill();

  // visière
  ctx.beginPath(); ctx.ellipse(c + S * 0.012, c * 0.98, R * 0.74, R * 0.63, 0, 0, 6.2832);
  const vg = ctx.createLinearGradient(c - R * 0.7, c - R * 0.7, c + R * 0.6, c + R * 0.5);
  vg.addColorStop(0, '#8ae8ff'); vg.addColorStop(0.42, '#2a5da8'); vg.addColorStop(1, '#101f45');
  ctx.fillStyle = vg; ctx.fill();

  // cristal reflété dans la visière
  const kx = c + S * 0.03, ky = c * 0.99, k = S * 0.055;
  ctx.beginPath();
  ctx.moveTo(kx, ky - k * 1.7); ctx.lineTo(kx - k, ky - k * 0.2); ctx.lineTo(kx, ky + k);
  ctx.closePath(); ctx.fillStyle = 'rgba(126,224,255,.85)'; ctx.fill();
  ctx.beginPath();
  ctx.moveTo(kx, ky - k * 1.7); ctx.lineTo(kx + k, ky - k * 0.2); ctx.lineTo(kx, ky + k);
  ctx.closePath(); ctx.fillStyle = 'rgba(190,245,255,.95)'; ctx.fill();

  // reflet
  ctx.beginPath(); ctx.ellipse(c - R * 0.36, c * 0.98 - R * 0.34, R * 0.17, R * 0.1, -0.55, 0, 6.2832);
  ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fill();

  // antenne
  ctx.strokeStyle = '#c3cee4'; ctx.lineWidth = S * 0.022; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(c - R * 0.78, c * 0.98 - R * 0.6);
  ctx.lineTo(c - R * 1.05, c * 0.98 - R * 1.02);
  ctx.stroke();
  ctx.beginPath(); ctx.arc(c - R * 1.08, c * 0.98 - R * 1.06, S * 0.022, 0, 6.2832);
  ctx.fillStyle = '#ff6b81'; ctx.fill();
}
`;

(async () => {
  const out = path.join(__dirname, '..', 'assets');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  const shot = async (file, w, h, code) => {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await page.setContent('<style>html,body{margin:0;background:#05070f}canvas{display:block}</style>' +
      `<canvas id="c" width="${w}" height="${h}"></canvas><script>${draw}\n${code}<\/script>`);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(out, file) });
    await page.close();
    console.log('→', file, w + '×' + h);
  };

  // icône principale
  await shot('icon.png', 1024, 1024,
    'const x=document.getElementById("c").getContext("2d");icon(x,1024,true);');
  // premier plan pour l'icône adaptative Android (marge de sécurité de 25 %)
  await shot('icon-foreground.png', 1024, 1024,
    'const x=document.getElementById("c").getContext("2d");x.clearRect(0,0,1024,1024);' +
    'x.save();x.translate(512,512);x.scale(.68,.68);x.translate(-512,-512);icon(x,1024,false);x.restore();');
  // écran de lancement
  await shot('splash.png', 2732, 2732, `
    const x = document.getElementById("c").getContext("2d");
    // fond plat : un dégradé sur 2732² pèserait 1,4 Mo par déclinaison
    x.fillStyle = '#141537'; x.fillRect(0, 0, 2732, 2732);
    x.save(); x.translate(1366, 1366); x.scale(.62, .62); x.translate(-1366, -1366);
    icon(x, 2732, false); x.restore();
    x.fillStyle = '#eaf2ff';
    x.font = '800 96px "Baloo 2", Verdana, sans-serif';
    x.textAlign = 'center';
    x.fillText('ASTRO BASE TYCOON', 1366, 1366 + 620);
  `);

  // icônes PNG pour le web installable (PWA) : Safari n'accepte pas le webp
  const web = path.join(__dirname, '..', 'icons');
  fs.mkdirSync(web, { recursive: true });
  for (const size of [180, 192, 512]) {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await page.setContent('<style>html,body{margin:0;background:#05070f}canvas{display:block}</style>' +
      `<canvas id="c" width="${size}" height="${size}"></canvas><script>${draw}` +
      `\nconst x=document.getElementById("c").getContext("2d");icon(x,${size},true);<\/script>`);
    await page.waitForTimeout(120);
    await page.screenshot({ path: path.join(web, 'icon-' + size + '.png') });
    await page.close();
    console.log('→ icons/icon-' + size + '.png');
  }

  await browser.close();
  console.log('\nIcônes générées dans game/assets/ et game/icons/.');
  console.log('Décline toutes les tailles avec :  npx @capacitor/assets generate');
})();
