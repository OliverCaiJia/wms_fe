'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerAvailableGoodsListCtrl', ($scope, $routeParams, $filter, $i18next, ModalService, CommonService
  WmsGoodsService, WmsSellerAvailableGoodsService, ClickEditService,WmsSellerService) ->

  $scope.searchGoodsList = (goodsKeywords) ->
    $scope.currentGoodsList = $filter('filter')($scope.goodsList,goodsKeywords)

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
    if !$scope.sellerAvailableGoods.hasOwnProperty("goodsId")
      ModalService.showMessageOnError $i18next("wms:ui.tips.chooseLeftSideGoods")
    else
      promise = WmsSellerAvailableGoodsService.add($scope.sellerAvailableGoods)
      promise.then (data) ->
        $scope.sellerAvailableGoods.id = data
        $scope.items.unshift($scope.sellerAvailableGoods)
        $scope.itemsMapByGoodsId[$scope.sellerAvailableGoods.goodsId] = $scope.sellerAvailableGoods
        $scope.createSellerAvailableGoods = {}
        $scope.sellerAvailableGoods = {
          sellerId: $routeParams.sellerId,
          payMode:"pre"
          price:"0"
          quantity:"0"
        }
        convertGoodsList()
        initSearch()
                
  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsSellerAvailableGoodsService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()

  # update
  $scope.updateShelfLocation = (sellerAvailableGoods, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableGoods, fieldName)
      promise = WmsSellerAvailableGoodsService.updateShelfLocation(sellerAvailableGoods)
      promise.then ->

# update
  $scope.updateEncodeType = (sellerAvailableGoods, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableGoods, fieldName)
      promise = WmsSellerAvailableGoodsService.updateEncodeType(sellerAvailableGoods)
      promise.then ->

  # update
  $scope.updateQuantity = (sellerAvailableGoods, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableGoods, fieldName) && sellerAvailableGoods.payMode == 'post'
      promise = WmsSellerAvailableGoodsService.updateQuantity(sellerAvailableGoods)
      promise.then ->

  # update
  $scope.updatePrice = (sellerAvailableGoods, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableGoods, fieldName)
      promise = WmsSellerAvailableGoodsService.updatePrice(sellerAvailableGoods)
      promise.then ->

  # update
  $scope.updatePayMode = (sellerAvailableGoods, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableGoods, fieldName)
      promise = WmsSellerAvailableGoodsService.updatePayMode(sellerAvailableGoods)
      promise.then ->

  # disabled
  $scope.disabledSellerAvailableGoods = (sellerAvailableGoods, bool) ->
    promise = WmsSellerAvailableGoodsService.updateDisabled(sellerAvailableGoods,bool)
    promise.then ->
      sellerAvailableGoods.disabled = bool

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerAvailableGoods, fieldName, bool) ->
    ClickEditService.switchNode(sellerAvailableGoods, fieldName, bool)

  $scope.checkedGoods = (goods) ->
    $scope.sellerAvailableGoods.goodsId = goods.id
    $scope.sellerAvailableGoods.goodsName = goods.name

  convertGoodsList = ->
    i=0
    $scope.goodsList = []
    angular.forEach($scope.tempGoodsList,(goods, key)->
      if !$scope.itemsMapByGoodsId[goods.id]
        $scope.goodsList[i] = goods
        i++
    )
    $scope.searchGoodsList()

  prepareConst = ->
    promise = WmsSellerAvailableGoodsService.listEncodeType()
    promise.then (data) ->
      $scope.encodeTypeList = data
      for encodeType in data
        $scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType."+encodeType)

    params = {id: $routeParams.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data

    promise = WmsGoodsService.listAll()
    promise.then (data) ->
      $scope.tempGoodsList = data
      $scope.goodsMap = CommonService.convertListToMap($scope.tempGoodsList, "id")
      angular.forEach($scope.items,(item, key)->
        $scope.items[key].goodsName = $scope.goodsMap[item.goodsId].name
      )
      convertGoodsList()

  main = ->
    $scope.createSellerAvailableGoods = {}
    $scope.encodeTypeMap = {}
    $scope.sellerAvailableGoods = {
      sellerId: $routeParams.sellerId
      price:"0"
      quantity:"0"
    }
    params = {sellerId: $routeParams.sellerId}
    promise = WmsSellerAvailableGoodsService.listBySellerId(params)
    promise.then (data) ->
      $scope.items = data
      $scope.itemsMapByGoodsId = CommonService.convertListToMap(data, "goodsId")
      prepareConst()
      initSearch()

  main()