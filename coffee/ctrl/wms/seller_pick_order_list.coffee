'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerPickOrderListCtrl', ($scope, $routeParams, $filter, CommonService,SessionService,ClickEditService,
  WmsLogisticCompanyService, WmsMemberService, WmsAddressService, WmsSellerGoodsService,WmsLogisticOrderService
  WmsPickOrderGoodsService,WmsPickOrderService,WmsSellerFreightGroupService) ->
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

  # update
  $scope.updateComment = (pickOrder, fieldName) ->
    if ClickEditService.updateNode(pickOrder, fieldName)
      promise = WmsLogisticOrderService.updateComment(pickOrder)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (pickOrder, fieldName, bool) ->
    ClickEditService.switchNode(pickOrder, fieldName, bool)

  $scope.viewLogisticStatus = (status) ->
    if status == 'all'
      $scope.searchOption.status = ''
    else
      $scope.searchOption.status = status

    $scope.search()
    $scope.select($scope.currentPage)
    $scope.displayLogisticStatus = status

  $scope.setExpressSn = (pickOrder) ->
    pickOrder.isSetting = true
    params = {logisticOrderId: pickOrder.logisticOrderId}
    promise = WmsLogisticOrderService.setExpressSn(params)
    promise.then (data) ->
      pickOrder.isSetting = false
      if !data.hasOwnProperty('success')
        pickOrder.expressSn = data

  $scope.withdrawAudit = (pickOrderId) ->
    params = {pickOrderId: pickOrderId}
    promise = WmsPickOrderService.withdrawAudit(params)
    promise.then () ->
      $scope.items = CommonService.dropListByData($scope.items,'id',pickOrderId)
      initSearch()

  # update
  $scope.updateLogisticCompanyId = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder)
      promise.then ->

  prepareConst = ->
    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

    params = {sellerId: $scope.sellerId}
    promise = WmsSellerFreightGroupService.listBySellerId(params)
    promise.then (data) ->
      $scope.sellerFreightGroupMap = data

    promise = WmsMemberService.mapMember()
    promise.then (data) ->
      $scope.memberMap = data

    promise = WmsLogisticOrderService.listAllStatusEnum()
    promise.then (data) ->
      $scope.logisticOrderStatusEnumList = data

    promise = WmsAddressService.mapAll()
    promise.then (data) ->
      $scope.addressMap = data

    params = {sellerId: $scope.sellerId}
    promise = WmsSellerGoodsService.listBySellerId(params)
    promise.then (data) ->
      $scope.sellerGoodsList = data
      $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList,'id')

    promise = WmsPickOrderGoodsService.mapPickOrderIdListBySellerId()
    promise.then (data) ->
      $scope.pickOrderGoodsMap = data

  main = ->
    $scope.createLogisticOrder = {}
    $scope.logisticOrder = {}
    $scope.searchOption = {"keywords":"","status":""}
    $scope.sellerFreightGroupMap = {}

    $scope.displayLogisticStatus = 'all'

    $scope.sellerId = SessionService.getSellerId()
    params = {sellerId: $scope.sellerId}
    promise = WmsPickOrderService.listBySellerId(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()
      prepareConst()

  main()