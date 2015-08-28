/*
 * grunt-fontcustom
 * https://github.com/aarki/grunt-fontcustom
 *
 * Copyright (c) 2015 Igor Raush
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        // transpile ES6
        babel: {
            src: {
                files: {
                    'tasks/fontcustom.js': 'src/fontcustom.js'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: [
                'Gruntfile.js',
                'src/*.js'
            ]
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: [
                'Gruntfile.js',
                'src/*.js'
            ]
        }
    });

    // load external tasks
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');

    // lint and test by default
    grunt.registerTask('default', [ 'jshint', 'jscs' ]);

};
