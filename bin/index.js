#!/usr/bin/env node
// read a file fn
// error out if file doesn't exist or there is a error
const fs = require('fs');
const chalk = require('chalk');
const {
	resolvePostfix,
  rpn,
  makeCoordinates,
  isOperator,
  isNumber,
  isCoordenates,
} = require('../index.js');


const input = process.argv[2];
// console.log('Argv', process.argv);
fs.readFile(input, 'utf8', (err, contents) => {
	if (err) console.log(chalk.red('There is an error in read file'));
	console.log(JSON.stringify(contents));
	console.log(rpn(JSON.stringify(contents)));
});
//analise all the arguments comming from the file
// console.log(rpn(readInput));
