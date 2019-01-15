#!/usr/bin/env node
// read a file fn
// error out if file doesn't exist or there is a error
const fs = require('fs');
const { rpn } = require('../index.js');

const input = process.argv[2];
// console.log('Argv', process.argv);
fs.readFile(input, 'utf8', (err, data) => {
  if (err) console.log('There is an error in read file');
  const result = data.trim();
	console.log('Input: ', JSON.stringify(result));
	console.log('Output: ', rpn(result));
});
