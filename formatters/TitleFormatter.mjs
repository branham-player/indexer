'use strict';

import title from 'title';

export default class TitleFormatter {

    constructor(sermonTitle) {
        this.sermonTitle = sermonTitle;
    }

    format() {
        return {
            displayName: title(this.sermonTitle.trim()),
            givenName: this.sermonTitle
        };
    }
}
