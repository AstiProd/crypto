/* =========================================================================
   CONFIGURATION PUBLICITAIRE
   Les identifiants ci-dessous sont les unités de TEST officielles Google.
   Remplace-les par tes vrais identifiants AdMob avant la mise en production
   et passe `testMode` à false. (Diffuser de vraies pubs sur tes propres
   appareils de test = risque de suspension du compte AdMob.)
   ========================================================================= */
window.ADS_CONFIG = {
  network: 'admob',
  testMode: true,                 // true = unités de test Google

  // Identifiants d'application (AdMob → Applications → ID d'application)
  appId: {
    android: 'ca-app-pub-3940256099942544~3347511713',
    ios:     'ca-app-pub-3940256099942544~1458002511'
  },

  // Blocs d'annonces
  units: {
    rewarded: {
      android: 'ca-app-pub-3940256099942544/5224354917',
      ios:     'ca-app-pub-3940256099942544/1712485313'
    },
    interstitial: {
      android: 'ca-app-pub-3940256099942544/1033173712',
      ios:     'ca-app-pub-3940256099942544/4411468910'
    },
    banner: {
      android: 'ca-app-pub-3940256099942544/6300978111',
      ios:     'ca-app-pub-3940256099942544/2934735716'
    }
  },

  // Bannière désactivée : elle mangerait l'interface de jeu.
  banner: { enabled: false, position: 'BOTTOM_CENTER' },

  // Emplacements récompensés : délai minimum entre deux visionnages (s)
  placements: {
    boost:     { cooldown: 180, rewardSeconds: 60, multiplier: 2 },
    offline:   { cooldown: 0,   multiplier: 2 },
    freeDrill: { cooldown: 300 }
  },

  interstitial: {
    minInterval: 180,      // s entre deux interstitiels
    warmupSeconds: 120,    // aucune pub avant 2 min de jeu
    minUnlocks: 2          // ni avant le 2ᵉ socle débloqué
  },

  /* --- Version web (GitHub Pages, itch.io, portail de jeux) ---
     AdMob est réservé aux applications iOS/Android : sur le web il faut la régie
     d'un portail HTML5. Mets `webSdk` à 'portal' et charge le SDK du portail dans
     index.html ; sinon le lecteur de démonstration s'affiche (rien n'est facturé,
     rien n'est diffusé). Voir store/PUBLIER.md. */
  webSdk: 'demo',          // 'demo' | 'portal'

  // Respect de la vie privée
  consent: {
    useUmp: true,          // formulaire Google UMP (RGPD / CCPA)
    attPrompt: true        // App Tracking Transparency (iOS 14.5+)
  }
};
