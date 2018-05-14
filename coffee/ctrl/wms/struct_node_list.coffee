'use strict'

angular.module 'app.controllers'

.controller 'WmsStructNodeListCtrl', ($scope, $routeParams, CommonService, WmsStructNodeService, WmsStructRootService
  ClickEditService) ->
  # update struct root
  $scope.updateStructRoot = (structRoot) ->
    promise = WmsStructRootService.updateName(structRoot)
    promise.then ->

  $scope.insertNew = (index, fieldName, left, depth) ->
    newNode =
      "inEditing": true
      "rootId": $routeParams.rootId
      "fieldName": fieldName
      "depth": depth
      "leftValue": left
      "rightValue": left/1+1
    $scope.structNodeList.splice(index+1, 0, newNode)

  # add
  $scope.add = (structNode) ->
    promise = WmsStructNodeService.add(structNode)
    promise.then (data) ->
      structNode.id = data
      getStructNodeList()

  # update
  $scope.updateDataType = (structNode, fieldName) ->
    if ClickEditService.updateNode(structNode, fieldName)
      promise = WmsStructNodeService.updateDataType(structNode)
      promise.then ->
                
  # update
  $scope.updateFieldName = (structNode, fieldName) ->
    if ClickEditService.updateNode(structNode, fieldName)
      promise = WmsStructNodeService.updateFieldName(structNode)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (structNode, fieldName, bool) ->
    ClickEditService.switchNode(structNode, fieldName, bool)

  $scope.addBrotherAbove = (baseNode, index) ->
    baseNode.inEditing = false
    $scope.insertNew(index - 1, 'brother_above', baseNode.leftValue, baseNode.depth)

  $scope.addBrotherBelow = (baseNode, index) ->
    baseNode.inEditing = false
    $scope.insertNew(index, 'brother_below', baseNode.rightValue/1+1, baseNode.depth)

  getStructNodeList = ->
    params = {rootId: $routeParams.rootId}
    promise = WmsStructNodeService.listByRootId(params)
    promise.then (data) ->
      $scope.structNodeList = data

  prepareConst = ->
    params = {id: $routeParams.rootId}
    promise = WmsStructRootService.detail(params)
    promise.then (data) ->
      $scope.structRoot = data

    promise = WmsStructNodeService.dataTypeList()
    promise.then (data) ->
      $scope.dataTypeList = data

  main = ->
    getStructNodeList()
    prepareConst()

  main()