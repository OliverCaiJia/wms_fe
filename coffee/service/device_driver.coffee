angular.module 'app'

.service 'DeviceDriverService', ($q, $i18next, AjaxService, ToastService) ->
  URL = 'http://127.0.0.1'

  getWeight: ->
    deferred = $q.defer()
    AjaxService.call
      url: URL+'/scale/'
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  printExpressOrder: (params) ->
    deferred = $q.defer()
    AjaxService.call
      url: URL+'/printer/order'
      data: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  checkScaleDevice: ->
    deferred = $q.defer()
    AjaxService.call
      url: URL+'/check_device/checkScale'
      successCallBack: (data) ->
        deferred.resolve data
        ToastService.showMessageOnSuccess $i18next("global:message.onSuccess")
    deferred.promise

  checkPrinterDevice: ->
    deferred = $q.defer()
    AjaxService.call
      url: URL+'/check_device/checkPrinter'
      successCallBack: (data) ->
        deferred.resolve data
        ToastService.showMessageOnSuccess $i18next("global:message.onSuccess")
    deferred.promise
