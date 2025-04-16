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

let calcDisplay = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

const dotBtn = document.querySelector("#dot");

function inputUserNum() {
  calcDisplay.textContent = "";
  for (const element of buttons) {
    element.addEventListener("click", function () {
      // Checks for dots in a display number,
      // if finds one deletes event listener and colors the dot button to the gray
      dotsAmount = calcDisplay.textContent
        .split("")
        .filter((item) => item === ".");
      if (dotsAmount.length === 1) {
        dotBtn.removeEventListener("click", function () {});
      } else if (element.textContent === ".") {
        calcDisplay.textContent += ".";
      }

      if (
        element.textContent === "␈" &&
        !calcOperator &&
        (!(
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
        ) ||
          !calcSecondNumber)
      ) {
        calcDisplay.textContent = calcDisplay.textContent
          .split("")
          .slice(0, length - 1)
          .join("");
        calcFirstNumber = calcDisplay.textContent;
      } else if (
        element.textContent === "␈" &&
        calcOperator &&
        !(
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
      ) {
        calcDisplay.textContent = calcDisplay.textContent
          .split("")
          .slice(0, length - 1)
          .join("");
        calcSecondNumber = calcDisplay.textContent;
      }

      //If there is already value in calcFirstNumber input calcSecondNumber
      else if (
        //If operator has a value skip inputting data to the first user number
        // and input the value to the second number
        calcOperator &&
        (Number(element.textContent) || element.textContent === "0")
      ) {
        // if second user number has empty string then input to the second number
        if (calcSecondNumber === "") {
          calcDisplay.textContent = "";
          calcDisplay.textContent += element.textContent;
          calcSecondNumber = calcDisplay.textContent;
        }
        // If first number and second number sum will be equal to displayed number,
        // remove all data from display and save the current sum to the first number
        else if (
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
        ) {
          clearUserInputData();
          calcDisplay.textContent += element.textContent;
          calcFirstNumber = calcDisplay.textContent;
        } else {
          //Else just save the value to the second number
          calcDisplay.textContent += element.textContent;
          calcSecondNumber = calcDisplay.textContent;
        }
      } else if (
        // Save the first user number
        Number(element.textContent) ||
        element.textContent === "0"
      ) {
        calcDisplay.textContent += element.textContent;
        calcFirstNumber = calcDisplay.textContent;
      } else if (
        //Alert if the user continues to press operator button
        calcOperator &&
        !calcSecondNumber &&
        operators.includes(element.textContent)
      ) {
        alert("Please input the second number");
      } else if (calcOperator && operators.includes(element.textContent)) {
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
        operators.includes(element.textContent)
      ) {
        calcOperator = element.textContent;
        calcDisplay.textContent = "";
      }
      // If the user press "=" display the result
      else if (element.textContent === "=") {
        //Check if the user wants to divide by zero
        if (calcOperator === "/" && calcSecondNumber === "0") {
          alert("Error! Do not divide by zero");
          clearUserInputData();
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
        clearUserInputData();
      }
      console.log(calcFirstNumber, calcOperator, calcSecondNumber);
    });
  }
}

inputUserNum();
