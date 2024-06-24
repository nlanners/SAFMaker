"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movePDF = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var movePDF = function (fileName, srcDir, destDir) {
    var files = fs_1.default.readdirSync(srcDir);
    files.forEach(function (file) {
        var filePath = path_1.default.join(srcDir, file);
        if (file.endsWith(fileName)) {
            var newDest = "".concat(destDir, "/").concat(fileName);
            fs_1.default.copyFileSync(filePath, newDest, 0, function (err) {
                console.log(err);
            });
        }
    });
};
exports.movePDF = movePDF;
