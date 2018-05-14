'use strict';

angular.module 'app', [
# Angular modules
  'ngRoute'
  'ngCookies'

# 3rd Party Modules
  'duScroll'
  'ngSanitize'
  'jm.i18next'
  'MassAutoComplete' #do not use top, left
  'ui.bootstrap'
  'toastr'
  'ngFileUpload'
  'angularFileUpload'
  'ngCsvImport'

# Custom modules
  'app.controllers'
  'app.directives'
]