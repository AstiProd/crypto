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
  { name: '1-base', wait: 3500, setup: () => {
      [0,1,2,3,4,5].forEach((i,k) => AstroBase.setTier(i, [4,6,3,7,5,2][k]));
      AstroBase.give(486000); AstroBase.S.bestTier = 7; AstroBase.S.up.capacity = 3;
      AstroBase.tp(9.2, 6.2);
    } },
  { name: '2-recolte', wait: 3000, setup: () => {
      [0,1,2,3].forEach((i,k) => AstroBase.setTier(i, [5,5,7,4][k]));
      AstroBase.give(92000); AstroBase.S.up.capacity = 4;
      AstroBase.S.player.carryType = 'ore';
      AstroBase.S.player.carry = Array.from({length: 11}, () => ({ value: 300, tier: 5 }));
      AstroBase.tp(6.4, 5.4);
    } },
  { name: '3-raffinerie', wait: 3000, setup: () => {
      [0,1,2].forEach((i,k) => AstroBase.setTier(i, [6,4,8][k]));
      AstroBase.give(310000); AstroBase.S.up.drones = 2;
      for (let i = 0; i < 14; i++) AstroBase.S.refinery.tray.push({ value: 800, tier: 6 });
      AstroBase.S.refinery.queue = Array.from({length: 9}, () => ({ value: 800, tier: 6 }));
      AstroBase.tp(13.1, 10.4);
    } },
  { name: '4-fusion', wait: 2200, setup: () => {
      AstroBase.setTier(0, 6); AstroBase.setTier(1, 6); AstroBase.setTier(2, 4);
      AstroBase.give(158000); AstroBase.tp(6.0, 3.2);
      AstroBase.S.pads[1].pop = 1;
    } },
  { name: '5-boost', wait: 2500, setup: () => {
      [0,1,2,3,4].forEach((i,k) => AstroBase.setTier(i, [7,5,8,6,4][k]));
      AstroBase.give(1250000); AstroBase.S.boost = 47; AstroBase.S.up.drones = 3;
      AstroBase.tp(8.0, 8.4);
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
