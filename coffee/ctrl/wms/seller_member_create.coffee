'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerMemberCreateCtrl', ($scope, $routeParams, WmsMemberService) ->

  $scope.add = ->
    promise = WmsMemberService.addSellerMember($scope.member)
    promise.then ->
      $scope.member.id = data

  main = ->
    $scope.member = {
      sellerId: $routeParams.sellerId
      isSellerMember: true
    }

    params = {sellerId: $routeParams.sellerId}
    promise = WmsMemberService.listSellerMember(params)
    promise.then (data) ->
      $sellerMemberList = data

  main()