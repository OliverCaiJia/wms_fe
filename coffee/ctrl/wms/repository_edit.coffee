'use strict'

angular.module 'app.controllers'

.controller 'WmsRepositoryEditCtrl', ($scope, $routeParams, CommonService, WmsRepositoryService, ClickEditService
  WmsWarehouseService) ->
  # update
  $scope.update = (repository, fieldName) ->
    if ClickEditService.updateNode(repository, fieldName)
      promise = WmsRepositoryService.update(repository)
      promise.then ->
                
  $scope.switchNode = (repository, fieldName, bool) ->
    ClickEditService.switchNode(repository, fieldName, bool)


  main = ->
    params = {id: $routeParams.id}
    promise = WmsRepositoryService.detail(params)
    promise.then (data) ->
      $scope.repository = data

      prepareConst()
                
  main()