module.exports = function (grunt) {

    "use strict";

    var exec = require("child_process").exec,
        path = require("path"),
        mkdirp = require("mkdirp"),
        rSpecial = /([!"#$%&'()*+,-.\/:;<=>?@[\]\\^`{}|~])/g;

    grunt.registerMultiTask("montage", "Generate CSS sprite sheets and the corresponding stylesheet", function () {

        // It's an async task so make sure Grunt knows this
        var done = this.async(),
            cliOptions = "",
            options = {},
            defaults = {
                size: 16,
                prefix: ".montage",
                outputImage: "montage.png",
                outputStylesheet: "montage.css",
                magick: {}
            };

        // Configuration
        Object.keys(defaults).forEach(function (option) {
            if (this.data.options && this.data.options[option] !== undefined) {
                options[option] = this.data.options[option];
            } else {
                options[option] = defaults[option];
            }
        }, this);

        // Build ImageMagick montage option string
        cliOptions = Object.keys(options.magick).map(function (option) {
            return "-" + option + " " + options.magick[option];
        }).join(" ");

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
                dest = path.join(files.dest, options.outputImage),
                sqrt = Math.sqrt(src.length),
                rows = Math.floor(sqrt),
                cols = Math.ceil(sqrt),
                css = options.prefix + " { background: url('" + options.outputImage + "') no-repeat; width: " + options.size + "px; height: " + options.size + "px; }\n";

            // Create the output directory if necessary (ImageMagick errors if it doesn't exist)
            if (!grunt.file.exists(files.dest)) {
                mkdirp(files.dest);
            }

            // Generate a stylesheet
            css += src.map(function (image, i) {
                var offsetLeft = -options.size * (i % cols),
                    offsetTop = -options.size * Math.floor(i / cols),
                    className = path.basename(image).replace(/\.\w+$/, "").replace(rSpecial, "\\$1");

                // Only add the units if the value is not 0
                if (offsetLeft) {
                    offsetLeft += "px";
                }
                if (offsetTop) {
                    offsetTop += "px";
                }

                return options.prefix + "." + className + " { background-position: " + offsetLeft + " " + offsetTop + "; }\n";
            }).join("");

            grunt.file.write(path.join(files.dest, options.outputStylesheet), css);

            // Execute the ImageMagick montage tool
            exec("montage -tile " + cols + "x -geometry " + options.size + "x" + options.size + " " + cliOptions + " " + src.join(" ") + " " + dest, function (err) {
                done();
            });
        });
    });

};