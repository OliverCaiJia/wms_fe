'use strict'

angular.module 'app.controllers'

.controller 'WmsInventoryTransferGoodsListCtrl', ($scope, $routeParams, WmsSellerService, WmsSellerGoodsService
  WmsInventoryTransferGoodsService, WmsInventoryTransferService, WmsConfigService) ->

  prepareConst = ->
    promise = WmsSellerService.mapAll()
    promise.then (data) ->
      $scope.sellerMap = data

    params = {id: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferService.detail(params)
    promise.then (data) ->
      $scope.inventoryTransfer = data
      sellerGoodsParams = {sellerId: data.responseSeller}
      promise = WmsSellerGoodsService.mapBySellerIdAndNoCombo(sellerGoodsParams)
      promise.then (sellerGoodsMap) ->
        $scope.sellerGoodsMap = sellerGoodsMap
      acceptorGoodsParams = {sellerId: data.requestSeller}
      promise = WmsSellerGoodsService.mapBySellerIdAndNoCombo(acceptorGoodsParams)
      promise.then (acceptorGoodsMap) ->
        $scope.acceptorGoodsMap = acceptorGoodsMap

  main = ->
    $scope.imgHost = WmsConfigService.getImgHost()
    $scope.createInventoryTransferGoods = {}
    $scope.inventoryTransferGoods = {inventoryTransferId: $routeParams.inventoryTransferId}
    params = {inventoryTransferId: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferGoodsService.listByInventoryTransferId(params)
    promise.then (data) ->
      $scope.transferGoodsList = data

    prepareConst()

  main()