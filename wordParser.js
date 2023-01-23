const fs = require('fs');

// Read the contents of the file
const data = fs.readFileSync('58000words.txt', 'utf-8');

// Split the contents by new lines to get an array of names
const names = data.split('\n');

// remove any \r characters at the end of each name
const cleaned_names = names.map(name => name.replace(/\r$/, ''));

// Convert the names array to a JSON object
const json = JSON.stringify(cleaned_names);

// Write the JSON object to a file
fs.writeFileSync('words.json', json);
console.log("File written successfully");
