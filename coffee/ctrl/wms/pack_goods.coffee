'use strict'

angular.module 'app.controllers'

.controller 'WmsPackGoodsCtrl', ($scope, $location, $i18next, $routeParams, ModalService, $interval, ToastService,
  DeviceDriverService,CommonService,SessionService,WmsConfigService,WmsSellerService
  WmsPickOrderService, WmsPackOrderGoodsService, WmsSellerGoodsService,WmsPickOrderGoodsService) ->

  checkScanComplete = ->
    isSuccess = true
    $scope.goodsNumberList = []
    $scope.goodsScannedNumberList = []
    angular.forEach($scope.packOrderGoodsMap,(packOrderGoodsMap, pickOrderGoodsId)->
      $scope.goodsNumberList[pickOrderGoodsId] = 0
      $scope.goodsScannedNumberList[pickOrderGoodsId] = 0
      angular.forEach(packOrderGoodsMap,(packOrderGoods) ->
        if parseInt(packOrderGoods.goodsNumber) != parseInt(packOrderGoods.scannedNumber)
          isSuccess = false
        $scope.goodsNumberList[pickOrderGoodsId] += parseInt(packOrderGoods.goodsNumber)
        $scope.goodsScannedNumberList[pickOrderGoodsId] += parseInt(packOrderGoods.scannedNumber)
      )
    )
    $scope.scanComplete = isSuccess
    if $scope.scanComplete
      $scope.packComplete()

  $scope.$on "$destroy", ->
    $interval.cancel($scope.timer)

  $scope.updateGoodsEncode = ->
    $scope.scanGoods = {}
    $scope.weightSuccess = false
    if $scope.goodsEncode == ''
      if $scope.scanComplete
        $scope.packComplete()
      else
        ModalService.showMessageOnError $i18next("wms:message.validationError.goodsBarCodeNotNull")
    else
      goodsEncode = $scope.goodsEncode
      params = {goodsEncode:goodsEncode, packOrderId:$scope.pickOrder.packOrderId}
      promise = WmsSellerGoodsService.detailByGoodsEncodeAndPackOrderId(params)
      promise.then (data) ->
        $scope.scanGoods = data

        if $scope.seller.isWeightSet
          $scope.weightSuccess = false
          interruptCount = 0
          
          $scope.timer = $interval((->
            promise = DeviceDriverService.getWeight()
            promise.then (scaleWeight) ->
              $scope.scaleWeight = scaleWeight
          ), 500)

          success = ->
            if !$scope.weightSuccess
              ToastService.showMessageOnInfo($i18next('wms:ui.tips.reScanGoodsAndWeight'))
              $scope.scanGoods = {}
          error = ->
            console.log 'error'

          notify = ->
            weightDiff = Math.abs($scope.scaleWeight - $scope.totalWeight - $scope.scanGoods.weight)
            interruptCount++
            if !$scope.weightSuccess && parseInt(weightDiff) < 10
              $interval.cancel($scope.timer)
              params = {
                goodsEncode: goodsEncode
                sellerGoodsId: $scope.scanGoods.id
                packOrderId: $scope.pickOrder.packOrderId
                totalWeight:$scope.scaleWeight
              }
              promise = WmsPackOrderGoodsService.packStatusUpdateScanGoodsNumber(params)
              promise.then (data) ->
                if data.hasOwnProperty('errorCode')
                  ModalService.showMessageOnError($i18next('wms:message.apiError.'+data.errorCode))
                else
                  $scope.packOrderGoodsMap = data
                  checkScanComplete()
                  $scope.totalWeight = $scope.scaleWeight
                  $scope.scaleWeight = 0
                  $scope.weightSuccess = true
                  $scope.scanGoods = {}
                  ToastService.showMessageOnSuccess($i18next('wms:ui.label.weightSuccess'))
                  getPackOrderGoodsList()

            else
              $scope.weightSuccess = false
              ToastService.showMessageOnWeightError($i18next('wms:message.apiError.goods weight error greater than allow error'))
              if interruptCount >= 25
                ToastService.showMessageOnError($i18next('wms:ui.tips.reScanGoodsAndWeight'))
                $interval.cancel($scope.timer)

          $scope.timer.then success, error, notify
        else
          params = {
            goodsEncode: goodsEncode
            sellerGoodsId: $scope.scanGoods.id
            packOrderId: $scope.pickOrder.packOrderId
            totalWeight:$scope.totalWeight
          }
          promise = WmsPackOrderGoodsService.packStatusUpdateScanGoodsNumber(params)
          promise.then (data) ->
            if data.hasOwnProperty('errorCode')
              ModalService.showMessageOnError($i18next('wms:message.apiError.'+data.errorCode))
            else
              $scope.packOrderGoodsMap = data
              checkScanComplete()
              getPackOrderGoodsList()

    $scope.goodsEncode = ''

  $scope.packComplete = ->
    params = {id: $routeParams.id, totalWeight: $scope.scaleWeight}
    promise = WmsPickOrderService.packScanComplete(params)
    promise.then ->
      $location.path("/wms/pick_order_container").search("id", $routeParams.id)

  $scope.packScanReject = ->
    params = {id: $routeParams.id}
    promise = WmsPickOrderService.packScanReject(params)
    promise.then ->
      $location.path("/wms/express_order_pack")

  $scope.getImagesByCode =(code) ->
    if code
      JsBarcode("#barcode"+code, code,{
        height: 60,
        barWidth:1,
        fontSize: 12,
        margin:10,
        textMargin:0})

  getPackOrderGoodsList = ->
    params = {packOrderId: $scope.pickOrder.packOrderId}
    promise = WmsPackOrderGoodsService.mapGoodsIdListByPackOrderId(params)
    promise.then (data) ->
      $scope.packOrderGoodsMap = data

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

    params = {pickOrderId: $scope.pickOrder.id}
    promise = WmsPickOrderGoodsService.listByPickOrderId(params)
    promise.then (data) ->
      $scope.pickOrderGoodsList = data
      $scope.pickOrderGoodsMap = CommonService.convertListToMap($scope.pickOrderGoodsList, "id")

    params = { sellerId: $scope.pickOrder.sellerId}
    promise = WmsSellerGoodsService.listAllComboBySellerId(params)
    promise.then (data) ->
      $scope.allComboSellerGoodsMap = data
      $scope.comboSellerGoodsMap = []
      angular.forEach($scope.allComboSellerGoodsMap,(sellerGoodsList,comboId) ->
        $scope.comboSellerGoodsMap[comboId] = {}
        $scope.comboSellerGoodsMap[comboId] = CommonService.convertListToMap(sellerGoodsList,'id')
      )


    getPackOrderGoodsList()

  main = ->
    angular.element('#goodsEncode').focus()
    $scope.goodsEncode = ''
    $scope.scanComplete = false
    $scope.showBarcode = SessionService.getTester()
    $scope.totalWeight = 0
    $scope.scaleWeight = 0
    if $routeParams.showBarcode == '1'
      $scope.showBarcode = true
      SessionService.setTester(true)

    $scope.imgHost = WmsConfigService.getImgHost()

    params = {id: $routeParams.id}
    promise = WmsPickOrderService.detail(params)
    promise.then (data) ->
      $scope.pickOrder = data
      if $scope.pickOrder.totalWeight
        $scope.totalWeight = parseInt($scope.pickOrder.totalWeight)
      if parseInt($scope.pickOrder.status) == 2
        prepareConst()
      else if parseInt($scope.pickOrder.status) == 1
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderNotPick")
      else if parseInt($scope.pickOrder.status) == 3
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderAlreadyPack")


  main()