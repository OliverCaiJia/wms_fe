'use strict'

angular.module 'app.controllers'

.controller 'WmsLogisticOrderEditCtrl', ($scope, $routeParams, CommonService, WmsLogisticOrderService,WmsAddressService
  WmsLogisticCompanyService, ClickEditService, WmsContainerService, WmsSellerAvailableContainerService
  WmsSellerFreightGroupService,WmsPickOrderService) ->
  # update
  $scope.updateLogisticCharge = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateLogisticCharge(logisticOrder)
      promise.then ->
                
  # update
  $scope.updateTotalWeight = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateTotalWeight(logisticOrder)
      promise.then ->

# update
  $scope.updateContainerId = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateContainerId(logisticOrder)
      promise.then ->

  # update
  $scope.updateComment = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateComment(logisticOrder)
      promise.then ->
                
  # update
  $scope.updateLogisticSn = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateLogisticSn(logisticOrder)
      promise.then ->
                
  # update
  $scope.updateLogisticCompanyId = (logisticOrder, fieldName) ->
    if ClickEditService.updateNode(logisticOrder, fieldName)
      promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder)
      promise.then ->
                
  $scope.switchNode = (logisticOrder, fieldName, bool) ->
    ClickEditService.switchNode(logisticOrder, fieldName, bool)

  $scope.getCityList = (logisticOrder) ->
    params = {level:"2",parentId: logisticOrder.province}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.cityList = data
    else
      logisticOrder.city = 0
      $scope.cityList = []

  $scope.getDistrictList = (logisticOrder) ->
    params = {level:"3",parentId: logisticOrder.city}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.districtList = data
    else
      logisticOrder.district = 0
      $scope.districtList = []

  $scope.saveAddress = (logisticOrder) ->
    if parseInt(logisticOrder.province) > 0 && parseInt(logisticOrder.city) > 0
      promise = WmsLogisticOrderService.updateAddress(logisticOrder)
      promise.then ->
        $scope.logisticOrder[logisticOrder.id+'address'] = false

  prepareConst = ->
    promise = WmsAddressService.listAllProvince()
    promise.then (data) ->
      $scope.provinceList = data
      $scope.getCityList($scope.logisticOrder)
      $scope.getDistrictList($scope.logisticOrder)

    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

    params = {logisticOrderId: $scope.logisticOrderId }
    promise = WmsPickOrderService.detailByLogisticOrderId(params)
    promise.then (data) ->
      $scope.pickOrder = data
      params = {sellerId:$scope.pickOrder.sellerId}
      promise = WmsSellerAvailableContainerService.listContainerBySellerId(params)
      promise.then (data) ->
        $scope.containerList = data
        $scope.containerMap = CommonService.convertListToMap($scope.containerList,'id')

      params = {sellerId: $scope.pickOrder.sellerId}
      promise = WmsSellerFreightGroupService.listBySellerId(params)
      promise.then (data) ->
        $scope.sellerFreightGroupList = data

  main = ->
    $scope.showLogisticOrderEdit = true

    $scope.logisticOrderId = $routeParams.id
    params = {id: $routeParams.id}
    promise = WmsLogisticOrderService.detail(params)
    promise.then (data) ->
      $scope.logisticOrder = data
      prepareConst()
                
  main()