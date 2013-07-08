module.exports = function (grunt) {

    "use strict";

    var exec = require("child_process").exec,
        path = require("path"),
        mkdirp = require("mkdirp");

    grunt.registerMultiTask("montage", "Generate CSS sprite sheets and the corresponding stylesheet", function () {

        // It's an async task so make sure Grunt knows this
        var done = this.async(),
            options = this.data.options || {},
            size = options.size || 16,
            prefix = options.prefix || ".montage";

        // Iterate over all specified file groups.
        this.files.forEach(function (files) {

            // Remove non-existent files from the list
            var src = files.src.filter(function (file) {
                    if (!grunt.file.exists(file)) {
                        grunt.log.warn("Source file '" + file + "' not found.");
                        return false;
                    }
                    return true;
                }),
                dest = path.join(files.dest, "montage.png"),
                sqrt = Math.sqrt(src.length),
                rows = Math.floor(sqrt),
                cols = Math.ceil(sqrt),
                css = prefix + " { background: url('montage.png') no-repeat; width: " + size + "px; height: " + size + "px; }\n";

            // Create the output directory if necessary (ImageMagick errors if it doesn't exist)
            if (!grunt.file.exists(files.dest)) {
                mkdirp(files.dest);
            }

            // Generate a stylesheet
            css += src.map(function (image, i) {
                var offsetLeft = -size * (i % cols),
                    offsetTop = -size * Math.floor(i / cols),
                    className = path.basename(image).replace(/\.\w+$/, "");
                return prefix + "." + className + " { background-position: " + offsetLeft + "px " + offsetTop + "px; }\n";
            }).join("");

            grunt.file.write(path.join(files.dest, "montage.css"), css);

            // Execute the ImageMagick montage tool
            exec("montage -tile " + cols + "x -geometry " + size + "x" + size + " " + src.join(" ") + " " + dest, function (err) {
                done();
            });
        });
    });

};