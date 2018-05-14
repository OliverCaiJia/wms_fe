'use strict'

angular.module 'app.controllers'

.controller 'WmsPlatformOrderUploadEditCtrl', ($scope, $routeParams, CommonService, WmsPlatformOrderUploadService, ClickEditService) ->
  $scope.switchNode = (platformOrderUpload, fieldName, bool) ->
    ClickEditService.switchNode(platformOrderUpload, fieldName, bool)

  main = ->
    params = {id: $routeParams.id}
    promise = WmsPlatformOrderUploadService.detail(params)
    promise.then (data) ->
      $scope.platformOrderUpload = data
                
  main()