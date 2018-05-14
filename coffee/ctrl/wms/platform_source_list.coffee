'use strict'

angular.module 'app.controllers'

.controller 'WmsPlatformSourceListCtrl', ($scope, $routeParams, $filter, CommonService, WmsPlatformSourceService, ClickEditService) ->
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
    promise = WmsPlatformSourceService.add($scope.platformSource)
    promise.then (data) ->
      $scope.platformSource.id = data
      $scope.items.unshift($scope.platformSource)
      $scope.createPlatformSource = {}
      $scope.platformSource = {}
      initSearch()
                
  # update
  $scope.updateName = (platformSource, fieldName) ->
    if ClickEditService.updateNode(platformSource, fieldName)
      promise = WmsPlatformSourceService.updateName(platformSource)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (platformSource, fieldName, bool) ->
    ClickEditService.switchNode(platformSource, fieldName, bool)

  prepareConst = ->

  main = ->
    $scope.createPlatformSource = {}
    $scope.platformSource = {}
    promise = WmsPlatformSourceService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()