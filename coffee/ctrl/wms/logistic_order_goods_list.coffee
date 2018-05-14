'use strict'

angular.module 'app.controllers'

.controller 'WmsLogisticOrderGoodsListCtrl', ($scope, $routeParams, WmsPickOrderGoodsService, WmsPickOrderService
  WmsSellerGoodsService, WmsLogisticOrderService) ->
  prepareConst = ->
    params = {id: $routeParams.id}
    promise = WmsPickOrderService.detail(params)
    promise.then (data) ->
      $scope.pickOrder = data

      params = {id: data.logisticOrderId}
      promise = WmsLogisticOrderService.detail(params)
      promise.then (logisticOrder) ->
        $scope.logisticOrder = logisticOrder

      sellerGoodsParams = {sellerId: data.sellerId}
      promise = WmsSellerGoodsService.mapBySellerId(sellerGoodsParams)
      promise.then (goodsMap) ->
        $scope.goodsMap = goodsMap

  main = ->
    params = {pickOrderId: $routeParams.id}
    promise = WmsPickOrderGoodsService.listByPickOrderId(params)
    promise.then (data) ->
      $scope.orderGoodsList = data

    prepareConst()

  main()