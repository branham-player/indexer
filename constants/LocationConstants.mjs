'use strict';

export default class LocationConstants {

    // region Europe

    static get GERMANY() {
        return {
            abbreviation: 'DE',
            name: 'Germany'
        };
    }

    static get SWITZERLAND() {
        return {
            abbreviation: 'CH',
            name: 'Switzerland'
        };
    }

    // endregion

    // region North America

    static get CANADA() {
        return {
            abbreviation: 'CA',
            name: 'Canada'
        };
    }

    static get CANADA_PROVINCES() {
        return {
            'AB': 'Alberta',
            'BC': 'British Columbia',
            'MB': 'Manitoba',
            'NB': 'New Brunswick',
            'NL': 'Newfoundland and Labrador',
            'NT': 'Northwest Territories',
            'NS': 'Nova Scotia',
            'NU': 'Nunavut',
            'ON': 'Ontario',
            'PE': 'Prince Edward Island',
            'QC': 'Quebec',
            'SK': 'Saskatchewan',
            'YT': 'Yukon Territory'
        };
    }

    static get UNITED_STATES() {
        return {
            abbreviation: 'US',
            name: 'United States'
        };
    }

    static get US_STATES() {
        return {
            'AL': 'Alabama',
            'AK': 'Alaska',
            'AS': 'American Samoa',
            'AZ': 'Arizona',
            'AR': 'Arkansas',
            'CA': 'California',
            'CO': 'Colorado',
            'CT': 'Connecticut',
            'DE': 'Delaware',
            'DC': 'District Of Columbia',
            'FM': 'Federated States Of Micronesia',
            'FL': 'Florida',
            'GA': 'Georgia',
            'GU': 'Guam',
            'HI': 'Hawaii',
            'ID': 'Idaho',
            'IL': 'Illinois',
            'IN': 'Indiana',
            'IA': 'Iowa',
            'KS': 'Kansas',
            'KY': 'Kentucky',
            'LA': 'Louisiana',
            'ME': 'Maine',
            'MH': 'Marshall Islands',
            'MD': 'Maryland',
            'MA': 'Massachusetts',
            'MI': 'Michigan',
            'MN': 'Minnesota',
            'MS': 'Mississippi',
            'MO': 'Missouri',
            'MT': 'Montana',
            'NE': 'Nebraska',
            'NV': 'Nevada',
            'NH': 'New Hampshire',
            'NJ': 'New Jersey',
            'NM': 'New Mexico',
            'NY': 'New York',
            'NC': 'North Carolina',
            'ND': 'North Dakota',
            'MP': 'Northern Mariana Islands',
            'OH': 'Ohio',
            'OK': 'Oklahoma',
            'OR': 'Oregon',
            'PW': 'Palau',
            'PA': 'Pennsylvania',
            'PR': 'Puerto Rico',
            'RI': 'Rhode Island',
            'SC': 'South Carolina',
            'SD': 'South Dakota',
            'TN': 'Tennessee',
            'TX': 'Texas',
            'UT': 'Utah',
            'VT': 'Vermont',
            'VI': 'Virgin Islands',
            'VA': 'Virginia',
            'WA': 'Washington',
            'WV': 'West Virginia',
            'WI': 'Wisconsin',
            'WY': 'Wyoming'
        };
    }

    // endregion

    // region Edge Cases

    static get NEW_ENGLAND_AREA() {
        return 'New England Area';
    }

    static get UNKNOWN() {
        return 'Unknown';
    }

    static get UNKNOWN_LOCATION() {
        return 'Unknown Location';
    }

    // endregion
}
