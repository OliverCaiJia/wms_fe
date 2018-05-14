'use strict'

angular.module 'app.controllers'

.controller 'WmsLogisticOrderImportListCtrl', ($scope, $filter, ClickEditService,CommonService,WmsLogisticOrderService
  WmsLogisticCompanyService, WmsAddressService) ->
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
    $scope.filteredItems = $filter('filter')($scope.filteredItems, {'logisticCompanyId':$scope.searchOption.logisticCompanyId})
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
#    $scope.searchOption = {"keywords":"","logisticCompanyId":""}
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

# update
  $scope.updateExpressSn = (logisticOrder) ->
    promise = WmsLogisticOrderService.updateExpressSn(logisticOrder)
    promise.then ->
      promise = WmsLogisticOrderService.listAllEmptyExpressSn({})
      promise.then (data) ->
        $scope.items = data
        initSearch()

  $scope.import = (refExpressUpload) ->
    $scope.showimporting = true
    promise = WmsLogisticOrderService.importExpressSn(refExpressUpload)
    promise.then ->
      window.location.reload()

  $scope.switchNode = (logisticOrder, fieldName, bool) ->
    ClickEditService.switchNode(logisticOrder, fieldName, bool)

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  prepareConst = ->
    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

    promise = WmsAddressService.mapAll()
    promise.then (data) ->
      $scope.addressMap = data

  main = ->
    $scope.refExpressUpload = {}
    $scope.searchOption = {"keywords":"","logisticCompanyId":""}
    $scope.logisticCompanyId = ""
    $scope.sellerFreightGroupMap = {}
    $scope.createImportRefExpress = {}
    params = {}
    promise = WmsLogisticOrderService.listAllEmptyExpressSn(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()

    prepareConst()

  main()