const isOperator = ['+', '-', '/', '*'];
// const isNumber = new RegExp('^[0-9]+');
// const isNumber = (item) => {
//   const regexNumber = new RegExp('^[-]?[0-9]\d*(\.\d+)?$');
//   return regexNumber.test(item);
// }
const isNumber = ( item ) => {
  return ( parseFloat( item ) - parseFloat( item ) + 1 ) === 1 &&
  String( parseFloat( item ) ).length === String( item ).length;
}
const isCoordenates = (item) => {
  const regexItem = new RegExp('^[a-zA-Z]+[0-9]+$');
  return regexItem.test(item);
}

const resolvePostfix = (input, address, COORD, stacktrace = []) => {

  if (!input) return 'ERR!';

  const stack = [];

  // Creating a stack tracing to avoid infinite loop
  // if (stacktrace.includes(address)) return "ERR!";
  // stacktrace.push(address);

  input
    .replace(/\s\s+/g, ' ') //replace all space by single space
    .split(' ')
    .forEach(item => {
      if (isCoordenates(item)) {
        const solution = resolvePostfix(COORD[item], item, COORD, stacktrace);
        stack.push(solution);
      }
      if (isNumber(item)) {
        stack.push(parseInt(item));
      }
      if (isOperator.includes(item)) {
        // if (stack.length === 0) return null;
        const b = stack.pop();
        const a = stack.pop();
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

        if (isNaN(calculation)){
          stack.push('ERR!');
        } else {
          stack.push(calculation);
        }
      }
    });
    // console.log(stack, address, stacktrace);
    if (stack.length === 1) return stack.pop();
    return "ERR!";
};

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

const numberToLetter = (n) => String.fromCharCode(65 + n).toLowerCase();

const rpn = (csv) => {
  const COORD = makeCoordinates( csv );
  const result = csv
    .split('\n')
    .map( (line, i) => {
      return line
        .split(',')
        .map( (cell, j) => {
          const address = `${numberToLetter(j)}${i + 1}`;
          return resolvePostfix(cell, address, COORD);
      }).join(',');
  }).join('\n');

  return result;
}

const newCoord = { a1: 'b1 b2 +',
b1: '2 b2 3 * -',
c1: ' ',
d1: '+',
a2: 'a1     ',
b2: '5         ',
c2: ' ',
d2: '7 2 /',
a3: 'c2 3 * ',
b3: '1 2       ',
c3: ' ',
d3: '5 1 2 + 4 * + 3 -' };
resolvePostfix('b1 b2 +', 'a1', newCoord)

module.exports = {
	resolvePostfix,
  rpn,
  makeCoordinates,
  isOperator,
  isNumber,
  isCoordenates,
}
