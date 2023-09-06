// ==UserScript==
// @name         Selectize for beeoffice
// @namespace    https://app.beeoffice.com
// @version      0.2.4
// @description  Make dropdown boxes searchable for now only first one...
// @author       Pscola🐝 :-)
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beeoffice.com
// @require		 https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
//////
// If selectize not working the use:
// https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.6/js/selectize.min.js
//////
// @require		 https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/js/selectize.min.js
// @match        https://app.beeoffice.com/*
// @exclude      https://app.beeoffice.com/ustawienia/settingstree/*
// @exclude      https://app.beeoffice.com/Schedule/Leaves/NewLeavesEdit.aspx?*
// @grant        none

// ==/UserScript==

/*************************
Version changes
0.2.4
Updating vesions of jquery and selectize.

0.2.2
Added Additonal exclude in leaves. Removed jQuery - already used in BO.

0.2.1
Exclude of settings

0.2
Only first value will be selectized. Added additonal improvments for forms

0.1
Test version of selectized

*****************/



(function() {
    'use strict';
    //
    var idInput;
    var yearField;
    var id;
  /*
    // Leave limits select
    if ( document.URL.match("https://app.beeoffice.com/Ustawienia/LeaveLimits/LeaveLimitsEdit.aspx*")){
        yearField= document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_TextBoxYear");
        id = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_DropDownListEmployee");
        idInput = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_DropDownListEmployee-selectized");
        if (yearField.value == ""){
            id.value = "";
            yearField.value = new Date().getFullYear();
        }
    }
    // Time schedule select
    if ( document.URL.match("https://app.beeoffice.com/Ustawienia/TimeSchedules/TimeSchedulesDetails/TimeSchedulesDEtailsEdit.aspx*")){
        yearField = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDate_TextBoxDate");
        id = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dropDownListTimeSchedule");
        if (yearField.value == ""){
            idInput = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dropDownListTimeSchedule-selectized");
        }
    }
*/
    // Making select interactive
    //!warrning is normal!
    $('.DelForm select:first, #ctl00_ctl00_ContentBodyBase_ContentBody_NeOListControl_filterControl_timeschedule_id_2_name_DropDownListRef').selectize({
          sortField: 'text'
      });
/*
    // Focus on selectized input
    if(document.URL.match("*Edit.aspx?id=null&*")) {
        if (localStorage.Name == null) idInput.focus();
        else {jQuery("#ctl00_ctl00_ContentBodyBase_ContentBody_DropDownListEmployee-selectized").get(0).click();
              setTimeout(function(){ $(".option:contains('"+localStorage.Name+"')").get(0).click()},2000);
           }
    }
    */
    /*********for future use  ***********/
    //selecting value:
    //jQuery('.delForms .selectize-dropdown-content .option[data-value="xxxxx"]').click()



})();