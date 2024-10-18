class Calculator 
{
    constructor(previousOperandTextEl,currentOperandTextEl) {
        this.previousOperandTextEl = previousOperandTextEl;
        this.currentOperandTextEl = currentOperandTextEl;

        this.clear()
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNum(number) {
        if (number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }
    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*': 
                computation = prev * current
                break;
            case '÷': 
                computation = prev / current
                break;
            default:
                return;                 
        }
        this.currentOperand = computation;
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNum(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay;
        if(isNaN(intergerDigits)) {
            intergerDisplay = ''
        }
        else {
            intergerDisplay = intergerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if(decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        }
        else {
            return intergerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextEl.innerText = this.getDisplayNum(this.currentOperand);
        this.previousOperandTextEl.innerText = this.previousOperand;
        if(this.operation != null) {
            this.previousOperandTextEl.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextEl.innerText = ''
        }

    }
}



const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const delBtn = document.querySelector("[data-delete]")
const allClearBtn = document.querySelector("[data-all-clear]")
const previousOperandTextEl = document.querySelector("[data-previous-operand]")
const currentOperandTextEl = document.querySelector("[data-current-operand]")

const calculator = new Calculator(previousOperandTextEl, currentOperandTextEl)

numberButtons.forEach(button => {
    button.addEventListener('click' , ()=> {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay();

    })
})
operationButtons.forEach(button => {
    button.addEventListener('click' , ()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();

    })
})

equalsButton.addEventListener ('click' , button =>{
    calculator.compute()
    calculator.updateDisplay()
})
allClearBtn.addEventListener ('click' , button =>{
    calculator.clear()
    calculator.updateDisplay()
})
delBtn.addEventListener ('click' , button =>{
    calculator.delete()
    calculator.updateDisplay()
})






