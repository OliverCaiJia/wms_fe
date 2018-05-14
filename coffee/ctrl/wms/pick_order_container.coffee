'use strict'

angular.module 'app.controllers'

.controller 'WmsPickOrderContainerCtrl', ($scope, $location, $i18next, $routeParams, ModalService, $timeout,CommonService
  WmsSellerGoodsService, $interval, WmsPackOrderGoodsService, WmsSellerAvailableContainerService, DeviceDriverService
  ToastService, WmsPickOrderService,WmsPickOrderGoodsService,WmsSellerService) ->

  $scope.$on "$destroy", ->
    $interval.cancel($scope.timer)

  # update logistic order container weight
  $scope.updateContainerByBarCode = () ->
    if $scope.containerBarCode
      params = {sellerId:$scope.pickOrder.sellerId,barCode:$scope.containerBarCode}
      promise = WmsSellerAvailableContainerService.detailBySellerIdAndBarCode(params)
      promise.then (container) ->
        $scope.container = container
        $scope.weightSuccess = false

        $scope.timer = $interval((->
          promise = DeviceDriverService.getWeight()
          promise.then (scaleWeight) ->
            $scope.scaleWeight = scaleWeight
        ), 500)

        success = ->
          if !$scope.weightSuccess
            ToastService.showMessageOnInfo($i18next('wms:ui.tips.reScanGoodsAndWeight'))
          return

        error = ->
          console.log 'error'
          return

        notify = ->
          if $scope.seller.isWeightSet
            containerWeight = parseFloat($scope.scaleWeight) - parseFloat($scope.pickOrder.totalWeight) - parseFloat($scope.container.weight)
            weightDiff = Math.abs(containerWeight)
            if !$scope.weightSuccess && parseInt($scope.scaleWeight) > 0 &&  parseInt(weightDiff) < 10
              $interval.cancel($scope.timer)

          params = {id:$routeParams.id, containerId:$scope.container.id, totalWeight:$scope.scaleWeight}
          if params.totalWeight > 0
            $interval.cancel($scope.timer)
            promise = WmsPickOrderService.updateContainerId(params)
            promise.then (data)->
              $scope.weightSuccess = true
              $scope.pickOrder.containerId = $scope.container.id
              ToastService.showMessageOnSuccess($i18next('wms:ui.label.weightSuccess'))
              $location.path("/wms/express_order_pack")
          else
            ToastService.showMessageOnError($i18next('wms:message.apiError.goods weight must be bigger than 0'))

        $scope.timer.then success, error, notify
    else
      ModalService.showMessageOnError $i18next("wms:message.apiError.container not exists")
    $scope.containerBarCode = ''

  prepareConst = ->
    params = {id: $scope.pickOrder.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data

    params = {sellerId: $scope.pickOrder.sellerId}
    promise = WmsSellerGoodsService.listBySellerId(params)
    promise.then (data) ->
      $scope.sellerGoodsList = data
      $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, "id")

    params = {packOrderId: $scope.pickOrder.packOrderId}
    promise = WmsPackOrderGoodsService.listByPackOrderId(params)
    promise.then (data) ->
      $scope.packOrderGoodsList = data

    params = {pickOrderId: $scope.pickOrder.id}
    promise = WmsPickOrderGoodsService.listByPickOrderId(params)
    promise.then (data) ->
      $scope.pickOrderGoodsList = data
      $scope.pickOrderGoodsMap = CommonService.convertListToMap($scope.pickOrderGoodsList, "id")

    params = {packOrderId: $scope.pickOrder.packOrderId}
    promise = WmsPackOrderGoodsService.mapGoodsIdListByPackOrderId(params)
    promise.then (data) ->
      $scope.packOrderGoodsMap = data

  main = ->
    angular.element('#containerBarCode').focus()
    $scope.containerBarCode = ''
    $scope.scaleWeight = 0

    params = {id: $routeParams.id}
    promise = WmsPickOrderService.detail(params)
    promise.then (data) ->
      $scope.pickOrder = data
      if parseInt($scope.pickOrder.status) == 3
        prepareConst()
      else if parseInt($scope.pickOrder.status) == 1
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderNotPick")
      else if parseInt($scope.pickOrder.status) == 2
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderNotPack")

  main()