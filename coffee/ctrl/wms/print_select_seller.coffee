'use strict'

angular.module 'app.controllers'

.controller 'WmsPrintSelectSellerCtrl', ($scope, $location, WmsSellerService) ->
  $scope.selectSeller = (sellerId) ->
    $location.path("/wms/print_express_order").search("sellerId", sellerId)

  main = ->
    promise = WmsSellerService.listAll()
    promise.then (data) ->
      if data.length == 1
        sellerId = data[0].id
        $location.path("/wms/print_express_order").search("sellerId", sellerId)
      $scope.sellerList = data
  main()