'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerAvailableContainerListCtrl', ($scope, $routeParams, $filter, $i18next, ModalService, CommonService, WmsContainerService
  WmsSellerAvailableContainerService, ClickEditService,WmsSellerService,WmsSellerAvailableService) ->

  $scope.searchContainerList = (containerKeywords) ->
    $scope.currentContainerList = $filter('filter')($scope.containerList,containerKeywords)

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
    if !$scope.sellerAvailableContainer.hasOwnProperty("containerId")
      ModalService.showMessageOnError $i18next("wms:ui.tips.chooseLeftSideContainer")
    else
      promise = WmsSellerAvailableContainerService.add($scope.sellerAvailableContainer)
      promise.then (data) ->
        $scope.sellerAvailableContainer.id = data
        $scope.items.unshift($scope.sellerAvailableContainer)
        $scope.itemsMapByContainerId[$scope.sellerAvailableContainer.containerId] = $scope.sellerAvailableContainer
        $scope.createSellerAvailableContainer = {}
        $scope.sellerAvailableContainer = {
          sellerId: $routeParams.sellerId,
          payMode:"pre"
          price:"0"
          quantity:"0"
        }
        convertContainerList()
        initSearch()

  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsSellerAvailableContainerService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()

  # update
  $scope.updateQuantity = (sellerAvailableContainer, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableContainer, fieldName) && sellerAvailableContainer.payMode == 'post'
      promise = WmsSellerAvailableContainerService.updateQuantity(sellerAvailableContainer)
      promise.then ->

# update
  $scope.updatePrice = (sellerAvailableContainer, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableContainer, fieldName)
      promise = WmsSellerAvailableContainerService.updatePrice(sellerAvailableContainer)
      promise.then ->

# update
  $scope.updatePayMode = (sellerAvailableContainer, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableContainer, fieldName)
      promise = WmsSellerAvailableContainerService.updatePayMode(sellerAvailableContainer)
      promise.then ->

# disabled
  $scope.disabledSellerAvailableContainer = (sellerAvailableContainer, bool) ->
    promise = WmsSellerAvailableContainerService.updateDisabled(sellerAvailableContainer,bool)
    promise.then  ->
      sellerAvailableContainer.disabled = bool

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerAvailableContainer, fieldName, bool) ->
    ClickEditService.switchNode(sellerAvailableContainer, fieldName, bool)

  $scope.checkedContainer = (container) ->
    $scope.sellerAvailableContainer.containerId = container.id
    $scope.sellerAvailableContainer.containerName = container.name
    $scope.sellerAvailableContainer.containerInventory = container.totalInventory


  convertContainerList = ->
    i=0
    $scope.containerList = []
    angular.forEach($scope.tempContainerList,(container, key)->
      if !$scope.itemsMapByContainerId[container.id]
        $scope.containerList[i] = container
        i++
    )
    $scope.searchContainerList()

  prepareConst = ->
    promise = WmsSellerAvailableService.getPayModeList()
    promise.then (data) ->
      $scope.payModeList = data

    params = {id:$scope.sellerAvailableContainer.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data

    promise = WmsContainerService.listAll()
    promise.then (data) ->
      $scope.tempContainerList = data
      $scope.containerMap = CommonService.convertListToMap($scope.tempContainerList, "id")
      convertContainerList()


  main = ->
    $scope.createSellerAvailableContainer = {}
    $scope.sellerAvailableContainer = {
      sellerId: $routeParams.sellerId,
      payMode:"pre"
      price:"0"
      quantity:"0"
    }
    params = {sellerId: $routeParams.sellerId}
    promise = WmsSellerAvailableContainerService.listBySellerId(params)
    promise.then (data) ->
      $scope.items = data
      $scope.itemsMapByContainerId = CommonService.convertListToMap(data, "containerId")
      prepareConst()
      initSearch()

  main()