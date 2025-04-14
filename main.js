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

let calcDisplay = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

function inputUserNum() {
  calcDisplay.textContent = "";
  for (const element of buttons) {
    element.addEventListener("click", function () {
      //If there is already value in calcFirstNumber input calcSecondNumber
      if (
        //If operator has a value skip inputting data to the first user number
        calcOperator &&
        (Number(element.textContent) ||
          element.textContent === "0" ||
          element.textContent === "00")
      ) {
        // if second user number has empty string
        if (calcSecondNumber === "") {
          calcDisplay.textContent = "";
        }
        calcDisplay.textContent += element.textContent;
        calcSecondNumber = calcDisplay.textContent;
      } else if (
        // Save the first user number
        Number(element.textContent) ||
        element.textContent === "0" ||
        element.textContent === "00"
      ) {
        calcDisplay.textContent += element.textContent;
        calcFirstNumber = calcDisplay.textContent;
      } else if (
        calcOperator &&
        (element.textContent === "+" ||
          element.textContent === "-" ||
          element.textContent === "*" ||
          element.textContent === "/")
      ) {
        calcDisplay.textContent = operate(
          calcOperator,
          calcFirstNumber,
          calcSecondNumber
        );
        calcFirstNumber = calcDisplay.textContent;
        calcSecondNumber = "";
        // calcFirstNumber = Number(calcDisplay.textContent);
        calcOperator = element.textContent;
      } else if (
        //Save user's operator
        element.textContent === "+" ||
        element.textContent === "-" ||
        element.textContent === "*" ||
        element.textContent === "/"
      ) {
        calcOperator = element.textContent;
        calcDisplay.textContent = "";
      }
      // If the user press "=" display the result
      else if (element.textContent === "=") {
        //Check if the user wants to divide by zero
        if (
          calcOperator === "/" &&
          (calcSecondNumber === "0" || calcSecondNumber === "00")
        ) {
          alert("Error! Do not divide by zero");
          calcDisplay.textContent = "";
          calcFirstNumber = "";
          calcSecondNumber = "";
          calcOperator = "";
        } else {
          console.log(calcFirstNumber, calcOperator, calcSecondNumber);
          calcDisplay.textContent = operate(
            calcOperator,
            calcFirstNumber,
            calcSecondNumber
          );
        }
      }
      // Clear Button
      else if (element.textContent === "C") {
        calcDisplay.textContent = "";
        calcFirstNumber = "";
        calcSecondNumber = "";
        calcOperator = "";
      }
      console.log(calcFirstNumber, calcOperator, calcSecondNumber);
    });
  }
}

inputUserNum();
