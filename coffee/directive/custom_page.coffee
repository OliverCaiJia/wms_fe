'use strict';

angular.module('app.directives', [])
# add class for specific pages
.directive('customPage', () ->
  return {
  restrict: "A"
  controller: [
    '$scope', '$element', '$location', 'SessionService','ModalService'
    ($scope, $element, $location, SessionService, ModalService) ->
      path = ->
        return $location.path()

      checkLogin = (path) ->
        requireLogin = true
        sessionId = SessionService.getSessionId()
        switch path
          when '', '/404'
            requireLogin = false
          when '/wms/signin'
            requireLogin = false

        if requireLogin and !sessionId
          ModalService.showSignInForm()
          return


      addBg = (path) -># remove all the classes
        $element.removeClass('body-wide body-err body-lock body-auth')

        # add certain class based on path
        switch path
          when '/404'
            $element.addClass('body-wide body-err')
          when '/wms/signin'
            $element.addClass('body-wide body-auth')

      checkLogin $location.path()
      addBg $location.path()

      $scope.$watch(path, (newVal, oldVal) ->
        if newVal is oldVal
          return
        checkLogin newVal
        addBg newVal
      )
  ]
  }
)
