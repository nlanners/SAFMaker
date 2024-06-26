import csv from 'csv-parser';
import fs from 'fs';
import stripBom from 'strip-bom-stream';
import { createMetadataFolders } from '../utils/createMetadataFolders.js';
import { findCsvFile } from '../utils/findCsvFile.js';
import type { ISAFRow } from 'src/types/ISAFRow.js';

export const main = (argv: string) => {
  const folder = argv;
  const rows: ISAFRow[] = [];
  const csvFileName = findCsvFile(folder, '.csv');

  fs.createReadStream(`${folder}/${csvFileName}`)
    .pipe(stripBom())
    .pipe(csv())
    .on('data', (data) => rows.push(data))
    .on('end', () => {
      createMetadataFolders(rows, folder);
    });
};
