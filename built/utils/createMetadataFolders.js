"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetadataFolders = void 0;
var fs_1 = require("fs");
var writeXML_js_1 = require("./writeXML.js");
var movePDF_js_1 = require("./movePDF.js");
var createMetadataFolders = function (rows, folderName) {
    var SAFFolder = "".concat(folderName, "-SAF");
    if (fs_1.default.existsSync(SAFFolder)) {
        fs_1.default.rmSync(SAFFolder, { recursive: true }, function () { });
    }
    fs_1.default.mkdirSync(SAFFolder);
    try {
        rows.forEach(function (row, index) {
            var itemFolder = "".concat(SAFFolder, "/item_").concat(index + 1);
            fs_1.default.mkdirSync(itemFolder);
            fs_1.default.writeFileSync("".concat(itemFolder, "/contents"), row.filename);
            fs_1.default.writeFileSync("".concat(itemFolder, "/dublin_core.xml"), (0, writeXML_js_1.writeXML)(row));
            (0, movePDF_js_1.movePDF)(row.filename, folderName, itemFolder);
        });
        console.log('Metadata folders created successfully.');
    }
    catch (err) {
        console.error(err);
        fs_1.default.rm(SAFFolder, { recursive: true }, function () {
            console.log('Error creating metadata folders. Process aborted.');
        });
    }
};
exports.createMetadataFolders = createMetadataFolders;
