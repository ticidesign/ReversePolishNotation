const resolvePostfix = (input) => {
  const isOperator = ['+', '-', '/', '*'];
  const isNumber = new RegExp('^[0-9]+$');
  const isCoordenates = new RegExp('^[a-zA-Z]+[0-9]+$');
  let stack = [];

  input
    .replace(/\s\s+/g, ' ') //replace all space by single space
    .split(' ')
    .forEach(item => {
      // console.log(item);
      if (isNumber.test(item)) {
        // console.log('isNumber', item);
        stack.push(Number(item));
      }
      if (isOperator.includes(item)) {
        // console.log('isOperator', item);

        if (stack.length === 0)  return null;

        let b = Number(stack.pop());
        let a = Number(stack.pop());
        let calculation;
        if(item === '+') {
          calculation = a + b;
        }
        else if(item === '-') {
          calculation = a - b;
        }
        else if(item === '/') {
          calculation = a / b;
        }
        else {
          calculation = a * b;
        }
        stack.push(calculation);

      }
      if (isCoordenates.test(item)) {
        console.log(item);
        // stack.push(resolvePostfix(item));
      }
      // console.log('stack', stack);
    })

    if (stack.length === 1) return stack.pop();
    return "ERR!";
}

const makeCoordinates = ( csv ) => {
  const result = {};

  csv
    .split('\n')
    .map( (line, i) => {
      line
        .split(',')
        .map( (cell, j) => {
          result[`${numberToLetter(j)}${i + 1}`] = cell;
      });
  });

  return result;
};

const numberToLetter = (n) => String.fromCharCode(65 + n).toUpperCase();
// const letterToNumber = (s) => s.toLowerCase().charCodeAt(0) - 97 + 1;

// Multi-dimensional arrays
const rpn = (csv) => {
  let result = [];
  const COORD = makeCoordinates( csv );
  Object.keys(COORD).forEach((key) => {
    // console.log(COORD[key]);
    result.push(resolvePostfix(COORD[key]));
  });
  console.log('result', result);
  return result;
}

rpn('b1 b2 +,2 b2 3 * -, ,+\na1     ,5         , ,7 2 /\nc2 3 * ,1 2       , ,5 1 2 + 4 * + 3 -');

module.exports = {
	resolvePostfix,
  rpn,
  makeCoordinates,
}


// row numbers
// column letter b2 = 5

// CSV format for lines
// \n => Mac
// \n\r => PC
