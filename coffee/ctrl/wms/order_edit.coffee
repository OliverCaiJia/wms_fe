'use strict'

angular.module 'app.controllers'

.controller 'WmsOrderEditCtrl', ($scope, $routeParams,$location, CommonService, WmsOrderService,WmsAddressService,
  ClickEditService,WmsPlatformSourceService) ->
  # update
  $scope.updateIdentityCardContrary = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updateIdentityCardContrary(order)
      promise.then ->
                
  # update
  $scope.updateIdentityCardFront = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updateIdentityCardFront(order)
      promise.then ->
                
  # update
  $scope.updateIdentityCard = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updateIdentityCard(order)
      promise.then ->
                
  # update
  $scope.updateConsigneeAddress = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updateConsigneeAddress(order)
      promise.then ->
                
  # update
  $scope.updateConsigneeName = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updateConsigneeName(order)
      promise.then ->

  $scope.getCityList = (order) ->
    params = {level:"2",parentId: order.province}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.cityList = data
    else
      order.city = 0
      $scope.cityList = []

  $scope.getDistrictList = (order) ->
    params = {level:"3",parentId: order.city}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.districtList = data
    else
      order.district = 0
      $scope.districtList = []

  $scope.saveAddress = (order) ->
    if parseInt(order.province) > 0 && parseInt(order.city) > 0
      promise = WmsOrderService.updateAddress(order)
      promise.then ->
        $scope.order[order.id+'address'] = false


  # update
  $scope.updatePhoneNumber = (order, fieldName) ->
    if ClickEditService.updateNode(order, fieldName)
      promise = WmsOrderService.updatePhoneNumber(order)
      promise.then ->
                
  $scope.switchNode = (order, fieldName, bool) ->
    ClickEditService.switchNode(order, fieldName, bool)

  prepareConst = ->
    promise = WmsPlatformSourceService.mapPlatformSource()
    promise.then (data) ->
      $scope.platformSourceMap = data

    promise = WmsAddressService.listAllProvince()
    promise.then (data) ->
      $scope.provinceList = data
      $scope.getCityList($scope.order)
      $scope.getDistrictList($scope.order)

  main = ->
    if $location.path().indexOf("split_order") > 0
      $scope.isSplitOrderPages = true
    if $location.path().indexOf("order_goods_list") > 0
      $scope.isOrderGoodsListPages = true
    params = {id: $routeParams.orderId}
    promise = WmsOrderService.detail(params)
    promise.then (data) ->
      $scope.order = data
      prepareConst()
                
  main()