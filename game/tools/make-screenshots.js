#!/usr/bin/env node
/* Produit les captures d'écran aux formats exigés par les stores :
   iOS 6,7" (1290×2796) et Android (1080×1920), en jouant réellement le jeu.  */
const path = require('path');
const fs = require('fs');
const PW = process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright';
const { chromium } = require(PW);

const out = path.join(__dirname, '..', 'store', 'screenshots');
const game = 'file://' + path.join(__dirname, '..', 'index.html');

/* Scènes mises en avant sur la fiche produit */
const SCENES = [
  { name: '1-objectif', wait: 4200, setup: () => {
      AstroBase.S.up.capacity = 1;
      AstroBase.tp(5.4, 3.4);                 // début de partie : objectif + flèche
    } },
  { name: '2-base', wait: 3500, setup: () => {
      [0,1,2,3,4,5].forEach((i,k) => AstroBase.setTier(i, [4,6,3,7,5,2][k]));
      AstroBase.give(486000); AstroBase.S.bestTier = 7; AstroBase.S.up.capacity = 3;
      AstroBase.S.lines.mine = 3; AstroBase.S.goal = 7;
      AstroBase.tp(9.6, 6.6);
    } },
  { name: '3-recolte', wait: 3000, setup: () => {
      [0,1,2,3,5,6].forEach((i,k) => AstroBase.setTier(i, [5,5,7,4,6,3][k]));
      AstroBase.give(92000); AstroBase.S.up.capacity = 4; AstroBase.S.goal = 5;
      AstroBase.S.player.carryType = 'ore';
      AstroBase.S.player.carry = Array.from({length: 11}, () => ({ value: 300, tier: 5 }));
      AstroBase.tp(6.6, 5.0);
    } },
  { name: '4-raffinerie', wait: 3000, setup: () => {
      [0,1,2].forEach((i,k) => AstroBase.setTier(i, [6,4,8][k]));
      AstroBase.give(310000); AstroBase.S.up.drones = 2; AstroBase.S.goal = 9;
      AstroBase.S.lines.mine = 4; AstroBase.S.lines.market = 3;
      for (let i = 0; i < 14; i++) AstroBase.S.refinery.tray.push({ value: 800, tier: 6 });
      AstroBase.S.refinery.queue = Array.from({length: 9}, () => ({ value: 800, tier: 6 }));
      AstroBase.tp(18.4, 13.2);
    } },
  { name: '5-soute', wait: 3200, setup: () => {
      AstroBase.S.zones.bay = true;
      [10,11,12].forEach((i,k) => AstroBase.setTier(i, [7,5,8][k]));
      [0,1].forEach((i,k) => AstroBase.setTier(i, [6,4][k]));
      AstroBase.give(640000); AstroBase.S.bestTier = 8; AstroBase.S.goal = 11;
      AstroBase.S.lines.bay = 3; AstroBase.S.lines.market = 2;
      AstroBase.tp(7.4, 13.0);
    } },
  { name: '6-station', wait: 3200, setup: () => {
      AstroBase.S.zones.bay = true; AstroBase.S.zones.dome = true; AstroBase.S.zones.orbit = true;
      [16,17,18].forEach((i,k) => AstroBase.setTier(i, [8,6,9][k]));
      [13,14,15].forEach((i,k) => AstroBase.setTier(i, [7,9,5][k]));
      [0,1,2].forEach((i,k) => AstroBase.setTier(i, [7,5,8][k]));
      AstroBase.give(24e6); AstroBase.S.bestTier = 9; AstroBase.S.goal = 16;
      AstroBase.S.lines.orbit = 3; AstroBase.S.prestige = 6;
      AstroBase.tp(25.4, 7.6);
    } },
  { name: '7-boost', wait: 2500, setup: () => {
      AstroBase.S.zones.bay = true; AstroBase.S.zones.dome = true;
      [0,1,2,3,4].forEach((i,k) => AstroBase.setTier(i, [7,5,8,6,4][k]));
      [13,14,15].forEach((i,k) => AstroBase.setTier(i, [8,6,9][k]));
      AstroBase.give(4250000); AstroBase.S.boost = 47; AstroBase.S.up.drones = 3;
      AstroBase.S.bestTier = 9; AstroBase.S.lines.mine = 4; AstroBase.S.goal = 14;
      AstroBase.tp(19.6, 6.6);
    } }
];

const FORMATS = [
  { dir: 'ios-6.7', w: 430, h: 932, dsf: 3 },   // 1290 × 2796
  { dir: 'android', w: 360, h: 640, dsf: 3 }    // 1080 × 1920
];

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  for (const f of FORMATS) {
    const dir = path.join(out, f.dir);
    fs.mkdirSync(dir, { recursive: true });
    for (const s of SCENES) {
      const page = await browser.newPage({ viewport: { width: f.w, height: f.h }, deviceScaleFactor: f.dsf });
      await page.goto(game);
      await page.waitForTimeout(400);
      await page.evaluate(() => { localStorage.clear(); AstroBase.start(); });
      await page.evaluate(s.setup);
      await page.waitForTimeout(s.wait);
      const file = path.join(dir, s.name + '.jpg');
      await page.screenshot({ path: file, type: 'jpeg', quality: 92 });
      await page.close();
      console.log('→', f.dir + '/' + s.name + '.jpg', (f.w * f.dsf) + '×' + (f.h * f.dsf));
    }
  }
  await browser.close();
  console.log('\nCaptures prêtes dans store/screenshots/ (JPEG accepté par les deux stores).');
})();
