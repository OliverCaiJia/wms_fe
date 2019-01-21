'use strict'

angular.module 'app.controllers'

.controller 'WmsWarehouseEditCtrl', ($scope, $routeParams, CommonService, WmsWarehouseService, ClickEditService) ->
  # update
  $scope.update = (warehouse, fieldName) ->
    if ClickEditService.updateNode(warehouse, fieldName)
      promise = WmsWarehouseService.update(warehouse)
      promise.then ->
                
  $scope.switchNode = (warehouse, fieldName, bool) ->
    ClickEditService.switchNode(warehouse, fieldName, bool)

  main = ->
    params = {id: $routeParams.id}
    promise = WmsWarehouseService.detail(params)
    promise.then (data) ->
      $scope.warehouse = data
                
  main()