'use strict';

import cheerio from 'cheerio';
import DateFormatter from './formatters/DateFormatter.mjs';
import LocationFormatter from './formatters/LocationFormatter.mjs'
import fs from 'fs';

//const year1947 = fs.readFileSync('../original-sources/branham.org/1955.html');
const year1947 = fs.readFileSync('../original-sources/branham.org/1955.html');
const $ = cheerio.load(year1947);

$('div.messagebox').each((index, sermon) => {
    const date = $(sermon).find('div.prodtext span.show-for-small-down').text();
    const dateFormatter = new DateFormatter(date);

    const location = $(sermon).find('div.large-10 div.prodtext2').text();
    const locationFormatter = new LocationFormatter(location);
    
    const metadata = {
        date: dateFormatter.format(),
        location: locationFormatter.format()
    };

    console.log(metadata);
});
