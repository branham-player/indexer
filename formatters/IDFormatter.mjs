'use strict';

import title from 'title';

export default class IDFormatter {

    constructor(givenDate) {
        this.givenDate = givenDate.trim();
    }

    format() {
        return this.givenDate.toUpperCase();
    }
}
