'use strict';

export default class DateConstants {
    
    // region Date Formatting

    static get DAY_MISSING() {
        return 'MMMM[,] YYYY';
    }

    static get FULL_DATE() {
        return 'MMMM Do[,] YYYY';
    }

    static get MONTH_MISSING() {
        return '[Unknown Day and Month] YYYY';
    }

    static get YEAR_ONLY() {
        return '[Unknown Day and Month] YYYY';
    }

    // endregion

    // region Modifier Formatting

    static get MODIFIER_FOR_DISPLAY_NAME() {
        return {
            'A': 'Afternoon of',
            'B': 'Breakfast on',
            'E': 'Evening of',
            'M': 'Morning of',
            'S': 'Sunrise Service on',
            'X': ''
        };
    }

    static get MODIFIERS() {
        return {
            'A': 'Afternoon',
            'B': 'Breakfast',
            'E': 'Evening',
            'M': 'Morning',
            'S': 'Sunrise',
            'X': 'Miscellaneous'
        };
    }

    // endregion
}
