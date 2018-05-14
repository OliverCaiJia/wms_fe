'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerPlatformGoodsListCtrl', ($scope, $routeParams, $filter, CommonService, ClickEditService,SessionService,
  WmsSellerPlatformGoodsService,WmsSellerGoodsService,WmsPlatformSourceService, WmsSellerPlatformSourceService) ->
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

  # update && add
  $scope.updateUniqueCode = (sellerPlatformGoods, fieldName) ->
    if sellerPlatformGoods.id
      promise = WmsSellerPlatformGoodsService.updateUniqueCode(sellerPlatformGoods)
      promise.then ->
        sellerPlatformGoods[sellerPlatformGoods.id+fieldName] = false
    else
      promise = WmsSellerPlatformGoodsService.add(sellerPlatformGoods)
      promise.then (data) ->
        sellerPlatformGoods.id = data
        if !$scope.sellerPlatformGoodsList[sellerPlatformGoods.platformSourceId]
          $scope.sellerPlatformGoodsList[sellerPlatformGoods.platformSourceId] = []
        $scope.sellerPlatformGoodsList[sellerPlatformGoods.platformSourceId].unshift(sellerPlatformGoods)

  $scope.showSellerGoodsMap = (platformSourceId,sellerGoodsId, fieldName) ->
    if $scope.sellerPlatformGoodsMap[platformSourceId] == undefined || $scope.sellerPlatformGoodsMap[platformSourceId] == null
      $scope.sellerPlatformGoodsMap[platformSourceId] = []
    if $scope.sellerPlatformGoodsMap[platformSourceId][sellerGoodsId] == undefined || $scope.sellerPlatformGoodsMap[platformSourceId][sellerGoodsId] == null
      $scope.sellerPlatformGoodsMap[platformSourceId][sellerGoodsId] = {}
      $scope.sellerPlatformGoodsMap[platformSourceId][sellerGoodsId] = {
        "uniqueCode":" "
        "sellerGoodsId":sellerGoodsId
        "platformSourceId":platformSourceId
        "sellerId": $scope.sellerId
      }
    $scope.switchNode($scope.sellerPlatformGoodsMap[platformSourceId][sellerGoodsId],fieldName,true)
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerPlatformGoods, fieldName, bool) ->
    ClickEditService.switchNode(sellerPlatformGoods, fieldName, bool)

  prepareConst = ->
    promise = WmsPlatformSourceService.mapPlatformSource()
    promise.then (data) ->
      $scope.platformSourceMap = data

    params = {sellerId:$scope.sellerId}
    promise = WmsSellerPlatformSourceService.listBySellerId(params)
    promise.then (data) ->
      $scope.sellerPlatformSourceList = data

    params = {sellerId:$scope.sellerId}
    promise = WmsSellerPlatformGoodsService.listBySellerIdAndMapBySourceId(params)
    promise.then (data) ->
      $scope.sellerPlatformGoodsList = data
      $scope.sellerPlatformGoodsMap = []
      angular.forEach($scope.sellerPlatformGoodsList,(sellerPlatformGoodsList,platformSourceId) ->
        if sellerPlatformGoodsList != undefined && sellerPlatformGoodsList.length > 0
          $scope.sellerPlatformGoodsMap[platformSourceId] = CommonService.convertListToMap(sellerPlatformGoodsList,"sellerGoodsId")
        else
          $scope.sellerPlatformGoodsMap[platformSourceId] = []
      )

  main = ->
    $scope.createSellerPlatformGoods = {}
    $scope.sellerPlatformGoods = {}
    $scope.sellerId = SessionService.getSellerId()
    params = {sellerId:$scope.sellerId}
    promise = WmsSellerGoodsService.listBySellerId(params)
    promise.then (data) ->
      $scope.items = data
      $scope.sellerGoodsMap = CommonService.convertListToMap($scope.items,'id')
      initSearch()
      prepareConst()

  main()