'use strict';

import cheerio from 'cheerio';
import DateFormatter from '../formatters/DateFormatter.mjs';
import LocationFormatter from '../formatters/LocationFormatter.mjs';
import TitleFormatter from '../formatters/TitleFormatter.mjs';
import fs from 'fs';

export default class BranhamOrg {

    constructor(masterIndex) {
        this.masterIndex = masterIndex;
    }

    process() {
        for(let year = 1947; year <= 1965; ++year) {

            const source = fs.readFileSync(`../original-sources/branham.org/${year}.html`);
            const $ = cheerio.load(source);

            $('div.messagebox').each((index, sermon) => {
                const date = $(sermon).find('div.prodtext span.show-for-small-down').text();
                const dateFormatter = new DateFormatter(date);

                const location = $(sermon).find('div.large-10 div.prodtext2').text();
                const locationFormatter = new LocationFormatter(location);

                const title = $(sermon).find('div.prodtext span.prodtexttitle').text();
                const titleFormatter = new TitleFormatter(title);

                const formattedDate = dateFormatter.format();
                
                this.addToMasterIndex(
                    formattedDate.givenDate,
                    formattedDate,
                    locationFormatter.format(),
                    titleFormatter.format()
                );
            });
        }
    }

    addToMasterIndex(key, date, location, title) {

        if (this.masterIndex.hasOwnProperty(key)) {
            this.masterIndex[key].date = date;
            this.masterIndex[key].location = location;
            this.masterIndex[key].title = title;

            return;
        }

        this.masterIndex[key] = {
            date: date,
            location: location,
            title: title
        };
    }
}
