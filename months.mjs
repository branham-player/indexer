'use strict';

import fs from 'fs';

const args = process.argv;

if (args.length != 4) {
    console.error('Expected two arguments: <path to full database JSON file> <output file name>');
    process.exit(1);
}

const database = args[2];
const outputFileName = args[3];

const json = JSON.parse(fs.readFileSync(database));
const monthDictionary = {};

for (let index in json) {
    const month = json[index].date.date.substr(0, 7);
    monthDictionary[month] = true;
}

const months = Object.keys(monthDictionary);

fs.writeFileSync(outputFileName, JSON.stringify({
    months: months,
    total: months.length
}, null, 4)); 
