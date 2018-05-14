'use strict'

angular.module 'app.controllers'

.controller 'WmsPickOrderWaitDeliveryListCtrl', ($scope, $routeParams, $filter, CommonService, WmsLogisticOrderService,
  ClickEditService,WmsPickOrderService,WmsLogisticCompanyService,DeviceDriverService,$location) ->
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
    if $scope.filteredItems
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
    $scope.searchOption = {keywords:""}
    $scope.filteredItems = []
    $scope.row = ''
    $scope.numPerPageOpt = [10, 20, 100, 200]
    $scope.searchOption.numPerPage = $scope.numPerPageOpt[0]
    $scope.currentPage = 1
    $scope.currentPageItems = []
    $scope.search()
    $scope.select($scope.currentPage)

  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsLogisticOrderService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (logisticOrder, fieldName, bool) ->
    ClickEditService.switchNode(logisticOrder, fieldName, bool)

  $scope.printOrder = (id) ->
    params = {pickOrderIds: [id]}
    promise = WmsPickOrderService.getExpressOrderList(params)
    promise.then (orders) ->
      expressOrders = {params: orders}
      promise = DeviceDriverService.printExpressOrder(expressOrders)
      promise.then ->

  $scope.weighAgain = (pickOrder) ->
    if !pickOrder.totalWeight
      $location.path("/wms/pick_order_container").search("id", pickOrder.id)

  prepareConst = ->
    promise = WmsLogisticOrderService.listAllStatusEnum()
    promise.then (data) ->
      $scope.logisticOrderStatusEnumList = data

    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

  main = ->
    $scope.createLogisticOrder = {}
    $scope.logisticOrder = {}
    $scope.verifyOrderIds = []
    $scope.chosenOrderIdLength = 0

    promise = WmsPickOrderService.waitDeliveryList()
    promise.then (data) ->
      $scope.items = data
      angular.forEach($scope.items,(item) ->
        $scope.verifyOrderIds[item.id] = false
      )
      initSearch()
      prepareConst()

  main()