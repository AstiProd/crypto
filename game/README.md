# 🚀 Astro Base Tycoon

Jeu de gestion isométrique « toy 3D » : un astronaute développe sa base minière sur
une plateforme flottante en orbite de Kepler-442 b. Extraire → raffiner → encaisser →
débloquer → **fusionner**.

100 % HTML/CSS/JavaScript, **canvas 2D**, sans moteur ni dépendance, sans aucun asset
externe : tout le décor (plateforme, foreuses, fusée, dôme, astronaute, drones,
cristaux) est dessiné par le code, et les sons sont synthétisés en WebAudio.

## Jouer

Ouvre `index.html` dans un navigateur (double-clic suffit), ou sers le dossier :

```bash
npx http-server game -p 8080     # puis http://localhost:8080
```

Une version **page unique autonome** est générée dans `dist/` :

```bash
node tools/build-artifact.js     # -> dist/astro-base-tycoon.html
```

## Commandes

| Action | Clavier | Tactile |
| --- | --- | --- |
| Se déplacer | `ZQSD` / `WASD` / flèches | joystick flottant (touche l'écran n'importe où) |
| Fusionner | glisser une foreuse sur une autre | idem au doigt |
| Ramasser / déposer | automatique en s'approchant | automatique |
| Acheter un socle | rester debout dessus | idem |

## Boucle de jeu

1. Les **foreuses** posées sur les socles produisent des **cristaux** à intervalle régulier.
2. L'astronaute les ramasse : ils s'empilent sur son dos (capacité limitée).
3. Il les verse dans la **trémie** de la raffinerie, qui les transforme en **puces de crédit**
   déposées sur le plateau de sortie.
4. Il porte les puces au **terminal** : elles deviennent des **crédits ◈**.
5. Les crédits servent à **débloquer des socles** (il suffit de rester dessus), acheter des
   foreuses Mk-I et payer les **améliorations**.
6. Deux foreuses de même rang glissées l'une sur l'autre **fusionnent** : rang supérieur,
   cristaux presque deux fois plus rentables, production plus rapide. 10 rangs, Mk-I → Mk-X.

## Publicité (AdMob)

`ads.js` expose une API unique au jeu — `Ads.showRewarded(...)`, `Ads.maybeInterstitial(...)` —
et choisit tout seul son fournisseur :

- **sur mobile** (Capacitor + `@capacitor-community/admob`) : vraies annonces AdMob,
  avec formulaire de consentement Google UMP (RGPD/CCPA) et invite App Tracking
  Transparency sur iOS ;
- **dans un navigateur** : lecteur de démonstration intégré, clairement étiqueté, qui
  respecte la même API et les mêmes règles de fréquence — le jeu reste testable partout.

| Emplacement | Récompense | Délai |
| --- | --- | --- |
| Bouton **Boost ×2** (HUD) | 60 s de recettes doublées | 3 min |
| **Foreuse offerte** (boutique) | une foreuse Mk-I sur un socle libre | 5 min |
| **Rapport de mission** (retour hors ligne) | gains hors ligne doublés | une fois par rapport |
| **Interstitiel** | — | après un déblocage de socle, jamais avant 2 min de jeu ni moins de 3 min après le précédent |

Tout se règle dans `ads.config.js` (identifiants, délais, durée du bonus). Les
identifiants livrés sont les **unités de test officielles Google** : les remplacer et
passer `testMode` à `false` avant publication. Le menu ⋯ propose « Supprimer les pubs »
(à brancher sur un achat intégré) et « Confidentialité des publicités » (rouvre le
formulaire de consentement).

## Application mobile (iOS + Android)

Le dépôt contient les projets natifs générés par Capacitor, déjà configurés pour les
stores : identifiants AdMob, ATT, 44 réseaux SKAdNetwork, permission `AD_ID`,
orientation portrait verrouillée, 156 déclinaisons d'icônes et d'écrans de lancement.

```bash
npm install
npm run icons        # icône + splash (dessinés au code), puis npx @capacitor/assets generate
npm run build        # www/ + page web autonome
npm run android      # ouvre Android Studio
npm run ios          # ouvre Xcode (nécessite un Mac)
```

- `store/CHECKLIST.md` — tout le parcours de publication, et ce qui dépend de tes comptes
- `store/metadata-fr.md`, `store/metadata-en.md` — textes de fiche produit
- `store/PRIVACY.md` — politique de confidentialité à héberger
- `store/data-safety.md` — réponses aux questionnaires de collecte de données
- `store/screenshots/` — captures aux formats exigés (`node tools/make-screenshots.js`)

## Contenu

- 10 socles d'extraction, 10 rangs de foreuses avec palettes distinctes
- Raffinerie (file d'attente, cuves, tapis roulant, plateau de sortie), terminal de crédits
- 4 améliorations : bottes propulsées, sac dorsal, raffinerie, **drones ouvriers** (jusqu'à 4
  assistants autonomes : les pairs minent, les impairs convoient les crédits)
- Sauvegarde automatique (`localStorage`) + **gains hors-ligne** plafonnés à 4 h
- Effets : particules, textes flottants, anneaux de fusion, vapeur, hologrammes, parallaxe
- Interface FR complète : tutoriel, boutique, améliorations, statistiques, coupure du son
- Régie publicitaire complète (vidéos récompensées, interstitiel, consentement)

## Architecture (`game.js`, ~1 950 lignes)

| Section | Rôle |
| --- | --- |
| 1–2 | Constantes, équilibrage, formatage des grands nombres, audio WebAudio |
| 3–4 | État du jeu, implantation de la base, sauvegarde / chargement / hors-ligne |
| 5–6 | Effets, entrées (clavier, joystick flottant, glisser-déposer de fusion) |
| 7 | Simulation : déplacement + collisions, porteurs, socles, raffinerie, IA des drones |
| 8–9 | Rendu : primitives isométriques (cuboïdes, cylindres, disques), décor procédural |
| 10–12 | Interface DOM, boucle principale, démarrage |

`ads.js` (~330 lignes) est indépendant : deux fournisseurs interchangeables (AdMob natif,
lecteur de démonstration) derrière un gestionnaire qui gère délais, fréquence,
consentement et sauvegarde.

Projection isométrique 2:1 : `sx = (x - y)·44`, `sy = (x + y)·22 - z·46`, tri des objets
par profondeur `x + y` avant dessin, étiquettes rendues en dernier.

### Console de debug

`window.AstroBase` expose `S`, `tp(x, y)`, `give(n)`, `setTier(socle, rang)`, `save()` —
pratique pour tester ou faire des captures.
