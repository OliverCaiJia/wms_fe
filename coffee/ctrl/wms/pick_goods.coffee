'use strict'

angular.module 'app.controllers'

.controller 'WmsPickGoodsCtrl', ($scope,$routeParams,$i18next,$timeout,$location,SessionService,ModalService,CommonService,
  WmsPickOrderService,WmsPickOrderGoodsService,WmsPackOrderGoodsService,WmsSellerGoodsService,WmsConfigService,
  WmsLogisticOrderService) ->

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
      $scope.pickComplete()

  $scope.pickComplete = ->
    $timeout (->
      params = {pickOrderId: $scope.pickOrder.id}
      promise = WmsPickOrderService.pickComplete(params)
      promise.then ->
        $location.path("/wms/logistic_order_pick_search")
      return
    ), 500

  $scope.updateGoodsBarCode = ->
    if !$scope.scanSellerGoodsId || $scope.goodsBarCode == ''
      ModalService.showMessageOnError $i18next("wms:message.validationError.goodsBarCodeNotNull")
    else
      params = {
        packOrderId:$scope.pickOrder.packOrderId,
        goodsEncode:$scope.goodsBarCode
        pickOrderGoodsId:$scope.pickOrderGoodsMap[$scope.scanSellerGoodsId].id
      }
      pickOrderGoodsId = $scope.pickOrderGoodsMap[$scope.scanSellerGoodsId].id
      $scope.goodsBarCode = ''
      promise = WmsPackOrderGoodsService.pickStatusUpdateScanGoodsNumber(params)
      promise.then (data) ->
        $scope.packOrderGoodsMap = data
        checkScanComplete()

        # check if go to next sellerGoodsId
        if $scope.nextScanGoodsId && parseInt($scope.goodsNumberList[pickOrderGoodsId]) == parseInt($scope.goodsScannedNumberList[pickOrderGoodsId])
          $timeout (->
            $location.path("/wms/pick_goods").search("pickOrderId", $scope.pickOrder.id).search("sellerGoodsId",$scope.nextScanGoodsId)
            return
          ), 500

    $scope.goodsBarCode = ''

  $scope.pickReject = ->
    params = {pickOrderId: $scope.pickOrder.id}
    promise = WmsPickOrderService.pickReject(params)
    promise.then ->
      $location.path("/wms/pick_goods").search("pickOrderId", $scope.pickOrder.id)
      window.location.reload()

  $scope.getImagesByCode =(code) ->
    if !$scope.imagesByCode[code]
      $scope.imagesByCode[code] = true
      JsBarcode("#barcode"+code, code,{
        height: 60,
        barWidth:1,
        fontSize: 12,
        margin:10,
        textMargin:0})

  prepareConst = ->
    params = {id: $scope.pickOrder.logisticOrderId}
    promise = WmsLogisticOrderService.detail(params)
    promise.then (data) ->
      $scope.logisticOrder = data

    params = {sellerId: $scope.pickOrder.sellerId}
    promise = WmsSellerGoodsService.listBySellerId(params)
    promise.then (data) ->
      $scope.sellerGoodsList = data
      $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, "id")

    params = {pickOrderId: $scope.pickOrderId}
    promise = WmsPickOrderGoodsService.listByPickOrderId(params)
    promise.then (data) ->
      $scope.items = data
      $scope.pickOrderGoodsList = data
      angular.forEach($scope.pickOrderGoodsList,(item,k) ->
        if !$scope.scanSellerGoodsId
          $scope.scanSellerGoodsId = item.sellerGoodsId
        if (parseInt($scope.scanSellerGoodsId) == parseInt(item.sellerGoodsId)) && $scope.items[parseInt(k)+1]
#        && $scope.items[parseInt(k)+1].hasOwnProperty("sellerGoodsId")
          $scope.nextScanGoodsId = $scope.items[parseInt(k)+1].sellerGoodsId
      )
      $scope.pickOrderGoodsMap = CommonService.convertListToMap($scope.pickOrderGoodsList, "sellerGoodsId")
      $scope.pickOrderGoodsMapById = CommonService.convertListToMap($scope.pickOrderGoodsList, "id")
      params = {packOrderId: $scope.pickOrder.packOrderId}
      promise = WmsPackOrderGoodsService.mapGoodsIdListByPackOrderId(params)
      promise.then (data) ->
        $scope.packOrderGoodsMap = data
        checkScanComplete()

#    if $scope.showBarcode
#      params = {pickOrderId: $scope.pickOrder.id}
#      promise = WmsPickOrderService.listGoodsBarcodeForDemo(params)
#      promise.then (data) ->
#        $scope.goodsBarCodeDemo = data

    params = { sellerId: $scope.pickOrder.sellerId}
    promise = WmsSellerGoodsService.listAllComboBySellerId(params)
    promise.then (data) ->
      $scope.allComboSellerGoodsMap = data

  main = ->
    angular.element('#scanBarCodeInput').focus()
    if $routeParams.sellerGoodsId
      $scope.scanSellerGoodsId = $routeParams.sellerGoodsId
    $scope.scanComplete = false
    $scope.packOrderGoodsMap = {}
    $scope.pickOrderId = $routeParams.pickOrderId
    $scope.nextScanGoodsId = 0
    $scope.showBarcode = SessionService.getTester()
    if $routeParams.showBarcode == '1'
      $scope.showBarcode = true
      SessionService.setTester(true)

    $scope.imgHost = WmsConfigService.getImgHost()
    $scope.imagesByCode = []

    params = {id: $scope.pickOrderId}
    promise = WmsPickOrderService.detail(params)
    promise.then (data) ->
      $scope.pickOrder = data
      if $scope.pickOrder.status == 1
        prepareConst()
      else
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderNotPickStatus")

  main()