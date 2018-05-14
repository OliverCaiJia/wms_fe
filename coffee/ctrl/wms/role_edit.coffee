'use strict'

angular.module 'app.controllers'

.controller 'WmsRoleEditCtrl', ($scope, $routeParams, CommonService, WmsRoleService, ClickEditService) ->
  # update
  $scope.updateName = (role, fieldName) ->
    if ClickEditService.updateNode(role, fieldName)
      promise = WmsRoleService.updateName(role)
      promise.then ->
                
  $scope.switchNode = (role, fieldName, bool) ->
    ClickEditService.switchNode(role, fieldName, bool)

  main = ->
    params = {id: $routeParams.id}
    promise = WmsRoleService.detail(params)
    promise.then (data) ->
      $scope.role = data
                
  main()