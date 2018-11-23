#!/usr/bin/env node
// read a file fn
// error out if file doesn't exist or there is a error
const fs = require('fs');
const input = process.argv[2];

const readInput = fs.readFile(input, 'utf8', (err, contents) => {
	if (err) console.log('There is an error in read file')
	console.log(contents);
});

const {
	resolvePostfix,
  rpn,
  makeCoordinates,
  isOperator,
  isNumber,
  isCoordenates,
} = require('../index.js');

//analise all the arguments comming from the file
console.log(rpn(readInput));
