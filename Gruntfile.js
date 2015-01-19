'use strict';

module.exports = function (grunt) {

    // Load all tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        // Configure paths
        paths: {
            name: require('./bower.json').name || 'impaq',
            public: 'public',
            tmp: '.tmp'
        },

        // Clean selected destinations
        clean: {
            server: {
                dot: true,
                src: [
                    '<%= paths.tmp %>'
                ]
            },
            app: {
                src: [
                    '<%= paths.public %>/main.js',
                    '<%= paths.public %>/main.css'
                ]
            }
        },

        // Run multiple tasks concurrently
        concurrent: {
            compass: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: [
                    'compass'
                ]
            },
            server: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: [
                    'nodemon',
                    'connect:livereload',
                    'watch'
                ]
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= paths.public %>',
                cssDir: '<%= paths.tmp %>/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= paths.public %>/assets/images',
                javascriptsDir: '<%= paths.public %>',
                importPath: '<%= paths.public  %>',
                fontsDir: '<%= paths.public %>/assets/fonts',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            server: {
                options: {
                    debugInfo: false
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                force: true
            },
            all: [
                'Gruntfile.js',
                '<%= paths.public %>/**/{,*/}*.js',
                '!<%= paths.public %>/main.min.js' // MAY BE CHANGED
            ]
        },

        // Concatenate .js and .css files
        concat: {
            css: {
                src: '<%= paths.tmp %>/styles/main.css',
                dest: '<%= paths.tmp %>/concat/main.css'
            },
            js: {
                src: [
                    '<%= paths.public %>/**/{,*/}*.js',
                    '!<%= paths.public %>/main.js',
                    '!<%= paths.public %>/**/{,*/}*spec.js'
                ],
                dest: '<%= paths.tmp %>/concat/main.js'
            }
        },

        // Add Angular annotations
        ngAnnotate: {
            app: {
                files: {
                    '<%= paths.tmp %>/concat/main.js': '<%= paths.tmp %>/concat/main.js'
                }
            }
        },

        // Minify and concatenate .js files
        uglify: {
            options: {
                banner: '/*! <%= paths.name %> <%= grunt.template.today("yyyy-mm-dd HH:mm") %> */\n',
                mangle: true,
                beautify: true,
                compress: false
            },
            tmp: {
                src: '<%= paths.tmp %>/concat/main.js',
                dest: '<%= paths.tmp %>/minified/main.js'
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            tmp: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.tmp %>/concat/',
                        src: '{,*/}*.css',
                        dest: '<%= paths.tmp %>/concat/'
                    }
                ]
            }
        },

        // Minify .css files
        cssmin: {
            options: {
                banner: '/*! <%= paths.name %> <%= grunt.template.today("yyyy-mm-dd HH:mm") %> */\n',
                keepSpecialComments: 0
            },
            combine: {
                src: '<%= paths.tmp %>/concat/main.css',
                dest: '<%= paths.tmp %>/minified/main.css'
            }
        },

        copy: {
            app: {
                expand: true,
                dot: true,
                cwd: '<%= paths.tmp %>/minified',
                dest: '<%= paths.public %>',
                src: ['**']
            }
        },

        // Run server using nodemon
        nodemon: {
            dev: {
                script: 'app.js'
            }
        },

        // Watch for changes in files
        watch: {
            js: {
                files: [
                    '<%= paths.public %>/**/{,*/}*.js',
                    '!<%= paths.public %>/main.js'
                ],
                tasks: [
                    'concat:js',
                    'ngAnnotate',
                    'uglify',
                    'copy:app'
                ]
            },
            styles: {
                files: [
                    '<%= paths.public %>/**/{,*/}*.scss'
                ],
                tasks: [
                    'compass',
                    'concat:css',
                    'autoprefixer',
                    'cssmin',
                    'copy:app'
                ]
            },
            gruntfile: {
                files: [
                    'Gruntfile.js'
                ]
            }
        },

        // Run grunt server
        connect: {
            options: {
                port: 8080,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:8080'

                    },
                    base: [
                        '.tmp',
                        '<%= paths.public %>'
                    ]
                }
            }
        },

        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        'bower_components/angular/angular.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'bower_components/angular-resource/angular-resource.js',
                        'public/**/*.js'
                    ]
                }
            }
        }


    });

    // Default task(s).

    grunt.registerTask('serve', function () {
        var taskList = [
            'clean',
            'concurrent:compass',
            'jshint',
            'concat',
            'ngAnnotate',
            'uglify',
            'cssmin',
            'copy:app',
            'concurrent:server'
        ];
        grunt.task.run(taskList);
    });

    grunt.registerTask('test', [
        'jshint',
        'karma'
    ]);
};
