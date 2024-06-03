// ==UserScript==
// @name         BONER - szcz. harm
// @namespace    https://app.beeoffice.com/
// @version      0.0.9
// @description  BeeOffice New Extensions Reduced - szczegóły harmonogramów
// @author       Damian Dembczyński
// @match        https://app.beeoffice.com/Ustawienia/TimeSchedules/TimeSchedulesDetails/TimeSchedulesDEtailsEdit.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beeoffice.com
// @updateURL    https://raw.githubusercontent.com/dbczynski/flex-userjs/main/BONER%20-%20szcz.%20harm.js
// @downloadURL  https://raw.githubusercontent.com/dbczynski/flex-userjs/main/BONER%20-%20szcz.%20harm.js
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

//CHANGELOG
//v0.0.1
// - initial version
//v0.0.2
// - added "wolne/zakres" button;
// - time preset buttons now set List Mode to "zakres godzin" if not set already (requires 2nd click to pick time)
// - added console warning when Harmonogrqam not selected.
// - greyed-out and redirected "Save" button when "zakres godzin selected" and both set to 00:00
// - added 5 more hour buttons and split it to 2 lines
//v0.0.3
// - fixed mistake in time button
//v0.0.4
// - added missing times
//v0.0.5
// - major overhaul to the UI, to the code and also eliminated unnecessery reloads.
//v0.0.6
// - minor UI improvments
//v0.0.7
// - adding compatibility with hour-time schedule
//v0.0.8
// - removing compatibility with hour-time schedule as it was added to website js
//v0.0.
// - adding :30 button

(function () {
    'use strict';


    //existing website elements
    var parentRow = document.querySelector("#ctl00_ctl00_ContentBodyBase_ContentBody_TableType > tbody > tr:first-child");
    var modeList = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dropDownListMode");
    var inputOd = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDate_TextBoxTime");
    var inputDo = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDateTo_TextBoxTime");
    var inputCzas = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_textBoxTime");
    const uselessButton = document.createElement("button");
    uselessButton.id = "accept";
    uselessButton.style.border = "none";
    parentRow.appendChild(uselessButton);

    const saveButton = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_NeOFormControl_ButtonSave_ButtonSave");
    const afterSave = document.createElement("div")
    afterSave.id = "afterSave";
    afterSave.innerHTML = "Nie zapisz";
    afterSave.style.display = "none";
    saveButton.parentElement.insertBefore(afterSave, saveButton)

    if (modeList != null) {

        if (modeList.value == "2" && (inputOd.value == "00:00" || inputOd.value == "") && (inputDo.value == "00:00" || inputDo.value == "")) {
            saveButton.style.display = "none";
            afterSave.style.display = "block";
        }

        // add <script>
        const ttblFn = `
    function disableEnableSave(){
        var inputOd = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDate_TextBoxTime");
        var inputDo = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDateTo_TextBoxTime");
        var saveButton = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_NeOFormControl_ButtonSave_ButtonSave");
        var afterSave = document.getElementById("afterSave");
        var modeList = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dropDownListMode");

        if(modeList.value == "2" && (inputOd.value == "00:00" || inputOd.value == "") && (inputDo.value == "00:00" || inputDo.value == "")){
            saveButton.style.display = "none";
            afterSave.style.display = "block";
        } else {
            saveButton.style.display = "block";
            afterSave.style.display = "none";
        }

        var wolneButton = document.getElementById("wolneButton");
        var zakresButton = document.getElementById("zakresButton");

        if(modeList.value == "2"){
            wolneButton.style.display = "block";
            zakresButton.style.display = "none";
        } else {
            wolneButton.style.display = "none";
            zakresButton.style.display = "block";
        }
    }
    function ttbl(startTime, endTime){
        document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDate_TextBoxTime").value = startTime;
        document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDateTo_TextBoxTime").value = endTime;
        disableEnableSave();
    }
    function ttbl30(){
        document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDate_TextBoxTime").value = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDate_TextBoxTime").value.split(':')[0]+":30";
        document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDateTo_TextBoxTime").value = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDateTo_TextBoxTime").value.split(':')[0]+":30";
        disableEnableSave();
    }
    function setMode(value){
        document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dropDownListMode").value = value;
        disableEnableSave();
    }`
        const ttblSc = document.createElement("script")
        ttblSc.innerHTML = ttblFn;
        parentRow.appendChild(ttblSc);

        //create time buttons
        const timeTable = `
    <table>
        <colgroup span="1" class="col1"/>
        <colgroup span="3"/>
        <colgroup span="2"/>
    <tr> <td></td>
         <th colspan="3">Dniówki</th>
         <th colspan="2">Nocki</th>
    </tr>
    <tr> <td>12h</td>
         <td><button type="button" onclick='ttbl("06:00","18:00")' id="6-18" >6 - 18</button></td>
         <td><button type="button" onclick='ttbl("08:00","20:00")' id="8-20" >8 - 20</button></td>
         <td></td>
         <td><button type="button" onclick='ttbl("18:00","06:00")' id="18-6" >18 - 6</button></td>
         <td><button type="button" onclick='ttbl("20:00","08:00")' id="20-08">20 - 8</button></td>
    <tr>
    <tr> <td>8</td>
         <td><button type="button" onclick='ttbl("08:00","16:00")' id="8-16" >8 - 16</button></td>
         <td><button type="button" onclick='ttbl("16:00","00:00")' id="16-24">16 - 24</button</td>
         <td></td>
         <td><button type="button" onclick='ttbl("23:59","07:59")' id="23:59-7:59">23:59-7:59</button></td>
         <td></td>
    </tr>
    <tr> <td>6</td>
         <td><button type="button" onclick='ttbl("06:00","14:00")' id="6-14">6 - 14</button></td>
         <td></td>
         <td></td>
         <td><button type="button" onclick='ttbl("22:00","06:00")' id="22-6" >22 - 6</button></td>
         <td></td>
    </tr>
    <tr> <td>club</td>
         <td><button type="button" onclick='ttbl("12:00","20:00")' id="12-20">12 - 20</button></td>
         <td><button type="button" onclick='ttbl("13:00","21:00")' id="13-21">13 - 21</button></td>
         <td><button type="button" onclick='ttbl("14:00","22:00")' id="14-22">14 - 22</button></td>
    </tr>
    <tr> <td> 7 i 15 </td>
         <td><button type="button" onclick='ttbl("07:00","15:00")' id="7-15">7 - 15</button></td>
         <td><button type="button" onclick='ttbl("15:00","23:00")' id="15-23">15 - 23</button></td>
         <td><button type="button" onclick='ttbl("09:00","17:00")' id="9-17">9 - 17</button></td>
         <td><button type="button" onclick='ttbl30()' id="30" >:30</button></td>
         <td></td>
    </tr>
    <tr> <td></td>
         <td colspan="2">
         <button class="buttonWithoutIcon iconButton buttonHighlighted bigIconButton" type="button" onclick='setMode("2")' id="zakresButton" style="display:none"> > zakres</button>
         <button class="buttonWithoutIcon iconButton buttonHighlighted bigIconButton" type="button" onclick='setMode("3"); ttbl("","")' id="wolneButton" > > set 00 - 00</button>
    </td></tr>
    </table>`
        const zakresBtn = `<button class="buttonWithoutIcon iconButton buttonHighlighted bigIconButton" onclick='setMode("2")' id="zakresButton"> > zakres</button>`;
        var cell = document.createElement("td");
        cell.id = "ttbl";
        if ((modeList.value == "2")) cell.innerHTML = timeTable;
        else cell.innerHTML = zakresBtn
        cell.rowSpan = "10"
        parentRow.appendChild(cell);

        const styleTxt = `#ttbl td,#ttbl th {padding: 5px 3px; border-bottom: grey solid 1px;} #ttbl colgroup {border:grey solid 1px; padding: 2px;} #ttbl button {width: 100%; margin: 0px}#ttbl th,#ttbl tr td:first-child { border: gray solid 2px; font-weight: 600; background-color: #58585844 }`
        var styleEl = document.createElement("style");
        styleEl.innerHTML = styleTxt
        document.querySelector("head").appendChild(styleEl)
    }
    else //if(document.getElementsByName("ctl00$ctl00$ContentBodyBase$ContentBody$dropDownListTimeSchedule [selected]").innerText != "...")
        //
    {
        var inputDataOd = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDate_TextBoxDate")
        var inputDataDo = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_dateTimeControlDateTo_TextBoxDate")

        inputCzas.classList.add("poleTimeControl")
        
        if (inputOd.value == "" || inputDataOd.value == "" || inputDataDo.value == "" || inputDo.value == "" || inputCzas.value == "") {
            saveButton.style.display = "none";
            afterSave.style.display = "block";
        }
    }
})();
