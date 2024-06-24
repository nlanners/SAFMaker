#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var main_js_1 = require("../lib/main.js");
commander_1.program.version('1.0.0')
    .argument('<string>', 'folder containing items to convert to Simple Archive Format')
    .action(main_js_1.main);
commander_1.program.parse(process.argv);
