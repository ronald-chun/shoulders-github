module.exports = function(grunt) {
    var bower = {
        js: [
            'bootstrap/dist/js/bootstrap.min.js',
            'jquery/dist/jquery.min.js',
            'owl.carousel/dist/owl.carousel.min.js',
            'magnific-popup/dist/jquery.magnific-popup.min.js'
        //     'gasparesganga-jquery-loading-overlay/extras/loadingoverlay_progress/loadingoverlay_progress.js',
        //     'gasparesganga-jquery-loading-overlay/extras/loadingoverlay_progress/loadingoverlay_progress.min.js',
        //     'gasparesganga-jquery-loading-overlay/src/loadingoverlay.js',
        //     'gasparesganga-jquery-loading-overlay/src/loadingoverlay.min.js'
        ],
        css: [
            'bootstrap/dist/css/bootstrap.min.css',
            'font-awesome/css/font-awesome.min.css',
            'owl.carousel/dist/assets/owl.carousel.min.css',
            'magnific-popup/dist/magnific-popup.css'

            // 'datatables.net-dt/css/jquery.dataTables.*',
            // 'datatables.net-buttons-dt/css/buttons.dataTables.*',
        ],
        fonts: [
            'font-awesome/fonts/*'
        ],
        image: [
            // 'gasparesganga-jquery-loading-overlay/src/loading.gif',
        ]
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: [
                './public/assets'
            ]
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: './bower_components',
                        src: bower.js,
                        dest: './public/assets/js'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: './bower_components',
                        src: bower.css,
                        dest: './public/assets/css'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: './bower_components',
                        src: bower.image,
                        dest: './public/assets/images'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: './bower_components',
                        src: bower.fonts,
                        dest: './public/assets/fonts'
                    }
                ]
            }
        }
    });

    //grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-clean");
    //grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks("grunt-contrib-watch");

    // Default task(s).
    grunt.registerTask('all', ['copy']);
    grunt.registerTask('build', ['clean:build', 'copy:build']);
}