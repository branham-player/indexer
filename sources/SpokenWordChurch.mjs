'use strict';

import cheerio from 'cheerio';
import fs from 'fs';

import BuildingFormatter from '../formatters/BuildingFormatter.mjs';
import IDFormatter from '../formatters/IDFormatter.mjs';

export default class SpokenWordChurch {

    constructor(masterIndex, sourceDirectory) {
        this.masterIndex = masterIndex;
        this.sourceDirectory = sourceDirectory;
    }

    process() {
        const source = fs.readFileSync(`${this.sourceDirectory}/spoken-word-church.html`);
        const $ = cheerio.load(source);

        $('table').each((index, table) => {
            $(table).find('tr').each((index, row) => {
                const date = $(row).children().first().text();
                const idFormatter = new IDFormatter(date);

                const building = $(row).children().last().text();
                const buildingFormatter = new BuildingFormatter(building);
                
                this.addToMasterIndex(idFormatter.format(), buildingFormatter.format());
            });
        });
    }

    addToMasterIndex(key, building) {
        if (this.masterIndex.hasOwnProperty(key)) {
            this.masterIndex[key].building = building;
            return;
        }

        const pattern = new RegExp('^[0-9]{2}\-[0-9]{4}');
        const dateWithoutModifier = pattern.exec(key);
            
        if (this.masterIndex.hasOwnProperty(dateWithoutModifier)) {
            this.masterIndex[dateWithoutModifier].building = building;
        }
    }
}
