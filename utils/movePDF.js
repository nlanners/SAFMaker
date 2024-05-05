import fs from 'fs';
import path from 'path';

export const movePDF = (fileName, srcDir, destDir) => {
  const files = fs.readdirSync(srcDir);

  for (const file of files) {
    const filePath = path.join(srcDir, file);

    if (file.endsWith(fileName)) {
      const newDest = `${destDir}/${fileName}`;
      console.log(filePath, destDir);
      fs.copyFileSync(filePath, newDest, 0, (err) => {
        console.log(err);
      });
    }
  }
}