import { writeValues } from './writeValues.js';

export const writeXML = (row) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
      <dublin_core>
      ${writeValues(row)}
      </dublin_core>
  `;
}