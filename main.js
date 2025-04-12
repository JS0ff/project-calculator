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
function operate(calcOperator, calcFirstNumber, calcSecondNumber) {
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

let calcDisplay = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

function inputUserNum() {
  calcDisplay.textContent = "";
  for (const element of buttons) {
    element.addEventListener("click", function () {
      if (
        calcOperator &&
        (Number(element.textContent) ||
          element.textContent === "0" ||
          element.textContent === "00")
      ) {
        calcDisplay.textContent += element.textContent;
        calcSecondNumber = calcDisplay.textContent;
      } else if (
        Number(element.textContent) ||
        element.textContent === "0" ||
        element.textContent === "00"
      ) {
        calcDisplay.textContent += element.textContent;
        calcFirstNumber = calcDisplay.textContent;
      } else if (
        element.textContent === "+" ||
        element.textContent === "-" ||
        element.textContent === "*" ||
        element.textContent === "/"
      ) {
        calcOperator = element.textContent;
        calcDisplay.textContent = "";
      } else if (element.textContent === "=") {
        calcFirstNumber = Number(calcFirstNumber);
        calcSecondNumber = Number(calcSecondNumber);
        console.log(operate(calcOperator, calcFirstNumber, calcSecondNumber));
        calcDisplay.textContent = operate(
          calcOperator,
          calcFirstNumber,
          calcSecondNumber
        );
      }
    });
  }
}

inputUserNum();
