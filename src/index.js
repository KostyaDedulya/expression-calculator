function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let operation = () => {
        let b = stackNumbers.pop();
        let a = stackNumbers.pop();
        let method = stackMethods.pop();
        if (method === '/' && +b === 0) throw "TypeError: Division by zero.";
        if (method === '(' || method === ')') throw "ExpressionError: Brackets must be paired";
        stackNumbers.push(methods[method](a, b));
    }

    let methods = {
        '+': (a, b) => +a + +b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };
    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    let stackNumbers = [];
    let stackMethods = [];
    let bracketsOpen = 0;

    expr = expr.replace(/\d+/g, '$& ').replace(/[\(\)\+\-\*\/]/g, '$& ').replace(/ $/, '').replace(/\s+/g, ' ').replace(/^ /, '').replace(/ $/, '');
    let arr = expr.split(' ');
    arr.forEach(item => {
        if (item.match(/\d+/)) {
            stackNumbers.push(item);
        } else if (!stackMethods[0] || priority[stackMethods[stackMethods.length - 1]] < priority[item] || item === '(' || stackMethods[stackMethods.length - 1] === '(') {
            if (item === '(') bracketsOpen++;
            stackMethods.push(item);
        } else if (item.match(/\)/)) {
            if (bracketsOpen === 0) throw "ExpressionError: Brackets must be paired";
            do {
                operation();
            } while (!(stackMethods[stackMethods.length - 1] === '('))
            bracketsOpen--;
            stackMethods.pop();
        } else {
            do {
                operation();
            } while ((priority[stackMethods[stackMethods.length - 1]] >= priority[item]) && stackMethods[0] && stackMethods[stackMethods.length - 1] !== '(')
            stackMethods.push(item);
        }
    })
    while (stackMethods[0]) {
        operation();
    }
    return stackNumbers[0];
}

module.exports = {
    expressionCalculator
}