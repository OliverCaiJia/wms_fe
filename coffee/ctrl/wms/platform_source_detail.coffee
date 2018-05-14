'use strict'

angular.module 'app.controllers'

.controller 'WmsPlatformSourceDetailCtrl', ($scope, $routeParams, WmsPlatformSourceService) ->
  main = ->
    params = {id: $routeParams.id}
    promise = WmsPlatformSourceService.detail(params)
    promise.then (data) ->
      $scope.platformSource = data
                
  main()