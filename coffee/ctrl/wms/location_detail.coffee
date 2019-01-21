'use strict'

angular.module 'app.controllers'

.controller 'WmsLocationDetailCtrl', ($scope, $routeParams, WmsLocationService,WmsRepositoryService) ->

  # update
  $scope.save = (location, fieldName) ->
    promise = WmsLocationService.update(location)
    promise.then ->

  prepareConst = ->
    promise = WmsLocationService.ABCListAll()
    promise.then (data) ->
      $scope.ABCList = data

  main = ->
    params = {id: $routeParams.id}
    promise = WmsLocationService.detail(params)
    promise.then (data) ->
      $scope.location = data
      promise = WmsRepositoryService.detail({id:$scope.location.repositoryId})
      promise.then (data) ->
        $scope.repository = data
      prepareConst()
                
  main()