'use strict'

angular.module 'app.controllers'

.controller 'WmsExpressOrderListCtrl', ($scope, $routeParams, $filter, WmsLogisticOrderService, WmsAddressService
  WmsLogisticCompanyService, WmsSellerFreightGroupService, WmsConfigService, ClickEditService) ->
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

  # update
  $scope.updateLogisticCompanyId = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder)
      promise.then ->

  $scope.switchNode = (logisticOrder, fieldName, bool) ->
    ClickEditService.switchNode(logisticOrder, fieldName, bool)
    if fieldName == 'logisticCompanyId' && !$scope.sellerFreightGroupMap.hasOwnProperty(logisticOrder.sellerId)
      params = {sellerId: logisticOrder.sellerId}
      promise = WmsSellerFreightGroupService.listBySellerId(params)
      promise.then (data) ->
        $scope.sellerFreightGroupMap[logisticOrder.sellerId] = data

  $scope.checkLogisticCompany = ->
    params = {
      logisticCompanyId: $scope.logisticCompanyId
      isExport: 0
    }
    promise = WmsLogisticOrderService.listByLogisticCompanyIdAndIsExport(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()

  $scope.exportOrder = (logisticCompanyId) ->
    params = {logisticCompanyId: logisticCompanyId}
    promise = WmsLogisticOrderService.exportExpressOrder(params)
    promise.then (data) ->
      url = WmsConfigService.getFileHost() + '/export_file/express_order?filePath=' + data
      window.location.href = url

  prepareConst = ->
    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

    promise = WmsAddressService.mapAll()
    promise.then (data) ->
      $scope.addressMap = data

  main = ->
    $scope.logisticCompanyId = ""
    $scope.fileHost = WmsConfigService.getFileHost()
    $scope.sellerFreightGroupMap = {}
    params = {isExport: 0}
    promise = WmsLogisticOrderService.listByIsExport(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()

    prepareConst()

  main()