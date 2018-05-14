'use strict'

angular.module 'app.controllers'

.controller 'WmsGoodsRelatedPlatformSourceCtrl', ($scope, $routeParams, WmsGoodsService, WmsPlatformSourceService
  WmsSellerAvailableGoodsService, WmsSellerGoodsService, CommonService, ClickEditService) ->
  # add
  $scope.add = (sellerGoods) ->
    promise = WmsSellerGoodsService.add($scope.sellerGoods)
    promise.then (data) ->
      $scope.sellerGoods.id = data
      $scope.sellerGoodsList.unshift($scope.sellerGoods)
      $scope.createSellerGoods = {}
      $scope.sellerGoods = {
        sellerId: $scope.sellerAvailableGoods.sellerId
        goodsId: $scope.sellerAvailableGoods.goodsId
      }

  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsSellerGoodsService.delete(params)
    promise.then ->
      $scope.sellerGoodsList.splice(i, 1)

  # update
  $scope.updateUniqueCode = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateUniqueCode(sellerGoods)
      promise.then ->

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerGoods, fieldName, bool) ->
    ClickEditService.switchNode(sellerGoods, fieldName, bool)

  prepareConst = ->
    params = {id: $scope.sellerAvailableGoods.goodsId}
    promise = WmsGoodsService.detail(params)
    promise.then (data) ->
      $scope.goods = data

    params = {
      sellerId:$scope.sellerAvailableGoods.sellerId
      goodsId: $scope.sellerAvailableGoods.goodsId
    }
    promise = WmsSellerGoodsService.listBySellerIdAndGoodsId(params)
    promise.then (data) ->
      $scope.sellerGoodsList = data

    promise = WmsPlatformSourceService.mapPlatformSource()
    promise.then (data) ->
      $scope.platformSourceMap = data

  main = ->
    $scope.createSellerGoods = {}
    params = {id: $routeParams.id}
    promise = WmsSellerAvailableGoodsService.detail(params)
    promise.then (data) ->
      $scope.sellerAvailableGoods = data
      $scope.sellerGoods = {
        sellerId: $scope.sellerAvailableGoods.sellerId
        goodsId: $scope.sellerAvailableGoods.goodsId
      }
      prepareConst()

  main()