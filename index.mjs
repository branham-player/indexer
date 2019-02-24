'use strict';

import BranhamOrg from './sources/BranhamOrg.mjs';
import fs from 'fs';

const masterIndex = {};
const branhamOrg = new BranhamOrg(masterIndex);
branhamOrg.process();

fs.writeFileSync('./output.json', JSON.stringify(masterIndex, null, 4)); 
