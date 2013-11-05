module.exports = (grunt) ->

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

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-csslint'
  grunt.loadNpmTasks 'grunt-contrib-less'

  grunt.registerTask 'default', ['jshint:server', 'jshint:client', 'less', 'csslint']
