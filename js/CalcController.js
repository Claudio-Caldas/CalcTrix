class CalcController {

    constructor() {

        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this.locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#output");
        



        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {

       
        this.setLastNumberToDisplay();
    }

    
    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {
            element.addEventListener(event, fn);
        })
    }
    clearAll() {

        this._operation = [];
        this._lastNumber = '';
        this._operation = [];
        this.setLastNumberToDisplay();
    }
    clearEntry() {

        this._operation.pop();
        this.setLastNumberToDisplay();
    }
    setError_01() {

        this.displayCalc = "ERROR..."

    }
    setError_02() {

        this.displayCalc = "> 18 digits..."
    }
    isOperator(value) {

        return (['+', '-', '/', '*', '%'].indexOf(value) > -1);

    }
    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }

        if (this.lastNumber > 18) {
            this.setError_02()
        }

    }
    getResult() {

        try {
            return eval(this._operation.join(""));
        } catch (e) {
            setTimeout(() => this.setError_01(), 1);
        }

        
    }

    calc() {

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if (this._operation.length > 3) {

            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if (this._operation.length === 3) {

            this._lastNumber = this.getLastItem(false);

        }
        //console.log('_lastOperator', this._lastOperator);
        //console.log('_lastNumber', this._lastNumber);
        let result = this.getResult();

        if (last === '%') {

            result /= 100;
            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();

        let converted = result.toString()
      

       if (converted.length > 18) {
        this.setError_02()
       }

    }
    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) === isOperator) {
                lastItem = this._operation[i];
                break;
            }

        }

        if (!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }
    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }
    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else {

                this.pushOperation(value);

                this.setLastNumberToDisplay();


            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseFloat(newValue));

                this.setLastNumberToDisplay();

            }

        }

    }
    getLastOperation() {

        return this._operation[this._operation.length - 1];
    }
    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;
    }
    addDot() {

        let lastOperation = this.getLastOperation();
        console.log(lastOperation);

        //if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || (!lastOperation)) {
            this.setLastOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();

    }
    execButtons(value) {

        switch (value) {

            case 'ac':

                this.clearAll();

                break;

            case 'ce':

                this.clearEntry();

                break;

            case 'percentual':

                this.addOperation('%');


                break;

            case 'divide':

                this.addOperation('/');
                break;

            case 'multiplica':

                this.addOperation('*');
                break;


            case 'subtrai':

                this.addOperation('-');
                break;


            case 'soma':


                this.addOperation('+');


                break;


            case 'decimal':

                this.addDot();

                break;

            case 'igual':

                this.calc();

                break;


            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':

                this.addOperation(parseInt(value));
                break;

            default:

                this.setError_01();

                break;


        }

    }
    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > * > * > * ");


        buttons.forEach((buttons, index) => {

            this.addEventListenerAll(buttons, "click drag", e => {

                let textButtons = buttons.className;
                //console.log(textButtons)
                this.execButtons(textButtons);
            });

        })

        //  this.addEventListenerAll(buttons, "mouseover mouseup mousedown", e => {

        //buttons.style.cursor= "pointer";
        // })

    }

    get displayMsg() {
        return this._msgEl.innerHTML;
    }
    set displayMsg(value) {
        this._msgEl.innerHTML = value;
    }

    

    
    get displayCalc() {

        return this._displayCalc.innerHTML;
    }
    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }
   
}