const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear');
const percentBtn = document.querySelector('[value="%"]');
const decimalBtn = document.querySelector('.decimal');
const equalBtn = document.querySelector('.equal');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let divideByZeroMsgIndex = 0;

const divideByZeroMessages = [
  "Why are you doing that?",
  "This doesn't make sense",
  "You're trying to break me, aren't you?",
  "Please stop dividing by zero",
  "You know this isn't allowed, right?",
];

function clearDisplay() {
  display.textContent = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
}

function updateDisplay(number) {
  if (display.textContent.length < 12) {
    if (currentOperator !== null) {
      if (secondOperand === null) {
        secondOperand = number;
        display.textContent = secondOperand;
      } else {
        secondOperand += number;
        display.textContent = secondOperand;
      }
    } else {
      if (display.textContent === '0') {
        display.textContent = number;
      } else {
        display.textContent += number;
      }
      firstOperand = display.textContent;
    }
  }
}

function inputDecimal() {
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function calculate() {
  let result = 0;
  switch (currentOperator) {
    case '+':
      result = parseFloat(firstOperand) + parseFloat(secondOperand);
      break;
    case '-':
      result = parseFloat(firstOperand) - parseFloat(secondOperand);
      break;
    case '*':
      result = parseFloat(firstOperand) * parseFloat(secondOperand);
      break;
    case '^':
      result = Math.pow(parseFloat(firstOperand), parseFloat(secondOperand));
      break;
    case '/':
      if (parseFloat(secondOperand) === 0) {
        display.textContent = divideByZeroMessages[divideByZeroMsgIndex];
        divideByZeroMsgIndex = (divideByZeroMsgIndex + 1) % divideByZeroMessages.length;
        return;
      }
      result = parseFloat(firstOperand) / parseFloat(secondOperand);
      break;
    default:
      return;
  }

  if (result === Infinity || result === -Infinity) {
    const img = document.createElement('img');
    img.src = './CheemsOG.png';
    img.width = 25;
	img.height = 25;
    display.innerHTML = '';
    display.appendChild(img);
    return;
  }

  result = result.toFixed(12);

  display.textContent = parseFloat(result).toPrecision();

  // Reset the second operand
  secondOperand = null;
}



function handleOperator(operator) {
  if (currentOperator !== null) {
    calculate();
  }
  currentOperator = operator;
  if (display.textContent !== '0') {
    firstOperand = display.textContent;
  }
  display.textContent = display.textContent;
}


clearBtn.addEventListener('click', clearDisplay);

percentBtn.addEventListener('click', () => {
  const currentValue = parseFloat(display.textContent);
  if (!isNaN(currentValue)) {
    display.textContent = (currentValue / 100).toString();
  }
});

decimalBtn.addEventListener('click', inputDecimal);

equalBtn.addEventListener('click', () => {
  if (currentOperator !== null) {
    secondOperand = display.textContent;
    calculate();
  }
});

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', () => {
    handleOperator(operatorBtn.value);
  });
});

numberBtns.forEach((numberBtn) => {
  numberBtn.addEventListener('click', () => {
    updateDisplay(numberBtn.value);
  });
});
