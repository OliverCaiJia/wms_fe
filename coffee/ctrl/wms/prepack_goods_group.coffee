'use strict'

angular.module 'app.controllers'

.controller 'WmsPrepackGoodsGroupCtrl', ($scope, $location, $routeParams, $filter, WmsSellerService, WmsPickOrderService
  WmsSellerAvailableGoodsGroupService) ->
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

  $scope.addPrepackOrder = ->
    params = {sellerId: $routeParams.sellerId, barCode: $scope.barCode}
    promise = WmsPickOrderService.addPrepackGoodsGroup(params)
    promise.then (data) ->
      $location.path("/wms/pack_goods").search("id", data)

  $scope.packGoods = (goodsGroup) ->
    params = {sellerId: goodsGroup.sellerId, barCode: goodsGroup.barCode}
    promise = WmsPickOrderService.addPrepackGoodsGroup(params)
    promise.then (data) ->
      $location.path("/wms/pack_goods").search("id", data)

  prepareConst = ->
    params = {sellerId: $routeParams.sellerId}
    promise = WmsSellerAvailableGoodsGroupService.listBySellerIdAndUsable(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()

  main = ->
    $scope.barCode = ''
    params = {id: $routeParams.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data

    prepareConst()

  main()