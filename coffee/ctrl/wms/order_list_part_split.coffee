'use strict'

angular.module 'app.controllers'

.filter 'calArrayTrue',() ->
  (items) ->
    trueNumber = 0
    angular.forEach items, (item) ->
      if item
        trueNumber = parseInt(trueNumber) + 1
    return trueNumber

.controller 'WmsOrderListPartSplitCtrl', ($scope, $routeParams, $filter, CommonService, WmsOrderService, ClickEditService
  WmsPlatformSourceService, SessionService,WmsSellerService,WmsLogisticCompanyService,WmsSellerFreightGroupService) ->

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

  $scope.search = () ->
    $scope.filteredItems = $filter('filter')($scope.items,$scope.searchOption.keywords)
    $scope.filteredItems = $filter('filter')($scope.filteredItems, {'status':$scope.searchOption.orderStatus})
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
    $scope.searchOption = {
      keywords:"",
      orderStatus:""
    }
    #    $scope.searchOption = {"keywords":"","orderStatus":""}
    $scope.filteredItems = []
    $scope.row = ''
    $scope.numPerPageOpt = [10, 20, 50, 100]
    $scope.searchOption.numPerPage = $scope.numPerPageOpt[0]
    $scope.currentPage = 1
    $scope.currentPageItems = []
    $scope.search()
    $scope.select($scope.currentPage)

  # update
  $scope.updateIdentityCardContrary = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updateIdentityCardContrary(order)
      promise.then ->

# update
  $scope.updateIdentityCardFront = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updateIdentityCardFront(order)
      promise.then ->

# update
  $scope.updateIdentityCard = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updateIdentityCard(order)
      promise.then ->

# update
  $scope.updateConsigneeAddress = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updateConsigneeAddress(order)
      promise.then ->

# update
  $scope.updateConsigneeName = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updateConsigneeName(order)
      promise.then ->

# update
  $scope.updatePhoneNumber = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updatePhoneNumber(order)
      promise.then ->

  $scope.split = ->
    orderIds = []
    angular.forEach($scope.verifyOrderIds,(boolValue,orderId) ->
      if boolValue
        orderIds.unshift(orderId)
    )
    params = {sellerId:$scope.sellerId, orderIds:orderIds,logisticCompanyId:$scope.splitOrder.logisticCompanyId}
    promise = WmsOrderService.splitOrderIds(params)
    promise.then (data) ->
      window.location.reload()


  $scope.checkAll = (verifyOrderIds) ->
    boolValue = $scope.verifyAllGoodsIds
    angular.forEach($scope.currentPageItems,(currentItem) ->
      if verifyOrderIds.hasOwnProperty(currentItem.id)
        verifyOrderIds[currentItem.id] = boolValue
    )
    $scope.calArrayTrue()

  $scope.calArrayTrue = () ->
    trueNumber = 0
    angular.forEach($scope.currentPageItems,(currentItem) ->
      if $scope.verifyOrderIds[currentItem.id]
        trueNumber = parseInt(trueNumber) + 1
    )
    $scope.chosenOrderIdLength = trueNumber

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (order, fieldName, bool) ->
    ClickEditService.switchNode(order, fieldName, bool)

  prepareConst = ->
    promise = WmsPlatformSourceService.mapPlatformSource()
    promise.then (data) ->
      $scope.platformSourceMap = data

    promise = WmsOrderService.listAllOrderStatusEnum()
    promise.then (data) ->
      $scope.orderStatusEnumList = data


    params = { id: $scope.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data
      promise = WmsLogisticCompanyService.mapAll()
      promise.then (data) ->
        $scope.logisticCompanyMap = data
        params = {sellerId: $scope.sellerId}
        promise = WmsSellerFreightGroupService.mapBySellerId(params)
        promise.then (data) ->
          $scope.sellerFreightGroupMap = data
          if $scope.seller.hasOwnProperty('sellerFreightGroupId') && $scope.sellerFreightGroupMap.hasOwnProperty($scope.seller.sellerFreightGroupId)
            $scope.splitOrder.logisticCompanyId = $scope.logisticCompanyMap[$scope.sellerFreightGroupMap[$scope.seller.sellerFreightGroupId].logisticCompanyId].id


  main = ->
    $scope.verifyOrderIds = {}
    $scope.verifyAllGoodsIds = false
    $scope.chosenOrderIdLength = 0
    $scope.splitOrder = {}

    $scope.searchOption = {
      keywords:"",
      orderStatus:""
    }
    $scope.sellerId = SessionService.getSellerId()
    params = {sellerId: SessionService.getSellerId()}
    promise = WmsOrderService.listBySellerIdAndPartSplit(params)
    promise.then (data) ->
      $scope.items = data
      angular.forEach($scope.items,(item) ->
        $scope.verifyOrderIds[item.id] = false
      )
      initSearch()
      prepareConst()

  main()