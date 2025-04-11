// ==UserScript==
// @name         Remove Ad Banner on "Yandex" main page
// @name:ru      Удалить баннер рекламы на главной странице "Яндекса"
// @namespace    http://tampermonkey.net/
// @version      2025-01-06
// @description  Simple but effective banner remover
// @description:ru Простой, но эффективный инструмент для удаления баннеров рекламы
// @author       Ktilis
// @match        https://ya.ru*
// @match        https://yandex.ru/games*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ya.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let bannerClass = document.querySelector('div.i-mini-bem');
    let bannerMarketClass = document.querySelector("div.body__feed-wrapper");
    let bannerId = document.getElementById('yandex-adv-sticky-banner-desktop');
    let mainPageNewBanner = document.querySelector('aside.informers3').nextSibling.nextSibling;

    if (bannerClass) {
        bannerClass.innerHTML = '';
        bannerClass.remove();
    }

    if (bannerMarketClass) {
        bannerMarketClass.innerHTML = '';
        bannerMarketClass.remove();
    }

    if (bannerId) {
        bannerId.innerHTML = '';
        bannerId.remove();
    }

    if (mainPageNewBanner) {
        mainPageNewBanner.innerHTML = '';
        mainPageNewBanner.remove();
    }
})();