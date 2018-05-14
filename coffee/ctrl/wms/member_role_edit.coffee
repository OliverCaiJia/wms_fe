'use strict'

angular.module 'app.controllers'

.controller 'WmsMemberRoleEditCtrl', ($scope, $routeParams, CommonService, WmsMemberRoleService, ClickEditService) ->
  $scope.switchNode = (memberRole, fieldName, bool) ->
    ClickEditService.switchNode(memberRole, fieldName, bool)

  main = ->
  main()