import type { ISAFRow } from 'src/types/ISAFRow.js';
import { writeValues } from './writeValues.js';

export const writeXML = (row: ISAFRow) => {
  return `<?xml version="1.0" encoding="UTF-8"?><dublin_core>${writeValues(row)}</dublin_core>`;
};
