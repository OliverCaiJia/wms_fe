'use strict';

angular.module 'app'

.service 'ToastService', (toastr, toastrConfig) ->
  toastrConfig.autoDismiss = false
  toastrConfig.allowHtml = false
  toastrConfig.extendedTimeOut = parseInt('1000', 10)
  toastrConfig.positionClass = 'toast-bottom-right'
  toastrConfig.timeOut = parseInt('3000', 10)
  toastrConfig.closeButton = true
  toastrConfig.tapToDismiss = true
  toastrConfig.progressBar = false
  toastrConfig.closeHtml = '<button>&times;</button>'
  toastrConfig.newestOnTop = true
  toastrConfig.maxOpened = 0
  toastrConfig.preventDuplicates = false
  toastrConfig.preventOpenDuplicates = false
  toastrConfig.templates =
    toast: 'views/toast/toast_info.html'


  showMessageOnInfo: (message,title) ->
    toastr.info(message, title)

  showMessageOnSuccess: (message,title) ->
    toastrConfig.templates.toast = 'views/toast/toast_success.html'
    toastr.success(message, title)

  showMessageOnError: (message,title) ->
    toastrConfig.templates.toast = 'views/toast/toast_error.html'
    toastrConfig.timeOut = parseInt('3000', 10)
    toastr.error(message, title)

  showMessageOnWeightError: (message,title) ->
    toastrConfig.templates.toast = 'views/toast/toast_error.html'
    toastrConfig.timeOut = parseInt('2000', 5)
    toastr.error(message, title)

  showMessageOnWarning: (message,title) ->
    toastrConfig.templates.toast = 'views/toast/toast_warning.html'
    toastr.warning(message, title)

  showMessageInProgress: (message,title) ->
    toastrConfig.timeOut = parseInt('2000', 10)
    toastr.info(message, title)
