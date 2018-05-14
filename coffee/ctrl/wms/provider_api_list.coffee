'use strict'

angular.module 'app.controllers'

.controller 'WmsProviderApiListCtrl', ($scope, $routeParams, $filter, CommonService, WmsProviderApiService, WmsApiService
  WmsProviderService, ClickEditService) ->
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
    promise = WmsProviderApiService.add($scope.providerApi)
    promise.then (data) ->
      $scope.providerApi.id = data
      $scope.items.unshift($scope.providerApi)
      $scope.createProviderApi = {}
      $scope.providerApi = {apiId: $routeParams.apiId}
      initSearch()
                
  # update
  $scope.updateVersion = (providerApi, fieldName) ->
    if ClickEditService.updateNode(providerApi, fieldName)
      promise = WmsProviderApiService.updateVersion(providerApi)
      promise.then ->
                
  # update
  $scope.updateProviderId = (providerApi, fieldName) ->
    if ClickEditService.updateNode(providerApi, fieldName)
      promise = WmsProviderApiService.updateProviderId(providerApi)
      promise.then ->
                
  # update
  $scope.updateFilename = (providerApi, fieldName) ->
    if ClickEditService.updateNode(providerApi, fieldName)
      promise = WmsProviderApiService.updateFilename(providerApi)
      promise.then ->
                
  # update
  $scope.updateHostName = (providerApi, fieldName) ->
    if ClickEditService.updateNode(providerApi, fieldName)
      promise = WmsProviderApiService.updateHostName(providerApi)
      promise.then ->
                
  # update
  $scope.updateAction = (providerApi, fieldName) ->
    if ClickEditService.updateNode(providerApi, fieldName)
      promise = WmsProviderApiService.updateAction(providerApi)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (providerApi, fieldName, bool) ->
    ClickEditService.switchNode(providerApi, fieldName, bool)

  prepareConst = ->
    promise = WmsProviderService.mapAll()
    promise.then (data) ->
      $scope.providerMap = data

    params = {id: $routeParams.apiId}
    promise = WmsApiService.detail(params)
    promise.then (data) ->
      $scope.api = data

  main = ->
    $scope.createProviderApi = {}
    $scope.providerApi = {apiId: $routeParams.apiId}
    params = {apiId: $routeParams.apiId}
    promise = WmsProviderApiService.listByApiId(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()

    prepareConst()

  main()