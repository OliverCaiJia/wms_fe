'use strict'

angular.module 'app.controllers'

.controller 'WmsGoodsEncodeBreakageCtrl', ($scope, $i18next, $routeParams, WmsGoodsBreakageLogService
  WmsGoodsEncodeService, WmsSellerService, WmsSellerGoodsService) ->

  $scope.goodsBreakage = ->
    $scope.isShowButton = false
    promise = WmsGoodsBreakageLogService.add($scope.goodsBreakageLog)
    promise.then ->

  prepareConst = ->
    params = {id: $scope.goodsEncode.sellerGoodsId}
    promise = WmsSellerGoodsService.detail(params)
    promise.then (data) ->
      $scope.sellerGoods = data
      $scope.goodsBreakageLog.encodeType = $scope.sellerGoods.encodeType
      params = {id: $scope.sellerGoods.sellerId}
      promise = WmsSellerService.detail(params)
      promise.then (data) ->
        $scope.seller = data

    promise = WmsGoodsBreakageLogService.reasonEnumList()
    promise.then (data) ->
      $scope.reasonEnumList = data

  main = ->
    $scope.isShowButton = true
    params = {id: $routeParams.id}
    promise = WmsGoodsEncodeService.detail(params)
    promise.then (data) ->
      $scope.goodsEncode = data
      $scope.goodsBreakageLog = {
        sellerGoodsId: $scope.goodsEncode.sellerGoodsId
        goodsCode: $scope.goodsEncode.goodsCode
        number: 1
      }
      prepareConst()

  main()