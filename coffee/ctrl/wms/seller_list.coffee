'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerListCtrl', ($scope, $routeParams, $filter, CommonService, WmsSellerService, WmsAddressService
  WmsLogisticCompanyService, WmsSellerFreightGroupService, ClickEditService) ->
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
    promise = WmsSellerService.add($scope.seller)
    promise.then (data) ->
      $scope.seller.id = data
      $scope.seller.accountBalance = 0.00
      $scope.items.unshift($scope.seller)
      $scope.createSeller = {}
      $scope.seller = {}
      initSearch()
                
  # update
  $scope.updateName = (seller, fieldName) ->
    if ClickEditService.updateNode(seller, fieldName)
      promise = WmsSellerService.updateName(seller)
      promise.then ->
                
  # update
  $scope.updateComment = (seller, fieldName) ->
    if ClickEditService.updateNode(seller, fieldName)
      promise = WmsSellerService.updateComment(seller)
      promise.then ->

  # update
  $scope.updateSellerFreightGroupId = (seller, fieldName) ->
    if ClickEditService.updateNode(seller, fieldName)
      promise = WmsSellerService.updateSellerFreightGroupId(seller)
      promise.then ->
                
  # update
  $scope.updateIsWeightSet = (seller, fieldName) ->
    if ClickEditService.updateNode(seller, fieldName)
      promise = WmsSellerService.updateIsWeightSet(seller)
      promise.then ->
                
  # update
  $scope.updateSellerFreightGroupId = (seller, fieldName) ->
    if ClickEditService.updateNode(seller, fieldName)
      promise = WmsSellerService.updateSellerFreightGroupId(seller)
      promise.then ->
                
  # update
  $scope.updateCreditLine = (seller, fieldName) ->
    if ClickEditService.updateNode(seller, fieldName)
      promise = WmsSellerService.updateCreditLine(seller)
      promise.then ->

  $scope.getCityList = ->
    params = {level:"2",parentId: $scope.seller.province}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.cityList = data
    else
      $scope.seller.city = 0
      $scope.cityList = []

  $scope.getDistrictList = ->
    params = {level:"3",parentId: $scope.seller.city}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.districtList = data
    else
      $scope.seller.district = 0
      $scope.districtList = []

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (seller, fieldName, bool) ->
    ClickEditService.switchNode(seller, fieldName, bool)

  prepareConst = ->
    promise = WmsAddressService.listAllProvince()
    promise.then (data) ->
      $scope.provinceList = data

    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

    promise = WmsSellerFreightGroupService.listAll()
    promise.then (data) ->
      for item in data
        $scope.sellerFreightGroupMap[item.id] = item
        if !$scope.sellerFreightGroupList.hasOwnProperty(item.sellerId)
          $scope.sellerFreightGroupList[item.sellerId] = []
        $scope.sellerFreightGroupList[item.sellerId].unshift(item)

  main = ->
    $scope.createSeller = {}
    $scope.seller = {}
    $scope.sellerFreightGroupMap = {}
    $scope.sellerFreightGroupList = {}

    promise = WmsSellerService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()