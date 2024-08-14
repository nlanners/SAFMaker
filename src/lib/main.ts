import csv from 'csv-parser';
import fs from 'fs';
import stripBom from 'strip-bom-stream';
import { createMetadataFolders } from '../utils/createMetadataFolders.js';
import { findCsvFile } from '../utils/findCsvFile.js';
import type { ISAFRow } from 'src/types/ISAFRow.js';
import chalk from 'chalk';

export const main = (argv: string) => {
  const folder = argv;
  const rows: ISAFRow[] = [];
  const csvFileName = findCsvFile(folder, '.csv');

  if (!csvFileName) {
    console.log(chalk.red('No CSV file found'));
    return;
  }

  fs.createReadStream(`${folder}/${csvFileName}`)
    .pipe(stripBom())
    .pipe(csv())
    .on('data', (data) => {
      if (Object.values(data).length > 0) {
        rows.push(data);
      }
    })
    .on('end', () => {
      if (rows.length === 0) {
        console.log(chalk.yellow('No rows found in CSV file'));
        return;
      }
      createMetadataFolders(rows, folder);
    });
};
