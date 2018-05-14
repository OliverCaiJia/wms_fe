'use strict'

angular.module 'app.controllers'

.controller 'WmsRoleDetailCtrl', ($scope, $routeParams, WmsRoleService,WmsSellerService,WmsMemberRoleService,
  WmsMemberService) ->

  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsMemberRoleService.delete(params)
    promise.then ->
      $scope.memberRoleList.splice(i, 1)

  prepareConst = ->
    promise = WmsMemberService.mapAllBase()
    promise.then (data) ->
      $scope.memberMap = data

    params = {roleId: $scope.roleId}
    promise = WmsMemberRoleService.listByRoleId(params)
    promise.then (data) ->
      $scope.memberRoleList = data

    params = {roleId: $scope.roleId}
    promise = WmsSellerService.mapAll(params)
    promise.then (data) ->
      $scope.sellerMap = data

  main = ->
    $scope.roleId = $routeParams.roleId
    params = {id: $scope.roleId}
    promise = WmsRoleService.detail(params)
    promise.then (data) ->
      $scope.role = data
      prepareConst()
                
  main()