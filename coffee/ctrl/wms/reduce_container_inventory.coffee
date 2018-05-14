'use strict'

angular.module 'app.controllers'

.controller 'WmsReduceContainerInventoryCtrl', ($scope, $routeParams, WmsContainerService, WmsContainerInventoryLogService
  WmsMemberService) ->
  $scope.select = (page) ->
    start = (page - 1) * $scope.numPerPage
    end = start + $scope.numPerPage
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

  # initSearch
  initSearch = ->
    $scope.filteredItems = []
    $scope.row = ''
    $scope.numPerPageOpt = [5, 10, 20, 50, 100]
    $scope.numPerPage = $scope.numPerPageOpt[0]
    $scope.currentPage = 1
    $scope.currentPageItems = []
    $scope.filteredItems = $scope.containerInventoryLogList
    $scope.select($scope.currentPage)

  $scope.calcInventory = ->
    if $scope.containerInventoryLog.number
      totalStr = $scope.container.totalInventory + ' - ' + $scope.containerInventoryLog.number + " = "
      $scope.containerInventoryLog.calcTotalInventory = totalStr + (parseInt($scope.container.totalInventory) - parseInt($scope.containerInventoryLog.number))
      postStr = $scope.container.postInventory + ' - ' + $scope.containerInventoryLog.number + " = "
      $scope.containerInventoryLog.calcPostInventory = postStr + (parseInt($scope.container.postInventory) - parseInt($scope.containerInventoryLog.number))
    else
      $scope.containerInventoryLog.calcTotalInventory = ""
      $scope.containerInventoryLog.calcPostInventory =""

  $scope.reduceInventory = (containerInventoryLog) ->
    promise = WmsContainerInventoryLogService.reduceInventory($scope.containerInventoryLog)
    promise.then ->
      $scope.container.totalInventory = parseInt($scope.container.totalInventory) - parseInt($scope.containerInventoryLog.number)
      $scope.container.postInventory = parseInt($scope.container.postInventory) - parseInt($scope.containerInventoryLog.number)
      $scope.containerInventoryLog = {containerId: $scope.container.id}
      getContainerInventoryLogList()

  getContainerInventoryLogList = ->
    params = {containerId: $routeParams.containerId}
    promise = WmsContainerInventoryLogService.listByContainerId(params)
    promise.then (data) ->
      $scope.containerInventoryLogList = data
      initSearch()

  prepareConst = ->
    getContainerInventoryLogList()

    promise = WmsMemberService.mapMember()
    promise.then (data) ->
      $scope.memberMap = data

  main = ->
    $scope.containerInventoryLog = {containerId: $routeParams.containerId}
    params = {id: $routeParams.containerId}
    promise = WmsContainerService.detail(params)
    promise.then (data) ->
      $scope.container = data

  prepareConst()

  main()