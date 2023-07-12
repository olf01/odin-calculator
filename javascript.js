const mainDisplay = document.getElementById('mainDisplay');
const calculationDisplay = document.getElementById('calculationDisplay')
const clearKey = document.getElementById('clear')
const decimalKey = document.getElementById('decimal')
const equalsKey = document.getElementById('equals')
let calculation = ['', '', '']
let isResult = false

function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function setCalculationValue (digit) {
    if (calculation[1]) {
        if (calculation[2] != '0') {
            calculation[2] += digit.textContent;
        }
    } else if (isResult || calculation[0] == '0') {
        calculation[0] = digit.textContent;
        isResult = false;
    } else {
        calculation[0] += digit.textContent;
    }
    updateDisplays();
    console.log(calculation);
}

function decimal () {
    if (calculation[2] && !calculation[2].includes('.')) {
        calculation[2] += '.';
        updateDisplays();
    } else if (calculation[0] && !(isResult || calculation[0].includes('.') || calculation[1])) {
        calculation [0] += '.';
        updateDisplays();
    }

}

function setCalculationOperator (operator) {    
    if (calculation[0] && calculation[0].charAt(calculation[0].length - 1) != '.') {
        if (calculation[2]) {
            calculate();
        }
        calculation[1] = operator.id;

        isResult = false;
    }
    updateDisplays();
    console.log(calculation)
}

function calculate () {
    if (calculation[2] && calculation[2].charAt(calculation[2].length - 1) != '.') {
        switch (calculation[1]) {
            case "÷":
                calculation[0] = String(divide(+calculation[0], +calculation[2]));
                break;
            case "×":
                calculation[0] = String(multiply(+calculation[0], +calculation[2]));
                break;
            case "-":
                calculation[0] = String(subtract(+calculation[0], +calculation[2]));
                break;
            case "+":
                calculation[0] = String(add(+calculation[0], +calculation[2]));
                break;
        }

        let i = 6;
        while (calculation[0].length > 11) {
            calculation[0] = String((+calculation[0]).toExponential(i));
            i--;
        }

        isResult = true;
        calculation.splice(1, 2, '', '');
        updateDisplays();
        console.log(calculation);
    }
}

function clear () {
    calculation = ['', '', ''];
    mainDisplay.textContent = '';
    calculationDisplay.textContent = '';
}

function updateDisplays () {
    calculation[0] = calculation[0].slice(0, 11);
    calculation[2] = calculation[2].slice(0, 11);
    if (calculation[2]) {
        mainDisplay.textContent = calculation[2]
        calculationDisplay.textContent = calculation.join('');
    } else if (calculation[1]) {
        calculationDisplay.textContent = calculation.join('');
    } else {
        mainDisplay.textContent = calculation[0];
        if (!isResult) {
            calculationDisplay.textContent = '';
        }
    }
}

document.getElementById('digits').childNodes.forEach(function (digit) {digit.addEventListener('click', function () {setCalculationValue(this)})});

clearKey.addEventListener('click', clear);

document.querySelectorAll('.operator').forEach(function (operator) {operator.addEventListener('click', function () {setCalculationOperator(this)})});

decimalKey.addEventListener('click', decimal);

equalsKey.addEventListener('click', calculate);