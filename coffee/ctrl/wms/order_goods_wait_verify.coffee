'use strict'

angular.module 'app.controllers'

.filter 'calTotalPrice',() ->
  (items) ->
    totalPrice = 0
    angular.forEach items, (item) ->
      if item
        totalPrice = parseFloat(totalPrice) + parseFloat(item.price) * parseFloat(item.goodsNumber)
    return totalPrice

.controller 'WmsOrderGoodsWaitVerifyCtrl', ($scope,$filter,ModalService,$i18next,$location, $routeParams, CommonService,
  WmsOrderGoodsService,WmsOrderService, WmsSellerGoodsService,ClickEditService,WmsSellerService,WmsLogisticCompanyService,
  WmsSellerFreightGroupService) ->

  $scope.search = (searchKeywords) ->
    $scope.currentSelectSellerGoodsList = $filter('filter')($scope.selectSellerGoodsList,searchKeywords)

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (orderGoods, fieldName, bool) ->
    ClickEditService.switchNode(orderGoods, fieldName, bool)

  #  add order goods from goods list
  $scope.checkSellerGoods = (sellerGoodsId) ->
    $scope.orderGoods = {}
    $scope.orderGoods = {
      orderId:$scope.order.id
      sellerGoodsId:sellerGoodsId
      goodsNumber:1
    }
    promise = WmsOrderGoodsService.add($scope.orderGoods)
    promise.then ->
      getOrderGoods()

  # removeOrderGoods
  $scope.removeOrderGoods = (orderGoods) ->
    params = {id:orderGoods.id}
    promise = WmsOrderGoodsService.delete(params)
    promise.then ->
      getOrderGoods()

  # updateOrderGoodsNumber
  $scope.updateOrderGoodsNumber = (orderGoods, fieldName) ->
    $scope.showVerifyOrderButton = false
    promise = WmsOrderGoodsService.updateGoodsNumber(orderGoods)
    promise.then ->
      getOrderGoods()

  # updateOrderGoodsNumber number
  $scope.changeOrderGoodsNumber = (item,value) ->
    $scope.showVerifyOrderButton = false
    item.goodsNumber = parseInt(item.goodsNumber) + value
    if item.goodsNumber <= 1
      item.goodsNumber = 1
    $scope.updateOrderGoodsNumber(item,'goodsNumber')

  $scope.refreshOrder = () ->
    $scope.showVerifyOrderButton = true
    getOrderGoods()

  $scope.changeCreatePick = ->
    $scope.isCreatePickOrder = !$scope.isCreatePickOrder

  getNextVerifyOrder = () ->
    params = {sellerId: $scope.order.sellerId}
    promise = WmsOrderService.getNextVerifyOrderBySellerId(params)
    promise.then (data) ->
      $scope.nextOrderId = data
      if $scope.nextOrderId
        $location.path("/wms/order_goods_wait_verify").search("orderId", $scope.nextOrderId)
      else
        $location.path("/wms/order_list_wait_verify")


  $scope.verifyOrder = () ->
    promise = WmsOrderService.verifyOrder($scope.order)
    promise.then ->
      if $scope.isCreatePickOrder
        params = {orderId: $scope.order.id}
        promise = WmsOrderGoodsService.listByOrderIdAndIsSplit(params)
        promise.then (data) ->
          $scope.orderGoodsListNoSplit = data
          orderGoodsIds = []
          angular.forEach($scope.orderGoodsListNoSplit, (orderGoods) ->
            orderGoodsIds.unshift(orderGoods.id)
          )
          params = {orderId: $scope.order.id, orderGoodsIds: orderGoodsIds,logisticCompanyId:$scope.order.logisticCompanyId}
          promise = WmsOrderService.splitOrderNoConfirm(params)
          promise.then ->
            getNextVerifyOrder()
      else
        $location.path("/wms/split_order").search("orderId", $scope.order.id)

  $scope.showCombo = (orderSellerGoods,bool) ->
    orderSellerGoods.isShowCombo = bool

  getOrderGoods = ->
    params = {orderId: $scope.orderId}
    promise = WmsOrderGoodsService.listByOrderId(params)
    promise.then (data) ->
      $scope.orderGoodsList = data
      $scope.orderGoodsMapBySellerGoodsId = CommonService.convertListToMap($scope.orderGoodsList,'sellerGoodsId')
      $scope.selectSellerGoodsList = []
      angular.forEach($scope.sellerGoodsList,(sellerGoods) ->
        if !$scope.orderGoodsMapBySellerGoodsId.hasOwnProperty(sellerGoods.id)
          $scope.selectSellerGoodsList.push(sellerGoods)
      )
      totalPrice = 0
      angular.forEach($scope.orderGoodsList,(orderGoods) ->
        totalPrice = parseFloat(totalPrice) + parseFloat(orderGoods.price) * parseFloat(orderGoods.goodsNumber)
      )
      $scope.orderPaidPriceDiff = parseFloat($scope.order.paidPrice) - parseFloat(totalPrice)

      $scope.search($scope.searchKeywords)

  prepareConst = ->
    promise = WmsSellerGoodsService.listEncodeType()
    promise.then (data) ->
      $scope.encodeTypeList = data
      $scope.encodeTypeMap = []
      for encodeType in data
        $scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType."+encodeType)

    params = { sellerId: $scope.order.sellerId, platformSourceId:$scope.order.platformSourceId}
    promise = WmsSellerGoodsService.listBySellerId(params)
    promise.then (data) ->
      $scope.sellerGoodsList = data
      $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList,'id')
      getOrderGoods()

    params = { sellerId: $scope.order.sellerId}
    promise = WmsSellerGoodsService.listAllComboBySellerId(params)
    promise.then (data) ->
      $scope.allComboSellerGoodsMap = data


    params = { id: $scope.order.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data
      promise = WmsLogisticCompanyService.mapAll()
      promise.then (data) ->
        $scope.logisticCompanyMap = data
        params = {sellerId: $scope.order.sellerId}
        promise = WmsSellerFreightGroupService.mapBySellerId(params)
        promise.then (data) ->
          $scope.sellerFreightGroupMap = data
          if $scope.seller.hasOwnProperty('sellerFreightGroupId') && $scope.sellerFreightGroupMap.hasOwnProperty($scope.seller.sellerFreightGroupId)
            $scope.order.logisticCompanyId = $scope.logisticCompanyMap[$scope.sellerFreightGroupMap[$scope.seller.sellerFreightGroupId].logisticCompanyId].id

  main = ->
    $scope.orderId = $routeParams.orderId
    $scope.orderGoods = {orderId: $scope.orderId}
    $scope.showVerifyOrderButton = false
    $scope.orderTotalPriceDiff = 0
    $scope.isCreatePickOrder = true


    params = {id: $scope.orderId}
    promise = WmsOrderService.detail(params)
    promise.then (data) ->
      $scope.order = data
      $scope.totalPrice = data.totalPrice
      $scope.orderPaidPriceDiff = parseFloat($scope.order.paidPrice) - parseFloat($scope.order.totalPrice)
      if $scope.order.status != 0
        ModalService.showMessageOnError $i18next("wms:message.validationError.orderStatusNotWaitVerify")
      else
        prepareConst()

  main()