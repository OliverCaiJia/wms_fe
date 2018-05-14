'use strict'

angular.module 'app.controllers'

.controller 'WmsLocationListCtrl', ($scope, $routeParams, $filter, CommonService, WmsLocationService, ClickEditService
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
    promise = WmsLocationService.add($scope.location)
    promise.then (data) ->
      $scope.location.id = data
      $scope.items.unshift($scope.location)
      $scope.createLocation = {}
      $scope.location = {
        repositoryId:$routeParams.repositoryId
        disabled:true
      }
      initSearch()
                
  # update
  $scope.update = (location, fieldName) ->
    if ClickEditService.updateNode(location, fieldName)
      promise = WmsLocationService.update(location)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (location, fieldName, bool) ->
    ClickEditService.switchNode(location, fieldName, bool)

  prepareConst = ->
    promise = WmsLocationService.ABCListAll()
    promise.then (data) ->
      $scope.ABCList = data

  main = ->
    $scope.createLocation = {}
    $scope.location = {
      repositoryId:$routeParams.repositoryId
      disabled:true
    }
    promise = WmsRepositoryService.detail({id:$routeParams.repositoryId})
    promise.then (data) ->
      $scope.repository = data

    params = {repositoryId:$routeParams.repositoryId}
    promise = WmsLocationService.listByRepositoryId(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()


    prepareConst()

  main()