'use strict';

import cheerio from 'cheerio';
import DateFormatter from './formatters/DateFormatter.mjs';
import LocationFormatter from './formatters/LocationFormatter.mjs';
import TitleFormatter from './formatters/TitleFormatter.mjs';
import fs from 'fs';

//const year1947 = fs.readFileSync('../original-sources/branham.org/1955.html');
const year1947 = fs.readFileSync('../original-sources/branham.org/1955.html');
const $ = cheerio.load(year1947);

$('div.messagebox').each((index, sermon) => {
    const date = $(sermon).find('div.prodtext span.show-for-small-down').text();
    const dateFormatter = new DateFormatter(date);

    const location = $(sermon).find('div.large-10 div.prodtext2').text();
    const locationFormatter = new LocationFormatter(location);

    const title = $(sermon).find('div.prodtext span.prodtexttitle').text();
    const titleFormatter = new TitleFormatter(title);
    
    const metadata = {
        date: dateFormatter.format(),
        location: locationFormatter.format(),
        title: titleFormatter.format()
    };

    console.log(metadata);
});
