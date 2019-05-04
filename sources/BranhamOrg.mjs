'use strict';

import cheerio from 'cheerio';
import fs from 'fs';

import DateFormatter from '../formatters/DateFormatter.mjs';
import IDFormatter from '../formatters/IDFormatter.mjs';
import LocationFormatter from '../formatters/LocationFormatter.mjs';
import TitleFormatter from '../formatters/TitleFormatter.mjs';
import UrlFormatter from '../formatters/UrlFormatter.mjs'

export default class BranhamOrg {

    constructor(masterIndex, sourceDirectory) {
        this.masterIndex = masterIndex;
        this.sourceDirectory = sourceDirectory;
    }

    process() {
        for(let year = 1947; year <= 1965; ++year) {

            const source = fs.readFileSync(`${this.sourceDirectory}/branham.org/${year}.html`);
            const $ = cheerio.load(source);

            $('div.messagebox').each((index, sermon) => {
                const date = $(sermon).find('div.prodtext span.show-for-small-down').text();
                const dateFormatter = new DateFormatter(date);

                const location = $(sermon).find('div.large-10 div.prodtext2').text();
                const locationFormatter = new LocationFormatter(location);

                const title = $(sermon).find('div.prodtext span.prodtexttitle').text();
                const titleFormatter = new TitleFormatter(title);

                const url = $(sermon).find('div.large-8.end a').attr('href');

                const idFormatter = new IDFormatter(date);

            // Edge case: 62-1030X
                if (url != undefined && url != '') {
                    const urlFormatter = new UrlFormatter(url);

                    this.addToMasterIndex(
                        idFormatter.format(),
                        dateFormatter.format(),
                        locationFormatter.format(),
                        titleFormatter.format(),
                        urlFormatter.format()
                    );   
                }
            });
        }
    }

    addToMasterIndex(key, date, location, title, url) {

        if (this.masterIndex.hasOwnProperty(key)) {
            this.masterIndex[key].id = key;
            this.masterIndex[key].date = date;
            this.masterIndex[key].location = location;
            this.masterIndex[key].title = title;
            this.masterIndex[key].url = url;

            return;
        }

        this.masterIndex[key] = {
            id: key,
            date: date,
            location: location,
            title: title,
            url: url
        };
    }
}
