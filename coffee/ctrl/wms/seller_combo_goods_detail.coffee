'use strict'

angular.module 'app.controllers'

.filter 'calTotalGoodsNumber',() ->
  (items) ->
    goodsNumber = 0
    angular.forEach items, (item) ->
      if item
        goodsNumber = parseFloat(goodsNumber) + parseFloat(item.goodsNumber)
    return goodsNumber

.controller 'WmsSellerComboGoodsDetailCtrl', ($scope, $routeParams,CommonService,$filter,SessionService,ClickEditService,
  WmsSellerGoodsService,WmsSellerComboGoodsService,$i18next,WmsSellerService) ->

  $scope.search = ->
    $scope.filteredSellerGoodsList = $filter('filter')($scope.selectSellerGoodsList, $scope.searchOption.keywords)

  $scope.searchCombo = ->
    $scope.filteredSellerComboGoodsList = $filter('filter')($scope.sellerComboGoodsList, $scope.searchOption.keywordsRef)

  # update
  $scope.syncSellerGoodsPrice = (sellerGoods, price) ->
    sellerGoods.price = price
    promise = WmsSellerGoodsService.updatePrice(sellerGoods)
    promise.then ->

  # update
  $scope.updateSellerGoodsPrice = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updatePrice(sellerGoods)
      promise.then ->

  # update
  $scope.updateSellerGoodsBarcode = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateBarcode(sellerGoods)
      promise.then ->

  $scope.addComboGoods = (sellerGoodsId) ->
    $scope.sellerComboGoods = {sellerGoodsId:sellerGoodsId,comboId:$scope.comboId,goodsNumber:1}
    promise = WmsSellerComboGoodsService.add($scope.sellerComboGoods)
    promise.then (data)->
      getSellerComboGoodsList()

  # update goods number
  $scope.updateGoodsNumber = (sellerComboGoods, fieldName) ->
#    if ClickEditService.updateNode(sellerComboGoods, fieldName)
    promise = WmsSellerComboGoodsService.updateGoodsNumber(sellerComboGoods)
    promise.then ->
      getSellerComboGoodsList()

  # updateOrderGoodsNumber number
  $scope.changeComboGoodsNumber = (item,value) ->
    item.goodsNumber = parseInt(item.goodsNumber) + value
    if item.goodsNumber <= 1
      item.goodsNumber = 1
    $scope.updateGoodsNumber(item,'goodsNumber')

  $scope.comboGoodsDelete = (sellerComboGoods) ->
    params = {id:sellerComboGoods.id}
    promise = WmsSellerComboGoodsService.delete(params)
    promise.then ->
      getSellerComboGoodsList()

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerComboGoods, fieldName, bool) ->
    ClickEditService.switchNode(sellerComboGoods, fieldName, bool)


  getSellerComboGoodsList = ->
    params={comboId:$scope.comboId}
    promise = WmsSellerComboGoodsService.listByComboId(params)
    promise.then (data) ->
      $scope.sellerComboGoodsList = data
      $scope.sellerComboGoodsMapBySellerGoodsId = CommonService.convertListToMap($scope.sellerComboGoodsList,'sellerGoodsId')
      $scope.selectSellerGoodsList = []
      angular.forEach($scope.sellerGoodsList,(sellerGoods) ->
        if !$scope.sellerComboGoodsMapBySellerGoodsId.hasOwnProperty(sellerGoods.id)
          $scope.selectSellerGoodsList.push(sellerGoods)
      )
      $scope.totalPrice = 0
      angular.forEach($scope.sellerComboGoodsList,(item) ->
        $scope.totalPrice = parseFloat($scope.totalPrice) + parseFloat($scope.sellerGoodsMap[item.sellerGoodsId].price) * parseFloat(item.goodsNumber)
      )
      $scope.search()


  prepareConst = ->
    params = {id: $scope.sellerId }
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data

    promise = WmsSellerGoodsService.listEncodeType()
    promise.then (data) ->
      $scope.encodeTypeList = data
      $scope.encodeTypeMap = []
      for encodeType in data
        $scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType."+encodeType)

    params = {sellerId: $scope.sellerId}
    promise = WmsSellerGoodsService.listBySellerIdAndNoCombo(params)
    promise.then (data) ->
      $scope.sellerGoodsList = data
      $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList,'id')
      getSellerComboGoodsList()

  main = ->
    $scope.comboId = $routeParams.id
    $scope.searchOption = {"keywords":"","keywordsRef":""}
    if SessionService.getSellerId()
      $scope.isSeller = true

    params = {id: $scope.comboId }
    promise = WmsSellerGoodsService.detail(params)
    promise.then (data) ->
      $scope.sellerGoods = data
      $scope.sellerId = $scope.sellerGoods.sellerId
      prepareConst()

  main()