import fs from 'fs';
import path from 'path';

export const movePDF = (fileName, srcDir, destDir) => {
  const files = fs.readdirSync(srcDir);

  files.forEach(file => {
    const filePath = path.join(srcDir, file);

    if (file.endsWith(fileName)) {
      const newDest = `${destDir}/${fileName}`;
      fs.copyFileSync(filePath, newDest, 0, err => {
        console.log(err);
      });
    }
  });
};
