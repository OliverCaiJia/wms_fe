'use strict'

angular.module 'app.controllers'

.controller 'WmsInventoryTransferPickGoodsCtrl', ($scope, $routeParams, $i18next, $location, WmsSellerService
  WmsInventoryTransferService, WmsInventoryTransferScanGoodsService, ModalService, WmsInventoryTransferGoodsService,
  WmsConfigService) ->

  checkScanComplete = ->
    params = {inventoryTransferId: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferScanGoodsService.listByInventoryTransferId(params)
    promise.then (scanGoodsList) ->
      $scope.scanGoodsList = scanGoodsList
      angular.forEach($scope.goodsMap, (goods) ->
        $scope.goodsNumberMap[goods.sellerGoodsId] = 0
      )
      for item in scanGoodsList
        $scope.goodsNumberMap[item.sellerGoodsId] += parseInt(item.goodsNumber)
      $scope.scanGoodsId = 0
      angular.forEach($scope.goodsMap, (goods) ->
        if goods.goodsNumber > $scope.goodsNumberMap[goods.sellerGoodsId] && $scope.scanGoodsId == 0
          $scope.scanGoodsId = goods.sellerGoodsId
      )
      if $scope.scanGoodsId == 0
        $scope.completeScanGoods()

  $scope.scanGoodsCode = ->
    if !$scope.scanGoodsId || $scope.goodsCode == ''
      ModalService.showMessageOnError $i18next("wms:message.validationError.goodsBarCodeNotNull")
    else
      params = {
        inventoryTransferId:$routeParams.inventoryTransferId
        sellerGoodsId:$scope.scanGoodsId
        goodsCode:$scope.goodsCode
      }
      $scope.goodsCode = ''
      promise = WmsInventoryTransferScanGoodsService.scanGoodsCode(params)
      promise.then ->
        checkScanComplete()

  $scope.completeScanGoods = ->
    params = {id: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferService.completeInventoryTransfer(params)
    promise.then ->
      $location.path("/wms/inventory_transfer_list")

  $scope.emptyScanGoods = () ->
    params = {inventoryTransferId: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferScanGoodsService.emptyScanGoods(params)
    promise.then ->
      checkScanComplete()

  prepareConst = ->
    params = {inventoryTransferId: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferGoodsService.goodsMapByInventoryTransferId(params)
    promise.then (goodsMap) ->
      $scope.goodsMap = goodsMap
      checkScanComplete()

    promise = WmsSellerService.mapAll()
    promise.then (data) ->
      $scope.sellerMap = data

  main = ->
    angular.element('#scanBarCodeInput').focus()
    $scope.goodsNumberMap = {}
    $scope.imgHost = WmsConfigService.getImgHost()

    params = {id: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferService.detail(params)
    promise.then (data) ->
      $scope.inventoryTransfer = data
      if $scope.inventoryTransfer.status == 2
        prepareConst()
      else
        ModalService.showMessageOnError $i18next("wms:message.validationError.inventoryTransferNotPassStatus")

  main()