'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerGoodsIncreaseCtrl', ($scope, $routeParams, WmsMemberService,WmsSellerService,WmsSellerGoodsService
  WmsSellerGoodsInventoryLogService) ->

  $scope.select = (page) ->
    start = (page - 1) * $scope.numPerPage
    end = start + $scope.numPerPage
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

  # initSearch
  initSearch = ->
    $scope.filteredItems = []
    $scope.row = ''
    $scope.numPerPageOpt = [5, 10, 20, 50, 100]
    $scope.numPerPage = $scope.numPerPageOpt[0]
    $scope.currentPage = 1
    $scope.currentPageItems = []
    $scope.filteredItems = $scope.sellerGoodsInventoryLogList
    $scope.select($scope.currentPage)

  $scope.calcInventory = ->
    if $scope.sellerGoodsInventoryLog.number
      str = $scope.sellerGoods.inventory + ' + ' + $scope.sellerGoodsInventoryLog.number + " = "
      $scope.sellerGoodsInventoryLog.calcInventory = str + (parseInt($scope.sellerGoods.inventory) + parseInt($scope.sellerGoodsInventoryLog.number))
    else
      $scope.sellerGoodsInventoryLog.calcInventory = ""


  $scope.increaseInventory = (sellerGoodsInventoryLog) ->
    promise = WmsSellerGoodsInventoryLogService.increaseInventory($scope.sellerGoodsInventoryLog)
    promise.then (data) ->
      console.log(data)
      sellerGoodsInventoryLog = data
      $scope.sellerGoods.inventory = parseInt($scope.sellerGoods.inventory) + parseInt($scope.sellerGoodsInventoryLog.number)
      $scope.sellerGoodsInventoryLog = {sellerGoodsId: $scope.sellerGoodsId}
      $scope.sellerGoodsInventoryLogList.unshift(sellerGoodsInventoryLog)
      initSearch()

  prepareConst = ->

    params = {id: $scope.sellerGoods.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (seller) ->
      $scope.seller = seller
      
    params = {sellerGoodsId: $scope.sellerGoodsId}
    promise = WmsSellerGoodsInventoryLogService.listBySellerGoodsId(params)
    promise.then (data) ->
      $scope.sellerGoodsInventoryLogList = data
      initSearch()

    promise = WmsMemberService.mapMember()
    promise.then (data) ->
      $scope.memberMap = data

  main = ->
    $scope.sellerGoodsId = $routeParams.sellerGoodsId
    params = {id: $scope.sellerGoodsId}
    promise = WmsSellerGoodsService.detail(params)
    promise.then (sellerGoods) ->
      $scope.sellerGoods = sellerGoods
      $scope.sellerGoodsInventoryLog = {sellerGoodsId: $scope.sellerGoodsId}
      prepareConst()

  main()