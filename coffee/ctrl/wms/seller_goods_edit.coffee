'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerGoodsEditCtrl', ($scope, $routeParams, CommonService, WmsSellerGoodsService, ClickEditService,
  WmsLogisticRequireService,FileUploader,WmsConfigService,SessionService,$i18next,DeviceDriverService) ->

  # update
  $scope.updateBarCode = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateBarCode(sellerGoods)
      promise.then ->

  # update
  $scope.updateWeight = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateWeight(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateName = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateName(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateAbbrName = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateAbbrName(sellerGoods)
      promise.then ->
                
  # update
  $scope.updatePrepackWeight = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updatePrepackWeight(sellerGoods)
      promise.then ->

  # update
  $scope.updateLength = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateLength(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateHeight = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateHeight(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateWidth = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateWidth(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateShelfLocation = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateShelfLocation(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateEncodeType = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateEncodeType(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateInventory = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateInventory(sellerGoods)
      promise.then ->
                
  # update
  $scope.updatePrice = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updatePrice(sellerGoods)
      promise.then ->

  # update
  $scope.updateWeight = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateWeight(sellerGoods)
      promise.then ->

  # update
  $scope.updateIsCombo = (sellerGoods) ->
    console.log(sellerGoods)
    promise = WmsSellerGoodsService.updateIsCombo(sellerGoods)
    promise.then ->

  # update
  $scope.updateWeightByScale = (sellerGoods) ->
    promise = DeviceDriverService.getWeight()
    promise.then (data) ->
      $scope.deviceWeight.weight = data
      sellerGoods.weight = data
      promise = WmsSellerGoodsService.updateWeight(sellerGoods)
      promise.then ->

  # update
  $scope.updatePrepackWeightByScale = (sellerGoods) ->
    promise = DeviceDriverService.getWeight()
    promise.then (data) ->
      $scope.deviceWeight.prepackWeight = data
      sellerGoods.prepackWeight = data
      promise = WmsSellerGoodsService.updatePrepackWeight(sellerGoods)
      promise.then ->

  $scope.checkLogisticRequire = () ->
    $scope.sellerGoods.logisticRequire = []
    angular.forEach($scope.logisticRequireEnum,(require)->
      if $scope.logisticRequireList[require]
        $scope.sellerGoods.logisticRequire.push(require)
    )
    if $scope.sellerGoods.logisticRequire.length == 0
      $scope.sellerGoods.logisticRequire = ['']
    promise = WmsSellerGoodsService.updateLogisticRequire($scope.sellerGoods)
    promise.then ->
                
  $scope.switchNode = (sellerGoods, fieldName, bool) ->
    ClickEditService.switchNode(sellerGoods, fieldName, bool)

  $scope.uploadGoodsImages = (sellerGoods,queueImage) ->
    queueImage.upload()
    $scope.uploader.onCompleteItem = (fileItem, response, status, headers) ->
      if response.success
        $scope.sellerGoods[sellerGoods.id+'image'] = false
        $scope.uploader.queue = []
        sellerGoods.image = response.data
        promise = WmsSellerGoodsService.updateImage(sellerGoods)
        promise.then ->
      else
        ModalService.showMessageOnError $i18next("wms:message.apiError."+response.errorCode)

  prepareConst = ->
    uploader = $scope.uploader = new FileUploader(url:WmsConfigService.getFileHost()+'/upload_images/goods')
    uploader.filters.push
      name: 'imageFilter'
      fn: (item, options) ->
        type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|'
        '|jpg|png|jpeg|bmp|gif|'.indexOf(type) != -1

    promise = WmsLogisticRequireService.listAll()
    promise.then (data) ->
      $scope.logisticRequireEnum = data

    promise = WmsSellerGoodsService.listEncodeType()
    promise.then (data) ->
      $scope.encodeTypeList = data
      $scope.encodeTypeMap = []
      for encodeType in data
        $scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType."+encodeType)

  main = ->
    $scope.logisticRequireList = []
    if SessionService.getSellerId()
      $scope.isSeller = true

    $scope.imgHost = WmsConfigService.getImgHost()
    $scope.deviceWeight = {}

    params = {id: $routeParams.id}
    promise = WmsSellerGoodsService.detail(params)
    promise.then (data) ->
      $scope.sellerGoods = data
      angular.forEach($scope.sellerGoods.logisticRequire,(require)->
        $scope.logisticRequireList[require] = true
      )
    prepareConst()

  main()