// ==UserScript==
// @name         Remove Ad Banner on "Yandex" main page
// @name:ru      Удалить баннер рекламы на главной странице "Яндекса"
// @namespace    http://tampermonkey.net/
// @version      2025-06-04
// @description  Simple but effective banner remover
// @description:ru Простой, но эффективный инструмент для удаления баннеров рекламы
// @author       Ktilis
// @match        https://ya.ru*
// @match        https://yandex.ru/games*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ya.ru
// @homepageURL  https://github.com/Ktilis/userscripts
// @downloadURL  https://raw.githubusercontent.com/Ktilis/userscripts/refs/heads/main/ya-mainPage-ad-remover.user.js
// @updateURL    https://raw.githubusercontent.com/Ktilis/userscripts/refs/heads/main/ya-mainPage-ad-remover.user.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  removeAds();

  setTimeout(() => {
    removeAds();
  }, 1000);
  setInterval(() => {
    removeAds();
  }, 20000); // 20 seconds
})();

function removeAds() {
  "use strict";

  let bannerClass = document.querySelector("div.i-mini-bem");
  let bannerMarketClass = document.querySelector("div.body__feed-wrapper");
  let bannerId = document.getElementById("yandex-adv-sticky-banner-desktop");
  let mainPageNewBanner = document.querySelectorAll(".body__content>div");
  let yaBrowserAd = document.querySelector(".headline").previousSibling;

  if (bannerClass) {
    bannerClass.innerHTML = "";
    bannerClass.remove();
  }

  if (bannerMarketClass) {
    bannerMarketClass.innerHTML = "";
    bannerMarketClass.remove();
  }

  if (bannerId) {
    bannerId.innerHTML = "";
    bannerId.remove();
  }

  if (mainPageNewBanner.length !== 0) {
    mainPageNewBanner.forEach((el) => {
      if (!el.innerHTML.includes("_crpd")) return;

      el.innerHTML = "";
      el.remove();
    });
  }

  if (yaBrowserAd) {
    yaBrowserAd.innerHTML = "";
    yaBrowserAd.remove();
  }

  let linkBroElements = document.querySelectorAll(".link-bro");
  linkBroElements.forEach((el) => {
    if (el.textContent.includes("Браузер")) {
      el.remove();
    }
  });

  //let formEl = document.querySelector("form.i-mini-bem");
  //formEl.nextSibling.remove();
}
