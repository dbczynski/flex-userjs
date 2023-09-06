// ==UserScript==
// @name         Beeoffice_EditRCP
// @namespace    https://app.beeoffice.com
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://app.beeoffice.com/TimeRecords/TimeRecordEdit.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beeoffice.com
// @updateURL    https://raw.githubusercontent.com/dbczynski/flex-userjs/main/BO_EditRCP.js
// @downloadURL  https://raw.githubusercontent.com/dbczynski/flex-userjs/main/BO_EditRCP.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let x = $('#ctl00_ctl00_ContentBodyBase_ContentBody_textBoxDate')[0].value
    $('#ctl00_ctl00_ContentBodyBase_ContentBody_textBoxDate')[0].value = x.substr(0,16)
    $('#ctl00_ctl00_ContentBodyBase_ContentBody_textBoxDate + span')[0].innerHTML = x.substr(16,3)
    


    
})();