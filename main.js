//Save the user's operation input data
let calcDisplay = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const dotBtn = document.querySelector("#dot");
const operators = ["+", "-", "*", "/"];
let calcFirstNumber;
let calcSecondNumber;
let calcOperator;

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
  (calcDisplay.textContent = ""),
    (calcFirstNumber = ""),
    (calcSecondNumber = ""),
    (calcOperator = "");
}
function checkAllOperation() {
  return (
    (Math.round(calcDisplay.textContent) * 1000) / 1000 ==
      (Math.round(Number(calcSecondNumber) + Number(calcFirstNumber)) * 1000) /
        1000 ||
    (Math.round(calcDisplay.textContent) * 1000) / 1000 ==
      Math.round(Number(calcFirstNumber) - Number(calcSecondNumber) * 1000) /
        1000 ||
    (Math.round(calcDisplay.textContent) * 1000) / 1000 ==
      Math.round(Number(calcSecondNumber) * Number(calcFirstNumber) * 1000) /
        1000 ||
    // Operate function() rounds up sum, it will not read the displayed number as similar without round up
    (Math.round(calcDisplay.textContent) * 1000000) / 1000000 ==
      Math.round(
        (Number(calcFirstNumber) / Number(calcSecondNumber)) * 1000000
      ) /
        1000000
  );
}
//Create functions for each action
function inputFirstNumber(element) {
  return (calcDisplay.textContent += element.textContent);
}
function inputSecondNumber(element) {
  return (calcDisplay.textContent += element.textContent);
}
function inputOperator(element) {
  calcDisplay.textContent = "";
  return element.textContent;
}
//Check if number have a dot
function checkForDot(number) {
  dotsQuantity = 0;
  number
    .split("")
    .reduce((sum, item) => (item === "." ? dotsQuantity++ : dotsQuantity), 0);
  return dotsQuantity < 1;
}

//Delete the last element of a number
function deleteLastElNumb(number) {
  return number
    .split("")
    .slice(0, length - 1)
    .join("");
}

//Create function for keyboard support
const keys = document.querySelectorAll(".key");

function inputNumbKeyboard() {
  window.addEventListener("keydown", function (e) {
    if ((Number(e.key) || e.key === "0") && !calcOperator) {
      calcDisplay.textContent += e.key;
      calcFirstNumber = calcDisplay.textContent;
    } else if (operators.includes(e.key) && calcOperator) {
      calcDisplay.textContent = operate(
        calcOperator,
        calcFirstNumber,
        calcSecondNumber
      );
      calcOperator = e.key;
      calcFirstNumber = calcDisplay.textContent;
      calcSecondNumber = "";
    } else if (operators.includes(e.key)) {
      calcDisplay.textContent = "";
      calcOperator = e.key;
    } else if (
      (Number(e.key) || e.key === "0") &&
      calcFirstNumber &&
      calcOperator
    ) {
      if (!checkAllOperation()) {
        calcDisplay.textContent += e.key;
        calcSecondNumber = calcDisplay.textContent;
      } else if (checkAllOperation()) {
        calcDisplay.textContent = "";
        calcDisplay.textContent += e.key;
        calcSecondNumber = calcDisplay.textContent;
      }
    } else if (e.key === "=") {
      if (calcFirstNumber && calcSecondNumber && calcOperator) {
        calcDisplay.textContent = operate(
          calcOperator,
          calcFirstNumber,
          calcSecondNumber
        );
        calcFirstNumber = calcDisplay.textContent;
        calcSecondNumber = "";
        calcOperator = "";
      } else if (!calcSecondNumber) {
        calcDisplay.textContent = calcFirstNumber;
      }
    } else if (e.key === "Backspace") {
      clearUserInputData();
    }
    console.log(calcFirstNumber, calcOperator, calcSecondNumber);
  });
}
inputNumbKeyboard();

// Main function
function calculator() {
  sumOfDots = 0;
  for (const element of buttons) {
    element.addEventListener("click", function () {
      // Create BackSpace button
      if (element.textContent === "␈") {
        if (calcFirstNumber && !calcOperator) {
          calcFirstNumber = deleteLastElNumb(calcFirstNumber);
          calcDisplay.textContent = calcFirstNumber;
        } else if (calcSecondNumber && calcOperator && !checkAllOperation()) {
          calcSecondNumber = deleteLastElNumb(calcSecondNumber);
          calcDisplay.textContent = calcSecondNumber;
        }
      }
      // Display and type floating point numbers
      if (element.textContent === ".") {
        if (!calcOperator && calcFirstNumber && checkForDot(calcFirstNumber)) {
          calcFirstNumber = inputFirstNumber(element);
        } else if (
          calcOperator &&
          calcSecondNumber &&
          !checkAllOperation() &&
          checkForDot(calcSecondNumber)
        ) {
          calcSecondNumber = inputSecondNumber(element);
        }
      }
      //Delete the snarky error message
      if (calcDisplay.textContent === ":< very funny")
        calcDisplay.textContent = "";

      //If user hits equal(=) button, show the result
      if (
        element.textContent === "=" &&
        calcFirstNumber &&
        calcSecondNumber &&
        calcOperator
      ) {
        //Display error message if divided by 0
        if (calcSecondNumber === "0" && calcOperator === "/") {
          calcDisplay.textContent = ":< very funny";
        } else {
          calcDisplay.textContent = operate(
            calcOperator,
            calcFirstNumber,
            calcSecondNumber
          );
        }
      }
      // Input Users data: first number, second number and operator
      if (
        (Number(element.textContent) || element.textContent === "0") &&
        calcOperator
      ) {
        if (!calcSecondNumber) {
          calcDisplay.textContent = "";
          calcDisplay.textContent += element.textContent;
          calcSecondNumber = calcDisplay.textContent;
        } else if (
          calcOperator &&
          (Number(element.textContent) || element.textContent == "0") &&
          !checkAllOperation()
        ) {
          calcSecondNumber = inputSecondNumber(element);
        } else if (checkAllOperation()) {
          clearUserInputData();
          calcDisplay.textContent += element.textContent;
          calcFirstNumber = calcDisplay.textContent;
        }
      } else if (
        (Number(element.textContent) || element.textContent === "0") &&
        !calcOperator
      ) {
        calcFirstNumber = inputFirstNumber(element);
      } else if (calcOperator && operators.includes(element.textContent)) {
        if (calcSecondNumber) {
          calcDisplay.textContent = operate(
            calcOperator,
            calcFirstNumber,
            calcSecondNumber
          );
          calcFirstNumber = calcDisplay.textContent;
          calcSecondNumber = "";
          calcOperator = element.textContent;
        } else {
          //If user will not give two numbers evaluate first number
          calcSecondNumber = 0;
          calcDisplay.textContent = operate(
            calcOperator,
            calcFirstNumber,
            calcSecondNumber
          );
          calcFirstNumber = calcDisplay.textContent;
          calcSecondNumber = "";
          calcOperator = element.textContent;
        }
      } else if (calcFirstNumber && operators.includes(element.textContent))
        calcOperator = inputOperator(element);

      // Clear all user data if element is equal to "C"
      if (element.textContent === "C") clearUserInputData();
      console.log(calcFirstNumber, calcOperator, calcSecondNumber);
    });
  }
}
// window.addEventListener("keydown", function (e) {
//   const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
//   if (Number(key.textContent)) {
//     calcDisplay.textContent += key.textContent;
//   }
// });

calculator();
