'use strict'

angular.module 'app.controllers'

.controller 'WmsIncreaseGoodsInventoryCtrl', ($scope, $routeParams, WmsGoodsService, WmsGoodsInventoryLogService
  WmsMemberService,ModalService,$i18next) ->
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
    $scope.filteredItems = $scope.goodsInventoryLogList
    $scope.select($scope.currentPage)

  $scope.calcInventory = ->
    if $scope.goodsInventoryLog.number
      totalStr = $scope.goods.totalInventory + ' + ' + $scope.goodsInventoryLog.number + " = "
      $scope.goodsInventoryLog.calcTotalInventory = totalStr + (parseInt($scope.goods.totalInventory) + parseInt($scope.goodsInventoryLog.number))
      postStr = $scope.goods.postInventory + ' + ' + $scope.goodsInventoryLog.number + " = "
      $scope.goodsInventoryLog.calcPostInventory = postStr + (parseInt($scope.goods.postInventory) + parseInt($scope.goodsInventoryLog.number))
    else
      $scope.goodsInventoryLog.calcTotalInventory = ""
      $scope.goodsInventoryLog.calcPostInventory =""

  $scope.increaseInventory = (goodsInventoryLog) ->
    if $scope.goods.isEncode && !$scope.goodsInventoryLog.batchNumber
      ModalService.showMessageOnError($i18next('wms:message.apiError.batch\ number\ not\ exists'))
    else
      promise = WmsGoodsInventoryLogService.increaseInventory($scope.goodsInventoryLog)
      promise.then ->
        $scope.goods.totalInventory = parseInt($scope.goods.totalInventory) + parseInt($scope.goodsInventoryLog.number)
        $scope.goods.postInventory = parseInt($scope.goods.postInventory) + parseInt($scope.goodsInventoryLog.number)
        $scope.goodsInventoryLog = {goodsId: $scope.goods.id}
        getGoodsInventoryLogList()

  getGoodsInventoryLogList = ->
    params = {goodsId: $routeParams.goodsId}
    promise = WmsGoodsInventoryLogService.listByGoodsId(params)
    promise.then (data) ->
      $scope.goodsInventoryLogList = data
      initSearch()

  prepareConst = ->
    getGoodsInventoryLogList()

    promise = WmsMemberService.mapMember()
    promise.then (data) ->
      $scope.memberMap = data

  main = ->
    $scope.goodsInventoryLog = {goodsId: $routeParams.goodsId}
    params = {id: $routeParams.goodsId}
    promise = WmsGoodsService.detail(params)
    promise.then (data) ->
      $scope.goods = data

    prepareConst()

  main()