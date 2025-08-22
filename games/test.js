//pacman changer

var counter = 0;
var p = "0.1";
var q = "6.15";
var r = "3.27";
var s = "9.3";
var changeCounter = function () {
  counter = counter === 0 ? 1 : 0;
  p = p === 0.15 ? 0.55 : 0.15;
  q = q === 6 ? 5.76 : 6;
  r = r === 3.37 ? 3.67 : 3.37;
  s = s === 9.2 ? 8.9 : 9.2;
  setTimeout(changeCounter, 100);
}
changeCounter();