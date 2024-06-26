#! /usr/bin/env node

import { program } from 'commander';
import { main } from '../lib/main.js';

program.version('1.0.0')
  .argument('<string>', 'folder containing items to convert to Simple Archive Format')
  .action(main);

program.parse(process.argv);
