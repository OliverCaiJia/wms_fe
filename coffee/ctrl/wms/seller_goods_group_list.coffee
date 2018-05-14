'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerGoodsGroupListCtrl', ($scope, $routeParams, $filter, CommonService, WmsSellerGoodsService
  WmsGoodsService, WmsPlatformSourceService, WmsSellerAvailableGoodsService, ClickEditService, SessionService,
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
    $scope.filteredItems = $filter('filter')($scope.availableGoodsGroupList, $scope.searchOption.keywords)
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

  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsSellerGoodsService.delete(params)
    promise.then ->
      getSellerGoodsListByPlatformSource()

  # update
  $scope.updateUniqueCode = (sellerGoods, fieldName) ->
    if sellerGoods.id
      if ClickEditService.updateNode(sellerGoods, fieldName)
        promise = WmsSellerGoodsService.updateUniqueCode(sellerGoods)
        promise.then ->
    else
      promise = WmsSellerGoodsService.add(sellerGoods)
      promise.then (data) ->
        sellerGoods.id = data

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerGoods, fieldName, bool) ->
    ClickEditService.switchNode(sellerGoods, fieldName, bool)

  $scope.showSellerGoodsMap = (platformSourceId,objectId, fieldName) ->
    if $scope.sellerGroupMap[platformSourceId] == undefined || $scope.sellerGroupMap[platformSourceId] == null
      $scope.sellerGroupMap[platformSourceId] = []
    if $scope.sellerGroupMap[platformSourceId][objectId] == undefined || $scope.sellerGroupMap[platformSourceId][objectId] == null
      $scope.sellerGroupMap[platformSourceId][objectId] = {}
      $scope.sellerGroupMap[platformSourceId][objectId] = {
        "uniqueCode":" "
        "objectId":objectId
        "platformSourceId":platformSourceId
        "sellerId": SessionService.getSellerId()
        "goodsType":"group"
      }
    $scope.switchNode($scope.sellerGroupMap[platformSourceId][objectId],fieldName,true)


  getSellerGoodsListByPlatformSource = () ->
    params = {sellerId: SessionService.getSellerId(),goodsType:"group"}
    promise = WmsSellerGoodsService.listBySellerIdAndGoodsType(params)
    promise.then (data) ->
      $scope.sellerGroupList = data
      $scope.sellerGroupMapByObjectId = CommonService.convertListToMap($scope.sellerGroupList,"objectId")
      $scope.sellerGroupListByPlatformSource = []
      angular.forEach($scope.platformSourceMap,(item)->
        $scope.sellerGroupListByPlatformSource[item.id] = []
      )
      angular.forEach($scope.sellerGroupList,(sellerGoods)->
        if $scope.sellerGroupListByPlatformSource[sellerGoods.platformSourceId] == undefined
          $scope.sellerGroupListByPlatformSource[sellerGoods.platformSourceId] = []
        $scope.sellerGroupListByPlatformSource[sellerGoods.platformSourceId].push(sellerGoods)
      )
      $scope.sellerGroupMap = []
      angular.forEach($scope.sellerGroupListByPlatformSource,(sellerGroupList,platformSourceId)->
        if sellerGroupList.length > 0
          $scope.sellerGroupMap[platformSourceId] = CommonService.convertListToMap(sellerGroupList,"objectId")
        else
          $scope.sellerGroupMap[platformSourceId] = {}
      )
      initSearch()

  prepareConst = ->
    promise = WmsPlatformSourceService.mapPlatformSource()
    promise.then (data) ->
      $scope.platformSourceMap = data
      $scope.sellerGroupListByPlatformSource = []
      getSellerGoodsListByPlatformSource()

  main = ->
    $scope.createSellerGoods = {}
    $scope.sellerGroupListByPlatformSource = []

    $scope.sellerGoods = {sellerId: SessionService.getSellerId()}
    $scope.sellerId = SessionService.getSellerId()

    params = {sellerId: $scope.sellerId }
    promise = WmsSellerAvailableGoodsGroupService.listBySellerId(params)
    promise.then (data) ->
      $scope.availableGoodsGroupList = data
      prepareConst()

  main()