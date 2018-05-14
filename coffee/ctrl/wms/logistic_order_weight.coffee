'use strict'

angular.module 'app.controllers'

.filter 'calTotalWeight',() ->
  (items) ->
    weight = 0
    angular.forEach items, (item) ->
      if item
        weight = parseFloat(weight) + parseFloat(item.goodsTotalWeight)
    return weight

.controller 'WmsLogisticOrderWeightCtrl', ($scope, $location, $i18next, $routeParams, CommonService, ModalService,$timeout,
  WmsLogisticOrderService,WmsLogisticOrderGoodsService, WmsGoodsService,DeviceDriverService,
  WmsSellerAvailableContainerService,WmsLogisticOrderScanGoodsService) ->


  $scope.getLogisticOrderTotalWeight = () ->
    if $scope.expressBarCode == $scope.logisticOrder.expressSn
      $scope.waitForUpdate = true
      params = {logisticOrderId:$scope.logisticOrderId}
      promise = DeviceDriverService.getWeight(params)
      promise.then (data) ->
        $scope.deviceTotalWeight = data
        $scope.waitForUpdate = false
        params = {id:$scope.logisticOrderId,totalWeight:$scope.deviceTotalWeight}
        promise = WmsLogisticOrderService.updateTotalWeight(params)
        promise.then () ->
          $scope.logisticOrder.status = 3
          $timeout (->
            $location.path("/wms/express_order_pack")
            return
          ), 500
    $scope.expressBarCode = ''

  prepareConst = ->
    params = {logisticOrderId: $scope.logisticOrderId}
    promise = WmsLogisticOrderScanGoodsService.mapByLogisticOrderId(params)
    promise.then (data) ->
      $scope.scanGoodsMap = data
      $scope.logisticOrderGoodsWeight = 0
      angular.forEach($scope.scanGoodsMap,(scanGoodsList,goodsId) ->
        angular.forEach(scanGoodsList,(scanGoods) ->
          $scope.logisticOrderGoodsWeight = $scope.logisticOrderGoodsWeight + scanGoods.goodsTotalWeight*1
        )
      )

    params = {logisticOrderId: $scope.logisticOrderId}
    promise = WmsGoodsService.goodsMapByLogisticOrderId(params)
    promise.then (data) ->
      $scope.goodsMap = data
#      $scope.getLogisticOrderTotalWeight()

  main = ->
    $scope.logisticOrderId = $routeParams.id
    $scope.logisticOrderGoodsWeight = 0
    $scope.deviceTotalWeight = 0
    $scope.waitForUpdate = true
    $scope.expressBarCode = ''

    params = {id: $scope.logisticOrderId}
    promise = WmsLogisticOrderService.detail(params)
    promise.then (data) ->
      $scope.logisticOrder = data
      if parseInt($scope.logisticOrder.status) == 3
        if $scope.logisticOrder.containerId
          params = {logisticOrderId: $scope.logisticOrderId}
          promise = WmsLogisticOrderGoodsService.listByLogisticOrderId(params)
          promise.then (data) ->
            $scope.items = data
          prepareConst()
        else
          $location.path("/wms/logistic_order_container").search("id", $scope.logisticOrderId)
          ModalService.showMessageOnError $i18next("wms:message.apiError.container not exists")
      else if parseInt($scope.logisticOrder.status) == 1
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderNotPick")
      else if parseInt($scope.logisticOrder.status) == 2
        $location.path("/wms/express_order_pack")
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderAlreadyPack")

  main()