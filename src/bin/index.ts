#! /usr/bin/env node

import { Command } from 'commander';
import { main } from '../lib/main.js';

const program = new Command();

program
  .version('1.0.0')
  .argument(
    '<string>',
    'folder containing items to convert to Simple Archive Format'
  )
  .action(main);

program.parse(process.argv);
