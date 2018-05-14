'use strict'

angular.module 'app.controllers'

.controller 'WmsResponseInventoryTransferListCtrl', ($scope, $routeParams, $filter, WmsSellerService, WmsMemberService
  WmsInventoryTransferService, SessionService, WmsConfigService) ->
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

  $scope.pass = (node) ->
    params = {id: node.id}
    promise = WmsInventoryTransferService.passInventoryTransfer(params)
    promise.then ->
      node.status = 2

  $scope.reject = (node) ->
    params = {id: node.id}
    promise = WmsInventoryTransferService.rejectInventoryTransfer(params)
    promise.then ->
      node.status = 0

  prepareConst = ->
    promise = WmsSellerService.mapAll()
    promise.then (data) ->
      $scope.sellerMap = data

    promise = WmsMemberService.mapMember()
    promise.then (data) ->
      $scope.memberMap = data

  main = ->
    $scope.imgHost = WmsConfigService.getImgHost()
    $scope.sellerId = SessionService.getSellerId()
    params = {responseSeller: $routeParams.responseSeller}
    promise = WmsInventoryTransferService.listByResponseSeller(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()

    prepareConst()

  main()