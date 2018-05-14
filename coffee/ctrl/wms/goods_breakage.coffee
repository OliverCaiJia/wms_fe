'use strict'

angular.module 'app.controllers'

.controller 'WmsGoodsBreakageCtrl', ($scope, $i18next, $routeParams, WmsGoodsService, WmsGoodsBreakageLogService
  WmsSellerAvailableGoodsService, WmsSellerService, ModalService) ->
  $scope.calcQuantity = ->
    if $scope.goodsBreakageLog.number
      str = $scope.availableGoods.quantity + ' - ' + $scope.goodsBreakageLog.number + " = "
      $scope.goodsBreakageLog.calcQuantity = str + (parseInt($scope.availableGoods.quantity) - parseInt($scope.goodsBreakageLog.number))
    else
      $scope.goodsBreakageLog.calcQuantity = ""

  $scope.goodsBreakage = ->
    $scope.isShowButton = false
    promise = WmsGoodsBreakageLogService.add($scope.goodsBreakageLog)
    promise.then ->

  prepareConst = ->
    sellerParams = {id: $scope.availableGoods.sellerId}
    promise = WmsSellerService.detail(sellerParams)
    promise.then (seller) ->
      $scope.seller = seller

    goodsParams = {id: $scope.availableGoods.goodsId}
    promise = WmsGoodsService.detail(goodsParams)
    promise.then (goods) ->
      $scope.goods = goods
      $scope.goodsBreakageLog.goodsCode = goods.barCode

    promise = WmsGoodsBreakageLogService.reasonEnumList()
    promise.then (data) ->
      $scope.reasonEnumList = data

  main = ->
    $scope.isShowButton = true
    params = {id: $routeParams.availableGoodsId}
    promise = WmsSellerAvailableGoodsService.detail(params)
    promise.then (data) ->
      $scope.availableGoods = data
      $scope.goodsBreakageLog = {
        sellerId: data.sellerId
        goodsId: data.goodsId
        encodeType: data.encodeType
      }
      prepareConst()

  main()