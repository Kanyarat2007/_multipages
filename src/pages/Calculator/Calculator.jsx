import React, { useState, useEffect } from 'react'
import './Calculator.css'

function Calculator() {
    <hr />
    const [firstNumber, setFirstNumber] = useState(null);
    const [secondNumber, setSecondNumber] = useState(null);
    const [operation, setOperation] = useState(null);
    const [lastOperation, setLastOperation] = useState(null); 
    const [lastNumber, setLastNumber] = useState(null);    
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);
    const [displayValue, setDisplayValue] = useState('0');

    useEffect(() => {
        const handleKeyboard = (event) => {
            if(event.key === '=' || event.key === 'Enter') {
                calculate();
            } else if (event.key === 'Escape') {
                clearDisplay();
            } else if (['+', '-', '*', '/'].includes(event.key)) {
                operator(event.key);
            } else if (event.key >= '0' && event.key <= '9') {
                number(event.key);
            }
        };

        document.addEventListener('keydown', handleKeyboard);

        return () => {
            document.removeEventListener('keydown', handleKeyboard);
        };
    }, [firstNumber, secondNumber, operation, isResultDisplayed]); // ใช้ useEffect เพื่อจัดการคีย์บอร์ด

    function updateClearButton() {
        if (firstNumber !== null || secondNumber !== null || isResultDisplayed) {
            return'C';
        } else {
            return 'CE';
        }
    };

    function number(num) {
        if (isResultDisplayed) {
            setFirstNumber(num.toString());
            setSecondNumber(null);
            setOperation(null);
            setIsResultDisplayed(false);
            setDisplayValue(num.toString());
        } else if (operation === null) {
            const newFirstNumber = firstNumber === null ? num.toString() : firstNumber + num.toString();
            setFirstNumber(newFirstNumber);
            setDisplayValue(newFirstNumber);
        } else {
            const newSecondNumber = secondNumber === null ? num.toString() : secondNumber + num.toString();
            setSecondNumber(newSecondNumber);
            setDisplayValue(newSecondNumber);
        }
    };

    function operator(op) {
        if (isResultDisplayed) {
            setSecondNumber(null);
            setOperation(op);
            setDisplayValue(firstNumber);
            setIsResultDisplayed(false);
        } else if (firstNumber !== null) {
            setOperation(op);
            updateClearButton();
        }
    };

    function handleClear() {
        if (isResultDisplayed) {
            clearDisplay();
        } else {
            deleteLast();
        }
    };

    function clearDisplay() {
        setDisplayValue('0');
        setFirstNumber(null);
        setSecondNumber(null);
        setOperation(null);
        setIsResultDisplayed(false);
        updateClearButton();
    };

    function deleteLast() {
        if (secondNumber !== null && typeof secondNumber === 'string') {
            setSecondNumber(null);
            setDisplayValue('0'); 
        } else if (operation !== null) {
            setOperation(null);
            setDisplayValue(firstNumber || '0'); 
        } else if (firstNumber !== null && typeof firstNumber === 'string') {
            const newFirstNumber = firstNumber.slice(0, -1);
            setFirstNumber(newFirstNumber || null); 
            setDisplayValue(newFirstNumber || '0');
        } else {
            setDisplayValue('0'); 
        }
        updateClearButton();
    }

    function calculate() {
        if (firstNumber === null || (secondNumber === null && lastNumber === null) || operation === null) return;

        const a = parseFloat(firstNumber);
        const b = secondNumber !== null ? parseFloat(secondNumber) : parseFloat(lastNumber);

        if (b === null) return;

        let result;
        switch (operation) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = b !== 0 ? a / b : 'Error';
                break;
            default:
                return;
        }
        setDisplayValue(result.toString());
        setFirstNumber(result.toString());
        setLastNumber(b);
        setSecondNumber(null);
        setIsResultDisplayed(true);
    };

    return (
        <div className="calculator-container">
            <hr />
            <h1>Calculator</h1>
    
            <div className="calculator-display">
                <input type="text" id="display" value={displayValue} readOnly />
                
                <div className="calculator-buttons">
                    <button id="clear-btn" onClick={handleClear}>{updateClearButton()}</button>
                    <button id="" onClick={() => insertValue('%')}>%</button>
                    <button id="" onClick={() => operator('/')}>/</button>
                    <button id="divide" onClick={() => operator('/')}>/</button>
    
                    <button id="n7" onClick={() => number('7')}>7</button>
                    <button id="n8" onClick={() => number('8')}>8</button>
                    <button id="n9" onClick={() => number('9')}>9</button>
                    <button id="multiplied" onClick={() => operator('*')}>*</button>
    
                    <button id="n4" onClick={() => number('4')}>4</button>
                    <button id="n5" onClick={() => number('5')}>5</button>
                    <button id="n6" onClick={() => number('6')}>6</button>
                    <button id="minus" onClick={() => operator('-')}>-</button>
    
                    <button id="n1" onClick={() => number('1')}>1</button>
                    <button id="n2" onClick={() => number('2')}>2</button>
                    <button id="n3" onClick={() => number('3')}>3</button>
                    <button id="plus" onClick={() => operator('+')}>+</button>
    
                    <button id="n0" onClick={() => number('0')}>0</button>
                    <button onClick={() => insertValue('.')}>.</button>
                    <button className="equals" onClick={calculate}>=</button>
                    <button onClick={deleteLast}>DEL</button>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Calculator;