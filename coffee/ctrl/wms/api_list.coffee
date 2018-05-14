'use strict'

angular.module 'app.controllers'

.controller 'WmsApiListCtrl', ($scope, $routeParams, $filter, CommonService, WmsApiService, ClickEditService) ->
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
    promise = WmsApiService.add($scope.api)
    promise.then (data) ->
      $scope.api.id = data
      $scope.items.unshift($scope.api)
      $scope.createApi = {}
      $scope.api = {}
      initSearch()
                
  # update
  $scope.updateResourceName = (api, fieldName) ->
    if ClickEditService.updateNode(api, fieldName)
      promise = WmsApiService.updateResourceName(api)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (api, fieldName, bool) ->
    ClickEditService.switchNode(api, fieldName, bool)

  prepareConst = ->
    promise = WmsApiService.actionList()
    promise.then (data) ->
      $scope.actionList = data

  main = ->
    $scope.createApi = {}
    $scope.api = {}
    promise = WmsApiService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()