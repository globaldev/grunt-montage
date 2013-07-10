# montage

> Generate CSS sprite sheets and the corresponding stylesheet

## Getting Started
This plugin requires Grunt 0.4 or later and depends upon the `montage` command line tool bundled with ImageMagick. If you don't already have it (and you're running on *nix/Mac OS), it will be automatically installed.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-montage --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-montage");
```

## The "montage" task

### Overview
In your project's Gruntfile, add a section named `montage` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    montage: {
        targetName: {
            // Target-specific montage configuration
        }
    }
});
```

### Options

#### options.size
Type: `Number`
Default value: `16`

The width/height of each image included in the sprite sheet.

#### options.prefix
Type: `String`
Default value: `".montage"`

A CSS selector to prefix all sprite classes with.

#### options.outputImage
Type: `String`
Default value: `"montage.png"`

The name of the generated sprite sheet image.

#### options.outputStylesheet
Type: `String`
Default value: `"montage.css"`

The name of the generated stylesheet.

#### options.baseRules
Type: `Object`
Default value: `undefined`

A map of CSS properties/values that will be appended to the base rule in the stylesheet.

#### options.magick
Type: `Object`
Default value: `undefined`

A map of [command-line options for the ImageMagick montage tool](http://www.imagemagick.org/script/montage.php).

### Usage Examples

#### Default Options
In this example, the default options are used to do generate a sprite sheet from 16x16 pixel versions of all the `.png` files in the `images/icons` directory. The sprite sheet will be created at `assets/sprites/montage.css` and the image at `assets/sprites/montage.png`, based on the default option values listed above.

```js
grunt.initConfig({
    montage: {
        simple: {
            files: {
                "assets/sprites": [
                    "images/icons/*.png"
                ]
            }
        }
    }
});
```

#### Custom Options
In this example, custom options are used to configure the output. It will generate a sprite sheet of 32x32 pixel images at `assets/sprites/sprites.png` and the corresponding stylesheet at `assets/sprites/styles.css`.

```js
grunt.initConfig({
    montage: {
        simple: {
            files: {
                "assets/sprites": [
                    "images/icons/*.png"
                ]
            },
            options: {
                size: 32,
                outputImage: "sprites.png",
                outputStylesheet: "styles.css"
            }
        }
    }
});
```

In this example, custom options are used to pass extra configuration through to ImageMagick. It will generate the same sprite sheet as the previous example, but with a transparent background.

```js
grunt.initConfig({
    montage: {
        simple: {
            files: {
                "assets/sprites": [
                    "images/icons/*.png"
                ]
            },
            options: {
                size: 32,
                outputImage: "sprites.png",
                outputStylesheet: "styles.css",
                magick: {
                    background: "none"
                }
            }
        }
    }
});
```

In this example, custom options are used to add to the base CSS rule in the generated stylesheet. It will add `display` and `text-indent` properties to the base rule.

```js
grunt.initConfig({
    montage: {
        simple: {
            files: {
                "assets/sprites": [
                    "images/icons/*.png"
                ]
            },
            options: {
                baseRules: {
                    display: "inline-block",
                    "text-indent": "-9999px"
                }
            }
        }
    }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Licensing and Attribution
Grunt Montage is released under the MIT license as detailed in the LICENSE file that should be distributed with this library; the source code is [freely available](http://github.com/globaldev/grunt-montage).

Grunt Montage was developed by [James Allardice](http://jamesallardice.com) during work on [White Label Dating](http://www.whitelabeldating.com/), while employed by [Global Personals Ltd](http://www.globalpersonals.co.uk).  Global Personals Ltd have kindly agreed to the extraction and release of this software under the license terms above.