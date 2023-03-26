// Dors Coding School YT Solution
// does not handle keyboard input

let currentValue = '';
let previousValue = '';
let currentOperator = '';

const currentDisplayNumber = document.querySelector('.currentNumber');
const previousDisplayNumber = document.querySelector('.previousNumber');
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const equal = document.querySelector('.equals');
equal.addEventListener('click', function () {
    if (currentValue != '' && previousValue !='') {
        calculate();
        previousDisplayNumber.textContent = '';
        if (previousValue.length <= 8) {
            currentDisplayNumber.textContent = previousValue;
        } else {
            currentDisplayNumber.textContent = previousValue.slice(0,8) + '...';
        }
    }
});

const del = document.querySelector('.del');
del.addEventListener('click', deleteOne);

const clear = document.querySelector('.clear');
clear.addEventListener('click', function () {
    currentValue = '';
    previousValue = '';
    currentOperator = '';
    previousDisplayNumber.textContent = previousValue;
    currentDisplayNumber.textContent = currentValue;
});


numberButtons.forEach(button => button.addEventListener('click', (e) => {
    //on each click of the number button return the text content AND DISPLAY
    handleNumber(e.target.textContent);
    currentDisplayNumber.textContent = currentValue;
}));


operators.forEach(button => button.addEventListener('click', (e) => {
    // on each click of an operator button AND DISPLAY
    handleOperator(e.target.textContent);
    currentDisplayNumber.textContent = currentValue;
    previousDisplayNumber.textContent = previousValue + " " + currentOperator;
}));

function handleNumber(num) {
    //store numbers clicked as a string in currentValue as long as string is less than 12 characters
    if (currentValue.length < 8) {
        currentValue += num;
    };
};

function handleOperator(symbol) {
    currentOperator = symbol;
    previousValue = currentValue;
    currentValue = '';
}

function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (currentOperator === '+') {
        previousValue += currentValue;
    } else if (currentOperator === '-') {
        previousValue -= currentValue;
    } else if (currentOperator === 'x') {
        previousValue *= currentValue;
    } else {
        previousValue /= currentValue;
    }

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();

}


function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}


function deleteOne() {
    //did this all on my own. Much simpler than Rob's solution.
    currentValue = currentValue.slice(0, currentValue.length - 1);
    currentDisplayNumber.textContent = currentValue;
}