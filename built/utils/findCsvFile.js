"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCsvFile = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var findCsvFile = function (startPath, filter) {
    if (!fs_1.default.existsSync(startPath)) {
        console.log('no dir ', startPath);
        return;
    }
    var files = fs_1.default.readdirSync(startPath);
    return files.find(function (file) {
        var filename = path_1.default.join(startPath, file);
        if (filename.endsWith(filter)) {
            console.log("CSV file found: ".concat(filename));
            return filename;
        }
    });
};
exports.findCsvFile = findCsvFile;
