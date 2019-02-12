'use strict';

import LocationConstants from '../constants/LocationConstants.mjs';

export default class LocationFormatter {

    constructor(location) {
        this.location = location.trim();
    }

    format() {
        return {
            displayName: this.formatDisplayName(),
            state: this.getState()
        }
    }

    formatDisplayName() {
        const sanitizedLocation = this.location.replace(/[^A-Za-z0-9 ]/g, '');
        const parts = sanitizedLocation.split(' ');

        if (parts.length >= 2) {
            parts[parts.length - 2] = parts[parts.length - 2] + ',';

            // US states and Canadian provinces are indicated by a two character abbreviation
            if (parts[parts.length - 1].length == 2) {
                parts[parts.length - 1] = parts[parts.length - 1].toUpperCase();
            }
        }

        return parts.join(' ');
    }

    getState() {
        const sanitizedLocation = this.location.replace(/[^A-Za-z0-9 ]/g, '');
        const parts = sanitizedLocation.split(' ');
        const lastPart = parts[parts.length - 1];

        const presumedCity = parts.slice(0, parts.length - 1).join(' ');
        let presumedUSState = null;
        let presumedCountry = null;

        // US states are always abbreviated to two letters, like 'PA'
        if (lastPart.length == 2) {
            const state = lastPart.toUpperCase();

            return {
                abbreviation: state,
                name: LocationConstants.US_STATES[state]
            };
        } else {
            return null
        }
    }
}
