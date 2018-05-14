'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerGoodsListCtrl', ($scope, $routeParams, $filter, CommonService, WmsSellerGoodsService, ClickEditService,
  $i18next,WmsLogisticRequireService,SessionService,WmsConfigService) ->
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
    if $scope.sellerGoods.hasOwnProperty("name")
      promise = WmsSellerGoodsService.add($scope.sellerGoods)
      promise.then (data) ->
        $scope.sellerGoods.id = data
        $scope.items.unshift($scope.sellerGoods)
        $scope.createSellerGoods = {}
        $scope.sellerGoods = {isCombo:0,sellerId:$scope.sellerId,encodeType:"bar",inventory:0}
        initSearch()

  # update
  $scope.updateLogisticRequire = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateLogisticRequire(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateWeight = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateWeight(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateName = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateName(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateAbbrName = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateAbbrName(sellerGoods)
      promise.then ->
                
  # update
  $scope.updatePrepackWeight = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updatePrepackWeight(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateImage = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateImage(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateLength = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateLength(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateHeight = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateHeight(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateWidth = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateWidth(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateShelfLocation = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateShelfLocation(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateEncodeType = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateEncodeType(sellerGoods)
      promise.then ->

  # update
  $scope.updatePrice = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updatePrice(sellerGoods)
      promise.then ->

  # update
  $scope.updateBarCode = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateBarCode(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateIsCombo = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateIsCombo(sellerGoods)
      promise.then ->

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerGoods, fieldName, bool) ->
    ClickEditService.switchNode(sellerGoods, fieldName, bool)

  $scope.checkLogisticRequire = () ->
    $scope.container.logisticRequire = []
    angular.forEach($scope.logisticRequireEnum,(require)->
      if $scope.logisticRequireList[require]
        $scope.container.logisticRequire.push(require)
    )
    if $scope.container.logisticRequire.length == 0
      $scope.container.logisticRequire = ['']
    promise = WmsSellerGoodsService.updateLogisticRequire($scope.container)
    promise.then ->


  prepareConst = ->
    promise = WmsLogisticRequireService.listAll()
    promise.then (data) ->
      $scope.logisticRequireEnum = data

    promise = WmsSellerGoodsService.listEncodeType()
    promise.then (data) ->
      $scope.encodeTypeList = data
      $scope.encodeTypeMap = []
      for encodeType in data
        $scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType."+encodeType)

  main = ->
    $scope.createSellerGoods = {}
    $scope.sellerId = SessionService.getSellerId()
    if SessionService.getSellerId()
      $scope.isSeller = true
    $scope.imgHost = WmsConfigService.getImgHost()
    $scope.sellerGoods = {isCombo:0,sellerId:$scope.sellerId,encodeType:"bar",inventory:0}
    params = {sellerId:$scope.sellerId}
    promise = WmsSellerGoodsService.listBySellerId(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()
      prepareConst()

  main()