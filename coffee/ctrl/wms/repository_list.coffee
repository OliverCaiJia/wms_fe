'use strict'

angular.module 'app.controllers'

.controller 'WmsRepositoryListCtrl', ($scope, $routeParams, $filter, CommonService,$i18next, ClickEditService,
  WmsWarehouseService,WmsRepositoryService) ->
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
  $scope.save = ->
    promise = WmsRepositoryService.add($scope.repository)
    promise.then (data) ->
      $scope.repository.id = data
      $scope.items.unshift($scope.repository)
      $scope.createRepository = {}
      $scope.repository = {}
      initSearch()
                
  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsRepositoryService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()
                
  # update
  $scope.update = (repository, fieldName) ->
    if ClickEditService.updateNode(repository, fieldName)
      promise = WmsRepositoryService.update(repository)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (repository, fieldName, bool) ->
    ClickEditService.switchNode(repository, fieldName, bool)

  prepareConst = ->
    promise = WmsRepositoryService.listUseAttribute()
    promise.then (data) ->
      $scope.useAttributeList = data
      $scope.useAttributeMap = []
      for useAttribute in data
        $scope.useAttributeMap[useAttribute] = $i18next("wms:ui.useAttribute."+ useAttribute)


  main = ->
    $scope.createRepository = {}
    $scope.warehouseId = $routeParams.warehouseId
    $scope.repository = {
      warehouseId:$scope.warehouseId
    }
    params = {id:$scope.warehouseId}
    promise = WmsWarehouseService.detail(params)
    promise.then (data) ->
      $scope.warehouse = data

    params = {warehouseId:$scope.warehouseId }
    promise = WmsRepositoryService.listByWarehouseId(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()