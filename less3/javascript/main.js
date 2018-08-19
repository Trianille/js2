const str = "lor'em 'agate mori' - 'nope' gofo";
const reg1 = /'/g;
const reg2 = /'\B|\B'/g;

let ans1 = str.replace(reg1, '"');
let ans2 = str.replace(reg2, '"');

console.log(str);
console.log(ans1);
console.log(ans2);

function callUs(parent) {
    let el = document.createElement('div');
    el.classList.add('call-us');

    /*let btn = document.createElement('input');
    btn.id = 'call-us-submit';
    btn.type = 'button';*/

    el.innerHTML = '<form action=# method="post" name="callUs">' +
        '<fieldset><legend>Call us</legend>' +
        '<label for="call-us-name">Имя</label><input id="call-us-name" type="text">' +
        '<label for="call-us-texl">Телефон</label><input id="call-us-tel" type="text">' +
        '<label for="call-us-email">E-mail</label><input id="call-us-email" type="email">' +
        '<label for="call-us-text">Текст</label><textarea id="call-us-text"></textarea>' +
        '<label for="call-us-submit"></label><input id="call-us-submit" type="button" onClick="validate()">' +
        '</fieldset></form>';
    document.querySelector('.' + parent).appendChild(el);
}



function validate() {
    const maskName = /^[A-Za-z]+$/g;
    const maskTelFirst = /^(\+7|8)\d{10}$/g;
    const maskTel = /^\+7\(\d{3}\)\d{3}-\d{4}$/g;
    const maskEmail = /^\w+?\@[A-Za-z]+?\.[A-Za-z]{2,6}$/g;

    function validating(mask, id) {
        const el = document.querySelector(id);
        console.log(el.value);

        if (mask.test(el.value)) {
            console.log('all good!');
            el.style.border = 'solid 1px green';
            return true;
        } else {
            console.log('bad!');
            el.style.border = 'solid 1px red';
            return false;
        }
    }

    validating(maskName, '#call-us-name');
    if (validating(maskTelFirst, '#call-us-tel')) {
        const el = document.querySelector('#call-us-tel'); //we can make 1 mask but in task we have to use one variation
        el.value = '+7(' + el.value.slice(1, 4) + ')' + el.value.slice(4, 7) + '-' + el.value.slice(7, 11);
        validating(maskTel, '#call-us-tel')
    }
    validating(maskEmail, '#call-us-email');

}

document.addEventListener('DOMContentLoaded', function () {
    callUs('container');
});
