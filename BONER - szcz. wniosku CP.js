// ==UserScript==
// @name         BONER - szcz. wniosku CP
// @namespace    https://app.beeoffice.com/
// @version      0.0.5
// @description  BeeOffice New Extensions Reduced - wniosek o zmianę czasu pracy - szczegóły
// @author       Damian Dembczyński, Michał Kozłowski
// @match        https://app.beeoffice.com/HRWorktime/HRWorktimeEdit.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beeoffice.com
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

//CHANGELOG
//v0.0.1
// - initial version, forked from BONER - szcz. harm. v0.0.2
//v0.0.2
// - added Mode changer button (replaces "Overtime" text button when mode incorrect)
//v0.0.3
// - fixed button time
//v0.0.4
// - added support for select2
//v0.0.5
// - added check for status
(function() {
    'use strict';

    //existing website elements
    var status = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_NeOWorkflowControl1_LabelStatus")
    var parentCell = document.querySelector('#ctl00_ctl00_ContentBodyBase_ContentBody_DurationTextBoxRow :nth-child(2)');
    var modeList = document.querySelector("#ctl00_ctl00_ContentBodyBase_ContentBody_DropDownListType");
    var selectizeList = document.querySelector(".selectize-dropdown-content");
    var inputOd = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_NeODateTimeControlStart1_TextBoxTime");
    var inputDo = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_NeODateTimeControlEnd1_TextBoxTime");

    //create a "Overtime" text or Mode button
    var overtimeButton = document.createElement("div");
    overtimeButton.className = "buttonWithoutIcon iconButton bigIconButton";
    if ( status == null || status.innerText =="Nowy" || status.innerText == "New" ){
    if(modeList.value =='6a1d06d0-1d45-4147-9e4f-f61ba63fd499'){
        overtimeButton.innerText = "overtime"
        overtimeButton.addEventListener('click', event => {
            document.querySelector('#ctl00_ctl00_ContentBodyBase_SidePanel_NeoKomentarz_Comment').value = "Overtime";
        })
    }
    else {
        overtimeButton.innerText = "nadgodziny"
        overtimeButton.addEventListener('click', event => {
            if (document.querySelector('#ctl00_ctl00_ContentBodyBase_ContentBody_DropDownListType-selectized'))
            {
                setTimeout(() => {$('#ctl00_ctl00_ContentBodyBase_ContentBody_DropDownListType-selectized').click()}, 0);
                setTimeout(() => {$('[data-value="6a1d06d0-1d45-4147-9e4f-f61ba63fd499"]').click()}, 100);
            }
            else {
                setTimeout(() => { $('#ctl00_ctl00_ContentBodyBase_ContentBody_DropDownListType').val("6a1d06d0-1d45-4147-9e4f-f61ba63fd499");
                                  $('#ctl00_ctl00_ContentBodyBase_ContentBody_DropDownListType').trigger('change');}, 1);
            }
            console.log("DONE")
            ;
        })
    }
    document.querySelector("#ctl00_ctl00_ContentBodyBase_ContentBody_TableType > tbody > tr:nth-child(4) > td").appendChild(overtimeButton);
    //parentRow.cells[0].appendChild(wolneButton);

    //create time buttons
    const timePresets = [
        ["16-20","16:00","20:00"],
        ["20-00","20:00","00:00"],
        ["14-18","14:00","18:00"],
        ["18-22","18:00","22:00"],
        ["08-20","08:00","20:00"],
        ["20-08","20:00","08:00"],
        ["06-18","06:00","18:00"],
        ["18-06","18:00","06:00"]];

    for(let preset of timePresets){
        let j = document.createElement("button");
        j.className = "buttonWithoutIcon iconButton bigIconButton";
        j.style.float = "left";
        j.innerText = preset[0];
        j.id = preset[0];
        j.addEventListener('click', event => {
            //modeList.value = "2";
            inputOd.value = preset[1];
            inputDo.value = preset[2];
        });
        parentCell.appendChild(j);
    }
    document.querySelector('#ctl00_ctl00_ContentBodyBase_ContentBody_DurationTextBoxRow :nth-child(2) :nth-child(5)').style.clear = "left";
    //turn off SAVE if time not entered
    if(modeList.value == "6a1d06d0-1d45-4147-9e4f-f61ba63fd499" && (inputOd.value == "00:00" || inputOd.value == "") && (inputDo.value == "00:00" || inputDo.value == "")){
        var saveButton = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_NeOFormControl_ButtonSave_ButtonSave")
        saveButton.style.backgroundColor = "grey";
        saveButton.setAttribute("href", "");
    }}
})();