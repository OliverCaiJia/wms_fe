'use strict'

angular.module 'app.controllers'

.controller 'WmsRequestInventoryTransferListCtrl', ($scope, $routeParams, $filter, CommonService, WmsSellerService
  WmsInventoryTransferService, WmsMemberService, WmsConfigService, FileUploader) ->
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
    $scope.numPerPageOpt = [10, 20, 50, 100]
    $scope.searchOption.numPerPage = $scope.numPerPageOpt[0]
    $scope.currentPage = 1
    $scope.currentPageItems = []
    $scope.search()
    $scope.select($scope.currentPage)

  # add
  $scope.add = ->
    promise = WmsInventoryTransferService.add($scope.inventoryTransfer)
    promise.then (data) ->
      $scope.inventoryTransfer.id = data
      $scope.inventoryTransfer.status = 0
      $scope.items.unshift($scope.inventoryTransfer)
      $scope.createInventoryTransfer = {}
      $scope.inventoryTransfer = {requestSeller: $routeParams.requestSeller}
      initSearch()

  $scope.request = (node) ->
    params = {id: node.id}
    promise = WmsInventoryTransferService.submitInventoryTransfer(params)
    promise.then ->
      node.status = 1

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (inventoryTransfer, fieldName, bool) ->
    ClickEditService.switchNode(inventoryTransfer, fieldName, bool)

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

  main = ->
    $scope.createInventoryTransfer = {}
    $scope.inventoryTransfer = {requestSeller: $routeParams.requestSeller}
    $scope.imgHost = WmsConfigService.getImgHost()
    params = {requestSeller: $routeParams.requestSeller}
    promise = WmsInventoryTransferService.listByRequestSeller(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()

    prepareConst()

  main()