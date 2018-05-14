'use strict'

angular.module 'app.controllers'

.controller 'WmsMemberEditCtrl', ($scope, $routeParams, CommonService, WmsMemberService, ClickEditService) ->
  # update
  $scope.updateMobilePhone = (member, fieldName) ->
    if ClickEditService.updateNode(member, fieldName)
      promise = WmsMemberService.updateMobilePhone(member)
      promise.then ->
                
  # update
  $scope.updateRealName = (member, fieldName) ->
    if ClickEditService.updateNode(member, fieldName)
      promise = WmsMemberService.updateRealName(member)
      promise.then ->
                
  # update
  $scope.updateJobNumber = (member, fieldName) ->
    if ClickEditService.updateNode(member, fieldName)
      promise = WmsMemberService.updateJobNumber(member)
      promise.then ->
                
  # update
  $scope.disabledMember = (member, fieldName) ->
    if ClickEditService.updateNode(member, fieldName)
      promise = WmsMemberService.disabledMember(member)
      promise.then ->
                
  # update
  $scope.updateName = (member, fieldName) ->
    if ClickEditService.updateNode(member, fieldName)
      promise = WmsMemberService.updateName(member)
      promise.then ->
                
  $scope.switchNode = (member, fieldName, bool) ->
    ClickEditService.switchNode(member, fieldName, bool)

  main = ->
    params = {id: $routeParams.id}
    promise = WmsMemberService.detail(params)
    promise.then (data) ->
      $scope.member = data
                
  main()