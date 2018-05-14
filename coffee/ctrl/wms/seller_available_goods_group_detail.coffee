'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerAvailableGoodsGroupDetailCtrl', ($scope, $routeParams,CommonService,$filter,SessionService,ClickEditService,
  WmsSellerAvailableGoodsGroupService,WmsSellerAvailableGoodsService,WmsGoodsService,WmsSellerAvailableGoodsGroupRefService) ->

  $scope.search = ->
    $scope.filteredAvailableGoodsList = $filter('filter')($scope.availableGoodsList, $scope.searchOption.keywords)

  $scope.searchRef = ->
    $scope.filteredGoodsGroupRefList = $filter('filter')($scope.goodsGroupRefList, $scope.searchOption.keywordsRef)

  $scope.addGoods = (goodsId) ->
    $scope.goodsGroupRef = {goodsId:goodsId,goodsGroupId:$scope.goodsGroupId}
    promise = WmsSellerAvailableGoodsGroupRefService.add($scope.goodsGroupRef)
    promise.then (data)->
      $scope.goodsGroupRef.id = data
      $scope.goodsGroupRef.goodsNumber = 1
      $scope.goodsGroupRefList.unshift($scope.goodsGroupRef)
      $scope.goodsGroupRefGoodsMap = CommonService.convertListToMap($scope.goodsGroupRefList, "goodsId")
      $scope.availableGoodsList = filterAvailableGoodsList($scope.availableGoodsList,$scope.goodsGroupRefGoodsMap)
      $scope.search()
      $scope.searchRef()

  # update goods number
  $scope.updateGoodsNumber = (goodsGroup, fieldName) ->
    if ClickEditService.updateNode(goodsGroup, fieldName)
      promise = WmsSellerAvailableGoodsGroupRefService.updateGoodsNumber(goodsGroup)
      promise.then ->

  $scope.goodsGroupRefDelete = (goodsGroupRef) ->
    params = {id:goodsGroupRef.id}
    promise = WmsSellerAvailableGoodsGroupRefService.delete(params)
    promise.then ->
      getGoodsGroupRefList()
      getAvailableGoodsList()

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (goodsGroup, fieldName, bool) ->
    ClickEditService.switchNode(goodsGroup, fieldName, bool)

  filterAvailableGoodsList = (availableGoodsList,goodsGroupRefGoodsMap) ->
    returnList = []
    angular.forEach(availableGoodsList,(availableGoods) ->
      if !goodsGroupRefGoodsMap.hasOwnProperty(availableGoods.goodsId)
        returnList.push(availableGoods)
    )
    return returnList

  getGoodsGroupRefList = ->
    params={goodsGroupId:$scope.goodsGroupId}
    promise = WmsSellerAvailableGoodsGroupRefService.listByGoodsGroupId(params)
    promise.then (data) ->
      $scope.goodsGroupRefList = data
      $scope.goodsGroupRefGoodsMap = CommonService.convertListToMap($scope.goodsGroupRefList, "goodsId")
      angular.forEach($scope.goodsGroupRefList,(goodsGroupRef,key)->
        $scope.goodsGroupRefList[key].goodsName = $scope.goodsMap[goodsGroupRef.goodsId].name
        $scope.goodsGroupRefList[key].barCode = $scope.goodsMap[goodsGroupRef.goodsId].barCode
      )
      $scope.searchRef()

  getAvailableGoodsList = ->
    params = {sellerId: $scope.sellerId, disabled: 0}
    promise = WmsSellerAvailableGoodsService.listBySellerIdAndDisabled(params)
    promise.then (data) ->
      $scope.availableGoodsAllMap = CommonService.convertListToMap(data, "goodsId")
      $scope.availableGoodsList = filterAvailableGoodsList(data,$scope.goodsGroupRefGoodsMap)
      angular.forEach($scope.availableGoodsList,(availableGoods,key)->
        $scope.availableGoodsList[key].goodsName = $scope.goodsMap[availableGoods.goodsId].name
        $scope.availableGoodsList[key].barCode = $scope.goodsMap[availableGoods.goodsId].barCode
      )
      $scope.search()

  prepareConst = ->
    promise = WmsGoodsService.mapGoods()
    promise.then (data) ->
      $scope.goodsMap = data
      getGoodsGroupRefList()
      getAvailableGoodsList()

  main = ->
    $scope.sellerId = SessionService.getSellerId()
    $scope.goodsGroupId = $routeParams.id
    $scope.searchOption = {"keywords":"","keywordsRef":""}

    params = {id: $routeParams.id}
    promise = WmsSellerAvailableGoodsGroupService.detail(params)
    promise.then (data) ->
      $scope.sellerAvailableGoodsGroup = data
      prepareConst()
                
  main()