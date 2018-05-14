"use strict"

angular.module "app.controllers"

.controller "WmsSignInCtrl", ($scope, $location, WmsMemberService,$route,WmsMemberRoleService,SessionService,WmsMenuService) ->

  $scope.signIn = ->
    promise = WmsMemberService.signIn($scope.member)
    promise.then (data) ->
      $scope.member = data

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
        $location.path('/')
#        $route.reload()

