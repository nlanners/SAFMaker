import fs from 'fs';
import { writeXML } from './writeXML.js';
import { movePDF } from './movePDF.js';
import type { ISAFRow } from 'src/types/ISAFRow.js';
import chalk from 'chalk';
import { Presets, SingleBar } from 'cli-progress';

export const createMetadataFolders = (rows: ISAFRow[], folderName: string) => {
  const progressBar = new SingleBar({}, Presets.shades_classic);

  const SAFFolderName = `${folderName}-SAF`;
  if (fs.existsSync(SAFFolderName)) {
    fs.rmSync(SAFFolderName, { recursive: true });
  }
  fs.mkdirSync(SAFFolderName);

  const files = fs.readdirSync(folderName);
  const pdfFileNames = files.filter((file) => file.endsWith('.pdf'));

  try {
    const movedFiles: string[] = [];
    const missingFiles: string[] = [];
    progressBar.start(rows.length, 0);
    rows.forEach((row, index) => {
      const itemFolder = `${SAFFolderName}/item_${index + 1}`;
      fs.mkdirSync(itemFolder);
      fs.writeFileSync(`${itemFolder}/contents`, row.filename);
      fs.writeFileSync(`${itemFolder}/dublin_core.xml`, writeXML(row));
      const { successful, missing } = movePDF(
        row.filename,
        folderName,
        itemFolder
      );
      if (successful) {
        movedFiles.push(successful);
      }
      if (missing) {
        missingFiles.push(missing);
      }

      progressBar.increment();
    });
    progressBar.stop();

    const extraFiles = pdfFileNames.filter(
      (file) => !movedFiles.includes(file)
    );

    if (extraFiles.length) {
      console.log(chalk.yellow('Extra files found in folder:'));
      extraFiles.forEach((file) => console.log(chalk.yellow(file)));
    }

    if (missingFiles.length) {
      console.log(chalk.red('The following files were not found:'));
      missingFiles.forEach((file) => console.log(chalk.red(file)));
    }

    console.log('Metadata folders created successfully.');
  } catch (err) {
    console.log(chalk.red(err));
    fs.rm(SAFFolderName, { recursive: true }, () => {
      console.log(
        chalk.red('Error creating metadata folders. Process aborted.')
      );
    });
  }
};
