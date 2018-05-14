'use strict'

angular.module 'app.controllers'

.controller 'WmsContainerEditCtrl', ($scope, $routeParams, CommonService, WmsContainerService, ClickEditService,
  WmsLogisticRequireService,DeviceDriverService) ->
  # update
  $scope.updateInventory = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateInventory(container)
      promise.then ->
                
  # update
  $scope.updatePackingCharge = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updatePackingCharge(container)
      promise.then ->

  # update
  $scope.updateLogisticRequire = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateLogisticRequire(container)
      promise.then ->
                
  # update
  $scope.updateHeight = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateHeight(container)
      promise.then ->
                
  # update
  $scope.updateWidth = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateWidth(container)
      promise.then ->
                
  # update
  $scope.updateLength = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateLength(container)
      promise.then ->
                
  # update
  $scope.updateName = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateName(container)
      promise.then ->
                
  # update
  $scope.updateBarCode = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateBarCode(container)
      promise.then ->

# update
  $scope.updateWeight = (container, fieldName) ->
    if ClickEditService.updateNode(container, fieldName)
      promise = WmsContainerService.updateWeight(container)
      promise.then ->

  # update
  $scope.updateWeightByScale = (container) ->
    promise = DeviceDriverService.getWeight()
    promise.then (deviceWeight) ->
      $scope.deviceWeight = deviceWeight
      container.weight = deviceWeight
      promise = WmsContainerService.updateWeight(container)
      promise.then ->

  $scope.switchNode = (container, fieldName, bool) ->
    ClickEditService.switchNode(container, fieldName, bool)

  $scope.checkLogisticRequire = () ->
    $scope.container.logisticRequire = []
    angular.forEach($scope.logisticRequireEnum,(require)->
      if $scope.logisticRequireList[require]
        $scope.container.logisticRequire.push(require)
    )
    if $scope.container.logisticRequire.length == 0
      $scope.container.logisticRequire = ['']
    promise = WmsContainerService.updateLogisticRequire($scope.container)
    promise.then ->

  prepareConst = ->
    promise = WmsLogisticRequireService.listAll()
    promise.then (data) ->
      $scope.logisticRequireEnum = data

  main = ->
    $scope.logisticRequireList = []
    params = {id: $routeParams.id}
    promise = WmsContainerService.detail(params)
    promise.then (data) ->
      $scope.container = data
      angular.forEach($scope.container.logisticRequire,(require)->
        $scope.logisticRequireList[require] = true
      )
      prepareConst()
                
  main()