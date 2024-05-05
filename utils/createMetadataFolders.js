import fs from 'fs';
import { writeXML } from './writeXML.js';
import { movePDF } from './movePDF.js';

export const createMetadataFolders = (rows, folderName) => {
  const SAFFolder = `${folderName}-SAF`
  fs.mkdirSync(SAFFolder);

  rows.forEach((row, index) => {
    const itemFolder = `${SAFFolder}/item_${index + 1}`;
    fs.mkdirSync(itemFolder);
    fs.writeFileSync(`${itemFolder}/contents`, row.filename);
    fs.writeFileSync(`${itemFolder}/dublin_core.xml`, writeXML(row));
    movePDF(row.filename, folderName, itemFolder);
  })

}