const colors = require("colors");
const prompt = require("prompt-sync")();
const minNumber = parseInt(prompt("Enter min number :  "));
const maxNumber = parseInt(prompt("Enter max number :  "));
const rangeInt = []
for (let i = minNumber; i <= maxNumber; i++){
  rangeInt.push(i);
};

function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return num > 1;
}

const results = rangeInt.filter(isPrime);

if (results.length == 0) {
  console.log('No prime numbers found'.red)
} else{
  console.log(colors.bgGreen(results[0]));
  console.log(colors.bgYellow(results[1]));
  console.log(colors.bgRed(results[2]));
  console.log(results.slice(3));
}
