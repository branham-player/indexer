'use strict';

import title from 'title';

export default class BuildingFormatter {

    constructor(buildingName) {
        this.buildingName = buildingName.trim();
    }

    format() {
        if (this.buildingName == '' || this.buildingName.toLowerCase() == 'unknown') {
            return {
                displayName: 'Unknown Location',
                givenName: this.buildingName,
                known: false
            };
        }

        return {
            displayName: title(this.buildingName),
            givenName: this.buildingName,
            known: true
        };
    }
}
