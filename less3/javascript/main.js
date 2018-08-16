let str = "lor'em 'agate mori' - 'nope' gofo";
const reg1 = /'/g;
const reg2 = /'\B|\B'/g;

let ans1 = str.replace(reg1, '"');
let ans2 = str.replace(reg2, '"');

console.log(str);
console.log(ans1);
console.log(ans2);

