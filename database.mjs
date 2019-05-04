'use strict';

import BranhamOrg from './sources/BranhamOrg.mjs';
import Cloudinary from './sources/Cloudinary.mjs';
import FullDatabasePrinter from './printers/FullDatabasePrinter.mjs';
import SpokenWordChurch from './sources/SpokenWordChurch.mjs';

const args = process.argv;

if (args.length != 4) {
    console.error('Expected two arguments: <path to original sermons> <output file name>');
    process.exit(1);
}

const originalSermons = args[2];
const outputFileName = args[3];

const masterIndex = {};
const branhamOrg = new BranhamOrg(masterIndex, originalSermons);
branhamOrg.process();

const spokenWordChurch = new SpokenWordChurch(masterIndex, originalSermons);
spokenWordChurch.process();

const cloudinary = new Cloudinary(masterIndex);
cloudinary.process();

const fullDatabasePrinter = new FullDatabasePrinter(masterIndex, outputFileName);
fullDatabasePrinter.print();
