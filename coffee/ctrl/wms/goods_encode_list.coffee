'use strict'

angular.module 'app.controllers'

.filter 'calArrayTrue',() ->
  (items) ->
    trueNumber = 0
    angular.forEach items, (item) ->
      if item
        trueNumber = parseInt(trueNumber) + 1
    return trueNumber

.controller 'WmsGoodsEncodeListCtrl', ($scope, $routeParams, $filter, CommonService, ClickEditService, ModalService
  WmsGoodsEncodeService,WmsSellerGoodsService) ->

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

  # add
  $scope.add = ->
    promise = WmsGoodsEncodeService.add($scope.goodsEncode)
    promise.then (data) ->
      $scope.goodsEncode = data
      $scope.items.unshift($scope.goodsEncode)
      initSearch()
      $scope.goodsEncode = {sellerGoodsId:$scope.sellerGoodsId}

  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsGoodsEncodeService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()

  $scope.autoGenerateEncode = ->
    params = {sellerGoodsId:$routeParams.sellerGoodsId}
    promise = WmsGoodsEncodeService.autoGenerateEncode(params)
    promise.then (data) ->
      $scope.goodsEncode.goodsCode = data

  $scope.checkAll = (printItems) ->
    boolValue = $scope.printAllItems
    angular.forEach($scope.currentPageItems,(currentItem) ->
      if printItems.hasOwnProperty(currentItem.goodsCode)
        printItems[currentItem.goodsCode] = boolValue
    )
    $scope.calArrayTrue()

  $scope.calArrayTrue = () ->
    trueNumber = 0
    angular.forEach($scope.currentPageItems,(currentItem) ->
      if $scope.printItems[currentItem.goodsCode]
        trueNumber = parseInt(trueNumber) + 1
    )
    $scope.truePrintNumber = trueNumber


  $scope.print = () ->
    ModalService.showMessageOnSuccess($i18next('wms:ui.label.waitingForPrint'))

  $scope.viewIsLoss = (isLoss) ->
    if isLoss == 'all'
      $scope.items = $scope.originalItems
    else
      $scope.items = $filter('filter')($scope.originalItems, {'isLoss':isLoss})
    $scope.search()
    $scope.select($scope.currentPage)
    $scope.displayIsLoss = isLoss

  $scope.viewInventoryStatus = (inventoryStatus) ->
    if inventoryStatus == 'all'
      $scope.items = $scope.originalItems
    else
      $scope.items = $filter('filter')($scope.originalItems, {'inventoryStatus':inventoryStatus})
    $scope.search()
    $scope.select($scope.currentPage)
    $scope.displayInventoryStatus = inventoryStatus


  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (goodsEncode, fieldName, bool) ->
    ClickEditService.switchNode(goodsEncode, fieldName, bool)

  prepareConst = ->
    params = {id: $scope.sellerGoodsId}
    promise = WmsSellerGoodsService.detail(params)
    promise.then (data) ->
      $scope.sellerGoods = data

    promise = WmsGoodsEncodeService.goodsInventoryStatusEnumListAll()
    promise.then (data) ->
      $scope.goodsInventoryStatusEnum = data

  main = ->
    $scope.printItems = {}
    $scope.printAllItems = false
    $scope.createGoodsEncode = {}

    $scope.displayInventoryStatus = 'all'
    $scope.displayIsLoss = false

    $scope.sellerGoodsId = $routeParams.sellerGoodsId

    params = {sellerGoodsId:$scope.sellerGoodsId}
    promise = WmsGoodsEncodeService.listBySellerGoodsId(params)
    promise.then (data) ->
      $scope.items = data
      $scope.originalItems = data
      angular.forEach($scope.items,(item) ->
        if !item.isLoss && !item.isPrinted
          $scope.printItems[item.goodsCode] = false
      )
      $scope.goodsEncode = {sellerGoodsId:$scope.sellerGoodsId}
      prepareConst()
      initSearch()




  main()