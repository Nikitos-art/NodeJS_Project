var countDownDate = new Date("Feb 8, 2022 17:37:00").getTime();
const colors = require("colors");
const prompt = require("prompt-sync")();
var countDownDate = new Date(prompt("Введите дату и вермя (час-день-месяц-год):"));


var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
  var years = Math.floor(distance / (1000 * 60 * 60 * 24 * 30 * 12));

  console.log(colors.bgGreen(`seconds:${seconds}  minutes:${minutes}  hours:${hours}  days:${days}  months:${months}  years:${years}`));

  if (distance < 0) {
    clearInterval(x);
    console.log("TIME'S UP!");
  }
}, 1000);
