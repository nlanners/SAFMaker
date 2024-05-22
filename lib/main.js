import fs from 'fs';
import csv from 'csv-parser';
import { findCsvFile } from '../utils/findCsvFile.js';
import { createMetadataFolders } from '../utils/createMetadataFolders.js';
import stripBom from 'strip-bom-stream';

export const main = argv => {
  const folder = argv;
  const rows = [];
  const csvFileName = findCsvFile(folder, '.csv');

  fs.createReadStream(`${folder}/${csvFileName}`)
    .pipe(stripBom())
    .pipe(csv())
    .on('data', data => rows.push(data))
    .on('end', () => {
      createMetadataFolders(rows, folder);
    });
};
