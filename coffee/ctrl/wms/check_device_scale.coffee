'use strict'

angular.module 'app.controllers'

.controller 'WmsCheckDeviceScaleCtrl', ($scope, DeviceDriverService) ->
  $scope.checkScale = ->
    promise = DeviceDriverService.checkScaleDevice()
    promise.then ->

  main = ->

  main()