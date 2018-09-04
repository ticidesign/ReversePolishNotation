
const resolvePostfix = (input) => {
  const isOperator = ['+', '-', '/', '*'];
  const isNumber = new RegExp('^[0-9]+$');
  const isCoordenates = new RegExp('^[a-zA-Z]+[0-9]+$');
  let stack = [];

  input
    .replace(/\s\s+/g, ' ') //replace all space by single space
    .split(' ')
    .forEach(x => {
      // console.log(x);
      if (isNumber.test(x)) {
        // console.log('isNumber', x);
        stack.push(Number(x));
      }
      if (isOperator.includes(x)) {
        // console.log('isOperator', x);

        if (stack.length === 0)  return null;

        let b = Number(stack.pop());
        let a = Number(stack.pop());
        let calculation;
        if(x === '+') {
          calculation = a + b;
        }
        else if(x === '-') {
          calculation = a - b;
        }
        else if(x === '/') {
          calculation = a / b;
        }
        else {
          calculation = a * b;
        }
        stack.push(calculation);

      }
      if (isCoordenates.test(x)) { // do this later
        // console.log('isCoordenates', x, isCoordenates.test(x));
        // stack.push(resolvePostfix(x));
      }
      // console.log('stack', stack);
    })

    if (stack.length === 1) return stack.pop();
    return "ERR!";
}

const numberToLetter = (n) => String.fromCharCode(65 + n);
// const letterToNumber = (s) => s.toLowerCase().charCodeAt(0) - 97 + 1;

// Multi-dimensional arrays
const rpn = (csv) => {
  let result = [];
  let rows = csv.split("\n");
  let column = rows[0].split(",");

  for(let i = 0; i < rows.length ; i++) {
    let currentline = rows[i].split(",");

	  for(let j = 0; j < column.length ; j++) {
      let columnName = numberToLetter(j) + i.toString();
		  result[columnName] = currentline[j];
    }
  }
  const isCoordenates = new RegExp('^[a-zA-Z]+[0-9]+$');

  console.log('result', result);
  result.forEach(x => console.log('forEach', x))

}

// console.log('numberToLetter', numberToLetter(25));
// console.log('letterToNumber', letterToNumber('z'));

module.exports = {
	resolvePostfix,
	rpn
}


// row numbers
// column letter b2 = 5

// CSV format for lines
// \n => Mac
// \n\r => PC
