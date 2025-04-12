function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

//Save the user's operation input data
let calcFirstNumber;
let calcSecondNumber;
let calcOperator;

//Function that takes users data and gives the result based on operator
function operation(calcOperator, calcFirstNumber, calcSecondNumber) {
  switch (calcOperator) {
    case "+":
      return add(calcFirstNumber, calcSecondNumber);
    case "-":
      return subtract(calcFirstNumber, calcSecondNumber);
    case "*":
      return multiply(calcFirstNumber, calcSecondNumber);
    case "/":
      return divide(calcFirstNumber, calcSecondNumber);
  }
}

let displayNumber = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
buttons.forEach((element) => {
  element.addEventListener("click", function (e) {
    console.log(e.target.textContent);
    displayNumber.textContent += e.target.textContent;
  });
});
// buttonZero.addEventListener("click", function (e) {
//   console.log(e.target.textContent);
//   displayNumber.textContent += "0";
// });
