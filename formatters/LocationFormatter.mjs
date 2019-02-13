'use strict';

import LocationConstants from '../constants/LocationConstants.mjs';

export default class LocationFormatter {

    constructor(location) {
        // Some sources report more than one location at a time
        // Take only the first
        const locations = location.split('/');

        this.location = locations[0].trim();
        this.sanitizedLocation = this.location.replace(/[^A-Za-z0-9 ]/g, '');
    }

    format() {
        // Edge cases
        if (this.location.toLowerCase() == 'new england area') {
            return {
                city: null,
                country: {
                    abbreviation: LocationConstants.US,
                    name: LocationConstants.UNITED_STATES
                },
                displayName: 'New England Area',
                givenName: this.location,
                state: null
            }
        } else if (this.location.toLowerCase() == 'unknown') {
            return {
                city: null,
                country: null,
                displayName: 'Unknown',
                givenName: 'Unknown',
                state: null
            };
        }

        return {
            city: this.getCity(),
            country: this.getCountry(),
            displayName: this.formatDisplayName(),
            givenName: this.location,
            state: this.getStateOrTerritory()
        }
    }

    formatDisplayName() {
        const parts = this.sanitizedLocation.split(' ');

        if (parts.length >= 2) {
            parts[parts.length - 2] = parts[parts.length - 2] + ',';

            // US states and Canadian provinces are indicated by a two character abbreviation
            if (parts[parts.length - 1].length == 2) {
                parts[parts.length - 1] = parts[parts.length - 1].toUpperCase();
            }
        }

        return parts.join(' ');
    }

    getCity() {
        const parts = this.sanitizedLocation.split(' ');
        return parts.slice(0, parts.length - 1).join(' ');
    }

    getCountry() {
        const parts = this.sanitizedLocation.split(' ');
        const presumedStateOrTerritory = parts[parts.length - 1];
        const stateOrTerritory = presumedStateOrTerritory.toUpperCase();

        // Canadaian territories and US states are always abbreviated to two
        // letters, like 'PA' or 'AB'
        if (presumedStateOrTerritory.length == 2) {
            if (LocationConstants.US_STATES.hasOwnProperty(stateOrTerritory)) {
                return LocationConstants.UNITED_STATES;
            } else if (LocationConstants.CANADA_PROVINCES.hasOwnProperty(stateOrTerritory)) {
                return LocationConstants.CANADA;
            } else {
                return null;
            }
        } else {
            if (stateOrTerritory == LocationConstants.GERMANY.name.toUpperCase()) {
                return LocationConstants.GERMANY;
            }
        }
    }

    getStateOrTerritory() {
        const parts = this.sanitizedLocation.split(' ');
        const presumedStateOrTerritory = parts[parts.length - 1];

        // Canadaian territories and US states are always abbreviated to two
        // letters, like 'PA' or 'AB'
        if (presumedStateOrTerritory.length == 2) {
            const stateOrTerritory = presumedStateOrTerritory.toUpperCase();

            if (LocationConstants.US_STATES.hasOwnProperty(stateOrTerritory)) {
                return {
                    abbreviation: stateOrTerritory,
                    name: LocationConstants.US_STATES[stateOrTerritory]
                };
            } else if (LocationConstants.CANADA_PROVINCES.hasOwnProperty(stateOrTerritory)) {
                return {
                    abbreviation: stateOrTerritory,
                    name: LocationConstants.CANADA_PROVINCES[stateOrTerritory]
                };
            } else {
                return null;
            }
        } else {
            return null
        }
    }
}
