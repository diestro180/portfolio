module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 8001,
          base: 'delivery',
          livereload: true,
          open: {
            target: 'http://localhost:8001'
          }
        }
      }
    },
    jslint: {
      // lint your project's client code 
      client: {
        src: [
          'js/*.js'
        ],
        directives: {
          browser: true,
          node: false,
          plusplus: true,
          this: true,
          predef: [
            'jQuery',
            'TimelineMax',
            'TweenMax',
            'MorphSVGPlugin',
            '$',
            'console',
            'Power0',
            'Power1',
            'Power2',
            'Power3',
            'Power4',
            'Back',
            'Circ',
            'requestAnimationFrame',
            'Event',
            'Instafeed'
          ]
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/vendors/*.js', 'js/main.js'],
        dest: 'delivery/built.js',
      },
    },
    scsslint: {
      allFiles: [
        'sass/*.scss',
      ],
      options: {
        config: 'scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true,
        exclude: 'sass/normalize.scss'
      },
    },
    compass: {
      dist : {
        options: {
          specify: 'sass/main.scss',
          cssDir: 'delivery/',
          imagesDir: 'delivery/',
          outputStyle: 'compressed'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      js_desktop: {
        files: ['Gruntfile.js', 'js/*.js', 'js/vendors/*.js'],
        tasks: ['jslint', 'concat']
      },
      css_desktop: {
        files: ['sass/*.scss'],
        tasks: ['scsslint', 'compass:dist']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.registerTask('default', ['jslint', 'scsslint', 'compass:dist']);
  grunt.registerTask('serve', ['connect:server', 'watch']);
};