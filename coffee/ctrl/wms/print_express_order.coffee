'use strict'

angular.module 'app.controllers'

.controller 'WmsPrintExpressOrderCtrl', ($scope, $routeParams, WmsSellerService, WmsLogisticOrderService
  DeviceDriverService,WmsPickOrderService,WmsSellerGoodsService) ->
  $scope.printExpressOrder = ->
    params = {sellerId: $routeParams.sellerId, barCode: $scope.barCode}
    $scope.oldBarCode = $scope.barCode
    $scope.barCode = ''
    $scope.expressOrders = {}
    promise = WmsLogisticOrderService.getExpressOrderByBarCode(params)
    promise.then (orders) ->
      $scope.expressOrders = orders
      promise = DeviceDriverService.printExpressOrder({params: orders})
      promise.then ->
        getSellerGoodsList()
        expressSn = orders[0].expressSn
        promise = WmsPickOrderService.prepackComplete({expressSn: expressSn})
        promise.then ->

  $scope.reprintExpressOrder = ->
    promise = DeviceDriverService.printExpressOrder({params: $scope.expressOrders})
    promise.then ->
      getSellerGoodsList()
      expressSn = $scope.expressOrders[0].expressSn
      promise = WmsPickOrderService.prepackComplete({expressSn: expressSn})
      promise.then ->

  getSellerGoodsList = ->
    params = {sellerId: $scope.sellerId}
    promise = WmsPickOrderService.listPrintableSellerGoodsBySellerId(params)
    promise.then (data) ->
      $scope.sellerGoodsList = data

  prepareConst = ->
    getSellerGoodsList()

    params = {sellerId: $scope.sellerId}
    promise = WmsSellerGoodsService.mapBySellerId(params)
    promise.then (data) ->
      $scope.sellerGoodsMap = data

  main = ->
    angular.element('#barCode').focus()
    $scope.barCode = ''
    $scope.sellerId = $routeParams.sellerId
    $scope.expressOrders = {}
    params = {id: $scope.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data
      prepareConst()
  main()