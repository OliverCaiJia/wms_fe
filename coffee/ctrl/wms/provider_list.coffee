'use strict'

angular.module 'app.controllers'

.controller 'WmsProviderListCtrl', ($scope, $routeParams, $filter, CommonService, WmsProviderService, ClickEditService) ->
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
    promise = WmsProviderService.add($scope.provider)
    promise.then (data) ->
      $scope.provider.id = data
      $scope.items.unshift($scope.provider)
      $scope.createProvider = {}
      $scope.provider = {}
      initSearch()
                
  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsProviderService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()
                
  # update
  $scope.updateVersion = (provider, fieldName) ->
    if ClickEditService.updateNode(provider, fieldName)
      promise = WmsProviderService.updateVersion(provider)
      promise.then ->
                
  # update
  $scope.updateFormat = (provider, fieldName) ->
    if ClickEditService.updateNode(provider, fieldName)
      promise = WmsProviderService.updateFormat(provider)
      promise.then ->
                
  # update
  $scope.updateAppSecret = (provider, fieldName) ->
    if ClickEditService.updateNode(provider, fieldName)
      promise = WmsProviderService.updateAppSecret(provider)
      promise.then ->
                
  # update
  $scope.updateAppKey = (provider, fieldName) ->
    if ClickEditService.updateNode(provider, fieldName)
      promise = WmsProviderService.updateAppKey(provider)
      promise.then ->
                
  # update
  $scope.updateFilename = (provider, fieldName) ->
    if ClickEditService.updateNode(provider, fieldName)
      promise = WmsProviderService.updateFilename(provider)
      promise.then ->
                
  # update
  $scope.updatePort = (provider, fieldName) ->
    if ClickEditService.updateNode(provider, fieldName)
      promise = WmsProviderService.updatePort(provider)
      promise.then ->
                
  # update
  $scope.updateHostname = (provider, fieldName) ->
    if ClickEditService.updateNode(provider, fieldName)
      promise = WmsProviderService.updateHostname(provider)
      promise.then ->
                
  # update
  $scope.updateScheme = (provider, fieldName) ->
    if ClickEditService.updateNode(provider, fieldName)
      promise = WmsProviderService.updateScheme(provider)
      promise.then ->
                
  # update
  $scope.updateName = (provider, fieldName) ->
    if ClickEditService.updateNode(provider, fieldName)
      promise = WmsProviderService.updateName(provider)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (provider, fieldName, bool) ->
    ClickEditService.switchNode(provider, fieldName, bool)

  prepareConst = ->
    promise = WmsProviderService.schemeList()
    promise.then (data) ->
      $scope.schemeList = data

  main = ->
    $scope.createProvider = {}
    $scope.provider = {}
    promise = WmsProviderService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()