'use strict'

angular.module 'app.controllers'

.controller 'WmsApiParamListCtrl', ($scope, $routeParams, CommonService, WmsApiParamService, WmsApiService
  WmsStructRootService, WmsStructNodeService, ClickEditService) ->
  # add
  $scope.add = (apiParam) ->
    promise = WmsApiParamService.add(apiParam)
    promise.then ->
      getApiParamList()
                
  # delete
  $scope.remove = (id) ->
    params = {id: id}
    promise = WmsApiParamService.delete(params)
    promise.then ->
      getApiParamList()

  # update structRootId
  $scope.updateStructRootId = (apiParam, fieldName) ->
    if ClickEditService.updateNode(apiParam, fieldName)
      promise = WmsApiParamService.updateStructRootId(apiParam)
      promise.then ->
                
  # update varKey
  $scope.updateVarKey = (apiParam, fieldName) ->
    if ClickEditService.updateNode(apiParam, fieldName)
      promise = WmsApiParamService.updateVarKey(apiParam)
      promise.then ->
                
  # update dataType
  $scope.updateDataType = (apiParam, fieldName) ->
    if ClickEditService.updateNode(apiParam, fieldName)
      promise = WmsApiParamService.updateDataType(apiParam)
      promise.then ->
                
  # update structNodeId
  $scope.updateStructNodeId = (apiParam, fieldName) ->
    if ClickEditService.updateNode(apiParam, fieldName)
      promise = WmsApiParamService.updateStructNodeId(apiParam)

  $scope.addBrotherAbove = (baseNode, index) ->
    baseNode.inEditing = false
    if baseNode.structNodeId
      structRootId = $scope.structNodeMap[baseNode.structNodeId].rootId
      $scope.structNodeList[index] = $scope.structNodeMapByRootId[structRootId]
    $scope.insertNew(index - 1, baseNode.leftValue, baseNode.depth)

  $scope.addBrotherBelow = (baseNode, index) ->
    baseNode.inEditing = false
    if baseNode.structNodeId
      structRootId = $scope.structNodeMap[baseNode.structNodeId].rootId
      $scope.structNodeList[index+1] = $scope.structNodeMapByRootId[structRootId]
    $scope.insertNew(index, baseNode.rightValue/1+1, baseNode.depth)

  $scope.addChild = (baseNode, index) ->
    baseNode.inEditing = false
    if baseNode.structRootId
      $scope.structNodeList[index+1] = $scope.structNodeMapByRootId[baseNode.structRootId]
    $scope.insertNew(index, baseNode.leftValue/1+1,  baseNode.depth/1+1)

  $scope.insertNew = (index, left, depth) ->
    newNode =
      "inEditing": true,
      "apiId": $routeParams.apiId
      "depth": depth
      "leftValue": left
      "rightValue": left/1+1
    $scope.apiParamList.splice(index+1, 0, newNode)

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (apiParam, fieldName, bool) ->
    ClickEditService.switchNode(apiParam, fieldName, bool)

  sortTopLevelMapKey = (argList) ->
    i = 0
    newList = []
    angular.forEach(argList, (item, k) ->
      if item.depth == 1
        item.mapKey = i
        i++
      newList[k] = item
      if item.hasOwnProperty("structRootId") && item.structRootId > 0
        getStructNodeMap(item.structRootId)
    )
    return newList

  getApiParamList = ->
    params = {apiId: $routeParams.apiId}
    promise = WmsApiParamService.listByApiId(params)
    promise.then (data) ->
      $scope.apiParamList = sortTopLevelMapKey(data)

  getStructNodeMap = (structRootId) ->
    if !$scope.structNodeMapByRootId.hasOwnProperty(structRootId)
      params = {rootId: structRootId}
      promise = WmsStructNodeService.listByRootId(params)
      promise.then (data) ->
        $scope.structNodeMapByRootId[structRootId] = data
        for item in data
          $scope.structNodeMap[item.id] = item

  prepareConst = ->
    params = {id: $routeParams.apiId}
    promise = WmsApiService.detail(params)
    promise.then (data) ->
      $scope.api = data

    promise = WmsApiParamService.dataTypeList()
    promise.then (data) ->
      $scope.dataTypeList = data

    promise = WmsStructRootService.listAll()
    promise.then (data) ->
      $scope.structRootList = data
      $scope.structRootMap = CommonService.convertListToMap(data, "id")

  main = ->
    $scope.structNodeMap = {}
    $scope.structNodeMapByRootId = {}
    $scope.structNodeList = {}
    getApiParamList()
    prepareConst()

  main()