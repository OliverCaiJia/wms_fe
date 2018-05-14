'use strict'

angular.module 'app.controllers'

.controller 'WmsGoodsListCtrl', ($scope,$routeParams, $filter, CommonService, WmsGoodsService,ClickEditService) ->
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
    promise = WmsGoodsService.add($scope.goods)
    promise.then (data) ->
      $scope.goods.id = data
      $scope.goods.isEncode = false
      $scope.goods.postInventory = $scope.goods.totalInventory
      $scope.items.unshift($scope.goods)
      $scope.createGoods = {}
      $scope.goods = {totalInventory:0}
      initSearch()

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

  $scope.updateIsOwnBox = (goods) ->
    goods.isOwnBox = !goods.isOwnBox
    promise = WmsGoodsService.updateIsOwnBox(goods)
    promise.then ->

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (goods, fieldName, bool) ->
    ClickEditService.switchNode(goods, fieldName, bool)

  main = ->
    $scope.goodsUpload = {}
    $scope.createGoods = {}
    $scope.goods = {totalInventory:0, isOwnBox:0}
    promise = WmsGoodsService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
  main()