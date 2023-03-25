let currentNum = '';
let previousNum = '';
let operator = '';

const currentDisplayNumber = document.querySelector('.currentNumber');
const previousDisplayNumber = document.querySelector('.previousNumber');

const equal = document.querySelector('.equals');
equal.addEventListener('click', () => {
    if (currentNum != '' && previousNum != '') {
        calculate();
    }
});

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearScreen);

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
    if (previousNum == '') {
        previousNum = currentNum;
        anotherOperator(op);
    } else if (currentNum == '') {
        anotherOperator(op);
    } else {
        calculate();
        operator = op;
        currentDisplayNumber.textContent = '';
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

    switch (operator) {
        case '+':
            previousNum += currentNum;
            break;
        case '-':
            previousNum -= currentNum;
            break;
        case 'x':
            previousNum *= currentNum;
            break;
        case '/':
            previousNum /= currentNum;
    }
    currentNum = '';
    previousNum = previousNum.toString();
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
    previousDisplayNumber.textContent = '';
    operator = '';
    if (previousNum.length < 12) {
        //reduces length of string to show only 12 digits
        currentDisplayNumber.textContent = previousNum;
    } else {
        currentDisplayNumber.textContent = previousNum.slice(0, 11) + '...';
    }
}
