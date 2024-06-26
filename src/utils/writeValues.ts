import type { IHeading } from 'src/types/IHeading';
import type { ISAFRow } from 'src/types/ISAFRow';

export const writeValues = (row: ISAFRow) => {
  const headings = Object.keys(row).filter(
    (heading) => heading !== 'filename'
  );

  const values = headings.map((heading) => {
    const headingParts = heading.split('.');
    if (row[heading]) {
      return `<dcvalue element="${headingParts[1]}"${headingParts.length > 2 ? ` qualifier="${headingParts[2]}"` : ''}>${row[heading]}</dcvalue>`;
    }
  });

  return values.join('');
};
