const fs = require('fs');
const data = fs.readFileSync('58000words.txt', 'utf-8');
const names = data.split('\n');
const cleaned_names = names.map(name => name.replace(/\r$/, ''));
const json = JSON.stringify(cleaned_names);

fs.writeFileSync('words.json', json);
console.log("File written successfully");

// This script will convert all words in 58000words.txt into a .json array within words.json 
