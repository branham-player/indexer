'use strict';

import ArtworkFormatter from '../formatters/ArtworkFormatter.mjs';

export default class Cloudinary {

    constructor(masterIndex) {
        this.masterIndex = masterIndex;
    }

    process() {
        const keys = Object.keys(this.masterIndex);

        for(const key of keys) {
            const date = new Date(this.masterIndex[key]['date']['date']);
            const artworkFormatter = new ArtworkFormatter(date);

            this.addToMasterIndex(key, artworkFormatter.format());
        }
    }

    addToMasterIndex(key, artwork) {
        if (this.masterIndex.hasOwnProperty(key)) {
            this.masterIndex[key].artwork = artwork;
            return;
        }

        console.log(`Unmatched sermon: ${key} ${artwork.large}`)
        throw new Error()
    }
}
