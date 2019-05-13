'use strict';

import DateConstants from '../constants/DateConstants.mjs';
import moment from 'moment';

export default class DateFormatter {

    constructor(givenDate) {
        this.givenDate = givenDate.trim();
    }

    format() {

        const assumptions = this.getAssumptions();
        const determinedDate = this.getJsDateObject();
        let modifier = this.getModifier();
        let displayName = '';

        if (assumptions == null) {
            displayName = moment.utc(determinedDate).format(DateConstants.FULL_DATE);
        } else if (assumptions.day != null) {
            displayName = moment.utc(determinedDate).format(DateConstants.DAY_MISSING);
        } else if (assumptions.month != null) {
            displayName = moment.utc(determinedDate).format(DateConstants.MONTH_MISSING);
        } else {
            displayName = moment.utc(determinedDate).format(DateConstants.YEAR_ONLY);
        }

        if (modifier != null) {
            displayName = `${modifier.displayName} ${displayName}`.trim();

        // Remove the displayName property, since it was just used
            modifier = {
                meaning: modifier.meaning,
                symbol: modifier.symbol
            };
        }

        return {
            assumptions,
            date: determinedDate,
            displayName,
            givenDate: this.givenDate,
            known: assumptions == null,
            modifier
        };
    }

    getAssumptions() {
        const givenMonthIndex = parseInt(this.givenDate.substr(3, 2)) - 1;
        const givenDay = parseInt(this.givenDate.substr(5, 2));
        
        // Edge cases: 48-0000, 53-0500
        if (givenMonthIndex === -1 && givenDay === 0) {
            return {
                day: {
                    assumedDay: 1,
                    givenDay
                },
                month: {
                    assumedMonthIndex: 0,
                    givenMonthIndex
                }
            };
        } else if (givenMonthIndex === -1) {
            return {
                day: null,
                month: {
                    assumedMonthIndex: 0,
                    givenMonthIndex
                }
            };
        } else if (givenDay === 0) {
            return {
                day: {
                    assumedDay: 1,
                    givenDay
                },
                month: null
            };
        }

        return null;
    }

    getJsDateObject() {
        const year = 1900 + parseInt(this.givenDate.substr(0, 2));
        let monthIndex = parseInt(this.givenDate.substr(3, 2)) - 1;

        // When only the year is known, the month is given as "00"
        if (monthIndex == -1) {
            monthIndex = 0;
        }

        let day = parseInt(this.givenDate.substr(5, 2));

        // When only the month and year are known, the day is given as "00"
        if (day == 0) {
            day = 1;
        }

        return new Date(Date.UTC(year, monthIndex, day, 0, 0, 0, 0));
    }

    getModifier() {
        const pattern = new RegExp('[A-Z]$');
        const matches = pattern.exec(this.givenDate.toUpperCase());

        if (matches != null) {
            let symbol = matches.toString();
            
            // Some places use "W" for wedding ceremonies, but Branham.org does not,
            // which is our source of truth, so map them to "X", as it does
            if (symbol == 'W') {
                symbol = 'X';
            }

            const displayName = DateConstants.MODIFIER_FOR_DISPLAY_NAME[symbol];
            const modifer = DateConstants.MODIFIERS[symbol];

            return {
                displayName,
                meaning: modifer,
                symbol
            };
        }

        return null;
    }
}
