'use strict'

angular.module 'app.controllers'

.controller 'WmsLogisticOrderRefExpressCtrl', ($scope, $routeParams,$location,$i18next,ModalService, WmsLogisticOrderService) ->

  $scope.getLogisticOrder = ->
    $scope.isOpenNumberFocus = true
    params = {id:$scope.logisticOrderId}
    $scope.logisticOrderId = ""
    promise = WmsLogisticOrderService.detail(params)
    promise.then (data) ->
      $scope.logisticOrder = data
      $scope.logisticOrderId = $scope.logisticOrder.id
      if $scope.logisticOrder.status == 1
        angular.element('#last4PhoneNumber').focus()
      else if $scope.logisticOrder.status == 2 || $scope.logisticOrder.status == 3
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderAlreadyPack")
      else
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderNotPickStatus")

  $scope.checkPhoneNumber = ->
    $scope.showInputExpressSn = true
    if $scope.expressOrder.last4PhoneNumber.length == 4
      if $scope.logisticOrder.phoneNumber.substr(-4) != $scope.expressOrder.last4PhoneNumber
        ModalService.showMessageOnError $i18next("wms:message.validationError.last4PhoneNumberError")
      else
        angular.element('#inputExpressSn').focus()

  $scope.updateExpressOrder = ->
    promise = WmsLogisticOrderService.updateExpressSn($scope.logisticOrder)
    promise.then () ->
      window.location.reload()

  main = ->
    $scope.logisticOrderId = ""
    $scope.expressOrder = {
      last4PhoneNumber: ''
    }
    $scope.isOpenNumberFocus = false
    $scope.showInputExpressSn = false
    angular.element('#logisticId').focus()
    main()