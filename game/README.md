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

## Version web installable (PWA)

Le jeu s'installe depuis un simple navigateur : `manifest.webmanifest`, service worker
(`sw.js`) et icônes PNG. Sur téléphone, « Ajouter à l'écran d'accueil » donne une app
plein écran **qui fonctionne hors ligne** — aucun store, aucun compte, zéro euro.

`.github/workflows/deploy-game.yml` publie `game/www/` sur GitHub Pages à chaque push.
Toutes les voies de publication gratuites sont détaillées dans `store/PUBLIER.md`.

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

## Progression : objectifs, contrats, prestige

- **Objectifs guidés** — une carte en haut de l'écran affiche toujours la prochaine étape
  (« Ramasse un cristal », « Ouvre la soute », « Atteins Mk-VIII »…), avec sa prime, une
  barre de progression et une **flèche dorée** qui pointe la cible dans le monde, même
  hors écran. 18 étapes, de la première minute au rang ultime.
- **Contrats** — trois commandes en cours ; environ 40 % sont **urgentes** (minuteur ⏱)
  et paient **le double**. Une commande expirée est aussitôt remplacée.
- **Prestige** — au-delà d'un million de crédits gagnés dans la partie, la base peut être
  relancée : tout repart de zéro contre des **cristaux de commandement**, chacun valant
  **+5 % de revenus, définitivement**. Gain = (crédits de la partie / 1 M) ^ 0,55.

## À bord d'ASTRA-1 : la seconde carte

Le pont du vaisseau (150 K ◈) est une **carte à part entière** : on se pose sur le sas au
pied de la fusée, on maintient la position, et la vue bascule à l'intérieur — coursive,
hublots sur l'espace, réservoir, six socles de réacteurs et console de vente.

La chaîne y est différente et **dépend de la base** :

1. les **cristaux** extraits en bas doivent monter dans le **réservoir** (à dos
   d'astronaute, ou automatiquement avec le **monte-charge**) ;
2. chaque **réacteur** brûle un cristal et produit une **cellule d'énergie** — 150 ◈ au
   rang R-I contre 5 ◈ pour un cristal, et ×2,25 par rang ;
3. les cellules se revendent à la **console de bord**.

Les réacteurs se fusionnent comme les foreuses (R-I → R-XIV) et s'arrêtent net quand le
réservoir est vide : leur voyant passe au rouge et affiche « à sec ».

## Zones, logistique et marché

**Trois zones** composent la base. La zone minière est ouverte dès le départ ; les deux
autres s'achètent en se posant sur leur dalle 🔒, comme les socles.

| Zone | Prix | Apport |
| --- | --- | --- |
| Zone minière | — | 10 socles bien espacés, à ciel ouvert |
| **Soute ASTRA-1** | 25 K ◈ | la soute de la fusée s'ouvre en coupe : 3 socles à l'abri |
| **Serre hydroponique** | 400 K ◈ | le dôme se pressurise : 3 socles sous verre |
| **Station orbitale** | 4,5 M ◈ | une passerelle se déploie vers une seconde plateforme : 3 socles en orbite |
| **Pont ASTRA-1** | 150 K ◈ | l'intérieur du vaisseau : 6 réacteurs, réservoir, console de vente |

Ouvrir une zone offre son premier socle, équipé d'une foreuse calée sur ton meilleur rang.

**Trois lignes d'approvisionnement** automatisent le transport. Chacune monte jusqu'au
niveau 5 (0,45 colis/s par niveau) et se voit à l'écran : tapis, chevrons animés et colis
qui glissent dessus.

| Ligne | Rôle |
| --- | --- |
| Mine → Raffinerie | ramasse les cristaux de la zone minière et les verse dans la trémie |
| Soute → Raffinerie | idem depuis la soute (nécessite la zone) |
| Station → Raffinerie | ramène les cristaux de l'orbite par la passerelle |
| Mine → Vaisseau (monte-charge) | remplit le réservoir du bord — **il ne prend que le surplus** et laisse toujours 4 cristaux au sol, sinon la raffinerie serait affamée |
| Raffinerie → Marché | emporte les puces et les vend toutes seules |

**Le marché** remplace le terminal : chaque vente est multipliée par le **cours des
cristaux**, qui dérive lentement entre ×0,82 et ×1,38 et s'affiche sur le bâtiment.

**Les contrats** donnent des objectifs : trois commandes du type « 24 cristaux Mk-V ou
mieux » progressent à chaque vente et rapportent environ trois fois la valeur des
marchandises. Une commande honorée est remplacée aussitôt, calée sur ton meilleur rang.

## Contenu

- 25 socles répartis en 5 zones et **deux cartes** (la base et l'intérieur du vaisseau)
- 14 rangs de foreuses et 14 rangs de réacteurs, tous fusionnables
- 5 lignes d'approvisionnement, marché à cours variable, contrats urgents et prestige
- objectifs guidés avec fléchage dans le monde
- Raffinerie (file d'attente, cuves, tapis roulant, plateau de sortie), terminal de crédits
- 4 améliorations : bottes propulsées, sac dorsal, raffinerie, **drones ouvriers** (jusqu'à 4
  assistants autonomes). Chaque drone a un métier choisi pour **compléter les tapis** au lieu
  de les doubler, et **réattribué automatiquement** : le mineur sert en priorité les zones sans
  convoyeur (la serre n'en a pas), le soutier vend les cellules à bord, et le convoyeur de puces
  n'existe que tant que le tapis Raffinerie → Marché n'est pas acheté
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
| 7 | Simulation : déplacement + collisions, porteurs, socles, raffinerie, convoyeurs, marché, contrats, IA des drones |
| 8–9 | Rendu : primitives isométriques (cuboïdes, cylindres, disques), décor procédural |
| 10–12 | Interface DOM, boucle principale, démarrage |

`ads.js` (~330 lignes) est indépendant : deux fournisseurs interchangeables (AdMob natif,
lecteur de démonstration) derrière un gestionnaire qui gère délais, fréquence,
consentement et sauvegarde.

Projection isométrique 2:1 : `sx = (x - y)·44`, `sy = (x + y)·22 - z·46`, tri des objets
par profondeur `x + y` avant dessin, étiquettes rendues en dernier.

### Console de debug

`window.AstroBase` expose `S`, `tp(x, y)`, `goto('market')`, `give(n)`, `setTier(socle, rang)`,
`pos`, `zones`, `lines`, `save()` — pratique pour tester ou faire des captures.
