//Coding with Rob YT

let currentNum = '';
let previousNum = '';
let operator = '';

const currentDisplayNumber = document.querySelector('.currentNumber');
const previousDisplayNumber = document.querySelector('.previousNumber');

window.addEventListener("keydown", handleKeyPress);

const equal = document.querySelector('.equals');
equal.addEventListener('click', () => {
    if (currentNum != '' && previousNum != '') {
        calculate();
    }
});

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearScreen);

const del = document.querySelector('.del');
del.addEventListener('click', deleteOne);

// const decimal = document.querySelector('.decimal');
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => button.addEventListener('click', (btn) => {
    //on each click of the number button return the text content
    getValue(btn.target.textContent);
}));

const operators = document.querySelectorAll('.operator');
operators.forEach(button => button.addEventListener('click', (btn) => {
    // on each click of an operator button
    handleOperator(btn.target.textContent);
}));

function getValue(key) {
    //store numbers clicked as a string in currentNum as long as string is less than 12 characters
    if (currentNum.length < 12) {
        currentNum += key;
        currentDisplayNumber.textContent = currentNum;
    };
};

function handleOperator(op) {
    if (previousNum === '') {
        previousNum = currentNum;
        anotherOperator(op);
    } else if (currentNum === '') {
        anotherOperator(op);
    } else {
        calculate();
        operator = op;
        currentDisplayNumber.textContent = '';
        previousDisplayNumber.textContent = previousNum + ' ' + operator;
    }
}
function anotherOperator(op) {
    operator = op;
    previousDisplayNumber.textContent = previousNum + ' ' + operator;
    currentNum = '';
    currentDisplayNumber.textContent = ' ';
}

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === '+') {
        previousNum += currentNum;
    } else if (operator === '-') {
        previousNum -= currentNum;
    } else if (operator === 'x') {
        previousNum *= currentNum;
    } else if (operator === '/') {
      previousNum /= currentNum;
    } 
    currentNum = '';
    previousNum = previousNum.toString();
    console.log(previousNum + ' & ' + currentNum);
    displayResults();
}

function clearScreen() {
    currentNum = '';
    previousNum = '';
    operator = '';
    previousDisplayNumber.textContent = previousNum;
    currentDisplayNumber.textContent = '0';
}

function displayResults() {
    previousDisplayNumber.textContent = previousNum;
    operator = '';
    if (previousNum.length < 12) {
        currentDisplayNumber.textContent = previousNum;
    } else {
        currentDisplayNumber.textContent = previousNum.slice(0, 11) + '...';
    }
}

function deleteOne() {
    //did this all on my own. Much simpler than Rob's solution.
    currentNum = currentNum.slice(0, currentNum.length - 1);
    currentDisplayNumber.textContent = currentNum;
}

function handleKeyPress(e) {
    //fully copied. Did not learn this yet. 
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
      getValue(e.key);
    }
    if (
      e.key === "Enter" ||
      (e.key === "=" && currentNum != "" && previousNum != "")
    ) {
      calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
      handleOperator(e.key);
    }
    if (e.key === "*") {
      handleOperator("x");
    }
    if (e.key === ".") {
      addDecimal();
    }
    if (e.key === "Backspace") {
      deleteOne();
    }
  }