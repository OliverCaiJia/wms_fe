'use strict'

angular.module 'app.controllers'

.controller 'WmsPickOrderListCtrl', ($scope, $routeParams, $filter, CommonService, WmsLogisticOrderService
  WmsLogisticCompanyService, WmsSellerFreightGroupService, WmsAddressService, DeviceDriverService
  WmsPickOrderService, ClickEditService) ->
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
    $scope.searchOption = {"keywords":"","status":""}
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
    promise = WmsLogisticOrderService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()
                
  # update
  $scope.updateLogisticCharge = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateLogisticCharge(logisticOrder)
      promise.then ->
                
  # update
  $scope.updateTotalWeight = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateTotalWeight(logisticOrder)
      promise.then ->
                
  # update
  $scope.updateContainerId = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateContainerId(logisticOrder)
      promise.then ->

  # update
  $scope.updateComment = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateComment(logisticOrder)
      promise.then ->
                
  # update
  $scope.updateLogisticSn = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateLogisticSn(logisticOrder)
      promise.then ->
                
  # update
  $scope.updateLogisticCompanyId = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder)
      promise.then ->

  $scope.printOrder = (id) ->
    params = {pickOrderIds: [id]}
    promise = WmsPickOrderService.getExpressOrderList(params)
    promise.then (orders) ->
      expressOrders = {params: orders}
      promise = DeviceDriverService.printExpressOrder(expressOrders)
      promise.then ->

  $scope.setExpressSn = (pickOrder) ->
    pickOrder.isSetting = true
    params = {logisticOrderId: pickOrder.logisticOrderId}
    promise = WmsLogisticOrderService.setExpressSn(params)
    promise.then (data) ->
      pickOrder.isSetting = false
      if !data.hasOwnProperty('success')
        pickOrder.expressSn = data
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (logisticOrder, fieldName, bool) ->
    ClickEditService.switchNode(logisticOrder, fieldName, bool)
    if fieldName == 'logisticCompanyId' && !$scope.sellerFreightGroupMap.hasOwnProperty(logisticOrder.sellerId)
      params = {sellerId: logisticOrder.sellerId}
      promise = WmsSellerFreightGroupService.listBySellerId(params)
      promise.then (data) ->
        $scope.sellerFreightGroupMap[logisticOrder.sellerId] = data

  $scope.viewLogisticStatus = (status) ->
    if status == 'all'
      $scope.searchOption.status = ''
    else
      $scope.searchOption.status = status

    $scope.search()
    $scope.select($scope.currentPage)
    $scope.displayLogisticStatus = status


  $scope.checkAll = () ->
    boolValue = $scope.verifyAllGoodsIds
    angular.forEach($scope.currentPageItems,(item) ->
      if item.printable && item.expressSn
        $scope.verifyOrderIds[item.id] = boolValue
    )
    $scope.calArrayTrue()

  $scope.calArrayTrue = () ->
    $scope.chosenOrderIdLength = CommonService.calArrayTrue($scope.currentPageItems,$scope.verifyOrderIds,'id')

  $scope.printCheck = () ->
    pickOrderIds = []
    angular.forEach($scope.currentPageItems,(item) ->
      if $scope.verifyOrderIds[item.id]
        pickOrderIds.push(item.id)
    )
    params = {pickOrderIds: pickOrderIds}
    printExpressOrder(params)

  $scope.printOrder = (id) ->
    params = {pickOrderIds: [id]}
    printExpressOrder(params)

  printExpressOrder = (params) ->
    promise = WmsPickOrderService.getExpressOrderList(params)
    promise.then (orders) ->
      expressOrders = {params: orders}
      promise = DeviceDriverService.printExpressOrder(expressOrders)
      promise.then ->


  prepareConst = ->
    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

    promise = WmsAddressService.mapAll()
    promise.then (data) ->
      $scope.addressMap = data

    promise = WmsLogisticOrderService.listAllStatusEnum()
    promise.then (data) ->
      $scope.logisticOrderStatusEnumList = data

  main = ->
    $scope.createLogisticOrder = {}
    $scope.logisticOrder = {}
    $scope.searchOption = {"keywords":"","status":""}
    $scope.sellerFreightGroupMap = {}

    $scope.displayLogisticStatus = 'all'
    $scope.verifyOrderIds = []
    $scope.chosenOrderIdLength = 0

    promise = WmsPickOrderService.listAllJoinLogisticOrder()
    promise.then (data) ->
      $scope.items = data
      $scope.originalItems = data
      angular.forEach($scope.items,(item) ->
        if item.printable && item.expressSn
          $scope.verifyOrderIds[item.id] = false
      )
      initSearch()
    prepareConst()

  main()