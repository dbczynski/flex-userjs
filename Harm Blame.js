// ==UserScript==
// @name         Harm Blame
// @namespace    https://app.beeoffice.com
// @version      0.3
// @description  Write last editor into desc
// @author       Damian Dembczyński
// @match        https://app.beeoffice.com/Ustawienia/TimeSchedules/TimeSchedulesDetails/TimeSchedulesDEtailsEdit.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beeoffice.com
// @updateURL    https://raw.githubusercontent.com/dbczynski/flex-userjs/main/Harm%20Blame.js
// @downloadURL  https://raw.githubusercontent.com/dbczynski/flex-userjs/main/Harm%20Blame.js
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

//existing website elements
    const nameEl = document.getElementById("TopLabelForenameSurName")
    const nameWords = nameEl.innerText.split(" ")
    const nameInitials = nameWords[0][0] + nameWords[1][0]

    const dateNow = new Date()
    const dateString = `${dateNow.getDate()}.${dateNow.getMonth()+1}`

    const descEl = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_textBoxDescription")
    descEl.innerHTML = `${nameInitials} at ${dateString}`

    const forScriptEl = document.createElement("script")
    forScriptEl.innerHTML = `function forFn(forWhom) {
    const el = document.getElementById("ctl00_ctl00_ContentBodyBase_ContentBody_textBoxDescription")
    const preTxt = el.innerHTML.split(" ∵ ")[0]
    el.innerHTML = preTxt + forWhom}`
    document.querySelector("head").append(forScriptEl)

    const forBtnParent = document.createElement("td")
    forBtnParent.innerHTML = `
    <table>
    <tr style="border: 1px solid purple"><td onclick="forFn('')">___</td></tr>
    <tr style="border: 1px solid purple"><td onclick="forFn(' ∵ Zuz')">Zuz &nbsp;</td></tr>
    <tr style="border: 1px solid purple"><td onclick="forFn(' ∵ Marl')">Marl &nbsp;</td></tr>
    <tr style="border: 1px solid purple"><td onclick="forFn(' ∵ Karo')">Karo &nbsp;</td></tr>
    <tr style="border: 1px solid purple"><td onclick="forFn(' ∵ Wiol')">Wiol &nbsp;</td></tr>
    <tr style="border: 1px solid purple"><td onclick="forFn(' ∵ Dywan')">Dywan &nbsp;</td></tr>
    <tr style="border: 1px solid purple"><td onclick="forFn(' ∵ Pack')">Pack &nbsp;</td></tr>
    </table>`
    descEl.parentElement.after(forBtnParent)
})();