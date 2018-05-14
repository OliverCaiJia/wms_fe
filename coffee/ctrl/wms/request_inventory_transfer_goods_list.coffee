'use strict'

angular.module 'app.controllers'

.controller 'WmsRequestInventoryTransferGoodsListCtrl', ($scope, $routeParams, $filter, CommonService, WmsSellerService
  WmsInventoryTransferGoodsService, WmsInventoryTransferService, WmsSellerGoodsService, WmsConfigService) ->
# add
  $scope.add = ->
    promise = WmsInventoryTransferGoodsService.add($scope.inventoryTransferGoods)
    promise.then (data) ->
      $scope.inventoryTransferGoods.id = data
      $scope.transferGoodsList.unshift($scope.inventoryTransferGoods)
      $scope.createInventoryTransferGoods = {}
      $scope.inventoryTransferGoods = {inventoryTransferId: $routeParams.inventoryTransferId}
      getSelectGoodsList()

  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsInventoryTransferGoodsService.delete(params)
    promise.then ->
      $scope.transferGoodsList.splice(i, 1)
      getSelectGoodsList()

  $scope.checkGoods = (sellerGoodsId) ->
    $scope.inventoryTransferGoods.sellerGoodsId = sellerGoodsId

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.search = (searchKeywords) ->
    $scope.currentSelectGoodsList = $filter('filter')($scope.selectGoodsList, searchKeywords)

  getSelectGoodsList = ->
    $scope.transferGoodsMap = CommonService.convertListToMap($scope.transferGoodsList, 'sellerGoodsId')
    $scope.selectGoodsList = []
    for goods in $scope.sellerGoodsList
      if !$scope.transferGoodsMap.hasOwnProperty(goods.id)
        $scope.selectGoodsList.push(goods)
    $scope.search($scope.searchKeywords)

  prepareConst = ->
    promise = WmsSellerService.mapAll()
    promise.then (data) ->
      $scope.sellerMap = data

    params = {id: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferService.detail(params)
    promise.then (data) ->
      $scope.inventoryTransfer = data
      sellerGoodsParams = {sellerId: data.responseSeller}
      promise = WmsSellerGoodsService.listBySellerIdAndNoCombo(sellerGoodsParams)
      promise.then (sellerGoodsList) ->
        $scope.sellerGoodsList = sellerGoodsList
        $scope.sellerGoodsMap = CommonService.convertListToMap(sellerGoodsList, 'id')
        getSelectGoodsList()
      acceptorGoodsParams = {sellerId: data.requestSeller}
      promise = WmsSellerGoodsService.mapBySellerIdAndNoCombo(acceptorGoodsParams)
      promise.then (acceptorGoodsMap) ->
        $scope.acceptorGoodsMap = acceptorGoodsMap

  main = ->
    $scope.createInventoryTransferGoods = {}
    $scope.imgHost = WmsConfigService.getImgHost()
    $scope.inventoryTransferGoods = {inventoryTransferId: $routeParams.inventoryTransferId}
    params = {inventoryTransferId: $routeParams.inventoryTransferId}
    promise = WmsInventoryTransferGoodsService.listByInventoryTransferId(params)
    promise.then (data) ->
      $scope.transferGoodsList = data

    prepareConst()

  main()