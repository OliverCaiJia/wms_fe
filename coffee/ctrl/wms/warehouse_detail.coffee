'use strict'

angular.module 'app.controllers'

.controller 'WmsWarehouseDetailCtrl', ($scope, $routeParams, WmsWarehouseService,WmsAddressService) ->

  # update
  $scope.save = ->
    promise = WmsWarehouseService.update($scope.warehouse)
    promise.then (data) ->


  $scope.getCityList = (warehouse) ->
    params = {level:"2",parentId: warehouse.provinceId}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.cityList = data
    else
      warehouse.cityId = 0
      $scope.cityList = []

  $scope.getDistrictList = (warehouse) ->
    params = {level:"3",parentId: warehouse.cityId}
    if params.parentId > 0
      promise = WmsAddressService.listAllByLevelAndParentId(params)
      promise.then (data) ->
        $scope.districtList = data
    else
      warehouse.districtId = 0
      $scope.districtList = []

  prepareConst = ->
    promise = WmsAddressService.listAllProvince()
    promise.then (data) ->
      $scope.provinceList = data
      $scope.getCityList($scope.warehouse)
      $scope.getDistrictList($scope.warehouse)

  main = ->
    params = {id: $routeParams.id}
    promise = WmsWarehouseService.detail(params)
    promise.then (data) ->
      $scope.warehouse = data
      prepareConst()
                
  main()