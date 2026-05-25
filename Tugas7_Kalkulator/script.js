let display = document.getElementById("display");

function appendNumber(number) {

  if (display.value === "0" || display.value === "Error") {

    display.value = number;

  } else {

    display.value += number;

  }

}

function appendOperator(operator) {

  let lastChar = display.value.slice(-1);

  if (
    lastChar === "+" ||
    lastChar === "-" ||
    lastChar === "×" ||
    lastChar === "÷"
  ) {

    display.value =
      display.value.slice(0, -1) + operator;

  } else {

    display.value += operator;

  }

}

function percent() {

  let lastChar = display.value.slice(-1);

  if (lastChar !== "%") {

    display.value += "%";

  }

}

function clearDisplay() {

  display.value = "0";

}

function deleteNumber() {

  if (
    display.value.length === 1 ||
    display.value === "Error"
  ) {

    display.value = "0";

  } else {

    display.value =
      display.value.slice(0, -1);

  }

}

function calculateResult() {

  try {

    let expression = display.value
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/%/g, "/100");

    let result = eval(expression);

    if (
      result === Infinity ||
      result === -Infinity
    ) {

      display.value = "Error";

    } else {

      display.value = result;

    }

  } catch {

    display.value = "Error";

  }

}