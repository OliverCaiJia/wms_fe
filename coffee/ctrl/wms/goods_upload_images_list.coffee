'use strict'

angular.module 'app.controllers'

.controller 'WmsGoodsUploadImagesListCtrl', ($scope, $routeParams, $filter, CommonService, WmsSellerGoodsService,
  ClickEditService,WmsConfigService,FileUploader,WmsMemberService,ModalService,$i18next,WmsSellerService) ->
  $scope.select = (page) ->
    start = (page - 1) * $scope.searchOption.numPerPage
    end = start + $scope.searchOption.numPerPage
    $scope.currentPageItems = $scope.filteredItems.slice(start, end)

  $scope.onFilterChange = ->
    $scope.select(1)
    $scope.currentPage = 1
    $scope.row = ''

  $scope.onNumPerPageChange = ->
    $scope.select(1)
    $scope.currentPage = 1

  $scope.onOrderChange = ->

    $scope.select(1)
    $scope.currentPage = 1

  $scope.search = ->
    $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords)
    $scope.onFilterChange()

  # orderBy
  $scope.order = (rowName)->
    if $scope.row == rowName
      return
    $scope.row = rowName
    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName)
    $scope.onOrderChange()

  # initSearch
  initSearch = ->
    $scope.searchOption = {"keywords":""}
    $scope.filteredItems = []
    $scope.row = ''
    $scope.numPerPageOpt = [20, 50, 100, 200]
    $scope.searchOption.numPerPage = $scope.numPerPageOpt[0]
    $scope.currentPage = 1
    $scope.currentPageItems = []
    $scope.search()
    $scope.select($scope.currentPage)

  # update
  $scope.updateAbbrName = (goods, fieldName) ->
    if ClickEditService.updateNode(goods, fieldName)
      promise = WmsSellerGoodsService.updateAbbrName(goods)
      promise.then ->

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (goods, fieldName, bool) ->
    ClickEditService.switchNode(goods, fieldName, bool)

  $scope.uploadGoodsImages = (goods,queueImage,index) ->
    newUpload = $scope.uploader[goods.id]
    queueImage.upload()
    newUpload.onCompleteItem = (fileItem, response, status, headers) ->
      if response.success
        goods.image = response.data
        promise = WmsSellerGoodsService.updateImage(goods)
        promise.then ->
          $scope.items.splice(index, 1)
          initSearch()
      else
        ModalService.showMessageOnError $i18next("wms:message.apiError."+response.errorCode)
      angular.element('#searchBarCode').focus()

  prepareConst = ->
    promise = WmsSellerService.listAll()
    promise.then (data) ->
      $scope.sellerList = data
      $scope.sellerMap = CommonService.convertListToMap($scope.sellerList,'id')

  main = ->
    angular.element('#searchBarCode').focus()
    $scope.fileHost = WmsConfigService.getFileHost()
    uploader = $scope.uploader = []

    $scope.imgHost = WmsConfigService.getImgHost()

    promise = WmsSellerGoodsService.waitToUploadImagesList()
    promise.then (data) ->
      $scope.items = data
      prepareConst()
      initSearch()
      angular.forEach($scope.items,(item) ->
        uploader[item.id] = $scope.uploader[item.id] = new FileUploader(url:$scope.fileHost+'/upload_images/goods')
        # FILTERS
        uploader[item.id].filters.push
          name: 'imageFilter'+item.id
          fn: (item, options) ->
            type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|'
            '|jpg|png|jpeg|bmp|gif|'.indexOf(type) != -1
        # CALLBACKS
        )

  main()