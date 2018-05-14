'use strict'

angular.module 'app.controllers'

.controller 'WmsPlatformSourceEditCtrl', ($scope, $routeParams, CommonService, WmsPlatformSourceService, ClickEditService) ->
  # update
  $scope.updateName = (platformSource, fieldName) ->
    if ClickEditService.updateNode(platformSource, fieldName)
      promise = WmsPlatformSourceService.updateName(platformSource)
      promise.then ->
                
  $scope.switchNode = (platformSource, fieldName, bool) ->
    ClickEditService.switchNode(platformSource, fieldName, bool)

  main = ->
    params = {id: $routeParams.id}
    promise = WmsPlatformSourceService.detail(params)
    promise.then (data) ->
      $scope.platformSource = data
                
  main()