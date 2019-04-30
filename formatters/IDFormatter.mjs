'use strict';

export default class IDFormatter {

    constructor(givenDate) {
        this.givenDate = givenDate.trim();
    }

    format() {
        return this.givenDate.toUpperCase();
    }
}
