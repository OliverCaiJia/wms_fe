'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerDetailCtrl', ($scope, $routeParams, $filter, CommonService, WmsSellerService, WmsAddressService
  WmsLogisticCompanyService, WmsSellerFreightGroupService, ClickEditService) ->

# update
  $scope.updateName = (seller, fieldName) ->
    if ClickEditService.updateNode(seller, fieldName)
      promise = WmsSellerService.updateName(seller)
      promise.then ->

# update
  $scope.updateComment = (seller, fieldName) ->
    if ClickEditService.updateNode(seller, fieldName)
      promise = WmsSellerService.updateComment(seller)
      promise.then ->

# update
  $scope.updateSellerFreightGroupId = (seller, fieldName) ->
    if ClickEditService.updateNode(seller, fieldName)
      promise = WmsSellerService.updateSellerFreightGroupId(seller)
      promise.then ->

# update
  $scope.updateCreditLine = (seller, fieldName) ->
    if ClickEditService.updateNode(seller, fieldName)
      promise = WmsSellerService.updateCreditLine(seller)
      promise.then ->

  # update
  $scope.updateIsWeightSet = (seller,boolValue) ->
    seller.isWeightSet = boolValue
    promise = WmsSellerService.updateIsWeightSet(seller)
    promise.then ->


  $scope.getCityList = ->
    params = {level:"2",parentId: $scope.seller.province}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.cityList = data
    else
      $scope.seller.city = 0
      $scope.cityList = []

  $scope.getDistrictList = ->
    params = {level:"3",parentId: $scope.seller.city}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.districtList = data
    else
      $scope.seller.district = 0
      $scope.districtList = []

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (seller, fieldName, bool) ->
    ClickEditService.switchNode(seller, fieldName, bool)

  prepareConst = ->
    promise = WmsAddressService.listAllProvince()
    promise.then (data) ->
      $scope.provinceList = data

    promise = WmsLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.logisticCompanyMap = data

    promise = WmsSellerFreightGroupService.listAll()
    promise.then (data) ->
      for item in data
        $scope.sellerFreightGroupMap[item.id] = item
        if !$scope.sellerFreightGroupList.hasOwnProperty(item.sellerId)
          $scope.sellerFreightGroupList[item.sellerId] = []
        $scope.sellerFreightGroupList[item.sellerId].unshift(item)


  main = ->
    $scope.sellerFreightGroupMap = {}
    $scope.sellerFreightGroupList = {}
    params = {id: $routeParams.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data
      prepareConst()
                
  main()