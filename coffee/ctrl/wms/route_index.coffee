"use strict"

angular.module "app.controllers"

.controller "WmsRouteIndexCtrl", ($scope, WmsMemberService,WmsMemberRoleService,SessionService,WmsMenuService) ->

  init = ->
    $scope.username = SessionService.getUsername()
    $scope.sellerId = SessionService.getSellerId()

    params = {id:$scope.sellerId}
    promise = WmsMemberRoleService.detailBySession()
    promise.then (data) ->
      $scope.aclList = data
      roleHref = ''
      $scope.roleHrefList = WmsMenuService.getRoleHrefList()
      $scope.commonHref = WmsMenuService.getCommonHref()

      angular.forEach($scope.aclList,(acl) ->
        if $scope.roleHrefList[acl]
          roleHref += $scope.roleHrefList[acl]
      )
      roleHref += $scope.commonHref
      SessionService.setHrefList(roleHref)

  init()
