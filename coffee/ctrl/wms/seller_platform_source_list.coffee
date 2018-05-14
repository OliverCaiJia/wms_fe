'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerPlatformSourceListCtrl', ($scope, $routeParams, $filter, CommonService, SessionService
  WmsSellerPlatformSourceService, WmsPlatformSourceService, ClickEditService) ->
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
    promise = WmsSellerPlatformSourceService.add($scope.sellerPlatformSource)
    promise.then (data) ->
      $scope.sellerPlatformSource.id = data
      $scope.items.unshift($scope.sellerPlatformSource)
      $scope.createSellerPlatformSource = {}
      $scope.sellerPlatformSource = {sellerId: SessionService.getSellerId(), subscribeService: 1}
      initSearch()
                
  # update
  $scope.updateSubscribeService = (sellerPlatformSource, fieldName) ->
    if ClickEditService.updateNode(sellerPlatformSource, fieldName)
      promise = WmsSellerPlatformSourceService.updateSubscribeService(sellerPlatformSource)
      promise.then ->
                
  # update
  $scope.updateSecret = (sellerPlatformSource, fieldName) ->
    if ClickEditService.updateNode(sellerPlatformSource, fieldName)
      promise = WmsSellerPlatformSourceService.updateSecret(sellerPlatformSource)
      promise.then ->
                
  # update
  $scope.updateAppKey = (sellerPlatformSource, fieldName) ->
    if ClickEditService.updateNode(sellerPlatformSource, fieldName)
      promise = WmsSellerPlatformSourceService.updateAppKey(sellerPlatformSource)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerPlatformSource, fieldName, bool) ->
    ClickEditService.switchNode(sellerPlatformSource, fieldName, bool)

  prepareConst = ->
    promise = WmsPlatformSourceService.mapPlatformSource()
    promise.then (data) ->
      $scope.platformSourceMap = data

  main = ->
    $scope.createSellerPlatformSource = {}
    $scope.sellerPlatformSource = {sellerId: SessionService.getSellerId(), subscribeService: 1}
    params = {sellerId: SessionService.getSellerId()}
    promise = WmsSellerPlatformSourceService.listBySellerId(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()

    prepareConst()

  main()