// ==UserScript==
// @name         RCP_Name_copy
// @namespace    https://app.beeoffice.com
// @version      0.1
// @description  Store emplyee name from filter
// @author       Pscola🐝
// @match        https://app.beeoffice.com/timerecords/timerecords.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beeoffice.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("#ctl00_ctl00_ContentBodyBase_ContentBody_NeOListControl1_ButtonAdd2_ButtonAdd2").get(0).addEventListener('mousedown', function(){
            var id="#ctl00_ctl00_ContentBodyBase_ContentBody_NeOListControl1_filterControl_employee_id_1_forenameSurname_DropDownListPracownikPlain option:first";
            var val = $(id).get(0).value;
            var txt = $(id).get(0).text;
            if( val != "-1"){
                localStorage.setItem('Name', txt)
            };
        });



}
)();


