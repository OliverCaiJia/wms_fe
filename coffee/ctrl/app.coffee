'use strict';

angular.module('app.controllers', [])

# overall control
.controller 'AppCtrl', (
  $scope
  UserStorageService
) ->
  $scope.admin =
    skin: '11' # 11,12,13,14,15,16; 21,22,23,24,25,26;; 31,32,33,34,35,36

  $scope.color =
    primary: '#5B90BF'
    success: '#A3BE8C'
    info: '#7FABD2'
    infoAlt: '#B48EAD'
    warning: '#EBCB8B'
    danger: '#BF616A'
    gray: '#DCDCDC'

  if UserStorageService.getLang()
    i18n.options.lng = UserStorageService.getLang()
  else
    i18n.options.lng = 'zh'

  $scope.$on "adminSkinReset", (event, skinId) ->
    $scope.admin =
      skin: skinId
