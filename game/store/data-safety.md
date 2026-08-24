# Déclarations de collecte de données

Réponses à recopier dans les deux consoles. Elles décrivent l'application **telle
qu'elle est livrée** : AdMob activé, aucun serveur, aucun compte.

## Google Play — « Sécurité des données »

| Question | Réponse |
| --- | --- |
| Ton appli collecte-t-elle ou partage-t-elle des données utilisateur ? | **Oui** (via le SDK publicitaire) |
| Type de données | *Identifiants* → **ID utilisateur / identifiant publicitaire** |
| | *Application et performances* → **Interactions dans l'application** (facultatif si tu n'ajoutes pas d'analytics) |
| Ces données sont-elles collectées ou partagées ? | **Partagées** avec Google AdMob |
| Finalité | **Publicité ou marketing** |
| Collecte obligatoire ? | Oui pour l'ID publicitaire (l'app reste jouable si l'utilisateur le réinitialise) |
| Données chiffrées en transit | **Oui** |
| L'utilisateur peut-il demander la suppression ? | **Oui** — désinstallation + réinitialisation de l'ID publicitaire |
| Publicités | **Oui, l'appli contient des publicités** |
| Achats intégrés | **Oui** si « Supprimer les pubs » est branché |
| Conçue pour les familles | **Non** |
| Classification IARC | Questionnaire : aucune violence, aucun contenu sexuel, aucune drogue, aucun langage grossier, **présence de publicités**, achats intégrés → **PEGI 3 / ESRB Everyone** attendu |

## App Store — « Confidentialité de l'app »

| Catégorie | Déclaration |
| --- | --- |
| Identifiants → **ID de l'appareil** | Collecté · **utilisé pour le suivi** · lié à l'utilisateur : **Non** · finalité : *Publicité tierce* |
| Données d'utilisation → **Données publicitaires** | Collecté · utilisé pour le suivi · non lié à l'identité · finalité : *Publicité tierce* |
| Diagnostics | Non collecté (tant qu'aucun outil de crash n'est ajouté) |
| Achats | Déclarer *Historique d'achat* uniquement si tu ajoutes l'achat intégré |
| L'app utilise-t-elle le suivi ? | **Oui** → l'invite ATT est obligatoire (déjà intégrée) |
| Chiffrement export (`ITSAppUsesNonExemptEncryption`) | **NO** — HTTPS standard uniquement |
| Classification par âge | 4+ / 12+ selon la réponse « publicités fréquentes ou intenses » — répondre **Non** pour les fréquences par défaut du jeu |

## À refaire si tu ajoutes…

- **des analytics** (Firebase, GameAnalytics) → ajouter *Données d'utilisation* et *Diagnostics*
- **un classement en ligne / un compte** → ajouter *Identifiants* liés à l'utilisateur
- **un autre réseau publicitaire** (AppLovin, Unity Ads) → ajouter ses identifiants
  SKAdNetwork dans `Info.plist` et le mentionner dans la politique de confidentialité
