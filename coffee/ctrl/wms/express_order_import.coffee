'use strict'

angular.module 'app.controllers'

.controller 'WmsExpressOrderImportCtrl', ($scope, $routeParams, $filter, ClickEditService,WmsLogisticOrderService
  WmsLogisticCompanyService, WmsSellerFreightGroupService, WmsConfigService, WmsAddressService,CommonService,
  Upload,ModalService) ->


  # update
  $scope.updateLogisticCompanyId = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder)
      promise.then ->

# update
  $scope.updateExpressSn = (logisticOrder, fieldName) ->
    promise = WmsLogisticOrderService.updateExpressSn(logisticOrder)
    promise.then ->
      promise = WmsLogisticOrderService.listAllEmptyExpressSn({})
      promise.then (data) ->
        $scope.items = data
        initSearch()

  $scope.import = (refExpressUpload) ->
    $scope.showimporting = true
    promise = WmsLogisticOrderService.importExpressSn(refExpressUpload)
    promise.then ->
      window.location.reload()

  # upload
  $scope.uploadFile = (file, errFiles) ->
    $scope.showimporting = false
    $scope.f = file
    $scope.errFile = errFiles && errFiles[0]
    if file
      $scope.refExpressUpload.originalFileName = file.name
      file.upload = Upload.upload(
        url: WmsConfigService.getFileHost() + '/upload_file/related_express'
        file: file)
      file.upload.then ((response) ->
        result = response.data
        if result.success
          $scope.refExpressUpload.filePath = result.data
        else
          ModalService.showMessageOnError result.errorCode
      ), ((response) ->
        if response.status != 200
          ModalService.showMessageOnError response.statusText
      ), (evt) ->
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total))


  $scope.switchNode = (logisticOrder, fieldName, bool) ->
    ClickEditService.switchNode(logisticOrder, fieldName, bool)
    if fieldName == 'logisticCompanyId' && !$scope.sellerFreightGroupMap.hasOwnProperty(logisticOrder.sellerId)
      params = {sellerId: logisticOrder.sellerId}
      promise = WmsSellerFreightGroupService.listBySellerId(params)
      promise.then (data) ->
        $scope.sellerFreightGroupMap[logisticOrder.sellerId] = data

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  prepareConst = ->
    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

    promise = WmsAddressService.mapAll()
    promise.then (data) ->
      $scope.addressMap = data

  main = ->
    $scope.refExpressUpload = {}
    $scope.searchOption = {"keywords":"","logisticCompanyId":""}
    $scope.logisticCompanyId = ""
    $scope.sellerFreightGroupMap = {}
    $scope.createImportRefExpress = {}

    prepareConst()

  main()