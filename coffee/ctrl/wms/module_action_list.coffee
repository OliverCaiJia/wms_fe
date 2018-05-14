'use strict'

angular.module 'app.controllers'

.controller 'WmsModuleActionListCtrl', ($scope, $routeParams, $filter, CommonService, WmsModuleActionService, ClickEditService) ->
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
    promise = WmsModuleActionService.add($scope.moduleAction)
    promise.then (data) ->
      $scope.moduleAction.id = data
      $scope.items.unshift($scope.moduleAction)
      $scope.createModuleAction = {}
      $scope.moduleAction = {}
      initSearch()
                
  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsModuleActionService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()
                
  # update
  $scope.updateName = (moduleAction, fieldName) ->
    if ClickEditService.updateNode(moduleAction, fieldName)
      promise = WmsModuleActionService.updateName(moduleAction)
      promise.then ->
                
  # update
  $scope.updateAlias = (moduleAction, fieldName) ->
    if ClickEditService.updateNode(moduleAction, fieldName)
      promise = WmsModuleActionService.updateAlias(moduleAction)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (moduleAction, fieldName, bool) ->
    ClickEditService.switchNode(moduleAction, fieldName, bool)

  prepareConst = ->

  main = ->
    $scope.createModuleAction = {}
    $scope.moduleAction = {}
    promise = WmsModuleActionService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()