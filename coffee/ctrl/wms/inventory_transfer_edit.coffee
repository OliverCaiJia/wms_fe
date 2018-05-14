'use strict'

angular.module 'app.controllers'

.controller 'WmsInventoryTransferEditCtrl', ($scope, $i18next, $routeParams, CommonService, WmsInventoryTransferService
  WmsSellerService, WmsMemberService, FileUploader, WmsConfigService, ModalService) ->

  prepareConst = ->
    promise = WmsSellerService.mapAll()
    promise.then (data) ->
      $scope.sellerMap = data

    promise = WmsMemberService.mapMember()
    promise.then (data) ->
      $scope.memberMap = data

    fileHost = WmsConfigService.getFileHost()
    uploader = $scope.uploader = new FileUploader(url:fileHost+'/upload_images/voucher')
    uploader.filters.push
      name: 'imageFilter'
      fn: (item, options) ->
        type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|'
        '|jpg|png|jpeg|bmp|gif|'.indexOf(type) != -1
    uploader.onCompleteItem = (fileItem, response, status, headers) ->
      if response.success
        $scope.uploader.queue = []
        $scope.inventoryTransfer.voucher = response.data
        promise = WmsInventoryTransferService.updateVoucher($scope.inventoryTransfer)
        promise.then ->
      else
        ModalService.showMessageOnError $i18next("wms:message.apiError."+response.errorCode)

  main = ->
    $scope.imgHost = WmsConfigService.getImgHost()
    params = {id: $routeParams.id}
    promise = WmsInventoryTransferService.detail(params)
    promise.then (data) ->
      $scope.inventoryTransfer = data

    prepareConst()
                
  main()