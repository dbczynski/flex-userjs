// ==UserScript==
// @name         RCP_name_paste
// @namespace    https://app.beeoffice.com
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.beeoffice.com/TimeRecords/TimeRecordEdit.aspx?id=null&*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beeoffice.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //if(document.URL.match( "https://app.beeoffice.com/TimeRecords/TimeRecordEdit.aspx?*")){
        $("#ctl00_ctl00_ContentBodyBase_ContentBody_NeORefControlEmployee_TextBoxRef").get(0).value = localStorage.getItem("Name");
    //};
}
)();


