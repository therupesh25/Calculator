const curntDisplay = document.querySelector(".current-view");
const preview = document.querySelector(".pre-view");
const numbers = document.querySelectorAll(".number");  
const operations = document.querySelectorAll(".operation"); 
const equal = document.querySelector(".equalop");
const delbtn = document.querySelector(".delete");
const clearbtn = document.querySelector(".ac");

let operand; // This will hold the operation selected
let currentValue = ''; // This will hold the current number being typed
let previousValue = ''; // This will hold the previous number before the operation

function appendNumber(number) {
    if (number === "." && currentValue.includes(".")) return;
    currentValue += number;
    curntDisplay.innerHTML = currentValue;
}

function chooseOp(selectedOperand) {
    if (currentValue === '') return; 
    if (previousValue !== '') {
        compute(); // Compute if there's already a previous value
    }
    operand = selectedOperand;
    previousValue = currentValue;
    preview.innerHTML = `${previousValue} ${operand}`;
    currentValue = '';
    curntDisplay.innerHTML = '';
}

function clear() {
    currentValue = '';
    previousValue = '';
    operand = undefined;
    curntDisplay.innerHTML = '';
    preview.innerHTML = '';
}

function deleteLast() {
    currentValue = currentValue.slice(0, -1);
    curntDisplay.innerHTML = currentValue;
}

function compute() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return; // Do nothing if values are not numbers

    switch (operand) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentValue = result;
    operand = undefined;
    previousValue = '';
    curntDisplay.innerHTML = result;
    preview.innerHTML = '';
}

// Event listeners for numbers
numbers.forEach(number => {
    number.addEventListener("click", () => {
        appendNumber(number.innerHTML);
    });
});

// Event listeners for operations
operations.forEach(operation => {
    operation.addEventListener("click", () => {
        chooseOp(operation.innerHTML);
    });
});

// Event listener for equals button
equal.addEventListener("click", () => {
    compute();
});

// Event listener for clear button
clearbtn.addEventListener("click", () => {
    clear();
});

// Event listener for delete button
delbtn.addEventListener("click", () => {
    deleteLast();
});
