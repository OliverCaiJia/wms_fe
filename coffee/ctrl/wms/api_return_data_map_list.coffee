'use strict'

angular.module 'app.controllers'

.controller 'WmsApiReturnDataMapListCtrl', ($scope, $routeParams, $filter, CommonService, WmsApiReturnDataMapService
  WmsApiService, ClickEditService) ->
  # add
  $scope.add = (apiReturnDataMap) ->
    promise = WmsApiReturnDataMapService.add(apiReturnDataMap)
    promise.then ->
      getApiReturnDataMapList()
                
  # delete
  $scope.remove = (id) ->
    params = {id: id}
    promise = WmsApiReturnDataMapService.delete(params)
    promise.then ->
      getApiReturnDataMapList()
                
  # update
  $scope.updateRequired = (apiReturnDataMap, fieldName) ->
    if ClickEditService.updateNode(apiReturnDataMap, fieldName)
      promise = WmsApiReturnDataMapService.updateRequired(apiReturnDataMap)
      promise.then ->
                
  # update
  $scope.updateDataType = (apiReturnDataMap, fieldName) ->
    if ClickEditService.updateNode(apiReturnDataMap, fieldName)
      promise = WmsApiReturnDataMapService.updateDataType(apiReturnDataMap)
      promise.then ->
                
  # update
  $scope.updateVarKey = (apiReturnDataMap, fieldName) ->
    if ClickEditService.updateNode(apiReturnDataMap, fieldName)
      promise = WmsApiReturnDataMapService.updateVarKey(apiReturnDataMap)
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
      "apiId": $routeParams.apiId
      "depth": depth
      "leftValue": left
      "rightValue": left/1+1
    $scope.apiReturnDataMapList.splice(index+1, 0, newNode)

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (apiReturnDataMap, fieldName, bool) ->
    ClickEditService.switchNode(apiReturnDataMap, fieldName, bool)

  getApiReturnDataMapList = ->
    params = {apiId: $routeParams.apiId}
    promise = WmsApiReturnDataMapService.listByApiId(params)
    promise.then (data) ->
      $scope.apiReturnDataMapList = data

  prepareConst = ->
    params = {id: $routeParams.apiId}
    promise = WmsApiService.detail(params)
    promise.then (api) ->
      $scope.api = api

    promise = WmsApiReturnDataMapService.dataTypeList()
    promise.then (data) ->
      $scope.dataTypeList = data

  main = ->
    getApiReturnDataMapList()
    prepareConst()

  main()