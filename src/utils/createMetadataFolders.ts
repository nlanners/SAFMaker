import fs from 'fs';
import { writeXML } from './writeXML.js';
import { movePDF } from './movePDF.js';
import type { ISAFRow } from 'src/types/ISAFRow.js';
import chalk from 'chalk';

export const createMetadataFolders = (rows: ISAFRow[], folderName: string) => {
  const SAFFolder = `${folderName}-SAF`;
  if (fs.existsSync(SAFFolder)) {
    fs.rmSync(SAFFolder, { recursive: true });
  }
  fs.mkdirSync(SAFFolder);

  try {
    rows.forEach((row, index) => {
      const itemFolder = `${SAFFolder}/item_${index + 1}`;
      fs.mkdirSync(itemFolder);
      fs.writeFileSync(`${itemFolder}/contents`, row.filename);
      fs.writeFileSync(`${itemFolder}/dublin_core.xml`, writeXML(row));
      movePDF(row.filename, folderName, itemFolder);
    });
    console.log('Metadata folders created successfully.');
  } catch (err) {
    console.log(chalk.red(err));
    fs.rm(SAFFolder, { recursive: true }, () => {
      console.log(
        chalk.red('Error creating metadata folders. Process aborted.')
      );
    });
  }
};
