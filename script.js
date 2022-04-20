function add(n1, n2) {
    return round(n1 + n2);
}

function subtract(n1, n2) {
    return round(n1 - n2);
}

function multiply(n1, n2) {
    return round(n1 * n2);
}

function divide(n1, n2) {
    return n2 != 0 ? round(n1 / n2) : "Error!";
}

function round(n) {
    return +(Math.round(n + "e+7") + "e-7");
}

function operate(n1, n2, operator) {
    switch (operator) {
        case '+':
            return add(n1, n2);
        case '-':
            return subtract(n1, n2);
        case 'x':
            return multiply(n1, n2);
        case '÷':
            return divide(n1, n2);
    }
}

let inputsArray = [undefined, undefined, undefined];

function resetInputsArray() {
    inputsArray = [undefined, undefined, undefined];
}

function inputsArrayFull() {
    if (!inputsArray.includes(undefined)) return true;
}

function operandExists() {
    if (!(inputsArray[0] == undefined)) return true;
}

function storeCalculationInputs(operand, operator) {
    if (inputsArray[0] == undefined) {
        inputsArray[0] = operand;
    }
    else if (inputsArray[1] == undefined) {
        inputsArray[1] = operand;
    }
    else if (inputsArray[0] != undefined && inputsArray[1] != undefined) {
        inputsArray[0] = operand;
        inputsArray[1] = undefined;
        inputsArray[2] = operator;
    }
    if (operator != undefined) {
        inputsArray[2] = operator;
    }
    console.log(inputsArray);
}

function calculateResult() {
    storeCalculationInputs(+display.textContent, undefined);
    let result = operate(inputsArray[0], inputsArray[1], inputsArray[2]);
    console.log(`Result is ${result}`);
    return result;
}

function numberOrDecimalFn() {

}

function operatorFn(operator) {
    operatorPressed = true;
    updateDisplay('operator', operator);
}

function clearFn() {
    resetInputsArray();
    decimalCount = 0;
    updateDisplay('clear', 0);
}

function deleteFn() {
    updateDisplay('delete', 0);
}

const display = document.querySelector('.display');
let operatorPressed = false;
let decimalCount = 0;
function updateDisplay(fn, input) {
    if (fn == 'none') {
        if (operatorPressed) {
            display.textContent = input;
            operatorPressed = false;
            return;
        }
        else if (display.textContent.length > 15) {
            return;
        }
        else if (display.textContent == '0' || display.textContent == "Error!") {
            if (input == '.') {
                decimalCount++;
            }
            display.textContent = input;
            return;
        }
        else {
            if (input == '.') {
                if (decimalCount == 1) {
                    return;
                }
                decimalCount++;
            }
            display.textContent += input;
        }
    }
    else if (fn == 'clear') {
        display.textContent = input;
    }
    else if (fn == 'delete') {
        let lastChar = display.textContent.charAt(display.textContent.length - 1);
        let lastCharIsDecimal = lastChar == '.' ? true : false;
        if (display.textContent.length == 1) {
            if (lastCharIsDecimal) {
                decimalCount = 0;
            }
            display.textContent = input;
        }
        else if (display.textContent.length > 1) {
            if (lastCharIsDecimal) {
                decimalCount = 0;
            }
            display.textContent = display.textContent.slice(0, -1);
        }
    }
    else if (fn == 'equals') {
        let value;
        if (display.textContent == '0' || display.textContent == '.') {
            value = 0;
        }
        else {
            value = +display.textContent;
        }
        decimalCount = 0;
        storeCalculationInputs(value, input);
    }
    else if (fn == 'operator') {
        // if (!operandExists()) {
        //     updateDisplay('error', 'Error!');
        //     return;
        // }
        let value;
        if (display.textContent == '0' || display.textContent == '.') {
            value = 0;
        }
        else {
            value = +display.textContent;
        }
        decimalCount = 0;
        storeCalculationInputs(value, input);

    }
    else if (fn == 'result') {
        if (!inputsArrayFull()) {
            updateDisplay('error', 'Error!');
            return;
        }
        display.textContent = input;
        let value = input;
        storeCalculationInputs(value, undefined);
        if (input == "Error!") {
            resetInputsArray();
        }

    }
    else if (fn == 'error') {
        resetInputsArray();
        decimalCount = 0;
        display.textContent = input;
    }

}

const btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', clickBtn));

function clickBtn(e) {
    let btn = e.target.textContent;
    console.log(`Button pressed is ${btn}`);
    switch (btn) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            updateDisplay('none', btn);
            break;
        case '=':
            updateDisplay('result', calculateResult());
            break;
        case '÷':
        case 'x':
        case '-':
        case '+':
            operatorFn(btn);
            break;
        case 'Clear':
            clearFn();
            break;
        case 'Delete':
            deleteFn();
            break;

    }
}


