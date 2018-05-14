'use strict'

angular.module 'app.controllers'

.controller 'WmsFreightGroupListCtrl', ($scope, $routeParams, $filter, CommonService, WmsFreightGroupService
  WmsLogisticCompanyService, ClickEditService) ->
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
    promise = WmsFreightGroupService.add($scope.freightGroup)
    promise.then (data) ->
      $scope.freightGroup.id = data
      $scope.items.unshift($scope.freightGroup)
      $scope.createFreightGroup = {}
      $scope.freightGroup = {}
      initSearch()
                
  # update
  $scope.updateAddedWeightPrice = (freightGroup, fieldName) ->
    if ClickEditService.updateNode(freightGroup, fieldName)
      promise = WmsFreightGroupService.updateAddedWeightPrice(freightGroup)
      promise.then ->
                
  # update
  $scope.updateFirstWeightPrice = (freightGroup, fieldName) ->
    if ClickEditService.updateNode(freightGroup, fieldName)
      promise = WmsFreightGroupService.updateFirstWeightPrice(freightGroup)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (freightGroup, fieldName, bool) ->
    ClickEditService.switchNode(freightGroup, fieldName, bool)

  prepareConst = ->
    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

  main = ->
    $scope.createFreightGroup = {}
    $scope.freightGroup = {}
    promise = WmsFreightGroupService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()