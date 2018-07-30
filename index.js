
const resolvePostfix = (input) => {
  const isOperator = ['+', '-', '/', '*'];
  const isNumber = new RegExp('^[0-9]+$');
  const isCoordenates = new RegExp('^[a-zA-Z]+[0-9]+$');
  let stack = [];

  input
    .replace(/\s\s+/g, ' ') //replace all space by single space
    .split(' ')
    .forEach(x => {
      console.log(x);
      if (isNumber.test(x)) {
        // console.log('isNumber', x);
        stack.push(x);
      }
      if (isOperator.includes(x)) {
				// console.log('isOperator', x);
        if (stack.length === 0) {
					stack.push(x);
				} else {
          let b = stack.pop();
          let a = stack.pop();
          let operation = [a, x, b].join('');
          let result = eval(operation); //evaluate a string
          stack.push(result);
        }
      }
      if (isCoordenates.test(x)) {
        // console.log('isCoordenates', x, isCoordenates.test(x));
        stack.push(resolvePostfix(' '));
      }
      console.log('stack', stack);
    })

	if(stack.length === 0 
		|| stack.length > 1 
		|| typeof stack[0] !== Number
	) { //check if it's number and just one item
      return "ERR!";
  } else {
    return Number(stack.pop());
  }
}


// Multi-dimensional arrays
const rpn = (csv) => {
  let result = [];
  let rows = csv.split("\n");
  let column = rows[0].split(",");

  for(let i = 0; i < rows.length ; i++) {
	  let obj = {};
	  let currentline = rows[i].split(",");
    console.log('currentline', currentline);
	  for(let j = 0; j < column.length ; j++) {
      console.log(i, j, currentline[j]);
		  // obj[column[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  console.log(result);
  // return JSON.stringify(result); //JSON

  // let newArray = []
  // csvStr
  //   .split(',')
  //   .forEach((x, i) => {
  //       let column = {};
  //       let name = 'c' + i;
  //       column[name] = x;
  //       newArray.push(column);
  //     });



  // console.log(newArray);
  // let result = newArray
  //   .forEach(x => {
  //     console.log(typeof x, x);
  //   });
  // console.log(result);
  // return result;
  
}

const letterToNumber = (s) => s.toLowerCase().charCodeAt(0) - 97 + 1;
// letterToNumber('z');

module.exports = {
	resolvePostfix,
	rpn
}


// row numbers
// column letter b2 = 5

// CSV format for lines
// \n => Mac
// \n\r => PC