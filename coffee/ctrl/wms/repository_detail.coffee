'use strict'

angular.module 'app.controllers'

.controller 'WmsRepositoryDetailCtrl', ($scope, $routeParams, CommonService, WmsRepositoryService, ClickEditService,
  WmsWarehouseService) ->
# update
  $scope.save = (repository, fieldName) ->
    promise = WmsRepositoryService.update(repository)
    promise.then ->


  prepareConst = ->
    promise = WmsRepositoryService.listUseAttribute()
    promise.then (data) ->
      $scope.useAttributeList = data

  main = ->
    params = {id: $routeParams.id}
    promise = WmsRepositoryService.detail(params)
    promise.then (data) ->
      $scope.repository = data
      params = {id:$scope.repository.warehouseId}
      promise = WmsWarehouseService.detail(params)
      promise.then (data) ->
        $scope.warehouse = data
      prepareConst()
                
  main()