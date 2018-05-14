'use strict'

angular.module 'app.controllers'

.controller 'WmsProviderApiReturnDataListCtrl', ($scope, $routeParams, $filter, CommonService, WmsProviderApiService
  WmsProviderApiReturnDataService, WmsApiService, WmsProviderService, ClickEditService) ->
  # add
  $scope.add = (providerApiReturnData) ->
    promise = WmsProviderApiReturnDataService.add(providerApiReturnData)
    promise.then ->
      getProviderApiReturnDataList()
                
  # delete
  $scope.remove = (id) ->
    params = {id: id}
    promise = WmsProviderApiReturnDataService.delete(params)
    promise.then ->
      getProviderApiReturnDataList()
                
  # update
  $scope.updateDataType = (providerApiReturnData, fieldName) ->
    if ClickEditService.updateNode(providerApiReturnData, fieldName)
      promise = WmsProviderApiReturnDataService.updateDataType(providerApiReturnData)
      promise.then ->
                
  # update
  $scope.updateVarKey = (providerApiReturnData, fieldName) ->
    if ClickEditService.updateNode(providerApiReturnData, fieldName)
      promise = WmsProviderApiReturnDataService.updateVarKey(providerApiReturnData)
      promise.then ->

  $scope.addBrotherAbove = (baseNode, index) ->
    baseNode.inEditing = false
    $scope.insertNew(index - 1, baseNode.leftValue, baseNode.depth)

  $scope.addBrotherBelow = (baseNode, index) ->
    baseNode.inEditing = false
    $scope.insertNew(index, baseNode.rightValue/1+1, baseNode.depth)

  $scope.addChild = (baseNode, index) ->
    baseNode.inEditing = false
    $scope.insertNew(index, baseNode.leftValue/1+1,  baseNode.depth/1+1)

  $scope.insertNew = (index, left, depth) ->
    newNode =
      "inEditing": true,
      "providerApiId": $routeParams.providerApiId
      "depth": depth
      "leftValue": left
      "rightValue": left/1+1
    $scope.providerApiReturnDataList.splice(index+1, 0, newNode)
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (providerApiReturnData, fieldName, bool) ->
    ClickEditService.switchNode(providerApiReturnData, fieldName, bool)

  getProviderApiReturnDataList = ->
    params = {providerApiId: $routeParams.providerApiId}
    promise = WmsProviderApiReturnDataService.listByProviderApiId(params)
    promise.then (data) ->
      $scope.providerApiReturnDataList = data

  prepareConst = ->
    params = {id: $routeParams.providerApiId}
    promise = WmsProviderApiService.detail(params)
    promise.then (data) ->
      $scope.providerApi = data

      apiParams = {id: data.apiId}
      promise = WmsApiService.detail(apiParams)
      promise.then (api) ->
        $scope.api = api

      providerParams = {id: data.providerId}
      promise = WmsProviderService.detail(providerParams)
      promise.then (provider) ->
        $scope.provider = provider

    promise = WmsProviderApiReturnDataService.dataTypeList()
    promise.then (data) ->
      $scope.dataTypeList = data

  main = ->
    getProviderApiReturnDataList()
    prepareConst()

  main()