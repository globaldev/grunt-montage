module.exports = function (grunt) {

    "use strict";

    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                camelcase: true,
                immed: true,
                node: true,
                quotmark: "double",
                strict: true,
                trailing: true,
                undef: true,
                white: true
            },
            all: [
                "Gruntfile.js",
                "tasks/*.js",
                "<%= nodeunit.tests %>"
            ]
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: [
                "tmp"
            ]
        },

        // Configuration to be run (and then tested).
        montage: {
            defaults: {
                files: {
                    "tmp/defaults": [
                        "test/fixtures/*.png"
                    ]
                }
            },
            basic: {
                files: {
                    "tmp/basic": [
                        "test/fixtures/*.png"
                    ]
                },
                options: {
                    size: 24,
                    prefix: ".test",
                    outputImage: "test.png",
                    outputStylesheet: "test.css"
                }
            },
            base: {
                files: {
                    "tmp/base": [
                        "test/fixtures/*.png"
                    ]
                },
                options: {
                    prefix: ".base",
                    outputImage: "base.png",
                    outputStylesheet: "base.css",
                    baseRules: {
                        display: "inline-block",
                        "text-indent": "-9999px"
                    }
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: [
                "test/*_test.js"
            ]
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this plugin's task(s), then test the result.
    grunt.registerTask("test", [
        "clean",
        "montage",
        "nodeunit"
    ]);

    // By default, lint and run all tests.
    grunt.registerTask("default", [
        "jshint",
        "test"
    ]);

};