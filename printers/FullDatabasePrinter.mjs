'use strict';

import fs from 'fs';

export default class FullDatabasePrinter {

    constructor(masterIndex, outputFileName) {
        this.masterIndex = masterIndex;
        this.outputFileName = outputFileName;
    }

    print() {
        const masterArary = Object.keys(this.masterIndex).map((key) => {
            return this.masterIndex[key];
        });

        fs.writeFileSync(this.outputFileName, JSON.stringify(masterArary, null, 4)); 
    }
}
