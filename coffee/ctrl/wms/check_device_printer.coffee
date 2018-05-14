'use strict'

angular.module 'app.controllers'

.controller 'WmsCheckDevicePrinterCtrl', ($scope, DeviceDriverService) ->
  $scope.checkPrinter = ->
    promise = DeviceDriverService.checkPrinterDevice()
    promise.then ->

  main = ->

  main()