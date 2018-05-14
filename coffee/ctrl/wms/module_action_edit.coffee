'use strict'

angular.module 'app.controllers'

.controller 'WmsModuleActionEditCtrl', ($scope, $routeParams, CommonService, WmsModuleActionService, ClickEditService) ->
  # update
  $scope.updateName = (moduleAction, fieldName) ->
    if ClickEditService.updateNode(moduleAction, fieldName)
      promise = WmsModuleActionService.updateName(moduleAction)
      promise.then ->
                
  # update
  $scope.updateAlias = (moduleAction, fieldName) ->
    if ClickEditService.updateNode(moduleAction, fieldName)
      promise = WmsModuleActionService.updateAlias(moduleAction)
      promise.then ->
                
  $scope.switchNode = (moduleAction, fieldName, bool) ->
    ClickEditService.switchNode(moduleAction, fieldName, bool)

  main = ->
  main()