# Publier Astro Base Tycoon — les voies gratuites

Résumé sans détour :

| Voie | Coût | Pubs possibles | Ce qu'il te reste à faire |
| --- | --- | --- | --- |
| **Web + installation sur l'écran d'accueil** (GitHub Pages) | **0 €** | régie de portail HTML5 | 2 clics dans GitHub |
| **itch.io** (jeu HTML5) | **0 €** | limitées | créer un compte, glisser un ZIP |
| **Portail de jeux** (GameMonetize, GameDistribution, CrazyGames) | **0 €** | **oui, vidéos récompensées rémunérées** | soumettre le jeu, coller leur SDK |
| **APK Android en téléchargement direct** (GitHub Releases) | **0 €** | AdMob fonctionne | compiler l'APK sur ton Mac |
| **iPhone perso via Xcode** (compte Apple gratuit) | **0 €** | AdMob fonctionne | Xcode, réinstaller tous les 7 jours |
| Google Play | 25 $ une fois | AdMob | compte développeur + 12 testeurs / 14 jours |
| App Store | 99 $/an | AdMob | compte développeur Apple |

> **AdMob ne marche pas sur le web.** C'est une régie pour applications iOS/Android.
> Sur une page web, les vidéos récompensées rémunérées passent par un portail de jeux
> (voir plus bas) ; AdSense, lui, interdit ce format en surimpression d'un jeu.

---

## 1. Web gratuit, installable comme une app (recommandé pour commencer)

Le jeu est déjà un **PWA** : manifeste, service worker, icônes. Une fois la page ouverte
sur un téléphone, « Ajouter à l'écran d'accueil » l'installe comme une vraie app —
plein écran, icône, **et il fonctionne hors ligne**.

### Mise en ligne (2 clics)

Le workflow `.github/workflows/deploy-game.yml` fait tout : il assemble `game/www/` et
le publie sur GitHub Pages à chaque push.

1. Fusionne la branche de travail dans `master` (l'environnement `github-pages` n'accepte
   par défaut que la branche principale) :
   ```bash
   git checkout master
   git merge claude/jeu-a-z-c1eoqv
   git push origin master
   ```
2. Sur GitHub : onglet **Actions** → le workflow « Publier le jeu » tourne tout seul.
   S'il te demande d'activer Pages : **Settings → Pages → Source : GitHub Actions**.

Adresse finale : **https://astiprod.github.io/crypto/**

> Variante sans fusion : Settings → Environments → `github-pages` → autoriser la branche
> `claude/jeu-a-z-c1eoqv` dans les *deployment branches*.

### Hébergeurs gratuits équivalents
Netlify, Cloudflare Pages, Vercel : connecte le dépôt, dossier de publication `game/www`,
commande de build `node game/tools/build-www.js`. Ils acceptent aussi les dépôts privés.

## 2. itch.io — gratuit, communauté de joueurs

```bash
cd game && node tools/build-www.js && cd www && zip -r ../astro-base.zip .
```
Sur itch.io : *Upload new project* → **HTML** → glisser `astro-base.zip` → cocher
« This file will be played in the browser » → *Viewport* 430×932 → *Publish*.
Les dons sont possibles ; la régie publicitaire, elle, n'est pas fournie par itch.

## 3. Portails de jeux HTML5 — la vraie monétisation gratuite du web

Ces plateformes hébergent le jeu **et** paient les vidéos récompensées :
[GameMonetize](https://gamemonetize.com), [GameDistribution](https://gamedistribution.com),
[CrazyGames](https://developer.crazygames.com), [Poki](https://developers.poki.com).

Le code est déjà prêt à les recevoir :

1. Inscris-toi, déclare le jeu, récupère ton identifiant et le script du portail.
2. Colle leur `<script>` dans `game/index.html`, **avant** `ads.config.js`.
3. Dans `game/ads.config.js` : `webSdk: 'portal'`.
4. `node tools/build-www.js` puis republie.

`ads.js` détecte alors le SDK (`window.sdk`, `window.gdsdk` ou `window.CrazyGames`) et
lui confie les vidéos ; s'il est absent ou refuse, le lecteur de démonstration reprend la
main et le jeu continue.

## 4. Android gratuit — APK en téléchargement direct

Sur ton Mac (Android Studio installé) :
```bash
cd game
npm install
npm run build && npx cap sync android
cd android && ./gradlew assembleRelease
```
L'APK signé sort dans `android/app/build/outputs/apk/release/`. Publie-le dans
**GitHub → Releases** : n'importe qui peut l'installer (« sources inconnues »).
AdMob fonctionne dans cette version.

## 5. iPhone gratuit — ton appareil uniquement

Avec un **Apple ID gratuit** (sans les 99 $), Xcode installe l'app sur *ton* iPhone,
valable **7 jours**, renouvelable :
```bash
cd game
npm install
npm run build && npx cap sync ios
npx cap open ios
```
Dans Xcode : *Signing & Capabilities* → *Team* : ton Apple ID personnel → brancher
l'iPhone → ▶︎. Pour distribuer à d'autres, il faut le compte payant.

---

## Et pour les vraies pubs AdMob (versions iOS / Android)

1. Crée un compte sur [admob.google.com](https://admob.google.com) (gratuit).
2. Ajoute deux applications (iOS et Android), puis un bloc **Récompensé** et un bloc
   **Interstitiel** par plateforme.
3. Reporte les identifiants dans :
   - `game/ads.config.js` → `appId`, `units`, et `testMode: false`
   - `game/ios/App/App/Info.plist` → `GADApplicationIdentifier`
   - `game/android/app/src/main/AndroidManifest.xml` → `com.google.android.gms.ads.APPLICATION_ID`
4. Déclare tes appareils comme appareils de test dans AdMob : **cliquer sur ses propres
   annonces réelles fait suspendre le compte**.

Le détail complet des fiches produit et des questionnaires de confidentialité est dans
`store/CHECKLIST.md`.
