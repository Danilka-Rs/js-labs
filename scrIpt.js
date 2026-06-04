window.onload = function () {
    let expression = '';
  
    const outputElement = document.getElementById('result');
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');
    const themeSelect = document.getElementById('theme');
  
    function updateDisplay(value) {
      if (value === '' || value === null || value === undefined) {
        value = '0';
      }

      let text = String(value);

      // сколько символов помещается на экран
      const maxLength = 12;

      // если число слишком длинное — переводим в экспоненциальную форму
      if (!isNaN(text) && text.length > maxLength) {
        text = Number(text).toExponential(5);
      }

      outputElement.innerHTML = text + '<span class="cursor">_</span>';
    }
  
    function resetIfError() {
      if (expression === 'Ошибка') {
        expression = '';
        updateDisplay('0');
      }
    }
  
    function getLastNumberPart() {
      const parts = expression.split(/[+\-*/]/);
      return parts[parts.length - 1];
    }
  
    function formatResult(value) {
      if (!isFinite(value)) {
        return 'Ошибка';
      }
      const rounded = Math.round(value * 1000000) / 1000000;
      return rounded.toString();
    }
  
    function safeExpressionForEval(expr) {
      return expr.replace(/×/g, '*').replace(/−/g, '-');
    }
  
    function onDigitButtonClicked(digit) {
      resetIfError();
  
      if (digit === '.') {
        const lastPart = getLastNumberPart();
        if (lastPart.includes('.')) return;
  
        if (
          expression === '' ||
          /[+\-*/]$/.test(expression)
        ) {
          expression += '0.';
        } else {
          expression += '.';
        }
      } else {
        if (expression === '0') {
          expression = digit;
        } else {
          expression += digit;
        }
      }
  
      updateDisplay(expression);
    }
  
    digitButtons.forEach(button => {
      button.onclick = function () {
        const digitValue = button.textContent;
        onDigitButtonClicked(digitValue);
      };
    });
  
    function addOperator(op) {
      resetIfError();
  
      if (expression === '') return;
  
      if (/[+\-*/]$/.test(expression)) {
        expression = expression.slice(0, -1) + op;
      } else {
        expression += op;
      }
  
      updateDisplay(expression);
    }
  
    document.getElementById('btn_op_plus').onclick = function () {
      addOperator('+');
    };
  
    document.getElementById('btn_op_minus').onclick = function () {
      addOperator('-');
    };
  
    document.getElementById('btn_op_mult').onclick = function () {
      addOperator('*');
    };
  
    document.getElementById('btn_op_div').onclick = function () {
      addOperator('/');
    };
  
    document.getElementById('btn_op_clear').onclick = function () {
      expression = '';
      updateDisplay('0');
    };
  
    document.getElementById('btn_op_back').onclick = function () {
      resetIfError();
  
      if (expression.length > 0) {
        expression = expression.slice(0, -1);
        updateDisplay(expression || '0');
      }
    };
  
    document.getElementById('btn_op_sign').onclick = function () {
      resetIfError();
  
      if (expression === '') return;
  
      let match = expression.match(/(-?\d*\.?\d+)$/);
      if (!match) return;
  
      let numberStr = match[0];
      let startIndex = expression.length - numberStr.length;
  
      let toggled;
      if (numberStr.startsWith('-')) {
        toggled = numberStr.slice(1);
      } else {
        toggled = '-' + numberStr;
      }
  
      expression = expression.slice(0, startIndex) + toggled;
      updateDisplay(expression);
    };
  
    document.getElementById('btn_op_percent').onclick = function () {
      resetIfError();
  
      let match = expression.match(/(\d*\.?\d+)$/);
      if (!match) return;
  
      let numberStr = match[0];
      let startIndex = expression.length - numberStr.length;
      let percentValue = formatResult(Number(numberStr) / 100);
  
      expression = expression.slice(0, startIndex) + percentValue;
      updateDisplay(expression);
    };
  
    document.getElementById('btn_op_sqrt').onclick = function () {
      resetIfError();
  
      let match = expression.match(/(\d*\.?\d+)$/);
      if (!match) return;
  
      let numberStr = match[0];
      let num = Number(numberStr);
  
      if (num < 0) {
        expression = 'Ошибка';
        updateDisplay(expression);
        return;
      }
  
      let startIndex = expression.length - numberStr.length;
      let sqrtValue = formatResult(Math.sqrt(num));
  
      expression = expression.slice(0, startIndex) + sqrtValue;
      updateDisplay(expression);
    };
  
    document.getElementById('btn_op_square').onclick = function () {
      resetIfError();
  
      let match = expression.match(/(\d*\.?\d+)$/);
      if (!match) return;
  
      let numberStr = match[0];
      let num = Number(numberStr);
      let startIndex = expression.length - numberStr.length;
      let squareValue = formatResult(num * num);
  
      expression = expression.slice(0, startIndex) + squareValue;
      updateDisplay(expression);
    };
  
    document.getElementById('btn_op_equal').onclick = function () {
      resetIfError();
  
      if (expression === '') return;
      if (/[+\-*/.]$/.test(expression)) return;
  
      try {
        const preparedExpression = safeExpressionForEval(expression);
        const result = Function('"use strict"; return (' + preparedExpression + ')')();
  
        expression = formatResult(result);
        updateDisplay(expression);
      } catch (error) {
        expression = 'Ошибка';
        updateDisplay(expression);
      }
    };
  
    themeSelect.onchange = function () {
      document.body.className = this.value;
    };
  
    updateDisplay('0');
  };