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
            assumptions: this.getAssumptions(),
            date: this.getJsDateObject(),
            modifier: modifier,
            standardDate: this.standardDate
        };
    }

    getAssumptions() {
        const givenMonthIndex = parseInt(this.standardDate.substr(3, 2)) - 1;
        const givenDay = parseInt(this.standardDate.substr(5, 2));
        
        if (givenMonthIndex == -1 && assumedDay == 0) {
            return {
                day: {
                    assumedDay: 1,
                    givenDay: givenDay
                },
                month: {
                    assumedMonthIndex: 0,
                    givenMonthIndex: givenMonthIndex
                }
            };
        } else if (givenMonthIndex == -1) {
            return {
                day: null,
                month: {
                    assumedMonthIndex: 0,
                    givenMonthIndex: givenMonthIndex
                }
            };
        } else if (givenDay == 0) {
            return {
                day: {
                    assumedDay: 1,
                    givenDay: givenDay
                },
                month: null
            };
        } else {
            return null;
        }
    }

    getJsDateObject() {
        const year = 1900 + parseInt(this.standardDate.substr(0, 2));
        let monthIndex = parseInt(this.standardDate.substr(3, 2)) - 1;

        // When only the year is known, the month is given as "00"
        if (monthIndex == -1) {
            monthIndex = 0;
        }

        let day = parseInt(this.standardDate.substr(5, 2));

        // When only the month and year are known, the day is given as "00"
        if (day == 0) {
            day = 1;
        }

        return new Date(year, monthIndex, day, 0, 0, 0, 0);
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
