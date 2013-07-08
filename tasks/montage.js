module.exports = function (grunt) {

    "use strict";

    grunt.registerMultiTask("montage", "Generate CSS sprite sheets and the corresponding stylesheet", function () {

        // Iterate over all specified file groups.
        this.files.forEach(function (files) {
            var src = files.src.filter(function (file) {
                if (!grunt.file.exists(file)) {
                    grunt.log.warn("Source file '" + file + "' not found.");
                    return false;
                }
                return true;
            });
        });
    });

};