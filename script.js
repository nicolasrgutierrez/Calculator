const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculatorKeys');
const display = document.querySelector('.calculatorDisplay');


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        //Do Something
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            // console.log('number key!')
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
        }

        if (action === 'decimal') {
            display.textContent = displayedNum + '.'
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
            key.classList.add('is-depressed');
            // Add custome atribute
            calculator.dataset.previousKeyType = 'operator'
        }

        Array.from(key.parentNode.children).forEach(k =>
            k.classList.remove('is-depressed'),
        )

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            const calculate = (n1, operator, n2) => {
                let result = '';

                if (operator === 'add') {
                    result = parseFloat(n1) + parseFloat(n2)
                } else if (operator === 'subtract') {
                    result = parseFloat(n1) - parseFloat(n2)
                } else if (operator === 'multiply') {
                    result = parseFloat(n1) * parseFloat(n2)
                } else if (operator === 'divide') {
                    result = parseFloat(n1) / parseFloat(n2)
                }

                return result;
            }

            display.textContent = calculate(firstValue, operator, secondValue);

        }


        // Used to test if a number is being pressed
        // if (
        //     action === 'add' ||
        //     action === 'subtract' ||
        //     action === 'multiply' ||
        //     action === 'divide'
        // ) {
        //     console.log('operator key!');
        // }
        // if (action === 'decimal') {
        //     console.log('decimal key!');
        // }
        // if (action === 'clear') {
        //     console.log('clear key!');
        // }
        // if (action === 'calculate') {
        //     console.log('equal key!');
        // }
    }
})