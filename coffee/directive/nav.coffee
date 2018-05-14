'use strict';

angular.module 'app.directives'


# swtich for mini style NAV, realted to 'collapseNav' directive
.directive('toggleNavCollapsedMin', [ 
    '$rootScope'
    ($rootScope) ->
        return {
            restrict: 'A'
            link: (scope, ele, attrs) ->
                app = $('#app')

                ele.on('click', (e) ->
                    if app.hasClass('nav-collapsed-min')
                        app.removeClass('nav-collapsed-min')
                    else
                        app.addClass('nav-collapsed-min')
                        $rootScope.$broadcast('nav:reset')

                    e.preventDefault()
                )
        }
])

# for accordion/collapse style NAV
.directive('collapseNav', [ ->
    return {
        restrict: 'A'
        link: (scope, ele, attrs) ->
            $window = $(window)
            $lists = ele.find('ul').parent('li') # only target li that has sub ul
            $lists.append('<i class="ti-angle-down icon-has-ul-h"></i><i class="ti-angle-double-right icon-has-ul"></i>')
            $a = $lists.children('a')
            $listsRest = ele.children('li').not($lists)
            $aRest = $listsRest.children('a')

            $app = $('#app')
            $nav = $('#nav-container')

            hasActive = false
            angular.forEach($lists, (list) ->
                $list = angular.element(list)
                if ($list.hasClass('active'))
                    hasActive = true
                    $list.addClass('open').find('ul').stop().slideToggle()
                    event.preventDefault()
            )

            if hasActive == false
                firstList = angular.element($lists[0])
                firstList.addClass('open').find('ul').stop().slideToggle()

            $a.on('click', (event) ->
                # disable click event when Nav is mini style || DESKTOP horizontal nav
                if ( $app.hasClass('nav-collapsed-min') || ($nav.hasClass('nav-horizontal') && $window.width() >= 768) ) then return false
                $this = $(this)
                $parent = $this.parent('li')
                $lists.not( $parent ).removeClass('open').find('ul').slideUp()
                $parent.toggleClass('open').find('ul').stop().slideToggle()
                event.preventDefault()
            )

            $aRest.on('click', (event) ->
                $lists.removeClass('open').find('ul').slideUp()
            )

            # reset NAV, sub Ul should slideUp
            scope.$on('nav:reset', (event) ->
                $lists.removeClass('open').find('ul').slideUp()
            )

            # removeClass('nav-collapsed-min') when size < $screen-sm
            # reset Nav when go from mobile to horizontal Nav
            Timer = undefined
            prevWidth = $window.width()
            updateClass = ->
                currentWidth = $window.width()
                if currentWidth < 768 then $app.removeClass('nav-collapsed-min')
                if prevWidth < 768 && currentWidth >= 768 && $nav.hasClass('nav-horizontal')
                    # reset NAV, sub Ul should slideUp
                    $lists.removeClass('open').find('ul').slideUp()

                prevWidth = currentWidth


            $window.resize( () ->
                clearTimeout(t)
                t = setTimeout(updateClass, 300)
            )

    }
])

# Add 'active' class to li based on url, muli-level supported, jquery free
.directive('highlightActive', [ ->
    return {
        restrict: "A"
        controller: [
            '$scope', '$element', '$i18next', '$attrs', '$location','SessionService'
            ($scope, $element, $i18next, $attrs, $location,SessionService) ->
                links = $element.find('a')
                path = ->
                    return $location.path()

                highlightActive = (links, path) ->
                    path = '#' + path

                    angular.forEach(links, (link) ->
                        $link = angular.element(link)
                        $li = $link.parent('li')
                        href = $link.attr('href')

                        if ($li.hasClass('active'))
                            $li.removeClass('active')

                        if href.indexOf(path) is 0 && href != ""
                            $li.addClass('active')
                            $li.parent().parent("li").addClass('active')
                    )

                highlightActive(links, $location.path())

                $scope.$watch(path, (newVal, oldVal) ->
                    if newVal is oldVal
                        return
                    highlightActive(links, $location.path())
                )

        ]

    }
])

# Add 'active' class to li based on url, muli-level supported, jquery free
.directive('showMenuActive', [ ->
  return {
    restrict: "A"
    controller: [
      '$scope', '$element', '$i18next', '$attrs', '$location','SessionService'
      ($scope, $element, $i18next, $attrs, $location,SessionService) ->
        roleLis = $element.children('li')

        getRoleHref = ->
          return SessionService.getHrefList()

        showMenu = (roleLis, roleHrefList) ->
          if roleHrefList != undefined
            angular.forEach(roleLis, (li) ->
              $li = angular.element(li)
              href = $li.find('ul > li').children(':first').attr('href')
              $li.removeClass('hide')

              if href != undefined
                href = href.substr('#/wms/'.length)

              if href != undefined && href.indexOf('?') > 0
                href = href.substr(0,href.indexOf('?'))

              if roleHrefList != undefined && href != undefined && href != '' && roleHrefList.indexOf(href) < 0
                $li.addClass('hide')

            )
        showMenu(roleLis, getRoleHref())
        $scope.$watch(getRoleHref, (newVal, oldVal) ->
          if newVal is oldVal
            return
          showMenu(roleLis, getRoleHref())
        )

    ]

  }
])


# Add 'active' class to li based on url, muli-level supported, jquery free
.directive('showMenuList', [ ->
    return {
        restrict: "A"
        controller: [
            '$scope', '$element', '$i18next', '$attrs', '$location','SessionService'
            ($scope, $element, $i18next, $attrs, $location, SessionService) ->
                divs = $element.children('div')
                getRoleHref = ->
                    return SessionService.getHrefList()

                showMenu = (divs, roleHrefList) ->
                    if roleHrefList != undefined
                        angular.forEach(divs, (div) ->
                            $div = angular.element(div)
                            href = $div.find('a:first').attr('href')

                            if href != undefined
                              href = href.substr('#/wms/'.length)

                            if href != undefined && href.indexOf('?') > 0
                              href = href.substr(0,href.indexOf('?'))

                            if roleHrefList != undefined && href != undefined && href != '' && roleHrefList.indexOf(href) < 0
                                $div.addClass('hide')
                        )
                showMenu(divs, getRoleHref())

                $scope.$watch(getRoleHref, (newVal, oldVal) ->
                    if newVal is oldVal
                        return
                    showMenu(divs, getRoleHref())
                )
        ]

    }
])

# toggle on-canvas for small screen, with CSS
.directive('toggleOffCanvas', [ ->
    return {
        restrict: 'A'
        link: (scope, ele, attrs) ->
            ele.on('click', ->
                $('#app').toggleClass('on-canvas')
            )
    }
])

.directive('slimScroll', [ ->
    return {
        restrict: 'A'
        link: (scope, ele, attrs) ->
            ele.slimScroll({
                height: attrs.scrollHeight || '100%'
            })
    }
])