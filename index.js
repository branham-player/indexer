const cheerio = require('cheerio');
const fs = require('fs');

const year1947 = fs.readFileSync('../original-sources/branham.org/1947.html');
const $ = cheerio.load(year1947);

 $('div.messagebox div.prodtext span.show-for-small-down').each((index, sermonDate) => {
    const fullDate = $(sermonDate).text().trim();

    const datePattern = new RegExp('^[0-9]{2}\-[0-9]{4}');
    const dateString = datePattern.exec(fullDate).toString();

    const year = 1900 + parseInt(dateString.substr(0, 2));
    const monthIndex = parseInt(dateString.substr(3, 2)) - 1;
    var day = dateString.substr(5, 2);

    if (parseInt(day) == 0) {
        day = "01";
    }

    const date = new Date(year, monthIndex, day);

    const modifierPattern = new RegExp('[ABEMSWX]$');
    const modifier = modifierPattern.exec(fullDate);

    console.log(date);

    if (modifier != null) {
        console.log(modifier.toString());
    }
});
