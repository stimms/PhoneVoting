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

    uglify:
      client:
        files:
          'dist/public/javascripts/all.js': 'public/javascripts/**.js'

    copy:
      images:
        src: 'public/images'
        dest: 'dist/public/images'
      routes:
        src: 'routes'
        dest: 'dist/routes'
      views:
        src: 'views'
        dest: 'dist/views'

    clean:
      work: ['work']
      dist: ['dist']

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-csslint'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-clean'


  grunt.registerTask 'default', ['jshint:server', 'jshint:client', 'less', 'csslint', 'uglify', 'copy', 'app', 'clean:work']
  grunt.registerTask 'dist-clean', ['clean:work', 'clean:dist']
