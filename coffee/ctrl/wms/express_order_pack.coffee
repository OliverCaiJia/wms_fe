'use strict'

angular.module 'app.controllers'

.controller 'WmsExpressOrderPackCtrl', ($scope, $location, $i18next, WmsPickOrderService, ModalService) ->
  $scope.getLogisticOrder = ->
    params = {expressSn: $scope.expressSn}
    $scope.expressSn = ''
    promise = WmsPickOrderService.detailByExpressSn(params)
    promise.then (data) ->
      $scope.pickOrder = data
      if $scope.pickOrder.status == 1
        $scope.expressSn = ''
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderNotPick")
      else if $scope.pickOrder.status == 2
        $location.path("/wms/pack_goods").search("id", $scope.pickOrder.id)
      else
        $scope.expressSn = ''
        ModalService.showMessageOnError $i18next("wms:message.validationError.logisticOrderAlreadyPack")


  main = ->
    $scope.isOpenNumberFocus = false
    angular.element('#expressSn').focus()
    $scope.expressSn = ''
    $scope.expressOrder = {
      last4PhoneNumber: ''
      expressSn: ''
    }
    $scope.pickOrder = {}
  main()