module.exports = (grunt) ->

  OUTPUT_DIRECTORY = 'dist/'

  grunt.initConfig
    jshint:
      server:
        src: ['app.js', 'route/**.js']
      client:
        src: ['public/javascripts/**.js']

    csslint:
      all:
        src: ['work/css/style.css']

    less:
      css:
        files:
          'work/css/style.css': 'public/stylesheets/style.less'

    uglify:
      client:
        files:
          OUTPUT_DIRECTORY + 'public/javascripts/all.js': 'public/javascripts/**.js'

    copy:
      client:
        src: ['public/images/**', 'public/stylesheets/**']
        dest: OUTPUT_DIRECTORY
      server:
        src: ['routes/**', 'views/**', 'app.js']
        dest: OUTPUT_DIRECTORY

    clean:
      work: ['work']
      dist: [OUTPUT_DIRECTORY]

    jasmine:
      server:
        src: 'public/routes/*.js'
        options:
          specs: 'specs/*.js'
      client:
        src: 'public/javascripts/**/*.js'
        options:
          specs: 'public/specs/*.js'

    env:
      development:
        NODE_ENV: 'development'

    express:
      development:
        options:
          livereload: true
          server: 'app.js'
      production:
        options:
          port: 8080

    watch:
      all:
        files: ['views/*', 'routes/*.js']
        tasks: ['server']

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-csslint'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-express'
  grunt.loadNpmTasks 'grunt-env'

  grunt.registerTask 'server', () ->
    grunt.util.spawn(
      cmd: 'node',
      args: ['app.js']
    )


  grunt.registerTask 'default', ['jshint:server', 'jshint:client', 'less', 'csslint', 'uglify', 'copy', 'clean:work']
  grunt.registerTask 'dist-clean', ['clean:work', 'clean:dist']
  grunt.registerTask 'dev', ['env:development','server', 'watch']
