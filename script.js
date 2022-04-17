function add(n1, n1) {
    return round(n1 + n2);
}

function subtract(n1, n2) {
    return round(n1 - n2);
}

function multiply(n1, n2) {
    return round(n1 * n2);
}

function divide(n1, n2) {
    return n2 != 0 ? round(n1 / n2) : "Nice try bro";
}

function round(n) {
    return +(Math.round(n + "e+7")  + "e-7");
}

function operate(op, n1, n2) {
    switch (op) {
        case a:
            add(n1, n2);
            break;
        case s:
            subtract(n1, n2);
            break;
        case m:
            multiply(n1, n2);
            break;
        case d:
            divide(n1, n2);
            break;
    }
}

let inputsArray = [];

function storeInputs(value1, value2, operation) {
    if (value1 != null) {
        inputsArray[0] = value1;
    }
    else if (value2 != null) {
        inputsArray[1] = value1;
    }
    else if (operation != null) {
        inputsArray[2] = value1;
    }
    console.log(inputsArray);
}

function clearFn() {
    inputsArray = [];
    updateDisplay('clear', 0);
}

function deleteFn() {
    inputsArray = [];
    updateDisplay('delete', 0);
}

let decimalCount = 0;
function updateDisplay(operation, value) {
    const display = document.querySelector('.display');
    if (operation == 'none') {
        if (display.textContent.length > 15) {
            return;
        }
        else if (display.textContent == '0') {
            if (value == '.') {
                decimalCount++;
            }
            display.textContent = value;
            return;
        }
        else {
            if (value == '.') {
                if (decimalCount == 1) {
                    return;
                }
                decimalCount++;
            }
            display.textContent += value;
        }
    }
    else if (operation == 'clear') {
        display.textContent = value;
    }
    else if (operation == 'delete') {
        display.textContent = value;
    }
    else if (operation == 'equals') {

    }
    else if (operation == 'addition') {

    }
    
}

const btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', clickBtn));

function clickBtn(e) {
    console.log(e.target.textContent);
    switch (e.target.textContent) {
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
            updateDisplay('none', e.target.textContent);
            break;
        case '=':
            updateDisplay('equals', operate());
            break;
        case '÷':
        case 'x':
        case '-':
        case '+':
            updateDisplay('', e.target.textContent);
            storeInputs(null, null, e.target.textContent);
            break;
        case 'Clear':
            clearFn();
            break;
        case 'Delete':
            deleteFn();
            break;

    }
}


