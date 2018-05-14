'use strict'

angular.module 'app.controllers'

.controller 'WmsWarehouseListCtrl', ($scope, $routeParams, $filter, CommonService, WmsWarehouseService, ClickEditService
  WmsAddressService) ->
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
  $scope.warehouse = (rowName)->
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
  $scope.save = ->
    promise = WmsWarehouseService.add($scope.warehouse)
    promise.then (data) ->
      $scope.warehouse.id = data
      $scope.items.unshift($scope.warehouse)
      $scope.createWarehouse = {}
      $scope.warehouse = {}
      initSearch()
                
  # update
  $scope.update = (warehouse, fieldName) ->
    if ClickEditService.updateNode(warehouse, fieldName)
      promise = WmsWarehouseService.update(warehouse)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (warehouse, fieldName, bool) ->
    ClickEditService.switchNode(warehouse, fieldName, bool)

  $scope.getCityList = (warehouse) ->
    params = {level:"2",parentId: warehouse.provinceId}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.cityList = data
    else
      warehouse.cityId = 0
      $scope.cityList = []

  $scope.getDistrictList = (warehouse) ->
    params = {level:"3",parentId: warehouse.cityId}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.districtList = data
    else
      warehouse.districtId = 0
      $scope.districtList = []

  prepareConst = ->
    promise = WmsAddressService.listAllProvince()
    promise.then (data) ->
      $scope.provinceList = data

    promise = WmsAddressService.mapAll()
    promise.then (data) ->
      $scope.addressMap = data


  main = ->
    $scope.createWarehouse = {}
    $scope.warehouse = {}
    promise = WmsWarehouseService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()