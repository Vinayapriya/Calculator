// script.js
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    const display = document.getElementById('result');
    let currentOperand = '';
    let previousOperand = '';
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { action, number } = button.dataset;

            if (number !== undefined) {
                appendNumber(number);
            } else if (action !== undefined) {
                handleAction(action);
            }
        });
    });

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
        updateDisplay();
    }

    function handleAction(action) {
        switch(action) {
            case 'clear':
                clear();
                break;
            case 'square':
                square();
                break;
            case 'modulo':
            case 'divide':
            case 'multiply':
            case 'subtract':
            case 'add':
                chooseOperation(action);
                break;
            case 'equals':
                compute();
                break;
        }
    }

    function updateDisplay() {
        display.innerText = currentOperand;
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operation = null;
        updateDisplay();
    }

    function square() {
        currentOperand = (parseFloat(currentOperand) ** 2).toString();
        updateDisplay();
    }

    function chooseOperation(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                computation = prev / current;
                break;
            case 'modulo':
                computation = prev % current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = null;
        previousOperand = '';
        updateDisplay();
    }
});
