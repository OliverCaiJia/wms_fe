'use strict'

angular.module 'app.controllers'

.controller 'WmsSplitOrderCtrl', ($scope, $location, $routeParams, CommonService, WmsOrderGoodsService,$i18next
  WmsOrderService, WmsOrderPickOrderRefService, WmsPickOrderGoodsService,WmsPickOrderService,WmsSellerGoodsService
  WmsLogisticCompanyService,WmsSellerFreightGroupService,WmsSellerService,ClickEditService,WmsLogisticOrderService) ->

  $scope.splitOrder = ->
    orderGoodsIds = []
    angular.forEach($scope.orderGoodsIdMap, (v,k) ->
      if v
        orderGoodsIds.unshift(k)
    )
    params = {orderId: $scope.orderId, orderGoodsIds: orderGoodsIds,logisticCompanyId:$scope.order.logisticCompanyId}
    promise = WmsOrderService.splitOrder(params)
    promise.then ->
      resetOrderGoodsList()

  $scope.withdraw = ->
    params = {orderId:$scope.order.id}
    promise = WmsOrderService.withdrawAudit(params)
    promise.then ->
      $location.path("/wms/split_order").search("orderId", $scope.order.id)

  $scope.checkOrderGoods = (orderGoodsId) ->
    if $scope.orderGoodsIdMap.hasOwnProperty(orderGoodsId)
      $scope.orderGoodsIdMap[orderGoodsId] = !$scope.orderGoodsIdMap[orderGoodsId]
    else
      $scope.orderGoodsIdMap[orderGoodsId] = true
    $scope.showSplitOrderButton = false
    angular.forEach($scope.orderGoodsIdMap, (v,k) ->
      if v
        $scope.showSplitOrderButton = true
    )

  $scope.checkAllOrderGoods = (checkAll) ->
    angular.forEach($scope.orderGoodsListNoSplit, (v) ->
      $scope.orderGoodsIdMap[v.id] = checkAll
    )
    $scope.showSplitOrderButton = checkAll

  $scope.getNextVerifyOrder = () ->
    params = {sellerId: $scope.order.sellerId}
    promise = WmsOrderService.getNextVerifyOrderBySellerId(params)
    promise.then (data) ->
      $scope.nextOrderId = data
      if $scope.nextOrderId
        $location.path("/wms/order_goods_wait_verify").search("orderId", $scope.nextOrderId)
      else
        $location.path("/wms/order_list_wait_verify")

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (pickOrder, fieldName, bool) ->
    ClickEditService.switchNode(pickOrder, fieldName, bool)

  # update
  $scope.updateLogisticCompanyId = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder)
      promise.then ->

  $scope.pickOrderWithdraw = (pickOrderId) ->
    params = {pickOrderId: pickOrderId}
    promise = WmsPickOrderService.withdrawAudit(params)
    promise.then ->
      resetOrderGoodsList()

  resetOrderGoodsList = () ->
    $scope.order.status = 2
    params = {orderId: $scope.orderId}
    promise = WmsOrderGoodsService.listByOrderIdAndIsSplit(params)
    promise.then (data) ->
      $scope.orderGoodsListNoSplit = data
      if $scope.orderGoodsListNoSplit.length == 0
        $scope.order.status = 3
      $scope.orderGoodsIdMap = []
      getOrderPickOrderRefList()
      $scope.showSplitOrderButton = false

  getOrderPickOrderRefList = ->
    params = {orderId: $scope.orderId}
    promise = WmsOrderPickOrderRefService.listByOrderId(params)
    promise.then (data) ->
      $scope.orderPickOrderRefList = data
      $scope.pickOrderGoodsMap = {}
      $scope.pickOrderMap = {}
      for ref in data
        getPickOrderDetail(ref.pickOrderId)
        getPickOrderGoods(ref.pickOrderId)

  getPickOrderDetail = (id) ->
    $scope.pickOrderMap[id] = {}
    params = {id: id}
    promise = WmsPickOrderService.detailPickAndLogisticOrder(params)
    promise.then (data) ->
      $scope.pickOrderMap[id] = data

  getPickOrderGoods = (pickOrderId) ->
    $scope.pickOrderGoodsMap[pickOrderId] = []
    params = {pickOrderId: pickOrderId}
    promise = WmsPickOrderGoodsService.listByPickOrderId(params)
    promise.then (data) ->
      $scope.pickOrderGoodsMap[pickOrderId] = data

  prepareConst = ->
    promise = WmsSellerGoodsService.listEncodeType()
    promise.then (data) ->
      $scope.encodeTypeList = data
      $scope.encodeTypeMap = []
      for encodeType in data
        $scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType."+encodeType)


    params = { sellerId: $scope.order.sellerId}
    promise = WmsSellerGoodsService.listBySellerId(params)
    promise.then (data) ->
      $scope.sellerGoodsList = data
      $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList,'id')

    params = {sellerId: $scope.order.sellerId}
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
    $scope.orderGoodsIdMap = []
    $scope.showSplitOrderButton = false
    $scope.orderId = $routeParams.orderId

    $scope.logisticCompanyId = 0
    params = {orderId: $scope.orderId}
    promise = WmsOrderGoodsService.listByOrderIdAndIsSplit(params)
    promise.then (data) ->
      $scope.orderGoodsListNoSplit = data

    params = {id: $scope.orderId}
    promise = WmsOrderService.detail(params)
    promise.then (data) ->
      $scope.order = data
      prepareConst()

    getOrderPickOrderRefList()

  main()