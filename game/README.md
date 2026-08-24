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

## Contenu

- 10 socles d'extraction, 10 rangs de foreuses avec palettes distinctes
- Raffinerie (file d'attente, cuves, tapis roulant, plateau de sortie), terminal de crédits
- 4 améliorations : bottes propulsées, sac dorsal, raffinerie, **drones ouvriers** (jusqu'à 4
  assistants autonomes : les pairs minent, les impairs convoient les crédits)
- Sauvegarde automatique (`localStorage`) + **gains hors-ligne** plafonnés à 4 h
- Effets : particules, textes flottants, anneaux de fusion, vapeur, hologrammes, parallaxe
- Interface FR complète : tutoriel, boutique, améliorations, statistiques, coupure du son

## Architecture (`game.js`, ~1 950 lignes)

| Section | Rôle |
| --- | --- |
| 1–2 | Constantes, équilibrage, formatage des grands nombres, audio WebAudio |
| 3–4 | État du jeu, implantation de la base, sauvegarde / chargement / hors-ligne |
| 5–6 | Effets, entrées (clavier, joystick flottant, glisser-déposer de fusion) |
| 7 | Simulation : déplacement + collisions, porteurs, socles, raffinerie, IA des drones |
| 8–9 | Rendu : primitives isométriques (cuboïdes, cylindres, disques), décor procédural |
| 10–12 | Interface DOM, boucle principale, démarrage |

Projection isométrique 2:1 : `sx = (x - y)·44`, `sy = (x + y)·22 - z·46`, tri des objets
par profondeur `x + y` avant dessin, étiquettes rendues en dernier.

### Console de debug

`window.AstroBase` expose `S`, `tp(x, y)`, `give(n)`, `setTier(socle, rang)`, `save()` —
pratique pour tester ou faire des captures.
