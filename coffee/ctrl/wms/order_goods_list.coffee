'use strict'

angular.module 'app.controllers'

.controller 'WmsOrderGoodsListCtrl', ($scope, $routeParams, WmsOrderGoodsService, WmsOrderService,$i18next,CommonService,
  WmsSellerGoodsService) ->

  prepareConst = ->
    params = {orderId: $scope.orderId}
    promise = WmsOrderGoodsService.listByOrderId(params)
    promise.then (data) ->
      $scope.orderGoodsList = data

    params = { sellerId: $scope.order.sellerId}
    promise = WmsSellerGoodsService.listBySellerId(params)
    promise.then (data) ->
      $scope.sellerGoodsList = data
      $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList,'id')

    promise = WmsSellerGoodsService.listEncodeType()
    promise.then (data) ->
      $scope.encodeTypeList = data
      $scope.encodeTypeMap = []
      for encodeType in data
        $scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType."+encodeType)

  main = ->
    $scope.orderId = $routeParams.orderId
    $scope.orderGoods = {orderId: $scope.orderId}

    params = {id: $scope.orderId}
    promise = WmsOrderService.detail(params)
    promise.then (data) ->
      $scope.order = data
      prepareConst()

  main()