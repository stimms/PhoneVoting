module.exports = (grunt) ->

  OUTPUT_DIRECTORY = 'dist/'

  grunt.initConfig

    typescript:
      client:
        src: ['public/javascripts/*.ts']
        dest: ''

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
          'dist/public/javascripts/all.js': ['public/bower_components/jquery/jquery.js',
                                             'public/bower_components/d3/d3.js',
                                             'public/bower_components/angular/angular.js',
                                             'public/bower_components/angular-resource/angular-resource.js',
                                             'public/bower_components/angular-route/angular-route.js',
                                             'public/bower_components/underscore/underscore.js',
                                             'public/javascripts/*.js']
    concat:
      client:
        src: ['public/bower_components/jquery/jquery.js',
             'public/bower_components/d3/d3.js',
             'public/bower_components/angular/angular.js',
             'public/bower_components/angular-resource/angular-resource.js',
             'public/bower_components/angular-route/angular-route.js',
             'public/bower_components/underscore/underscore.js',
             'public/javascripts/*.js']
        dest: 'dist/public/javascripts/all.js'

    copy:
      client:
        src: ['public/images/**', 'public/stylesheets/**']
        dest: OUTPUT_DIRECTORY
      server:
        src: ['routes/**', 'views/**', 'app.js']
        dest: OUTPUT_DIRECTORY
      packages:
        src: ['package.json']
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
          vendor: 'public/bower_components/jquery/jquery.js'

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
        files: ['views/*.jade', 'routes/*.js']
        tasks: ['spawn:dev']

    spawn:
      dev:
        command: "node"
        commandArgs: ['app.js']
        directory: "."
      prod:
        command: "node"
        commandArgs: ['app.js']
        directory: "."
        cwd: "dist"


  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-csslint'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-typescript'
  grunt.loadNpmTasks 'grunt-express'
  grunt.loadNpmTasks 'grunt-spawn'
  grunt.loadNpmTasks 'grunt-env'




  grunt.registerTask 'default', ['jshint:server', 'typescript', 'jshint:client', 'less', 'csslint', 'concat', 'copy', 'clean:work']
  grunt.registerTask 'dist-clean', ['clean:work', 'clean:dist']
  grunt.registerTask 'dev', ['env:development','typescript', 'spawn:dev', 'watch']
  grunt.registerTask 'prod', ['default', 'spawn:prod', 'watch']
