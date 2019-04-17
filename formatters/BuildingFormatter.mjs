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

        // Edge case: 51-0714
        let displayName = title(this.buildingName);

        if (displayName.toUpperCase().indexOf("IMA") != -1) {
            displayName = displayName.replace("Ima", "IMA")
        }

        return {
            displayName: displayName,
            givenName: this.buildingName,
            known: true
        };
    }
}
