'use strict'

angular.module 'app.controllers'

.controller 'WmsPrepackGoodsCtrl', ($scope, $location, $routeParams, WmsSellerService, WmsPickOrderService) ->
  $scope.addPrepackOrder = ->
    params = {sellerId: $routeParams.sellerId, barCode: $scope.barCode}
    promise = WmsPickOrderService.addPrepackGoods(params)
    promise.then (data) ->
      $location.path("/wms/pack_goods").search("id", data)

  main = ->
    $scope.barCode = ''
    params = {id: $routeParams.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data

  main()