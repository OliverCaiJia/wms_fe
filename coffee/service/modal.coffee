'use strict';

angular.module 'app'

.controller 'ModalApiResultCtrl', ($scope, $uibModalInstance, apiResult) ->
  $scope.ok = ->
    $uibModalInstance.close $scope.apiResult

  $scope.dismiss = ->
    $uibModalInstance.dismiss "dismiss"

  main = ->
    $scope.apiResult = apiResult
  main()

.controller 'ModalSignInCtrl', ($scope,$uibModalInstance,$i18next,$rootScope,$route
  WmsMemberService,ModalService,WmsMemberRoleService,SessionService,WmsMenuService) ->

  $scope.$on "userSignInSuccess", (event, currentUsername) ->
    $scope.username = currentUsername

  $scope.dismiss = ->
    $uibModalInstance.dismiss "dismiss"

  $scope.signIn = ->
    promise = WmsMemberService.signIn($scope.member)
    promise.then ->
      $scope.dismiss()

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
        $route.reload()

  main = ->
    $rootScope.toggle =
      showSignInModal:true
    $scope.errorMsg = ""
    $scope.member = {name: SessionService.getUsername()}
  main()


.controller 'ModalCheckDeleteCtrl', ($scope, $uibModalInstance, ApiService, apiResult) ->
  $scope.dismiss = ->
    $uibModalInstance.dismiss "dismiss"

  $scope.close = ->
    $uibModalInstance.dismiss "dismiss"

  $scope.delete = ->
    ApiService.post(apiResult.obj)
    $uibModalInstance.dismiss "dismiss"

  main = ->
    $scope.apiResult = {}
    $scope.apiResult.message = apiResult.message
  main()


.controller 'ModalCheckConfirmCtrl', ($scope,$rootScope, $uibModalInstance, ApiService, apiResult) ->
  $scope.dismiss = ->
    $uibModalInstance.dismiss "dismiss"

  $scope.close = ->
    $rootScope.closeConfirmModal = true
    $uibModalInstance.dismiss "dismiss"

  $scope.confirm = ->
    ApiService.post(apiResult.obj)
    $uibModalInstance.dismiss "dismiss"

  main = ->
    $scope.apiResult = {}
    $rootScope.closeConfirmModal = false
    $scope.apiResult.message = apiResult.message
  main()


.service 'ModalService', ($uibModal) ->
  showMessageOnSuccess: (msg) ->
    $uibModal.open
      templateUrl: "views/modal/api_success.html"
      controller: 'ModalApiResultCtrl'
      resolve:
        apiResult: ->
          message: msg

  showMessageOnError: (msg) ->
    $uibModal.open
      templateUrl: "views/modal/api_error.html"
      controller: 'ModalApiResultCtrl'
      resolve:
        apiResult: ->
          message: msg

  showSignInForm: ->
    $uibModal.open
      templateUrl: "views/modal/signin.html"
      controller: 'ModalSignInCtrl'

  showMessageOnCheckDelete: (msg, obj) ->
    $uibModal.open
      templateUrl: "views/modal/api_check_delete.html"
      controller: 'ModalCheckDeleteCtrl'
      resolve:
        apiResult: ->
          message: msg
          obj: obj


  showMessageOnConfirm: (msg, obj) ->
    $uibModal.open
      templateUrl: "views/modal/api_check_confirm.html"
      controller: 'ModalCheckConfirmCtrl'
      resolve:
        apiResult: ->
          message: msg
          obj: obj
