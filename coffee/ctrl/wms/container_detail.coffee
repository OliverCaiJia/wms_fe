'use strict'

angular.module 'app.controllers'

.controller 'WmsContainerDetailCtrl', ($scope, $routeParams, WmsContainerService) ->
  main = ->
    params = {id: $routeParams.id}
    promise = WmsContainerService.detail(params)
    promise.then (data) ->
      $scope.container = data
                
  main()