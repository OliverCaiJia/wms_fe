'use strict'

angular.module 'app.controllers'

.controller 'WmsSenderAddressEditCtrl', ($scope, $routeParams, CommonService, WmsSenderAddressService, WmsAddressService
  ClickEditService) ->
  # update
  $scope.updateAddress = (senderAddress, fieldName) ->
    if ClickEditService.updateNode(senderAddress, fieldName)
      promise = WmsSenderAddressService.updateAddress(senderAddress)
      promise.then ->
                
  # update
  $scope.updatePhoneNumber = (senderAddress, fieldName) ->
    if ClickEditService.updateNode(senderAddress, fieldName)
      promise = WmsSenderAddressService.updatePhoneNumber(senderAddress)
      promise.then ->
                
  # update
  $scope.updateName = (senderAddress, fieldName) ->
    if ClickEditService.updateNode(senderAddress, fieldName)
      promise = WmsSenderAddressService.updateName(senderAddress)
      promise.then ->
                
  $scope.switchNode = (senderAddress, fieldName, bool) ->
    ClickEditService.switchNode(senderAddress, fieldName, bool)

  $scope.getCityList = ->
    params = {level:"2",parentId: $scope.senderAddress.province}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.cityList = data
    else
      order.city = 0
      $scope.cityList = []

  $scope.getDistrictList = ->
    params = {level:"3",parentId: $scope.senderAddress.city}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.districtList = data
    else
      order.district = 0
      $scope.districtList = []

  $scope.savePrefixAddress = (senderAddress, fieldName) ->
    if parseInt(senderAddress.province) > 0 && parseInt(senderAddress.city) > 0
      promise = WmsSenderAddressService.updatePrefixAddress(senderAddress)
      promise.then ->
        $scope.senderAddress[senderAddress.id+fieldName] = false

  prepareConst = ->
    promise = WmsAddressService.listAllProvince()
    promise.then (data) ->
      $scope.provinceList = data

  main = ->
    params = {sellerId: $routeParams.sellerId}
    promise = WmsSenderAddressService.detailBySellerId(params)
    promise.then (data) ->
      $scope.senderAddress = data
      $scope.getCityList()
      $scope.getDistrictList()

    prepareConst()
                
  main()