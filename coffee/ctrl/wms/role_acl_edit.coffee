'use strict'

angular.module 'app.controllers'

.controller 'WmsRoleAclEditCtrl', ($scope, $routeParams, CommonService, WmsRoleAclService, ClickEditService) ->
  $scope.switchNode = (roleAcl, fieldName, bool) ->
    ClickEditService.switchNode(roleAcl, fieldName, bool)

  main = ->
  main()