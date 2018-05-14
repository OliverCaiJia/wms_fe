'use strict'

angular.module 'app.controllers'

.controller 'WmsGoodsEditCtrl', ($scope, $rootScope,$routeParams,$i18next, CommonService, WmsGoodsService, ClickEditService,
  FileUploader,WmsConfigService,WmsMemberService,ModalService,DeviceDriverService) ->

  # update
  $scope.updateAbbrName = (goods, fieldName) ->
    if ClickEditService.updateNode(goods, fieldName)
      promise = WmsGoodsService.updateAbbrName(goods)
      promise.then ->

  # update
  $scope.updateImage = (goods, fieldName) ->
    if ClickEditService.updateNode(goods, fieldName)
      promise = WmsGoodsService.updateImage(goods)
      promise.then ->
                
  # update
  $scope.updateLogisticRequire = (goods, fieldName) ->
    if ClickEditService.updateNode(goods, fieldName)
      promise = WmsGoodsService.updateLogisticRequire(goods)
      promise.then ->
                
  # update
  $scope.updateWeight = (goods, fieldName) ->
    if ClickEditService.updateNode(goods, fieldName)
      promise = WmsGoodsService.updateWeight(goods)
      promise.then ->

  # update
  $scope.updateWeightByScale = (goods) ->
    promise = DeviceDriverService.getWeight()
    promise.then (deviceWeight) ->
      $scope.deviceWeight = deviceWeight
      goods.weight = deviceWeight
      promise = WmsGoodsService.updateWeight(goods)
      promise.then ->
                
  # update
  $scope.updateHeight = (goods, fieldName) ->
    if ClickEditService.updateNode(goods, fieldName)
      promise = WmsGoodsService.updateHeight(goods)
      promise.then ->
                
  # update
  $scope.updateWidth = (goods, fieldName) ->
    if ClickEditService.updateNode(goods, fieldName)
      promise = WmsGoodsService.updateWidth(goods)
      promise.then ->
                
  # update
  $scope.updateLength = (goods, fieldName) ->
    if ClickEditService.updateNode(goods, fieldName)
      promise = WmsGoodsService.updateLength(goods)
      promise.then ->
                
  # update
  $scope.updateName = (goods, fieldName) ->
    if ClickEditService.updateNode(goods, fieldName)
      promise = WmsGoodsService.updateName(goods)
      promise.then ->
                
  # update
  $scope.updateBarCode = (goods, fieldName) ->
    if ClickEditService.updateNode(goods, fieldName)
      promise = WmsGoodsService.updateBarCode(goods)
      promise.then ->

  $scope.$watch 'closeConfirmModal', ->
    if $rootScope.closeConfirmModal
      params = {id: $routeParams.id}
      promise = WmsGoodsService.detail(params)
      promise.then (data) ->
        $scope.goods = data
    return

  $scope.switchNode = (goods, fieldName, bool) ->
    ClickEditService.switchNode(goods, fieldName, bool)

  $scope.uploadGoodsImages = (goods,queueImage) ->
    queueImage.upload()
    $scope.uploader.onCompleteItem = (fileItem, response, status, headers) ->
      if response.success
        $scope.goods[goods.id+'image'] = false
        $scope.uploader.queue = []
        goods.image = response.data
        promise = WmsGoodsService.updateImage(goods)
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

  main = ->
    params = {id: $routeParams.id}
    promise = WmsGoodsService.detail(params)
    promise.then (data) ->
      $scope.goods = data

    prepareConst()
                
  main()