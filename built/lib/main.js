"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var fs_1 = require("fs");
var csv_parser_1 = require("csv-parser");
var findCsvFile_js_1 = require("../utils/findCsvFile.js");
var createMetadataFolders_js_1 = require("../utils/createMetadataFolders.js");
var strip_bom_stream_1 = require("strip-bom-stream");
var main = function (argv) {
    var folder = argv;
    var rows = [];
    var csvFileName = (0, findCsvFile_js_1.findCsvFile)(folder, '.csv');
    fs_1.default.createReadStream("".concat(folder, "/").concat(csvFileName))
        .pipe((0, strip_bom_stream_1.default)())
        .pipe((0, csv_parser_1.default)())
        .on('data', function (data) { return rows.push(data); })
        .on('end', function () {
        (0, createMetadataFolders_js_1.createMetadataFolders)(rows, folder);
    });
};
exports.main = main;
