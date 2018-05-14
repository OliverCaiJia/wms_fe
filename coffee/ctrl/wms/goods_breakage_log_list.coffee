'use strict'

angular.module 'app.controllers'

.controller 'WmsGoodsBreakageLogListCtrl', ($scope, $routeParams, $filter, WmsGoodsBreakageLogService, WmsSellerService
  WmsSellerGoodsService, WmsMemberService,CommonService) ->
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
    $scope.filteredItems = $filter('filter')($scope.filteredItems, {'status':$scope.searchOption.status})
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
    $scope.searchOption = {"keywords":"", "status": 1}
    $scope.filteredItems = []
    $scope.row = ''
    $scope.numPerPageOpt = [10, 20, 50, 100]
    $scope.searchOption.numPerPage = $scope.numPerPageOpt[0]
    $scope.currentPage = 1
    $scope.currentPageItems = []
    $scope.search()
    $scope.select($scope.currentPage)

  $scope.searchByStatus = (status) ->
    $scope.searchOption.status = status
    $scope.search()

  # pass
  $scope.pass = (goodsBreakageLog) ->
    promise = WmsGoodsBreakageLogService.pass(goodsBreakageLog)
    promise.then ->
      goodsBreakageLog.status = 3
      initSearch()
                
  # reject
  $scope.reject = (goodsBreakageLog) ->
    promise = WmsGoodsBreakageLogService.reject(goodsBreakageLog)
    promise.then ->
      goodsBreakageLog.status = 2
      initSearch()

  prepareConst = ->
    promise = WmsGoodsBreakageLogService.statusEnumList()
    promise.then (data) ->
      $scope.statusEnumList = data

    promise = WmsSellerService.mapAll()
    promise.then (data) ->
      $scope.sellerMap = data

    promise = WmsSellerGoodsService.listAll()
    promise.then (data) ->
      $scope.sellerGoodsList = data
      $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList,'id')

    promise = WmsMemberService.mapMember()
    promise.then (data) ->
      $scope.memberMap = data

  main = ->
    $scope.createGoodsBreakageLog = {}
    $scope.goodsBreakageLog = {}
    promise = WmsGoodsBreakageLogService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()