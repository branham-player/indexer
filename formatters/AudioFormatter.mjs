'use strict';

export default class AudioFormatter {

    constructor(audioUrl) {
        this.audioUrl = audioUrl.trim();
    }

    format() {
        const secure = this.audioUrl.replace(
            /^https?:\/\/vgrm4a.branham.org/i,
            'https://s3.amazonaws.com/branhamorgstreaming'
        );

        return {
            insecure: this.audioUrl,
            secure
        };
    }
}
