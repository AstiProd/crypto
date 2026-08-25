/* =========================================================================
   RÉGIE PUBLICITAIRE
   Une seule API pour le jeu : Ads.showRewarded(...) / Ads.maybeInterstitial(...)
   - sur mobile (Capacitor + @capacitor-community/admob) : vraies pubs AdMob
   - dans un navigateur : lecteur de démonstration intégré, même API
   Le jeu n'a jamais à savoir sur quelle plateforme il tourne.
   ========================================================================= */
(function () {
'use strict';

var CFG = window.ADS_CONFIG || {};
var now = function () { return Date.now() / 1000; };

/* ------------------------------------------------------------------ */
/*  Fournisseur 1 — AdMob natif (iOS / Android via Capacitor)          */
/* ------------------------------------------------------------------ */
function AdMobProvider(plugin, platform) {
  this.p = plugin;
  this.platform = platform;
  this.interstitialReady = false;
}
AdMobProvider.prototype.unit = function (kind) {
  var u = (CFG.units && CFG.units[kind]) || {};
  return u[this.platform] || u.android || '';
};
AdMobProvider.prototype.init = function () {
  var self = this;
  return this.p.initialize({
    initializeForTesting: !!CFG.testMode,
    testingDevices: []
  }).then(function () {
    return self.consent();
  }).then(function () {
    return self.tracking();
  }).then(function () {
    self.preloadInterstitial();
    return true;
  });
};
/* Formulaire de consentement Google UMP (RGPD, CCPA) */
AdMobProvider.prototype.consent = function () {
  var self = this;
  if (!CFG.consent || !CFG.consent.useUmp || !this.p.requestConsentInfo) return Promise.resolve();
  return this.p.requestConsentInfo({ debugGeography: CFG.testMode ? 1 : 0 })
    .then(function (info) {
      if (info && info.isConsentFormAvailable && info.status === 'REQUIRED') {
        return self.p.showConsentForm();
      }
    })
    .catch(function () { /* le consentement ne doit jamais bloquer le jeu */ });
};
/* App Tracking Transparency (iOS 14.5+) — demandé après le consentement */
AdMobProvider.prototype.tracking = function () {
  if (this.platform !== 'ios' || !CFG.consent || !CFG.consent.attPrompt) return Promise.resolve();
  if (!this.p.requestTrackingAuthorization) return Promise.resolve();
  return this.p.requestTrackingAuthorization().catch(function () {});
};
AdMobProvider.prototype.preloadInterstitial = function () {
  var self = this;
  if (!this.p.prepareInterstitial) return;
  this.p.prepareInterstitial({ adId: this.unit('interstitial'), isTesting: !!CFG.testMode })
    .then(function () { self.interstitialReady = true; })
    .catch(function () { self.interstitialReady = false; });
};
AdMobProvider.prototype.rewarded = function () {
  var self = this;
  return this.p.prepareRewardVideoAd({ adId: this.unit('rewarded'), isTesting: !!CFG.testMode })
    .then(function () { return self.p.showRewardVideoAd(); })
    .then(function (item) { return !!item; })       // item null = pub fermée avant la fin
    .catch(function () { return false; });
};
AdMobProvider.prototype.interstitial = function () {
  var self = this;
  var run = this.interstitialReady
    ? Promise.resolve()
    : this.p.prepareInterstitial({ adId: this.unit('interstitial'), isTesting: !!CFG.testMode });
  return run
    .then(function () { return self.p.showInterstitial(); })
    .then(function () { self.interstitialReady = false; self.preloadInterstitial(); return true; })
    .catch(function () { self.interstitialReady = false; return false; });
};
AdMobProvider.prototype.banner = function (show) {
  if (!this.p.showBanner) return Promise.resolve();
  if (!show) return this.p.removeBanner().catch(function () {});
  return this.p.showBanner({
    adId: this.unit('banner'),
    adSize: 'ADAPTIVE_BANNER',
    position: (CFG.banner && CFG.banner.position) || 'BOTTOM_CENTER',
    isTesting: !!CFG.testMode
  }).catch(function () {});
};
AdMobProvider.prototype.privacyOptions = function () {
  if (this.p.showConsentForm) return this.p.showConsentForm().catch(function () {});
  return Promise.resolve();
};

/* ------------------------------------------------------------------ */
/*  Fournisseur 2 — lecteur de démonstration (navigateur)              */
/* ------------------------------------------------------------------ */
function DemoProvider() { this.el = null; }
DemoProvider.prototype.init = function () { return Promise.resolve(true); };
DemoProvider.prototype.build = function () {
  if (this.el) return this.el;
  var wrap = document.createElement('div');
  wrap.className = 'ad-overlay';
  wrap.innerHTML =
    '<div class="ad-frame">' +
      '<span class="ad-tag">Emplacement publicitaire · démo</span>' +
      '<div class="ad-art"><div class="ad-planet"></div><div class="ad-ship">🚀</div></div>' +
      '<div class="ad-body">' +
        '<b class="ad-title"></b>' +
        '<p class="ad-sub">Ici s\'afficherait une vidéo AdMob sur mobile.</p>' +
      '</div>' +
      '<div class="ad-foot"><span class="ad-count"></span>' +
      '<button class="ad-close" type="button" disabled>Fermer</button></div>' +
    '</div>';
  document.body.appendChild(wrap);
  this.el = wrap;
  return wrap;
};
DemoProvider.prototype.play = function (seconds, title, closable) {
  var self = this;
  var el = this.build();
  var count = el.querySelector('.ad-count');
  var close = el.querySelector('.ad-close');
  el.querySelector('.ad-title').textContent = title;
  el.classList.add('on');
  close.disabled = !closable;
  close.textContent = closable ? 'Passer' : 'Fermer';

  return new Promise(function (resolve) {
    var left = seconds, done = false, timer;
    function finish(ok) {
      if (done) return;
      done = true;
      clearInterval(timer);
      el.classList.remove('on');
      close.onclick = null;
      resolve(ok);
    }
    count.textContent = 'Récompense dans ' + left + ' s';
    timer = setInterval(function () {
      left--;
      if (left > 0) {
        count.textContent = 'Récompense dans ' + left + ' s';
      } else {
        clearInterval(timer);
        count.textContent = 'Récompense débloquée ✓';
        close.disabled = false;
        close.textContent = 'Fermer';
        close.onclick = function () { finish(true); };
      }
    }, 1000);
    close.onclick = function () { finish(false); };
  });
};
DemoProvider.prototype.rewarded = function () {
  return this.play(5, 'Vidéo récompensée', true);
};
DemoProvider.prototype.interstitial = function () {
  return this.play(3, 'Interstitiel', false).then(function () { return true; });
};
DemoProvider.prototype.banner = function () { return Promise.resolve(); };
DemoProvider.prototype.privacyOptions = function () {
  alert('Sur mobile, le formulaire de consentement Google UMP s\'ouvrirait ici.');
  return Promise.resolve();
};

/* ------------------------------------------------------------------ */
/*  Fournisseur 3 — portail de jeux HTML5 (web)                        */
/*  Les portails (GameMonetize, GameDistribution, CrazyGames…) exposent */
/*  un SDK global qui ouvre une vidéo et résout une promesse. On s'y    */
/*  branche s'il est présent, sinon on retombe sur la démo.             */
/* ------------------------------------------------------------------ */
function PortalProvider(sdk, fallback) { this.sdk = sdk; this.fallback = fallback; }
PortalProvider.prototype.init = function () { return Promise.resolve(true); };
PortalProvider.prototype.call = function (kind) {
  var s = this.sdk;
  try {
    if (typeof s.showBanner === 'function') return Promise.resolve(s.showBanner(kind));
    if (typeof s.showAd === 'function') return Promise.resolve(s.showAd(kind));
  } catch (e) { /* le SDK a refusé : on ne bloque pas le jeu */ }
  return Promise.reject(new Error('sdk'));
};
PortalProvider.prototype.rewarded = function () {
  var self = this;
  return this.call('rewarded').then(function () { return true; })
    .catch(function () { return self.fallback.rewarded(); });
};
PortalProvider.prototype.interstitial = function () {
  var self = this;
  return this.call('interstitial').then(function () { return true; })
    .catch(function () { return self.fallback.interstitial(); });
};
PortalProvider.prototype.banner = function () { return Promise.resolve(); };
PortalProvider.prototype.privacyOptions = function () { return this.fallback.privacyOptions(); };

/* ------------------------------------------------------------------ */
/*  Gestionnaire                                                       */
/* ------------------------------------------------------------------ */
var Ads = {
  provider: null,
  native: false,
  ready: false,
  removed: false,           // achat « supprimer les pubs »
  busy: false,
  cooldowns: {},            // emplacement -> horodatage du dernier visionnage
  lastInterstitial: 0,
  sessionStart: now(),
  unlocks: 0,

  init: function () {
    var self = this;
    var cap = window.Capacitor;
    var plugin = cap && cap.Plugins && cap.Plugins.AdMob;
    var isNative = !!(cap && cap.isNativePlatform && cap.isNativePlatform() && plugin);

    if (isNative) {
      this.native = true;
      var platform = cap.getPlatform ? cap.getPlatform() : 'android';
      this.provider = new AdMobProvider(plugin, platform);
    } else {
      var demo = new DemoProvider();
      var portal = (CFG.webSdk === 'portal') && (window.sdk || window.gdsdk || window.CrazyGames);
      this.provider = portal ? new PortalProvider(portal, demo) : demo;
    }
    return this.provider.init()
      .then(function () {
        self.ready = true;
        if (!self.removed && CFG.banner && CFG.banner.enabled) self.provider.banner(true);
        return true;
      })
      .catch(function () { self.ready = false; return false; });
  },

  cfg: function (placement) {
    return (CFG.placements && CFG.placements[placement]) || {};
  },

  /* Combien de secondes avant que l'emplacement soit à nouveau disponible */
  waitFor: function (placement) {
    var cd = this.cfg(placement).cooldown || 0;
    if (!cd) return 0;
    var last = this.cooldowns[placement] || 0;
    return Math.max(0, Math.ceil(last + cd - now()));
  },
  canRewarded: function (placement) {
    return this.ready && !this.busy && this.waitFor(placement) === 0;
  },

  /* Vidéo récompensée : résout true si la récompense est acquise */
  showRewarded: function (placement) {
    var self = this;
    if (this.busy) return Promise.resolve(false);
    if (!this.ready) return Promise.resolve(false);
    if (this.waitFor(placement) > 0) return Promise.resolve(false);
    this.busy = true;
    return this.provider.rewarded()
      .then(function (ok) {
        self.busy = false;
        if (ok) self.cooldowns[placement] = now();
        return ok;
      })
      .catch(function () { self.busy = false; return false; });
  },

  /* Interstitiel : affiché seulement si toutes les règles le permettent */
  maybeInterstitial: function (trigger) {
    var self = this;
    var I = CFG.interstitial || {};
    if (this.removed || !this.ready || this.busy) return Promise.resolve(false);
    if (now() - this.sessionStart < (I.warmupSeconds || 0)) return Promise.resolve(false);
    if (now() - this.lastInterstitial < (I.minInterval || 0)) return Promise.resolve(false);
    if (this.unlocks < (I.minUnlocks || 0)) return Promise.resolve(false);
    this.busy = true;
    this.lastInterstitial = now();
    return this.provider.interstitial()
      .then(function (ok) { self.busy = false; return ok; })
      .catch(function () { self.busy = false; return false; });
  },

  setRemoveAds: function (v) {
    this.removed = !!v;
    if (this.provider && this.provider.banner) this.provider.banner(!this.removed && CFG.banner && CFG.banner.enabled);
  },
  privacyOptions: function () {
    return this.provider ? this.provider.privacyOptions() : Promise.resolve();
  },

  /* Sauvegarde */
  serialize: function () {
    return { removed: this.removed, cooldowns: this.cooldowns, unlocks: this.unlocks };
  },
  restore: function (d) {
    if (!d) return;
    this.removed = !!d.removed;
    this.cooldowns = d.cooldowns || {};
    this.unlocks = d.unlocks || 0;
  }
};

window.Ads = Ads;
})();
