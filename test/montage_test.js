exports.montage = (function () {

    "use strict";

    var grunt = require("grunt");

    return {
        defaults: function (test) {
            test.expect(2);
            test.equal(grunt.file.exists("tmp/defaults/montage.png"), true, "should generate a default montage.png file.");
            test.equal(grunt.file.exists("tmp/defaults/montage.css"), true, "should generage a default montage.css file.");
            test.done();
        },
        basic: function (test) {
            test.expect(2);
            test.equal(grunt.file.exists("tmp/basic/test.png"), true, "should generate a test.png file.");
            test.equal(grunt.file.exists("tmp/basic/test.css"), true, "should generage a test.css file.");
            test.done();
        }
    };

}());