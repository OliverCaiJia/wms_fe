'use strict'

angular.module 'app.controllers'

.controller 'WmsResponseInventoryTransferGoodsListCtrl', ($scope, $routeParams, WmsSellerService, WmsSellerGoodsService
  WmsInventoryTransferGoodsService, WmsInventoryTransferService, WmsConfigService, SessionService) ->

  prepareConst = ->
    promise = WmsSellerService.mapAll()
    promise.then (data) ->
      $scope.sellerMap = data

    params = {id: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferService.detail(params)
    promise.then (data) ->
      $scope.inventoryTransfer = data

    params = {sellerId: SessionService.getSellerId()}
    promise = WmsSellerGoodsService.mapBySellerIdAndNoCombo(params)
    promise.then (goodsMap) ->
      $scope.goodsMap = goodsMap

  main = ->
    $scope.createInventoryTransferGoods = {}
    $scope.inventoryTransferGoods = {inventoryTransferId: $routeParams.inventoryTransferId}
    $scope.imgHost = WmsConfigService.getImgHost()
    params = {inventoryTransferId: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferGoodsService.listByInventoryTransferId(params)
    promise.then (data) ->
      $scope.transferGoodsList = data

    prepareConst()

  main()