'use strict';

export default class UrlFormatter {

    constructor(url) {
        this.url = url.trim();
    }

    format() {
        const secure = this.url.replace(
            /^https?:\/\/vgrm4a.branham.org/i,
            'https://s3.amazonaws.com/branhamorgstreaming'
        );

        return {
            insecure: this.url,
            secure: secure
        };
    }
}
