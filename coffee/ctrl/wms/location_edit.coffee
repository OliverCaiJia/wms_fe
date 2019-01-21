'use strict'

angular.module 'app.controllers'

.controller 'WmsLocationEditCtrl', ($scope, $routeParams, CommonService, WmsLocationService, ClickEditService) ->
  # update
  $scope.update = (location, fieldName) ->
    if ClickEditService.updateNode(location, fieldName)
      promise = WmsLocationService.update(location)
      promise.then ->
                
  $scope.switchNode = (location, fieldName, bool) ->
    ClickEditService.switchNode(location, fieldName, bool)

  main = ->
    params = {id: $routeParams.id}
    promise = WmsLocationService.detail(params)
    promise.then (data) ->
      $scope.location = data
                
  main()