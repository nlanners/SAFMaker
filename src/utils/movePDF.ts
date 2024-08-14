import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export const movePDF = (fileName: string, srcDir: string, destDir: string) => {
  const filePath = path.join(srcDir, fileName);
  if (fs.existsSync(filePath)) {
    const newDest = `${destDir}/${fileName}`;
    fs.copyFileSync(filePath, newDest, 0);
    return { successful: fileName, missing: null };
  }
  return { successful: null, missing: fileName };
};
