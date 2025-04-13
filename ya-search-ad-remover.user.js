// ==UserScript==
// @name         Remove ads in Yandex Search
// @name:ru      Удалить рекламу в поиске Яндекса
// @namespace    http://tampermonkey.net/
// @version      2025-04-13
// @license      MIT
// @description  This script removes all ads that masquerade as regular sites in Yandex Search.
// @description:ru Этот скрипт удаляет всю рекламу, которая маскируется под обычные сайты в поиске Яндекса.
// @author       Ktilis
// @match        https://ya.ru/search*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ya.ru
// @homepageURL  https://github.com/Ktilis/userscripts
// @downloadURL  https://raw.githubusercontent.com/Ktilis/userscripts/refs/heads/main/ya-search-ad-remover.user.js
// @updateURL    https://raw.githubusercontent.com/Ktilis/userscripts/refs/heads/main/ya-search-ad-remover.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    // Функция для удаления элементов li, содержащих рекламу
    function removeAds() {
        //console.log("123");
        const liElements = document.querySelectorAll('li');

        liElements.forEach(li => {
            const divElements = li.querySelectorAll('div');

            divElements.forEach(el => {
                if (el.textContent.includes('Реклама')) {
                    li.remove();
                } else if (el.textContent.includes('реклама')) {
                    li.remove();
                }
            });


            const spanElements = li.querySelectorAll('span');

            spanElements.forEach(el => {
                if (el.textContent.includes('Реклама')) {
                    li.remove();
                } else if (el.textContent.includes('реклама')) {
                    li.remove();
                }
            });            
        });

        const downloadBrowserEl = document.querySelectorAll(".Distribution.HeaderDesktopActions-Distribution");
        downloadBrowserEl.forEach(el => el.remove());
    }

    // Отслеживание рекламы справа от поиска

    // Функция для нахождения элементов по стилю
    // https://github.com/Gerhut/getElementsByStyle
    function getElementsByStyle(matcher) {
        var result = []
        var forEach = result.forEach
        var slice = result.slice

        // Match style sheet rules
        function matchStyleSheet(styleSheet) {
            if (styleSheet.disabled) return

            forEach.call(styleSheet.cssRules, function (rule) {
                switch (rule.type) {
                    case rule.STYLE_RULE:
                        if (matcher(rule.style)) {
                            var elements = document.querySelectorAll(rule.selectorText)
                            result = result.concat(slice.call(elements))
                        }
                        break
                    case rule.IMPORT_RULE:
                        matchStyleSheet(rule.styleSheet)
                        break
                }
            })

        }

        forEach.call(document.styleSheets, matchStyleSheet)

        // Match inline rules
        var styleElements = document.querySelectorAll('[style]')
        var filter = result.filter
        var matchElements = filter.call(styleElements, function(element) {
            return matcher(element.style)
        })
        result = result.concat(matchElements)

        return result
    }
    function rightAdBlockMatcher(style) {
        return style.backgroundImage === 'url("https://yabs.yandex.ru/resource/spacer.gif")';
    }
    function removeRightAdBlock() {
        var elements = getElementsByStyle(rightAdBlockMatcher);
        elements.forEach(el => {
            el.closest('div').remove();
        });
    }

    // Создаём MutationObserver для отслеживания изменений в DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Проверяем, появились ли новые элементы li
                const newLiElements = document.querySelectorAll('li');
                newLiElements.forEach(li => {
                    const divElements = li.querySelectorAll('div');

                    divElements.forEach(el => {
                        if (el.textContent.includes('Реклама')) {
                            li.remove();
                        } else if (el.textContent.includes('реклама')) {
                            li.remove();
                        }
                    });


                    const spanElements = li.querySelectorAll('span');

                    spanElements.forEach(el => {
                        if (el.textContent.includes('Реклама')) {
                            li.remove();
                        } else if (el.textContent.includes('реклама')) {
                            li.remove();
                        }
                    });
                });
            }
        });
    });

    // Настраиваем observer для отслеживания добавления новых элементов
    const config = { childList: true, subtree: true };

    // Начинаем наблюдение за документом
    observer.observe(document.body, config);

    // Запускаем первоначальную проверку после задержки
    removeAds(); removeRightAdBlock();
    setTimeout(() => { removeAds(); removeRightAdBlock(); }, 1000);
    setInterval(() => { removeAds(); removeRightAdBlock(); }, 10000);

})();