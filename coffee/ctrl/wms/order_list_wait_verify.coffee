'use strict'

angular.module 'app.controllers'

.controller 'WmsOrderListWaitVerifyCtrl', ($scope, $routeParams, $filter, CommonService, WmsOrderService, ClickEditService
  WmsPlatformSourceService, SessionService,$i18next,WmsAddressService,WmsSellerPlatformSourceService) ->
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
#    $scope.filteredItems = $filter('filter')($scope.filteredItems, {'status':$scope.searchOption.orderStatus})
    $scope.onFilterChange()

  # orderBy
  $scope.orderSort = (rowName)->
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

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (order, fieldName, bool) ->
    ClickEditService.switchNode(order, fieldName, bool)

  $scope.add = (order) ->
    promise = WmsOrderService.add(order)
    promise.then (data)->
      order.id = data
      order.status = 0
      $scope.items.unshift(order)
      $scope.createOrder = {}
      initSearch()

  $scope.searchPlatformSource = (platformSource) ->
    if platformSource == 'all'
      $scope.items = $scope.originalItems
      $scope.displayPlatformSource.name  = $i18next('global:ui.button.all')
    else
      $scope.items = $filter('filter')($scope.originalItems, {'platformSourceId':platformSource.id})
      $scope.search()
      $scope.select($scope.currentPage)
      $scope.displayPlatformSource.name = platformSource.name

  $scope.getCityList = (order) ->
    params = {level:"2",parentId: order.province}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.cityList = data
    else
      order.city = 0
      $scope.cityList = []

  $scope.getDistrictList = (order) ->
    params = {level:"3",parentId: order.city}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.districtList = data
    else
      order.district = 0
      $scope.districtList = []

  prepareConst = ->
    promise = WmsPlatformSourceService.mapPlatformSource()
    promise.then (data) ->
      $scope.platformSourceMap = data

    params = {sellerId: SessionService.getSellerId()}
    promise = WmsSellerPlatformSourceService.listBySellerId(params)
    promise.then (data) ->
      $scope.sellerPlatformSourceList = data
      $scope.order.platformSourceId = $scope.sellerPlatformSourceList[0].platformSourceId

    promise = WmsOrderService.listAllOrderStatusEnum()
    promise.then (data) ->
      $scope.orderStatusEnumList = data

    promise = WmsAddressService.listAllProvince()
    promise.then (data) ->
      $scope.provinceList = data

  main = ->
    $scope.searchOption = {
      keywords:"",
      orderStatus:""
    }
    $scope.createOrder = {}
    $scope.order = {}

    $scope.displayPlatformSource = {}
    params = {sellerId: SessionService.getSellerId()}
    promise = WmsOrderService.listBySellerIdAndWaitVerify(params)
    promise.then (data) ->
      $scope.items = data
      $scope.originalItems = data
      initSearch()
      prepareConst()

  main()