import fs from 'fs';
import path from 'path';

export const findCsvFile = (startPath, filter) => {
  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  const files = fs.readdirSync(startPath);

  return files.find((file) => {
    var filename = path.join(startPath, file);
    if (filename.endsWith(filter)) {
      console.log(`CSV file found: ${filename}`);
      return filename;
    }
  });
};
