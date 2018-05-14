'use strict'

angular.module 'app.controllers'

.controller 'WmsMemberDetailCtrl', ($scope, $routeParams, WmsMemberService) ->
  main = ->
    params = {id: $routeParams.id}
    promise = WmsMemberService.detail(params)
    promise.then (data) ->
      $scope.member = data
                
  main()