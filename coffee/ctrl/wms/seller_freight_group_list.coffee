'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerFreightGroupListCtrl', ($scope, $routeParams, $filter, CommonService, WmsSellerFreightGroupService
  WmsLogisticCompanyService, WmsFreightGroupService, WmsSellerService, ClickEditService) ->
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
    promise = WmsSellerFreightGroupService.add($scope.sellerFreightGroup)
    promise.then (data) ->
      $scope.sellerFreightGroup.id = data
      $scope.items.unshift($scope.sellerFreightGroup)
      $scope.createSellerFreightGroup = {}
      $scope.sellerFreightGroup = {}
      initSearch()
                
  # update
  $scope.updateFreightGroupId = (sellerFreightGroup, fieldName) ->
    if ClickEditService.updateNode(sellerFreightGroup, fieldName)
      promise = WmsSellerFreightGroupService.updateFreightGroupId(sellerFreightGroup)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerFreightGroup, fieldName, bool) ->
    if fieldName == 'freightGroupId' && !$scope.companyFreightGroup.hasOwnProperty(sellerFreightGroup.logisticCompanyId)
      $scope.companyFreightGroup[sellerFreightGroup.logisticCompanyId] = {}
      params = {logisticCompanyId: sellerFreightGroup.logisticCompanyId}
      promise = WmsFreightGroupService.listByLogisticCompanyId(params)
      promise.then (data) ->
        $scope.companyFreightGroup[sellerFreightGroup.logisticCompanyId] = data
    ClickEditService.switchNode(sellerFreightGroup, fieldName, bool)

  $scope.getFreightGroupListByLogisticCompanyId = ->
    params = {logisticCompanyId: $scope.sellerFreightGroup.logisticCompanyId}
    promise = WmsFreightGroupService.listByLogisticCompanyId(params)
    promise.then (data) ->
      $scope.freightGroupList = data

  prepareConst = ->
    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

    promise = WmsFreightGroupService.mapAll()
    promise.then (data) ->
      $scope.freightGroupMap = data

    params = {id: $routeParams.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data

  main = ->
    $scope.createSellerFreightGroup = {}
    $scope.sellerFreightGroup = {sellerId: $routeParams.sellerId}
    $scope.companyFreightGroup = {}
    params = {sellerId: $routeParams.sellerId}
    promise = WmsSellerFreightGroupService.listBySellerId(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()

    prepareConst()

  main()