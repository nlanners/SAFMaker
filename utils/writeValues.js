export const writeValues = (row) => {
  const values = [];
  const headings = Object.keys(row).map(heading => heading !== 'filename' ? heading : null);


  headings.forEach(heading => {
    if (!heading) {
      return;
    }
    const headingParts = heading.split('.');
    if (row[heading]) {
      values.push(`<dcvalue element="${headingParts[1]}"${headingParts.length > 2 ? ` qualifier="${headingParts[2]}"` : ''}>${row[heading]}</dcvalue>`);
    }
  });

  return values.join('');
}