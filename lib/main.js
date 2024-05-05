import fs from 'fs';
import csv from 'csv-parser';
import { findCsvFile } from '../utils/findCsvFile.js';
import { createMetadataFolders } from '../utils/createMetadataFolders.js';

export const main = (argv) => {
  const folder = argv;
  const rows = [];
  const csvFileName = findCsvFile(folder, '.csv');

  fs.createReadStream(`${folder}/${csvFileName}`)
    .pipe(csv())
    .on('data', (data) => rows.push(data))
    .on('end', () => {
      createMetadataFolders(rows, folder);
    });
};
