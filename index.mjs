'use strict';

import cheerio from 'cheerio';
import DateFormatter from './formatters/DateFormatter.mjs';
import fs from 'fs';

const year1947 = fs.readFileSync('../original-sources/branham.org/1947.html');
const $ = cheerio.load(year1947);

 $('div.messagebox div.prodtext span.show-for-small-down').each((index, sermonDate) => {
    const fullDate = $(sermonDate).text().trim();
    const formatter = new DateFormatter(fullDate);
    
    console.log(formatter.format());
});
