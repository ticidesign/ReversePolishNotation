const operatorList = {
  "+": (accumulator, currentValue) => currentValue + accumulator,
  "-": (accumulator, currentValue) => currentValue - accumulator,
  "/": (accumulator, currentValue) => currentValue / accumulator,
  "*": (accumulator, currentValue) => currentValue * accumulator,
}
const isOperator = (item) => {
  return Object.keys(operatorList).includes(item);
}
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
  if (stacktrace.includes(address)) {
    return "ERR!"
  };
  stacktrace.push(address);

  input
    .replace(/\s\s+/g, ' ') //replace all space by single space
    .split(' ')
    .forEach(item => {
      if (isCoordenates(item)) {
        const solution = resolvePostfix(COORD[item], item, COORD, [...stacktrace]);
        stack.push(solution);
      }
      if (isNumber(item)) {
        stack.push(parseInt(item));
      }
      if (isOperator(item)) {
        const operandB = stack.pop();
        const operandA = stack.pop();
        let calculation = [operandB, operandA].reduce(operatorList[item]);

        if (isNaN(calculation)){
          stack.push('ERR!');
        } else {
          stack.push(calculation);
        }
      }
    });

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

module.exports = {
	resolvePostfix,
  rpn,
  makeCoordinates,
  isOperator,
  isNumber,
  isCoordenates,
}


// TODO
// Refactor code
// Create CLI Interface with options
// make it global
// READEME
// $ rpn path/to/csv --options
// flags -d --debug (short and long version)
// maybe add a --save flag to an output file
