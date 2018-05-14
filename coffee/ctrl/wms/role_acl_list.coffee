'use strict'

angular.module 'app.controllers'

.controller 'WmsRoleAclListCtrl', ($scope, $routeParams, $filter, WmsRoleAclService, WmsRoleService
  WmsModuleActionService,CommonService,DisplayService) ->
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
    $scope.numPerPageOpt = [100,200,300,400]
    $scope.searchOption.numPerPage = $scope.numPerPageOpt[0]
    $scope.currentPage = 1
    $scope.currentPageItems = []
    $scope.search()
    $scope.select($scope.currentPage)

  $scope.showEmptyObject = ->
    $scope.items = $scope.originalItems
    if $scope.items && $scope.items.length > 0
      console.log($scope.items.length)
      $scope.items = DisplayService.showEmptyObject($scope.items,$scope.roleAclMap)
      initSearch()

  $scope.showExistObject = ->
    $scope.items = $scope.originalItems
    if $scope.items && $scope.items.length > 0
      $scope.items = DisplayService.showExistObject($scope.items,$scope.roleAclMap)
      initSearch()

  $scope.showAll = ->
    $scope.items = $scope.originalItems
    $scope.itemsLength = CommonService.countMapLength(countMap)
    initSearch()

  $scope.countMapLength =(countMap) ->
    CommonService.countMapLength(countMap)
        
  # add
  $scope.add = (moduleActionId) ->
    params = {roleId: $routeParams.roleId, moduleActionId: moduleActionId}
    promise = WmsRoleAclService.add(params)
    promise.then (data) ->
      params.id = data
      $scope.roleAclMap[params.moduleActionId] = params

  # delete
  $scope.delete = (roleAcl) ->
    params = {id: roleAcl.id}
    promise = WmsRoleAclService.delete(params)
    promise.then ->
      delete $scope.roleAclMap[roleAcl.moduleActionId]

  prepareConst = ->
    params = {id: $routeParams.roleId}
    promise = WmsRoleService.detail(params)
    promise.then (data) ->
      $scope.role = data

    params = {roleId: $routeParams.roleId}
    promise = WmsRoleAclService.mapByRoleId(params)
    promise.then (data) ->
      $scope.roleAclMap = data

  main = ->
    $scope.createRoleAcl = {}
    promise = WmsModuleActionService.listAll()
    promise.then (data) ->
      $scope.items = data
      $scope.originalItems = $scope.items
      initSearch()

    prepareConst()

  main()