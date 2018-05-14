'use strict'

angular.module 'app.controllers'

.controller 'WmsApiReturnDataListCtrl', ($scope, $routeParams, CommonService, WmsApiReturnDataService, WmsApiService
  WmsProviderApiService, WmsProviderService, WmsProviderApiReturnDataService, WmsApiReturnDataMapService
  ClickEditService) ->
  # add
  $scope.add = (apiReturnDataMapId) ->
    $scope.apiReturnData.apiReturnDataMapId = apiReturnDataMapId
    promise = WmsApiReturnDataService.add($scope.apiReturnData)
    promise.then (data) ->
      $scope.apiReturnData.id = data
      $scope.returnDataMap[apiReturnDataMapId] = $scope.apiReturnData
      $scope.apiReturnData = {providerApiId: $routeParams.providerApiId}

  # update
  $scope.updateProviderApiReturnDataId = (apiReturnData, fieldName) ->
    if ClickEditService.updateNode(apiReturnData, fieldName)
      promise = WmsApiReturnDataService.updateProviderApiReturnDataId(apiReturnData)
      promise.then ->

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (apiReturnData, fieldName, bool) ->
    ClickEditService.switchNode(apiReturnData, fieldName, bool)

  getApiReturnDataList = ->
    params = {providerApiId: $routeParams.providerApiId}
    promise = WmsApiReturnDataService.listByProviderApiId(params)
    promise.then (data) ->
      $scope.apiReturnDataList = data

  prepareConst = ->
    params = {id: $routeParams.providerApiId}
    promise = WmsProviderApiService.detail(params)
    promise.then (data) ->
      $scope.providerApi = data

      apiReturnDataMapParams = {apiId: data.apiId}
      promise = WmsApiReturnDataMapService.listByApiId(apiReturnDataMapParams)
      promise.then (returnDataList) ->
        $scope.returnDataList = returnDataList

      apiParams = {id: data.apiId}
      promise = WmsApiService.detail(apiParams)
      promise.then (api) ->
        $scope.api = api

      providerParams = {id: data.providerId}
      promise = WmsProviderService.detail(providerParams)
      promise.then (provider) ->
        $scope.provider = provider

    params = {providerApiId: $routeParams.providerApiId}
    promise = WmsProviderApiReturnDataService.mapByProviderApiId(params)
    promise.then (data) ->
      $scope.providerApiReturnDataMap = data

  main = ->
    $scope.apiReturnData = {providerApiId: $routeParams.providerApiId}
    params = {providerApiId: $routeParams.providerApiId}
    promise = WmsApiReturnDataService.mapByProviderApiId(params)
    promise.then (data) ->
      $scope.returnDataMap = data
    prepareConst()

  main()