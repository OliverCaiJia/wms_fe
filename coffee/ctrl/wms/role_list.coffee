'use strict'

angular.module 'app.controllers'

.controller 'WmsRoleListCtrl', ($scope, $routeParams, $filter, CommonService, WmsRoleService, ClickEditService) ->
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
    $scope.numPerPageOpt = [30, 50, 100, 200]
    $scope.searchOption.numPerPage = $scope.numPerPageOpt[0]
    $scope.currentPage = 1
    $scope.currentPageItems = []
    $scope.search()
    $scope.select($scope.currentPage)

  # add
  $scope.add = ->
    promise = WmsRoleService.add($scope.role)
    promise.then (data) ->
      $scope.role.id = data
      $scope.items.unshift($scope.role)
      $scope.createRole = {}
      $scope.role = {}
      initSearch()
                
  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsRoleService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()
                
  # update
  $scope.updateName = (role, fieldName) ->
    if ClickEditService.updateNode(role, fieldName)
      promise = WmsRoleService.updateName(role)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (role, fieldName, bool) ->
    ClickEditService.switchNode(role, fieldName, bool)

  prepareConst = ->

  main = ->
    $scope.createRole = {}
    $scope.role = {
      sellerRole: false
    }
    promise = WmsRoleService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
    prepareConst()

  main()