'use strict'

angular.module 'app.controllers'

.controller 'WmsContainerListCtrl', ($scope, $routeParams, $filter, CommonService, WmsContainerService, ClickEditService,
  WmsLogisticRequireService) ->
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
    promise = WmsContainerService.add($scope.container)
    promise.then (data) ->
      $scope.container.id = data
      $scope.items.unshift($scope.container)
      $scope.createContainer = {}
      $scope.container = {}
      initSearch()

  # update
  $scope.updatePackingCharge = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updatePackingCharge(container)
      promise.then ->

  # update
  $scope.updateLogisticRequire = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateLogisticRequire(container)
      promise.then ->
                
  # update
  $scope.updateHeight = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateHeight(container)
      promise.then ->
                
  # update
  $scope.updateWidth = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateWidth(container)
      promise.then ->
                
  # update
  $scope.updateLength = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateLength(container)
      promise.then ->
                
  # update
  $scope.updateName = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateName(container)
      promise.then ->
                
  # update
  $scope.updateBarCode = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateBarCode(container)
      promise.then ->

# update
  $scope.updateWeight = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateWeight(container)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (container, fieldName, bool) ->
    ClickEditService.switchNode(container, fieldName, bool)

  $scope.checkLogisticRequire = () ->
    $scope.container.logisticRequire = []
    angular.forEach($scope.logisticRequireEnum,(require)->
      if $scope.logisticRequireList[require]
        $scope.container.logisticRequire.push(require)
    )


  prepareConst = ->
    promise = WmsLogisticRequireService.listAll()
    promise.then (data) ->
      $scope.logisticRequireEnum = data
      $scope.logisticRequireList = []
      angular.forEach($scope.logisticRequireEnum,(require)->
        $scope.logisticRequireList[require] = false
      )

  main = ->
    $scope.createContainer = {}
    $scope.container = {}
    promise = WmsContainerService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
      prepareConst()

  main()