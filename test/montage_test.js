exports.montage = (function () {

    "use strict";

    var grunt = require("grunt");

    return {
        basic: function (test) {
            test.expect(2);
            test.equal(grunt.file.exists("tmp/basic/montage.png"), true, "should generate a default montage.png file.");
            test.equal(grunt.file.exists("tmp/basic/montage.css"), true, "should generage a default montage.css file.");
            test.done();
        }
    };

}());