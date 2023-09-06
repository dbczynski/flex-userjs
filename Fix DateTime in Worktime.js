// ==UserScript==
// @name         Fix DateTime in Worktime
// @namespace    https://app.beeoffice.com
// @version      0.4
// @description  Fix DateTime in Worktime to full length (with seconds)
// @author       Pszczoła 🐝
// @match        https://app.beeoffice.com/TimeRecords/TimeRecordEdit.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beeoffice.com
// @updateURL    https://raw.githubusercontent.com/dbczynski/flex-userjs/main/Fix%20DateTime%20in%20Worktime.js
// @downloadURL  https://raw.githubusercontent.com/dbczynski/flex-userjs/main/Fix%20DateTime%20in%20Worktime.js
// @grant        none
// ==/UserScript==


/**
 * Overwriting orginal function to allow textBoxDate filed allow seconds
 * Modified max lenght to 19 and added additional ':'
 * @returns No returns
 */

(function (){
    if (navigator.userAgent.toLowerCase().indexOf('firefox')>0){
        embedFunction(constraintFieldsInput)}
    else {constraintFieldsInput();}
})();

function constraintFieldsInput() {
    var targetInput = '[id*="textBoxDate"]';
    var target = $(targetInput);
    if(target.length == 0)
    {
        return;
    }

    allowNumbersOnlyInField(targetInput);

    document.addEventListener("keypress", function (e) {
        $(target).attr('maxlength', '19');

        var value = $(target).val();
        if (value.length == 4 || value.length == 7) {
            $(target).val($(target).val() + '-');
        }
        else if (value.length == 10) {
            $(target).val($(target).val() + ' ');
        }
        else if (value.length == 13) {
            $(target).val($(target).val() + ':');
        }
        else if (value.length == 16) {
            $(target).val($(target).val() + ':');
        }
    });

    function allowNumbersOnlyInField(input) {
        document.addEventListener("keypress", function (e) {
            var target = e.target.closest(input);
            if (target) {
                var keyCode = e.which ? e.which : e.keyCode
                if (!(keyCode >= 48 && keyCode <= 57)) {
                    e.preventDefault();
                }
            }
        });
    }
}

function embedFunction(s) {
    document.body.appendChild(document.createElement('script'))
        .innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}


