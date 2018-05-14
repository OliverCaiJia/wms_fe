'use strict'

angular.module 'app.controllers'

.controller 'WmsProviderApiParamListCtrl', ($scope, $routeParams, $filter, CommonService, WmsProviderApiParamService
  WmsProviderApiService, WmsApiService, WmsProviderService, WmsApiParamService, ClickEditService) ->
  # add
  $scope.add = (providerApiParam) ->
    promise = WmsProviderApiParamService.add(providerApiParam)
    promise.then ->
      getProviderApiParamList()

  # delete
  $scope.remove = (id) ->
    params = {id: id}
    promise = WmsProviderApiParamService.delete(params)
    promise.then ->
      getProviderApiParamList()
                
  # update
  $scope.updateDefaultValue = (providerApiParam, fieldName) ->
    if ClickEditService.updateNode(providerApiParam, fieldName)
      promise = WmsProviderApiParamService.updateDefaultValue(providerApiParam)
      promise.then ->
                
  # update
  $scope.updateApiParamId = (providerApiParam, fieldName) ->
    if ClickEditService.updateNode(providerApiParam, fieldName)
      promise = WmsProviderApiParamService.updateApiParamId(providerApiParam)
      promise.then ->
                
  # update
  $scope.updateRequired = (providerApiParam, fieldName) ->
    if ClickEditService.updateNode(providerApiParam, fieldName)
      promise = WmsProviderApiParamService.updateRequired(providerApiParam)
      promise.then ->
                
  # update
  $scope.updateDataType = (providerApiParam, fieldName) ->
    if ClickEditService.updateNode(providerApiParam, fieldName)
      promise = WmsProviderApiParamService.updateDataType(providerApiParam)
      promise.then ->
                
  # update
  $scope.updateVarKey = (providerApiParam, fieldName) ->
    if ClickEditService.updateNode(providerApiParam, fieldName)
      promise = WmsProviderApiParamService.updateVarKey(providerApiParam)
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
      "required": "1"
    $scope.providerApiParamList.splice(index+1, 0, newNode)

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (providerApiParam, fieldName, bool) ->
    ClickEditService.switchNode(providerApiParam, fieldName, bool)

  getProviderApiParamList = ->
    params = {providerApiId: $routeParams.providerApiId}
    promise = WmsProviderApiParamService.listByProviderApiId(params)
    promise.then (data) ->
      $scope.providerApiParamList = data

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

      apiParamParams = {apiId: data.apiId}
      promise = WmsApiParamService.mapByApiId(apiParamParams)
      promise.then (apiParamMap) ->
        $scope.apiParamMap = apiParamMap

    promise = WmsProviderApiParamService.dataTypeList()
    promise.then (data) ->
      $scope.dataTypeList = data

  main = ->
    getProviderApiParamList()
    prepareConst()

  main()