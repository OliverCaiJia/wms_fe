'use strict'

angular.module 'app.controllers'

.controller 'WmsAvailableGoodsGroupListCtrl', ($scope, $routeParams, $filter, CommonService,ClickEditService,SessionService,
  WmsSellerAvailableGoodsGroupService,WmsSellerService,WmsSellerAvailableGoodsService,WmsGoodsService) ->
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
    promise = WmsSellerAvailableGoodsGroupService.add($scope.sellerAvailableGoodsGroup)
    promise.then (data) ->
      $scope.sellerAvailableGoodsGroup.id = data
      $scope.sellerAvailableGoodsGroup.disabled = false
      $scope.items.unshift($scope.sellerAvailableGoodsGroup)
      $scope.createAvailableGoodsGroup = {}
      $scope.sellerAvailableGoodsGroup = {}
      initSearch()


  # update disabled
  $scope.updateDisabled = (sellerAvailableGoodsGroup, bool) ->
    params = {id: sellerAvailableGoodsGroup.id,disabled:bool}
    promise = WmsSellerAvailableGoodsGroupService.updateDisabled(params)
    promise.then ->
      sellerAvailableGoodsGroup.disabled = bool

  # update
  $scope.updateBarCode = (sellerAvailableGoodsGroup, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableGoodsGroup, fieldName)
      promise = WmsSellerAvailableGoodsGroupService.updateBarCode(sellerAvailableGoodsGroup)
      promise.then ->
                
  # update
  $scope.updateGroupName = (sellerAvailableGoodsGroup, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableGoodsGroup, fieldName)
      promise = WmsSellerAvailableGoodsGroupService.updateGroupName(sellerAvailableGoodsGroup)
      promise.then ->

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerAvailableGoodsGroup, fieldName, bool) ->
    ClickEditService.switchNode(sellerAvailableGoodsGroup, fieldName, bool)

  prepareConst = ->
    params = {sellerId: $scope.sellerId, disabled: 0}
    promise = WmsSellerAvailableGoodsService.listBySellerIdAndDisabled(params)
    promise.then (data) ->
      $scope.availableGoodsList = data

    promise = WmsGoodsService.listAll(params)
    promise.then (data) ->
      $scope.goodsList = data
      $scope.goodsMap = CommonService.convertListToMap($scope.goodsList,'id')

  main = ->
    $scope.sellerId = SessionService.getSellerId()
    $scope.createAvailableGoodsGroup = {}
    $scope.sellerAvailableGoodsGroup = {
      sellerId: $scope.sellerId
    }

    params = {sellerId: $scope.sellerId}
    promise = WmsSellerAvailableGoodsGroupService.listBySellerId(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
      prepareConst()

  main()