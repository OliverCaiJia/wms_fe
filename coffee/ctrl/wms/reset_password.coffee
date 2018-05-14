"use strict"

angular.module "app.controllers"

.controller "WmsResetPasswordCtrl", ($scope, $i18next, $routeParams, WmsMemberService, ModalService, SessionService) ->
  $scope.resetPassword = ->
    if $scope.member.password != $scope.member.passwordConfirmation
      ModalService.showMessageOnError $i18next("passport:message.validationError.password.notEqual")
      return
    WmsMemberService.resetPassword($scope.member)

  prepareConst = ->
    params = {id:$routeParams.id}
    promise = WmsMemberService.detail(params)
    promise.then (data) ->
      $scope.currentMember = data

  main = ->
    $scope.sellerId = SessionService.getSellerId()
    $scope.member = {
      "memberId": $routeParams.id
      "password": ""
      "passwordConfirmation": ""
    }
  prepareConst()


  main()