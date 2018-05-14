'use strict'

angular.module 'app.controllers'

.controller 'WmsReduceAvailableGoodsQuantityCtrl', ($scope, $routeParams, WmsGoodsService, WmsGoodsInventoryLogService
  WmsMemberService,WmsSellerAvailableGoodsService,WmsAvailableGoodsInventoryLogService,WmsSellerService,ModalService,$i18next) ->
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
    $scope.filteredItems = $scope.availableGoodsInventoryLogList
    $scope.select($scope.currentPage)

  $scope.calcQuantity = ->
    if $scope.availableGoodsInventoryLog.number
      str = $scope.availableGoods.quantity + ' - ' + $scope.availableGoodsInventoryLog.number + " = "
      $scope.availableGoodsInventoryLog.calcQuantity = str + (parseInt($scope.availableGoods.quantity) - parseInt($scope.availableGoodsInventoryLog.number))
    else
      $scope.availableGoodsInventoryLog.calcQuantity = ""

  $scope.reduceInventory = (availableGoodsInventoryLog) ->
    if (parseInt($scope.availableGoods.quantity) - parseInt($scope.availableGoodsInventoryLog.number)) < 0
      ModalService.showMessageOnError($i18next("wms:ui.label.quantity") + $i18next("wms:message.inventoryIsNegative"))
    else
      promise = WmsAvailableGoodsInventoryLogService.reduceInventory($scope.availableGoodsInventoryLog)
      promise.then ->
        $scope.availableGoods.quantity = parseInt($scope.availableGoods.quantity) - parseInt($scope.availableGoodsInventoryLog.number)
        $scope.availableGoodsInventoryLog = {availableGoodsId: $routeParams.availableGoodsId}
        getAvailableGoodsInventoryLogList()

  getAvailableGoodsInventoryLogList = ->
    params = {availableGoodsId: $routeParams.availableGoodsId}
    promise = WmsAvailableGoodsInventoryLogService.listByAvailableGoodsId(params)
    promise.then (data) ->
      $scope.availableGoodsInventoryLogList = data
      initSearch()

  prepareConst = ->
    params = {id: $routeParams.availableGoodsId}
    promise = WmsSellerAvailableGoodsService.detail(params)
    promise.then (availableGoods) ->
      $scope.availableGoods = availableGoods

      sellerParams = {id: availableGoods.sellerId}
      promise = WmsSellerService.detail(sellerParams)
      promise.then (seller) ->
        $scope.seller = seller

      goodsParams = {id: availableGoods.goodsId}
      promise = WmsGoodsService.detail(goodsParams)
      promise.then (goods) ->
        $scope.goods = goods

    promise = WmsMemberService.mapMember()
    promise.then (data) ->
      $scope.memberMap = data

  main = ->
    $scope.availableGoodsInventoryLog = {availableGoodsId: $routeParams.availableGoodsId}
    getAvailableGoodsInventoryLogList()
    prepareConst()

  main()