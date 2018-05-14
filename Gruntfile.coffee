"use strict"

module.exports = (grunt) ->
  require("load-grunt-tasks") grunt
  require("time-grunt") grunt

  #register task
  grunt.registerTask "default", ["js"]
  grunt.registerTask "js", (target) ->
    grunt.task.run ["clean:js", "coffee:build_all", "concat:coffee", "chown", "watch:coffee"]
  grunt.registerTask "bower", (target) ->
    grunt.task.run ["concat:bower"]

  #yeoman config
  yeomanConfig =
    src: "coffee"
    js_ob: "js_secret/obfuscated"
    dist: "wwwroot/js"
    bower: "static/bower"
    tmp: "tmp/js"
    bizMd5: "-4Z6TWpPINE3k5Jr_WDxSAA"

  #define grunt properties
  grunt.initConfig
    chown:
      options:
        uid: 65534
        gid: 65534
      dist:
        src: "<%= yeoman.dist %>/*"

    clean:
      js: ["<%= yeoman.dist %>/*", "<%= yeoman.tmp %>/*"]

    coffee:
      build_all:
        options:
          sourceMap: false
          sourceRoot: ""
        files: [
          expand: true
          cwd: "<%= yeoman.src %>"
          src: "**/*.coffee"
          dest: "<%= yeoman.tmp %>"
          ext: ".js"
        ]


    concat:
      bower:
        files:
          "<%= yeoman.bower %>/ok.js": [
            "<%= yeoman.bower %>/jquery/dist/jquery.min.js"
            "<%= yeoman.bower %>/angular/angular.min.js"#not angular.min.js, for debug   v1.4.8
            "<%= yeoman.bower %>/angular-bootstrap/ui-bootstrap-tpls.min.js"  #0.14.3
            "<%= yeoman.bower %>/angular-cookies/angular-cookies.min.js" #v1.4.8
            "<%= yeoman.bower %>/angular-mass-autocomplete/massautocomplete.js"
            "<%= yeoman.bower %>/angular-route/angular-route.min.js" #v1.4.8
            "<%= yeoman.bower %>/angular-sanitize/angular-sanitize.min.js"  #v1.4.8
            "<%= yeoman.bower %>/angular-scroll/angular-scroll.min.js" #you
            "<%= yeoman.bower %>/angular-toastr/dist/angular-toastr.min.js"#new
            "<%= yeoman.bower %>/fingerprint/fingerprint.js"#please compress it  #0.5.3
            "<%= yeoman.bower %>/i18next/i18next.min.js" #v1.11.1 
            "<%= yeoman.bower %>/ng-i18next/dist/ng-i18next.min.js"
            "<%= yeoman.bower %>/ng-file-upload/dist/ng-file-upload.min.js"
            "<%= yeoman.bower %>/ng-file-upload/dist/ng-file-upload-shim.min.js"
            "<%= yeoman.bower %>/angular-file-upload/dist/angular-file-upload.js"
          ]
      coffee:
        files:
          "<%= yeoman.dist %>/shared<%= yeoman.bizMd5 %>.js": [
            "<%= yeoman.tmp %>/root.js"
            "<%= yeoman.tmp %>/config/*.js"
            "<%= yeoman.tmp %>/directive/*.js"
          ]
          "<%= yeoman.dist %>/biz<%= yeoman.bizMd5 %>.js": [
            "<%= yeoman.tmp %>/ctrl/**/*.js"
            "<%= yeoman.tmp %>/service/**/*.js"
          ]
          "<%= yeoman.dist %>/obfuscated.js": ["<%= yeoman.js_ob %>/*.js"]

    watch:
      options:
        nospawn: true,
        spawn: false,
        debounceDelay: 10,
        interval: 10
      coffee:
        files: [
          "<%= yeoman.src %>/root.coffee"
          "<%= yeoman.src %>/config/*.coffee"
          "<%= yeoman.src %>/directive/*.coffee"
          "<%= yeoman.src %>/ctrl/**/*.coffee"
          "<%= yeoman.src %>/service/**/*.coffee"
        ]
        tasks: ["coffee:build_all", "concat:coffee", "chown"]

    yeoman: yeomanConfig