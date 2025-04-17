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
      return Math.round((calcFirstNumber + calcSecondNumber) * 1000) / 1000;
    case "-":
      return Math.round((calcFirstNumber - calcSecondNumber) * 1000) / 1000;
    case "*":
      return Math.round(calcFirstNumber * calcSecondNumber * 1000) / 1000;
    case "/":
      return (
        Math.round((calcFirstNumber / calcSecondNumber) * 1000000) / 1000000
      );
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
function inputFirstNumber(element) {
  calcDisplay.textContent += element.textContent;
  return calcDisplay.textContent;
}
function inputSecondNumber(element) {
  calcDisplay.textContent += element.textContent;
  return calcDisplay.textContent;
}

function inputOperator(element) {
  calcDisplay.textContent = "";
  return element.textContent;
}

// Main function
function calculator() {
  for (const element of buttons) {
    element.addEventListener("click", function () {
      //If user hits equal(=) button, show the result
      if (
        element.textContent === "=" &&
        calcFirstNumber &&
        calcSecondNumber &&
        calcOperator
      ) {
        calcDisplay.textContent = operate(
          calcOperator,
          calcFirstNumber,
          calcSecondNumber
        );
        calcFirstNumber = calcDisplay.textContent;
        calcSecondNumber = "";
        calcOperator = "";
      }
      // Input Users data: first number, second number and operator
      if (
        (Number(element.textContent) || element.textContent === "0") &&
        !calcOperator
      ) {
        calcFirstNumber = inputFirstNumber(element);
      } else if (calcOperator && operators.includes(element.textContent)) {
        calcDisplay.textContent = operate(
          calcOperator,
          calcFirstNumber,
          calcSecondNumber
        );
        calcFirstNumber = calcDisplay.textContent;
        calcSecondNumber = "";
        calcOperator = element.textContent;
      } else if (operators.includes(element.textContent)) {
        calcOperator = inputOperator(element);
      } else if (
        (Number(element.textContent) || element.textContent === "0") &&
        calcOperator &&
        !checkAllOperation()
      ) {
        calcSecondNumber = inputSecondNumber(element);
      } else if (
        (Number(element.textContent) || element.textContent === "0") &&
        calcOperator &&
        checkAllOperation()
      ) {
        console.log("here");
        calcDisplay.textContent = "";
        calcSecondNumber = inputSecondNumber(element);
      }

      console.log(calcFirstNumber, calcOperator, calcSecondNumber);
    });
  }
}

calculator();
