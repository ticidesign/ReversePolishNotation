const resolvePostfix = (input, address, COORD, stacktrace = []) => {
  if (!input) return 'ERR!';

  const isOperator = ['+', '-', '/', '*'];
  const isNumber = new RegExp('^[0-9]+$');
  const isCoordenates = new RegExp('^[a-zA-Z]+[0-9]+$');
  let stack = [];

  // Creating a stack tracing to avoid infinite loop
  if (stacktrace.includes(address)) return "ERR!";
  stacktrace.push(address);

  input
    .replace(/\s\s+/g, ' ') //replace all space by single space
    .split(' ')
    .forEach(item => {
      if (isCoordenates.test(item)) {
        const solution = resolvePostfix(COORD[item], address, COORD, stacktrace);
        stack.push(solution);
      }
      if (isNumber.test(item)) {
        stack.push(Number(item));
      }
      if (isOperator.includes(item)) {
        if (stack.length === 0) return null;
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

        if (isNaN(calculation)){
          stack.push('ERR!');
        } else {
          stack.push(calculation);
        }
      }
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

const numberToLetter = (n) => String.fromCharCode(65 + n).toLowerCase();
// const letterToNumber = (s) => s.toLowerCase().charCodeAt(0) - 97 + 1;

const rpn = (csv) => {
  let result = [];
  const COORD = makeCoordinates( csv );

  csv
    .split('\n')
    .map( (line, i) => {
      line
        .split(',')
        .map( (cell, j) => {
          const address = `${numberToLetter(j)}${i + 1}`;
          result.push(resolvePostfix(cell, address, COORD));
      });
      result.push('\n');// maybe detect change in the object key
  });
  // Object.entries(COORD).map(([ address, value ]) => {
  //   console.log(address);

  //   result.push(resolvePostfix(value, address, COORD));
  // });

  return result.toString();
}

// rpn('b1 b2 +,2 b2 3 * -, ,+\na1     ,5         , ,7 2 /\nc2 3 * ,1 2       , ,5 1 2 + 4 * + 3 -');

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
