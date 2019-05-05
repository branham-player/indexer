'use strict';

import BranhamOrg from './sources/BranhamOrg.mjs';
import Cloudinary from './sources/Cloudinary.mjs';
import CondensedDatabasePrinter from './printers/CondensedDatabasePrinter.mjs';
import FullDatabasePrinter from './printers/FullDatabasePrinter.mjs';
import SpokenWordChurch from './sources/SpokenWordChurch.mjs';

const args = process.argv;

if (args.length != 5) {
    console.error('Expected two arguments: <path to original sermons> <full database output file name> <condensed database output file name>');
    process.exit(1);
}

const originalSermons = args[2];
const fullDatabaseFileName = args[3];
const condensedDatabaseFileName = args[4];

const masterIndex = {};
const branhamOrg = new BranhamOrg(masterIndex, originalSermons);
branhamOrg.process();

const spokenWordChurch = new SpokenWordChurch(masterIndex, originalSermons);
spokenWordChurch.process();

const cloudinary = new Cloudinary(masterIndex);
cloudinary.process();

const fullDatabasePrinter = new FullDatabasePrinter(masterIndex, fullDatabaseFileName);
fullDatabasePrinter.print();

const condensedDatabasePrinter = new CondensedDatabasePrinter(masterIndex, condensedDatabaseFileName);
condensedDatabasePrinter.print();
