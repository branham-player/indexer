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
        // Edge cases: 48-0000, 53-0500, 58-0500
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
        } else if (this.location.toLowerCase() == 'unknown' || this.location == '') {
            return {
                city: null,
                country: null,
                displayName: 'Unknown',
                givenName: 'Unknown',
                state: null
            };
        }

        const city = this.getCity();
        const country = this.getCountry();
        const state = this.getStateOrTerritory();
        let formattedName = '';

        if (city == null) {
            formattedName = `${state.name}, ${country.name}`;
        } else if (state == null) {
            formattedName = `${city}, ${country.name}`;
        } else {
            formattedName = `${city}, ${state.abbreviation}`;
        }

        return {
            city: city,
            country: country,
            displayName: formattedName,
            givenName: this.location,
            state: state
        }
    }

    getCity() {
        const parts = this.sanitizedLocation.split(' ');
        const presumedCity = parts.slice(0, parts.length - 1).join(' ');

        // Edge case: 55-0400
        if (presumedCity.toLowerCase() == 'alberta') {
            return null;
        }

        return presumedCity;
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
            }
        } else {
            if (stateOrTerritory == LocationConstants.GERMANY.name.toUpperCase()) {
                return LocationConstants.GERMANY;
            } else if (stateOrTerritory == LocationConstants.SWITZERLAND.name.toUpperCase()) {
                return LocationConstants.SWITZERLAND;
            } else if (stateOrTerritory == LocationConstants.CANADA.name.toUpperCase()) {
                return LocationConstants.CANADA;
            }
        }

        return null;
    }

    getStateOrTerritory() {
        const parts = this.sanitizedLocation.split(' ');
        const presumedStateOrTerritory = parts[parts.length - 1];

        // Edge case: 55-0400
        if (parts[0].toLowerCase() ==  LocationConstants.CANADA_PROVINCES['AB'].toLowerCase()) {
            const stateOrTerritory = 'AB';

            return {
                abbreviation: stateOrTerritory,
                name: LocationConstants.CANADA_PROVINCES[stateOrTerritory]
            };
        }

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
            }
        }
        
        return null;
    }
}
