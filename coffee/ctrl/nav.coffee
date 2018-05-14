'use strict'

angular.module 'app.controllers'

.controller 'NavCtrl', (
  $scope
  $i18next
  $location
  WmsMemberService
  UserStorageService
  SessionService
  WmsSellerService
) ->

  $scope.signOut = ->
    WmsMemberService.signOut()

  $scope.$on "userSignInSuccess", ->
    init()

  $scope.$on "userSignUpSuccess", ->
    init()

  $scope.$on "userSignOutSuccess", ->
    $scope.username = ""

  getSeparator = ->
    return " - "
    
  init = ->
    $scope.username = SessionService.getUsername()
    $scope.sellerId = SessionService.getSellerId()

    if $scope.username && !$scope.sellerId
      promise = WmsSellerService.listAllBase()
      promise.then (data) ->
        $scope.sellerList = data

  init()