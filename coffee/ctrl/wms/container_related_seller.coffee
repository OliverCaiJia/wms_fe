'use strict'

angular.module 'app.controllers'

.controller 'WmsContainerRelatedSellerCtrl', ($scope, $routeParams, WmsContainerService, WmsSellerService
  WmsSellerAvailableContainerService) ->
  # add
  $scope.add = (sellerId) ->
    $scope.sellerAvailableContainer.sellerId = sellerId
    promise = WmsSellerAvailableContainerService.add($scope.sellerAvailableContainer)
    promise.then (data) ->
      $scope.sellerAvailableContainer.id = data
      $scope.sellerGoodsMap[sellerId] = $scope.sellerAvailableContainer
      $scope.sellerAvailableContainer = {containerId: $routeParams.id}

  prepareConst = ->
    params = {id: $routeParams.id}
    promise = WmsContainerService.detail(params)
    promise.then (data) ->
      $scope.container = data

    params = {containerId: $routeParams.id}
    promise = WmsSellerAvailableContainerService.mapByContainerId(params)
    promise.then (data) ->
      $scope.sellerContainerMap = data

  main = ->

    $scope.sellerAvailableContainer = {containerId: $routeParams.id}
    promise = WmsSellerService.listAll()
    promise.then (data) ->
      $scope.sellerList = data
      prepareConst()

  main()