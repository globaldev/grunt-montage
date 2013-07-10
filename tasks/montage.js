module.exports = function (grunt) {

    "use strict";

    var exec = require("child_process").exec,
        path = require("path"),
        mkdirp = require("mkdirp"),
        rSpecial = /([!"#$%&'()*+,-.\/:;<=>?@[\]\\^`{}|~])/g;

    // Build a CSS rule in the format 'selector { property: value; [... property: value;] }'
    function buildRule(selector, properties) {
        return selector + " { " + Object.keys(properties).map(function (property) {
            return property + ": " + properties[property] + ";";
        }).join(" ") + " }\n";
    }

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
                baseRules: {},
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

        // Add necessary style rules to the base CSS
        options.baseRules.background = "url('" + options.outputImage + "') no-repeat";
        options.baseRules.width = options.size + "px";
        options.baseRules.height = options.size + "px";

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
                css = buildRule(options.prefix, options.baseRules);

            // Create the output directory if necessary (ImageMagick errors if it doesn't exist)
            if (!grunt.file.exists(files.dest)) {
                mkdirp(files.dest);
            }

            // Generate a stylesheet
            css += src.map(function (image, i) {
                var offsetLeft = (-options.size * (i % cols)) + "px",
                    offsetTop = (-options.size * Math.floor(i / cols)) + "px",
                    className = path.basename(image).replace(/\.\w+$/, "").replace(rSpecial, "\\$1");
                return buildRule(options.prefix + "." + className, {
                    "background-position": offsetLeft + " " + offsetTop
                });
            }).join("");

            grunt.file.write(path.join(files.dest, options.outputStylesheet), css);

            // Execute the ImageMagick montage tool
            exec("montage -tile " + cols + "x -geometry " + options.size + "x" + options.size + " " + cliOptions + " " + src.join(" ") + " " + dest, function (err) {
                done();
            });
        });
    });

};