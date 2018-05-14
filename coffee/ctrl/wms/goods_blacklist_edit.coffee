'use strict'

angular.module 'app.controllers'

.controller 'WmsGoodsBlacklistEditCtrl', ($scope, $routeParams, CommonService, WmsGoodsBlacklistService, ClickEditService) ->
  $scope.switchNode = (goodsBlacklist, fieldName, bool) ->
    ClickEditService.switchNode(goodsBlacklist, fieldName, bool)

  main = ->
  main()