'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerPlatformSourceEditCtrl', ($scope, $routeParams, CommonService, WmsSellerPlatformSourceService
  WmsPlatformSourceService, ClickEditService) ->
  # update
  $scope.updateSubscribeService = (sellerPlatformSource, fieldName) ->
    if ClickEditService.updateNode(sellerPlatformSource, fieldName)
      promise = WmsSellerPlatformSourceService.updateSubscribeService(sellerPlatformSource)
      promise.then ->
                
  # update
  $scope.updateSecret = (sellerPlatformSource, fieldName) ->
    if ClickEditService.updateNode(sellerPlatformSource, fieldName)
      promise = WmsSellerPlatformSourceService.updateSecret(sellerPlatformSource)
      promise.then ->
                
  # update
  $scope.updateAppKey = (sellerPlatformSource, fieldName) ->
    if ClickEditService.updateNode(sellerPlatformSource, fieldName)
      promise = WmsSellerPlatformSourceService.updateAppKey(sellerPlatformSource)
      promise.then ->

  # update
  $scope.updateSubscribeService = ->
    promise = WmsSellerPlatformSourceService.updateSubscribeService($scope.sellerPlatformSource)
    promise.then ->
                
  $scope.switchNode = (sellerPlatformSource, fieldName, bool) ->
    ClickEditService.switchNode(sellerPlatformSource, fieldName, bool)

  prepareConst = ->
    params = {id: $scope.sellerPlatformSource.platformSourceId}
    promise = WmsPlatformSourceService.detail(params)
    promise.then (data) ->
      $scope.platformSource = data

  main = ->
    params = {id: $routeParams.id}
    promise = WmsSellerPlatformSourceService.detail(params)
    promise.then (data) ->
      $scope.sellerPlatformSource = data
      prepareConst()

  main()