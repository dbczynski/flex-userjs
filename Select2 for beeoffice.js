// ==UserScript==
// @name         Select2 for beeoffice
// @namespace    https://app.beeoffice.com
// @version      0.4
// @description  Make dropdown boxes searchable for now only first one...
// @author       Pscola🐝 :-), Damian Dembczyński
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beeoffice.com
// @require		 https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require		 https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js
// @resource     SELECT2_CSS https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css
// @updateURL    https://raw.githubusercontent.com/dbczynski/flex-userjs/main/Select2%20for%20beeoffice.js
// @downloadURL  https://raw.githubusercontent.com/dbczynski/flex-userjs/main/Select2%20for%20beeoffice.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @match        https://app.beeoffice.com/*
// @exclude      https://app.beeoffice.com/ustawienia/settingstree/settingstree.aspx
// @exclude      https://app.beeoffice.com/Ustawienia/WorkflowConfiguration/WorkflowConfigEdit.aspx*
// ==/UserScript==

/*************************
Version changes
0.4
Select2 on all selects
0.3
Added highlight in Harm list
0.2.1
Additional exclude
0.2
Styles for dark mode
0.1
Test version of select2

*****************/

(function() {
    'use strict';
    var $ = window.jQuery;
    const my_css = GM_getResourceText("SELECT2_CSS");
    GM_addStyle(my_css);
    const highlight = `.select2-results__option--highlighted { background-color: #3399ff; color: white;}`
    GM_addStyle(highlight);
    const style_dark = `
    .select2-results__option--highlighted {
					background: #e4e4e4;
                    color: black;
			}
     .select2-container--default .select2-selection--single .select2-selection__rendered ,.select2-container--default .select2-results > .select2-results__options, .select2-search--dropdown {
          background: #3c3838;
          color: white;
    }`;
    if ($(':root').css('color-scheme') == 'dark'){
        GM_addStyle(style_dark);
    }
    setTimeout(function () {
        $('select:not(.selectized, #ctl00_ctl00_ContentBodyBase_ContentBody_dropDownListMode)')
            .select2() },1)
})();
