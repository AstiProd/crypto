# Publier Astro Base Tycoon sur l'App Store et le Play Store

Ce document liste **ce qui est déjà fait dans le dépôt** et **ce qui ne peut être fait
que par toi** (comptes développeur, certificats, envoi des binaires).

---

## 1. Ce qui est déjà en place

| Élément | État | Où |
| --- | --- | --- |
| Projet iOS (Xcode) | généré | `ios/App/App.xcworkspace` |
| Projet Android (Gradle) | généré | `android/` |
| Identifiant d'application | `com.astiprod.astrobasetycoon` | `capacitor.config.json` |
| Régie AdMob (récompensée + interstitiel) | intégrée | `ads.js`, `ads.config.js` |
| ID d'app AdMob iOS | déclaré (**unité de test**) | `ios/App/App/Info.plist` → `GADApplicationIdentifier` |
| ID d'app AdMob Android | déclaré (**unité de test**) | `android/app/src/main/AndroidManifest.xml` |
| App Tracking Transparency (iOS) | texte + appel au démarrage | `Info.plist` → `NSUserTrackingUsageDescription` |
| SKAdNetwork | 44 réseaux déclarés | `Info.plist` |
| Permission `AD_ID` (Android) | déclarée | `AndroidManifest.xml` |
| Consentement RGPD/CCPA (Google UMP) | appelé à l'initialisation | `ads.js` → `AdMobProvider.consent()` |
| Orientation portrait verrouillée | oui | `Info.plist`, `AndroidManifest.xml` |
| Icônes + écrans de lancement | 156 déclinaisons générées | `npm run icons` puis `npx @capacitor/assets generate` |
| Textes de fiche produit | rédigés FR + EN | `store/metadata-fr.md`, `store/metadata-en.md` |
| Politique de confidentialité | rédigée | `store/PRIVACY.md` (**à héberger sur une URL publique**) |
| Déclarations de collecte de données | préremplies | `store/data-safety.md` |

## 2. Ce que tu dois faire toi-même

### Comptes (obligatoire, payant)
- [ ] **Apple Developer Program** — 99 $/an, https://developer.apple.com/programs/
- [ ] **Google Play Console** — 25 $ une fois, https://play.google.com/console
      (depuis 2023, un compte personnel doit prouver 12 testeurs pendant 14 jours
      avant la publication en production — anticipe ce délai)
- [ ] **Compte AdMob** — https://admob.google.com, puis créer l'application
      iOS et l'application Android, et **3 blocs d'annonces** par plateforme
      (récompensé, interstitiel, bannière si tu l'actives un jour)

### Remplacer les identifiants de test
- [ ] `ads.config.js` → `appId` + `units` avec tes vrais identifiants, `testMode: false`
- [ ] `ios/App/App/Info.plist` → `GADApplicationIdentifier`
- [ ] `android/app/src/main/AndroidManifest.xml` → `com.google.android.gms.ads.APPLICATION_ID`
- [ ] Vérifier la liste SKAdNetwork à jour : https://developers.google.com/admob/ios/ios14

> ⚠️ Ne jamais cliquer sur ses propres annonces réelles, et enregistrer ses appareils
> comme appareils de test dans AdMob : les clics invalides font suspendre le compte.

### iOS (nécessite un Mac + Xcode)
- [ ] `npm run sync && npx cap open ios`
- [ ] Xcode → *Signing & Capabilities* → sélectionner ton équipe, activer le signage automatique
- [ ] Incrémenter `MARKETING_VERSION` (1.0) et `CURRENT_PROJECT_VERSION` (1)
- [ ] `cd ios/App && pod install` si les pods ne sont pas installés
- [ ] Tester sur un appareil réel : pubs, achat, sauvegarde, encoche/safe areas
- [ ] *Product → Archive* → *Distribute App* → App Store Connect
- [ ] App Store Connect : fiche produit (`metadata-fr.md`), captures **6,7"** et **5,5"**
      (1290×2796 et 1242×2208), classification d'âge, questionnaire de confidentialité
      (`data-safety.md`), URL de la politique de confidentialité
- [ ] Soumettre pour examen (compter 24 h à 3 jours)

### Android
- [ ] `npm run sync && npx cap open android`
- [ ] Créer la clé de signature :
      `keytool -genkey -v -keystore astro-release.keystore -alias astro -keyalg RSA -keysize 2048 -validity 10000`
      **Sauvegarde cette clé hors du dépôt : sans elle, plus aucune mise à jour n'est possible.**
- [ ] Renseigner `android/key.properties` (voir modèle plus bas) — fichier déjà ignoré par git
- [ ] *Build → Generate Signed Bundle* → **Android App Bundle (.aab)**
- [ ] Play Console : fiche produit, captures (min. 2, 1080×1920), icône 512×512,
      image de mise en avant 1024×500, questionnaire *Sécurité des données*
      (`data-safety.md`), classification IARC, déclaration publicités = **Oui**
- [ ] Test interne → test fermé (12 testeurs / 14 jours) → production

### Modèle `android/key.properties`
```properties
storeFile=/chemin/absolu/vers/astro-release.keystore
storePassword=********
keyAlias=astro
keyPassword=********
```

## 3. Réglages importants des fiches produit

| Question | Réponse pour ce jeu |
| --- | --- |
| L'app contient-elle des publicités ? | **Oui** (récompensées + interstitielles) |
| Achats intégrés ? | **Oui** si tu branches « Supprimer les pubs », sinon non |
| Public cible | 12+ / PEGI 3 — pas de contenu sensible, mais **présence de publicités** |
| Destinée aux enfants ? | **Non** (sinon : Families Policy, pubs certifiées uniquement, pas d'AD_ID) |
| Collecte de données | Identifiant publicitaire + données d'utilisation approximatives (via AdMob) |
| Chiffrement | Aucun chiffrement non exempté → `ITSAppUsesNonExemptEncryption = NO` |

## 4. Avant chaque mise à jour

```bash
npm run build      # www/ + page web autonome
npx cap sync       # copie vers iOS et Android
```
puis incrémenter `versionCode`/`versionName` (Android) et `CURRENT_PROJECT_VERSION`/
`MARKETING_VERSION` (iOS).
