'use strict'

angular.module 'app.controllers'

.controller 'WmsOrderDetailCtrl', ($scope, $routeParams, WmsOrderService) ->
  main = ->
    params = {id: $routeParams.id}
    promise = WmsOrderService.getTotalPrice(params)
    promise.then (data) ->
      $scope.order = data
                
    params = {id: $routeParams.id}
    promise = WmsOrderService.detail(params)
    promise.then (data) ->
      $scope.order = data
                
  main()