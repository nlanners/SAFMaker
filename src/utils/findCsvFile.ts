import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const findCsvFile = (startPath: string, filter: string) => {
  if (!fs.existsSync(startPath)) {
    console.log(chalk.red('no dir ', startPath));
    return;
  }

  const files = fs.readdirSync(startPath);

return files.find((file) => {
    var filename = path.join(startPath, file);
    if (filename.endsWith(filter)) {
      console.log(chalk.green(`CSV file found: ${filename}`));
      return filename;
    }
  });
};
