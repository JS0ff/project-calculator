function add(a, b) {
  return Math.round((a + b) * 1000) / 1000;
}
function subtract(a, b) {
  return Math.round((a - b) * 1000) / 1000;
}
function multiply(a, b) {
  return Math.round(a * b * 1000) / 1000;
}
function divide(a, b) {
  return Math.round((a / b) * 1000000) / 1000000;
}

//Save the user's operation input data
let calcFirstNumber;
let calcSecondNumber;
let calcOperator;

const operators = ["+", "-", "*", "/"];

//Function that takes users data and gives the result based on operator
function operate(calcOperator, calcFirstNumber, calcSecondNumber) {
  calcFirstNumber = Number(calcFirstNumber);
  calcSecondNumber = Number(calcSecondNumber);
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

//Clears all data
function clearUserInputData() {
  return (
    (calcDisplay.textContent = ""),
    (calcFirstNumber = ""),
    (calcSecondNumber = ""),
    (calcOperator = "")
  );
}

function checkAllOperation() {
  if (
    calcDisplay.textContent ==
      Number(calcSecondNumber) + Number(calcFirstNumber) ||
    calcDisplay.textContent ==
      Number(calcFirstNumber) - Number(calcSecondNumber) ||
    calcDisplay.textContent ==
      Number(calcSecondNumber) * Number(calcFirstNumber) ||
    calcDisplay.textContent ==
      // Operate function() rounds up sum, it will not read the displayed number as similar without round up
      Math.round(
        (Number(calcFirstNumber) / Number(calcSecondNumber)) * 1000000
      ) /
        1000000
  )
    return true;
  else return false;
}

let calcDisplay = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const dotBtn = document.querySelector("#dot");

//Create functions for each action
//Create main function that will create the result
function inputFirstNumber() {
  calcDisplay.textContent = "";
  for (const element of buttons) {
    element.addEventListener("click", function () {
      if (Number(element.textContent) || element.textContent === "0") {
        calcDisplay.textContent += element.textContent;
      } else if (operators.includes(element.textContent)) {
        return calcDisplay.textContent;
      }
    });
  }
}
function inputSecondNumber() {}
function inputOperation() {}

// Main function
function calculator() {}
