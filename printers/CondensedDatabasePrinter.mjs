'use strict';

import fs from 'fs';

export default class CondensedDatabasePrinter {

    constructor(masterIndex, outputFileName) {
        this.masterIndex = masterIndex;
        this.outputFileName = outputFileName;
    }

    print() {
        const masterArary = Object.keys(this.masterIndex).map((key) => {
            const entry = this.masterIndex[key];

            return {
                id: entry.id,
                audio: entry.audio.secure,
                date: {
                    known: entry.date.known,
                    name: entry.date.displayName
                },
                location: {
                    known: entry.location.known,
                    name: entry.location.displayName
                },
                title: entry.title.displayName,
                building: {
                    known: entry.building.known,
                    name: entry.building.displayName
                },
                artwork: {
                    large: entry.artwork.large,
                    thumbnail: entry.artwork.thumbnail
                }
            };
        });

        fs.writeFileSync(this.outputFileName, JSON.stringify(masterArary, null, 4)); 
    }
}
