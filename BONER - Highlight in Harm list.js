// ==UserScript==
// @name         BONER - Highlight in Harm list
// @namespace    https://app.beeoffice.com
// @version      0.2
// @description  Highlights chosen option
// @author       Damian Dembczynski
// @match        https://app.beeoffice.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beeoffice.com
// @updateURL    https://raw.githubusercontent.com/dbczynski/flex-userjs/main/BONER%20-%20Highlight%20in%20Harm%20list.js
// @downloadURL  https://raw.githubusercontent.com/dbczynski/flex-userjs/main/BONER%20-%20Highlight%20in%20Harm%20list.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
    addGlobalStyle(".select2-results__option--highlighted { background-color: #3399ff; color: white;}")
})();