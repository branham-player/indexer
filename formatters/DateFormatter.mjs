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
        const modifier = this.getModifier();
        let displayName = '';

        if (assumptions == null) {
            displayName = moment(determinedDate).format(DateConstants.FULL_DATE);
        } else if (assumptions.day == null) {
            displayName = moment(determinedDate).format(DateConstants.DAY_MISSING);
        } else if (assumptions.month == null) {
            displayName = moment(determinedDate).format(DateConstants.MONTH_MISSING);
        } else {
            displayName = moment(determinedDate).format(DateConstants.YEAR_ONLY);
        }

        if (modifier != null) {
            displayName = `${modifier.meaning} ${DateConstants.MODIFIER_DATE_JOINING_PREPOSITION} ${displayName}`;
        }

        return {
            assumptions: assumptions,
            date: determinedDate,
            displayName: displayName,
            givenDate: this.givenDate,
            modifier: modifier
        };
    }

    getAssumptions() {
        const givenMonthIndex = parseInt(this.givenDate.substr(3, 2)) - 1;
        const givenDay = parseInt(this.givenDate.substr(5, 2));
        
        // Edge cases: 48-0000, 53-0500
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

        return new Date(year, monthIndex, day, 0, 0, 0, 0);
    }

    getModifier() {
        const pattern = new RegExp('[A-Z]$');
        const matches = pattern.exec(this.givenDate.toUpperCase());

        if (matches != null) {
            const symbol = matches.toString();
            const modifer = DateConstants.MODIFIERS[symbol];

            return {
                meaning: modifer,
                symbol: symbol
            };
        }

        return null;
    }
}
