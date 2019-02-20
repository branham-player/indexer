'use strict';

import title from 'title';

export default class TitleFormatter {

    constructor(sermonTitle) {
        this.sermonTitle = sermonTitle.trim();
    }

    format() {
        return {
            displayName: title(this.sermonTitle),
            givenName: this.sermonTitle
        };
    }
}
