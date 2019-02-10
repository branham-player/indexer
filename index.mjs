'use strict';

import cheerio from 'cheerio';
import DateFormatter from './formatters/DateFormatter.mjs';
import fs from 'fs';

const year1947 = fs.readFileSync('../original-sources/branham.org/1955.html');
const $ = cheerio.load(year1947);

 $('div.messagebox div.prodtext span.show-for-small-down').each((index, sermonDate) => {
    const fullDate = $(sermonDate).text();
    const formatter = new DateFormatter(fullDate);
    
    console.log(formatter.format());
});

$('div.messagebox div.large-10 div.prodtext2').each((index, city) => {
    const formattedCity = $(city).text().trim();
    
    console.log(formattedCity);
});

