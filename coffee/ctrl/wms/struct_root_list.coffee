'use strict'

angular.module 'app.controllers'

.controller 'WmsStructRootListCtrl', ($scope, $routeParams, $filter, CommonService, WmsStructRootService, ClickEditService) ->
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
    promise = WmsStructRootService.add($scope.structRoot)
    promise.then (data) ->
      $scope.structRoot.id = data
      $scope.items.unshift($scope.structRoot)
      $scope.createStructRoot = {}
      $scope.structRoot = {}
      initSearch()
                
  # update
  $scope.updateName = (structRoot, fieldName) ->
    if ClickEditService.updateNode(structRoot, fieldName)
      promise = WmsStructRootService.updateName(structRoot)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (structRoot, fieldName, bool) ->
    ClickEditService.switchNode(structRoot, fieldName, bool)

  prepareConst = ->

  main = ->
    $scope.createStructRoot = {}
    $scope.structRoot = {}
    promise = WmsStructRootService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()