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
      //   if (element.textContent === ".") {
      //     calcDisplay.textContent += ".";
      //   }
      //Alert if the user continues to press operator button

      //If there is already value in calcFirstNumber input calcSecondNumber
      if (
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
          calcDisplay.textContent = "";
          calcOperator = "";
          calcFirstNumber = "";
          calcSecondNumber = "";
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
        calcOperator &&
        !calcSecondNumber &&
        (element.textContent === "+" ||
          element.textContent === "-" ||
          element.textContent === "*" ||
          element.textContent === "/")
      ) {
        alert("Please input the second number");
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
        if (calcOperator === "/" && calcSecondNumber === "0") {
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
