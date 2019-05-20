'use strict';

export default class ArtworkFormatter {

    constructor(date) {
        this.date = date;
    }

    format() {
        let month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();

        const large = 1000;
        const thumbnail = 200;

        if (month < 10) {
            month = '0' + month;
        }

        return {
            'large': `https://cloudinary-a.akamaihd.net/branham-player/image/upload/c_fill,e_tint:30:black,g_center,h_${large},w_${large}/l_artwork:1:intermediate,o_50,g_center,h_${large},w_${large}/l_artwork:1:months:${month},g_center,h_${large},w_${large}/l_artwork:1:years:${year},g_center,h_${large},w_${large}/artwork/1/backgrounds/${year}/${month}.jpg`,
            'thumbnail': `https://cloudinary-a.akamaihd.net/branham-player/image/upload/c_fill,e_tint:30:black,g_center,h_${thumbnail},w_${thumbnail}/l_artwork:1:intermediate,o_50,g_center,h_${thumbnail},w_${thumbnail}/l_artwork:1:months:${month},g_center,h_${thumbnail},w_${thumbnail}/l_artwork:1:years:${year},g_center,h_${thumbnail},w_${thumbnail}/artwork/1/backgrounds/${year}/${month}.jpg`
        };
    }
}
