"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeXML = void 0;
var writeValues_js_1 = require("./writeValues.js");
var writeXML = function (row) {
    return "\n    <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n      <dublin_core>\n      ".concat((0, writeValues_js_1.writeValues)(row), "\n      </dublin_core>\n  ");
};
exports.writeXML = writeXML;
