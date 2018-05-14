'use strict'

angular.module 'app.controllers'

.controller 'HeaderCtrl', (
  $scope
  $rootScope
  $i18next
  $location
  WmsMemberService
  SessionService
  UserStorageService
) ->
  $scope.username = SessionService.getUsername()

  $scope.$on "userSignInSuccess", ->
    $scope.username = SessionService.getUsername()
    $scope.sellerId = SessionService.getSellerId()
    if $scope.sellerId
      $rootScope.$broadcast("adminSkinReset", '32')
    else
      $rootScope.$broadcast("adminSkinReset", '11')

  $scope.$on "userSignUpSuccess", ->
    $scope.username = SessionService.getUsername()

  $scope.$on "userSignOutSuccess", ->
    $scope.username = ""

  $scope.signOut = ->
    WmsMemberService.signOut()

  $scope.setLang = (lang) ->
    i18n.init({ lng: lang })
    UserStorageService.saveLang(lang)

  $scope.getFlag = ->
    if i18n.options.lng  == 'zh-CN'
      lang = 'zh'
      i18n.init({ lng: lang })
      UserStorageService.saveLang(lang)

    switch i18n.options.lng
      when 'en' then return 'flags-american'
      when 'en-US' then return 'flags-american'
      when 'zh' then return 'flags-china'
      when 'zh-CN' then return 'flags-china'

  init = ->
    $scope.sellerId = SessionService.getSellerId()
    if $scope.sellerId
      $rootScope.$broadcast("adminSkinReset", '31')
    else
      $rootScope.$broadcast("adminSkinReset", '11')
  init()

