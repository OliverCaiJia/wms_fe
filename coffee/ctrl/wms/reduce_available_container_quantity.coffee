'use strict'

angular.module 'app.controllers'

.controller 'WmsReduceAvailableContainerQuantityCtrl', ($scope, $routeParams, WmsContainerService,ModalService,$i18next
  WmsMemberService,WmsSellerAvailableContainerService,WmsAvailableContainerInventoryLogService,WmsSellerService) ->
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
    $scope.filteredItems = $scope.availableContainerInventoryLogList
    $scope.select($scope.currentPage)

  $scope.calcQuantity = ->
    if $scope.availableContainerInventoryLog.number
      str = $scope.availableContainer.quantity + ' - ' + $scope.availableContainerInventoryLog.number + " = "
      $scope.availableContainerInventoryLog.calcQuantity = str + (parseInt($scope.availableContainer.quantity) - parseInt($scope.availableContainerInventoryLog.number))
      postStr = $scope.container.postInventory + ' + ' + $scope.availableContainerInventoryLog.number + " = "
      $scope.container.calcPostInventory = postStr + (parseInt($scope.container.postInventory) + parseInt($scope.availableContainerInventoryLog.number))
    else
      $scope.availableContainerInventoryLog.calcQuantity = ""
      $scope.container.calcPostInventory = ""

  $scope.reduceInventory = (availableContainerInventoryLog) ->
    if (parseInt($scope.availableContainer.quantity) - parseInt($scope.availableContainerInventoryLog.number)) < 0
      ModalService.showMessageOnError($i18next("wms:ui.label.quantity") + $i18next("wms:message.inventoryIsNegative"))
    else
      promise = WmsAvailableContainerInventoryLogService.reduceInventory($scope.availableContainerInventoryLog)
      promise.then ->
        $scope.availableContainer.quantity = parseInt($scope.availableContainer.quantity) - parseInt($scope.availableContainerInventoryLog.number)
        $scope.container.postInventory = parseInt($scope.container.postInventory) + parseInt($scope.availableContainerInventoryLog.number)
        $scope.container.calcPostInventory = ""
        $scope.availableContainerInventoryLog = {availableContainerId: $routeParams.availableContainerId}
        getAvailableContainerInventoryLogList()

  getAvailableContainerInventoryLogList = ->
    params = {availableContainerId: $routeParams.availableContainerId}
    promise = WmsAvailableContainerInventoryLogService.listByAvailableContainerId(params)
    promise.then (data) ->
      $scope.availableContainerInventoryLogList = data
      initSearch()

  prepareConst = ->
    getAvailableContainerInventoryLogList()

    params = {id: $scope.availableContainer.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data

    params = {id: $scope.availableContainer.containerId}
    promise = WmsContainerService.detail(params)
    promise.then (data) ->
      $scope.container = data

    promise = WmsMemberService.mapMember()
    promise.then (data) ->
      $scope.memberMap = data

  main = ->
    $scope.availableContainerInventoryLog = {availableContainerId: $routeParams.availableContainerId}
    params = {id: $routeParams.availableContainerId}
    promise = WmsSellerAvailableContainerService.detail(params)
    promise.then (data) ->
      $scope.availableContainer = data
      prepareConst()

  main()