'use strict';

export default class DateConstants {

    static get MODIFIER_DATE_JOINING_PREPOSITION() {
        return 'on';
    }

    // region Date Formatting

    static get DAY_MISSING() {
        return 'MMMM[,] YYYY'
    }

    static get FULL_DATE() {
        return 'MMMM Do[,] YYYY';
    }

    static get MONTH_MISSING() {
        return '[Unknown Month] Do, YYYY';
    }

    static get YEAR_ONLY() {
        return '[Unknown Day and Month] YYYY';
    }

    // endregion

    // region Modifier Formatting

    static get MODIFIERS() {
        return {
            'A': 'Afternoon',
            'B': 'Breakfast',
            'E': 'Evening',
            'M': 'Morning',
            'S': 'Sunrise',
            'W': 'Wedding',
            'X': 'Miscellaneous'
        };
    }

    // endregion
}
