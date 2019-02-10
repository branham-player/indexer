'use strict';

export default class DateFormatter {

    constructor(standardDate) {
        this.standardDate = standardDate.toUpperCase().trim();
    }

    format() {
        const symbol = this.getModifier();
        let modifier = null;

        if (symbol != null) {
            modifier = {
                meaning: this.mapModifierFromSymbol(symbol),
                symbol: symbol
            }
        }

        return {
            date: this.createJsDateObject(),
            modifier: modifier,
            standardDate: this.standardDate
        };
    }

    createJsDateObject() {
        const year = 1900 + parseInt(this.standardDate.substr(0, 2));
        const monthIndex = parseInt(this.standardDate.substr(3, 2)) - 1;
        var day = parseInt(this.standardDate.substr(5, 2));

        // When only the month and year are known, the day is given as "00"
        // Assume the first of the month
        if (day == 0) {
            day = 1;
        }

        return new Date(year, monthIndex, day);
    }

    getModifier() {
        const pattern = new RegExp('[A-Z]$');
        const matches = pattern.exec(this.standardDate);

        if (matches == null) {
            return null
        } else {
            return matches.toString();
        }
    }

    mapModifierFromSymbol(modifier) {
        switch(modifier) {
            case 'A':
                return 'Afternoon';
            
            case 'B':
                return 'Breakfast';

            case 'E':
                return 'Evening';
            
            case 'M':
                return 'Morning';
            
            case 'S':
                return 'Sunrise';
            
            case 'W':
                return 'Wedding';
            
            default:
                return 'Miscellaneous';
        }
    }
}
