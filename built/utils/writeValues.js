"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeValues = void 0;
var writeValues = function (row) {
    var headings = Object.keys(row).filter(function (heading) { return heading !== 'filename'; });
    var values = headings.map(function (heading) {
        var headingParts = heading.split('.');
        if (row[heading]) {
            return "<dcvalue element=\"".concat(headingParts[1], "\"").concat(headingParts.length > 2 ? " qualifier=\"".concat(headingParts[2], "\"") : '', ">").concat(row[heading], "</dcvalue>");
        }
    });
    return values.join('');
};
exports.writeValues = writeValues;
