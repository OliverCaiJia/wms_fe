'use strict'

angular.module 'app.controllers'

.controller 'WmsLogisticOrderPickSearchCtrl', ($scope, $routeParams,$location,$i18next,
  ModalService, WmsLogisticOrderService,WmsPickOrderService) ->

  $scope.getLogisticOrder = ->
    $scope.logisticOrder = {}
    $scope.isOpenNumberFocus = true
    params = {expressSn:$scope.expressSn}
    $scope.expressSn = ""

    promise = WmsLogisticOrderService.detailByExpressSn(params)
    promise.then (data) ->
      $scope.logisticOrder = data
      $scope.expressSn = $scope.logisticOrder.expressSn

      promise = WmsPickOrderService.detailByExpressSn(params)
      promise.then (data) ->
        $scope.pickOrder = data
        if $scope.pickOrder.status == 1
          $location.path("/wms/pick_goods").search("pickOrderId", $scope.pickOrder.id)
  #        angular.element('#last4PhoneNumber').focus()
        else if $scope.pickOrder.status == 2 || $scope.pickOrder.status == 3
          $scope.expressSn = ''
          $scope.logisticOrder = {}
          ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderAlreadyPack")
        else
          $scope.logisticOrder = {}
          ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderNotPickStatus")


#  $scope.checkPhoneNumber = ->
#    if $scope.expressOrder.last4PhoneNumber.length == 4
#      if $scope.logisticOrder.phoneNumber.substr(-4) != $scope.expressOrder.last4PhoneNumber
#        ModalService.showMessageOnError $i18next("wms:message.validationError.last4PhoneNumberError")
#      else
#        $location.path("/wms/pick_goods").search("logisticOrderId", $scope.logisticOrder.id)

  main = ->
    $scope.expressSn = ""
    $scope.expressOrder = {
      last4PhoneNumber: ''
    }
    $scope.isOpenNumberFocus = false
    angular.element('#expressSn').focus()
  main()