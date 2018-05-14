'use strict'

angular.module 'app.controllers'

.controller 'WmsGoodsRelatedSellerCtrl', ($scope, $routeParams, WmsGoodsService, WmsSellerService
  WmsSellerAvailableGoodsService) ->
  # add
  $scope.add = (sellerId) ->
    $scope.sellerAvailableGoods.sellerId = sellerId
    promise = WmsSellerAvailableGoodsService.add($scope.sellerAvailableGoods)
    promise.then (data) ->
      $scope.sellerAvailableGoods.id = data
      $scope.sellerGoodsMap[sellerId] = $scope.sellerAvailableGoods
      $scope.sellerAvailableGoods = {goodsId: $routeParams.id}

  # disabled
  $scope.disabledSellerAvailableGoods = (sellerAvailableGoods, bool) ->
    promise = WmsSellerAvailableGoodsService.updateDisabled(sellerAvailableGoods,bool)
    promise.then ->
      sellerAvailableGoods.disabled = bool

  prepareConst = ->
    params = {id: $routeParams.id}
    promise = WmsGoodsService.detail(params)
    promise.then (data) ->
      $scope.goods = data

    params = {goodsId: $routeParams.id}
    promise = WmsSellerAvailableGoodsService.mapByGoodsId(params)
    promise.then (data) ->
      $scope.sellerGoodsMap = data

  main = ->
    $scope.sellerAvailableGoods = {goodsId: $routeParams.id}
    promise = WmsSellerService.listAll()
    promise.then (data) ->
      $scope.sellerList = data

  prepareConst()

  main()