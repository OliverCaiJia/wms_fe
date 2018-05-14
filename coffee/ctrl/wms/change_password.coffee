"use strict"

angular.module "app.controllers"

.controller "WmsChangePasswordCtrl", ($scope, $i18next, WmsMemberService, ModalService) ->
  $scope.changePassword = ->
    if $scope.member.password != $scope.member.passwordConfirmation
      ModalService.showMessageOnError $i18next("passport:message.validationError.password.notEqual")
      return
    WmsMemberService.changePassword($scope.member)

  main = ->
    $scope.member = {
      "originalPassword": ""
      "password": ""
      "passwordConfirmation": ""
    }

  main()