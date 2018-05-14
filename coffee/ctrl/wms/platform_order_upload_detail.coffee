'use strict'

angular.module 'app.controllers'

.controller 'WmsPlatformOrderUploadDetailCtrl', ($scope, $routeParams, WmsPlatformOrderUploadService) ->
  main = ->
    params = {id: $routeParams.id}
    promise = WmsPlatformOrderUploadService.detail(params)
    promise.then (data) ->
      $scope.platformOrderUpload = data
                
  main()