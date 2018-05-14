'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerPlatformSourceDetailCtrl', ($scope, $routeParams, WmsSellerPlatformSourceService) ->
  main = ->
    params = {id: $routeParams.id}
    promise = WmsSellerPlatformSourceService.detail(params)
    promise.then (data) ->
      $scope.sellerPlatformSource = data
                
  main()