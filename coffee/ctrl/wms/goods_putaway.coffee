'use strict'

angular.module 'app.controllers'

.controller 'WmsGoodsPutawayCtrl', ($scope, $i18next, $routeParams, WmsSellerGoodsService,ModalService) ->
  $scope.scanGoodsCode = ->
    params = {
      sellerGoodsId: $scope.sellerGoodsId
      goodsCode: $scope.goodsCode
    }
    promise = WmsSellerGoodsService.goodsPutaway(params)
    promise.then ->
      $scope.goodsCode = ''

  $scope.scanShelfLocation = ->
    if $scope.shelfLocation == $scope.sellerGoods.shelfLocation
      angular.element('#scanCodeInput').focus()
      $scope.goodsCode = ''
    else
      $scope.shelfLocation = ''
      ModalService.showMessageOnError $i18next("wms:message.validationError.shelfLocationError")

  prepareConst = ->


  main = ->
    angular.element('#scanShelfLocationInput').focus()
    $scope.goodsCode = ''
    $scope.shelfLocation = ''

    $scope.sellerGoodsId = $routeParams.sellerGoodsId

    params = {id: $scope.sellerGoodsId}
    promise = WmsSellerGoodsService.detail(params)
    promise.then (data) ->
      $scope.sellerGoods = data
      prepareConst()

  main()