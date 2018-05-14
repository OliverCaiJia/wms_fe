'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerAvailableGoodsGroupEditCtrl', ($scope, $routeParams, CommonService, ClickEditService,SessionService,
  WmsSellerAvailableGoodsGroupService) ->
# update disabled
  $scope.updateDisabled = (sellerAvailableGoodsGroup, bool) ->
    params = {id: sellerAvailableGoodsGroup.id,disabled:bool}
    promise = WmsSellerAvailableGoodsGroupService.updateDisabled(params)
    promise.then ->
      sellerAvailableGoodsGroup.disabled = bool

  # update
  $scope.updateBarCode = (sellerAvailableGoodsGroup, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableGoodsGroup, fieldName)
      promise = WmsSellerAvailableGoodsGroupService.updateBarCode(sellerAvailableGoodsGroup)
      promise.then ->
                
  # update
  $scope.updateGroupName = (sellerAvailableGoodsGroup, fieldName) ->
    if ClickEditService.updateNode(sellerAvailableGoodsGroup, fieldName)
      promise = WmsSellerAvailableGoodsGroupService.updateGroupName(sellerAvailableGoodsGroup)
      promise.then ->

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (sellerAvailableGoodsGroup, fieldName, bool) ->
    ClickEditService.switchNode(sellerAvailableGoodsGroup, fieldName, bool)

  main = ->
    $scope.sellerId = SessionService.getSellerId()
    $scope.searchOption = {"keywords":""}
    params = {id: $routeParams.id}
    promise = WmsSellerAvailableGoodsGroupService.detail(params)
    promise.then (data) ->
      $scope.sellerAvailableGoodsGroup = data

  main()