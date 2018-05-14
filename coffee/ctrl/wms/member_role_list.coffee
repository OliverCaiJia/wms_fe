'use strict'

angular.module 'app.controllers'

.controller 'WmsMemberRoleListCtrl', ($scope, $routeParams, $filter, CommonService, WmsMemberRoleService
  WmsRoleService, WmsMemberService, ClickEditService) ->
  # add
  $scope.add = ->
    promise = WmsMemberRoleService.add($scope.memberRole)
    promise.then (data) ->
      $scope.memberRole.id = data
      $scope.memberRoleList.unshift($scope.memberRole)
      $scope.createMemberRole = {}
      $scope.memberRole = {memberId: $routeParams.memberId}

  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsMemberRoleService.delete(params)
    promise.then ->
      $scope.memberRoleList.splice(i, 1)

  # update
  $scope.update = (memberRole, fieldName) ->
    if ClickEditService.updateNode(memberRole, fieldName)
      promise = WmsMemberRoleService.update(memberRole)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (memberRole, fieldName, bool) ->
    ClickEditService.switchNode(memberRole, fieldName, bool)

  prepareConst = ->
    params = {id: $routeParams.memberId}
    promise = WmsMemberService.detail(params)
    promise.then (member) ->
      $scope.member = member
      if member.isSellerMember
        params = {sellerRole: true}
      else
        params = {sellerRole: false}
      promise = WmsRoleService.listBySellerRole(params)
      promise.then (data) ->
        $scope.roleList = data
        $scope.roleMap = CommonService.convertListToMap($scope.roleList, "id")


  main = ->
    $scope.createMemberRole = {}
    $scope.memberRole = {memberId: $routeParams.memberId}
    params = {memberId: $routeParams.memberId}
    promise = WmsMemberRoleService.listByMemberId(params)
    promise.then (data) ->
      $scope.memberRoleList = data
    prepareConst()

  main()