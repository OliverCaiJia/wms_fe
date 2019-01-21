(function() {
  'use strict';
  angular.module('app', ['ngRoute', 'ngCookies', 'duScroll', 'ngSanitize', 'jm.i18next', 'MassAutoComplete', 'ui.bootstrap', 'toastr', 'ngFileUpload', 'angularFileUpload', 'ngCsvImport', 'app.controllers', 'app.directives']);

}).call(this);

(function() {
  'use strict';
  angular.module('jm.i18next').config(function($i18nextProvider) {
    return $i18nextProvider.options = {
      fallbackLng: 'zh',
      load: "all",
      resGetPath: '../i18n/__lng__/__ns__.json',
      useCookie: false,
      ns: {
        namespaces: ['global', 'wms', 'passport', 'importRules'],
        defaultNs: 'global'
      }
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app').config(function($routeProvider) {
    var routes, setRoutes;
    routes = ['wms/container_list', 'wms/container_edit', 'wms/container_related_seller', 'wms/increase_container_inventory', 'wms/reduce_container_inventory', 'wms/goods_blacklist_detail', 'wms/goods_blacklist_list', 'wms/goods_list', 'wms/goods_edit', 'wms/increase_goods_inventory', 'wms/reduce_goods_inventory', 'wms/goods_upload_images_list', 'wms/logistic_order_edit', 'wms/pick_order_list', 'wms/logistic_order_detail', 'wms/logistic_order_goods_list', 'wms/pick_order_wait_pick_list', 'wms/pick_order_wait_pack_list', 'wms/logistic_order_pick_search', 'wms/member_list', 'wms/change_password', 'wms/reset_password', 'wms/signin', 'wms/member_role_list', 'wms/role_detail', 'wms/order_edit', 'wms/pick_goods', 'wms/order_list_wait_verify', 'wms/order_list_success_verify', 'wms/order_list_part_split', 'wms/order_list_success_split', 'wms/order_goods_detail', 'wms/order_goods_list', 'wms/order_goods_wait_verify', 'wms/platform_source_list', 'wms/role_acl_list', 'wms/role_list', 'wms/seller_available_goods_list', 'wms/available_goods_list', 'wms/seller_available_goods_detail', 'wms/reduce_available_goods_quantity', 'wms/increase_available_goods_quantity', 'wms/seller_available_container_list', 'wms/available_container_list', 'wms/seller_available_container_detail', 'wms/reduce_available_container_quantity', 'wms/increase_available_container_quantity', 'wms/seller_list', 'wms/seller_detail', 'wms/seller_member_list', 'wms/seller_goods_list', 'wms/seller_goods_edit', 'wms/seller_goods_manage_list', 'wms/seller_goods_manage_edit', 'wms/seller_combo_goods_list', 'wms/seller_combo_goods_detail', 'wms/seller_goods_increase', 'wms/seller_goods_reduce', 'wms/seller_platform_goods_list', 'wms/seller_platform_source_edit', 'wms/seller_platform_source_list', 'wms/module_list', 'wms/module_action_list', 'wms/goods_related_seller', 'wms/goods_related_platform_source', 'wms/goods_blacklist_list', 'wms/logistic_company_list', 'wms/split_order', 'wms/platform_order_upload_list', 'wms/express_order_list', 'wms/express_order_import', 'wms/express_order_pack', 'wms/pack_goods', 'wms/freight_group_list', 'wms/seller_freight_group_list', 'wms/struct_root_list', 'wms/struct_node_list', 'wms/api_list', 'wms/api_param_list', 'wms/provider_list', 'wms/provider_api_list', 'wms/provider_api_param_list', 'wms/provider_api_return_data_list', 'wms/sender_address_edit', 'wms/api_return_data_map_list', 'wms/api_return_data_list', 'wms/goods_encode_list', 'wms/pick_order_container', 'wms/pick_order_weight', 'wms/logistic_order_import_list', 'wms/logistic_order_ref_express', 'wms/response_inventory_transfer_list', 'wms/response_inventory_transfer_goods_list', 'wms/inventory_transfer_edit', 'wms/inventory_transfer_list', 'wms/inventory_transfer_goods_list', 'wms/request_inventory_transfer_list', 'wms/request_inventory_transfer_goods_list', 'wms/inventory_transfer_pick_goods', 'wms/goods_storage', 'wms/goods_putaway', 'wms/goods_breakage', 'wms/goods_encode_breakage', 'wms/goods_breakage_log_list', 'wms/prepack_goods', 'wms/prepack_goods_group', 'wms/print_express_order', 'wms/print_select_seller', 'wms/seller_available_goods_group_list', 'wms/seller_available_goods_group_detail', 'wms/pick_order_goods_list', 'wms/seller_pick_order_list', 'wms/check_device_scale', 'wms/check_device_printer', 'wms/usable_logistic_company_list', 'wms/pick_order_wait_delivery_list', 'wms/pick_order_wait_pick_no_print', 'wms/pick_order_wait_pick_printed', 'wms/warehouse_list', 'wms/warehouse_detail', 'wms/repository_detail', 'wms/repository_edit', 'wms/repository_list', 'wms/location_detail', 'wms/location_edit', 'wms/location_list'];
    setRoutes = function(route) {
      var config, url;
      url = '/' + route;
      config = {
        templateUrl: 'views/' + route + '.html'
      };
      $routeProvider.when(url, config);
      return $routeProvider;
    };
    routes.forEach(function(route) {
      return setRoutes(route);
    });
    return $routeProvider.when('/', {
      templateUrl: '/views/wms/route_index.html'
    }).when('/404', {
      templateUrl: '/views/pages/404.html'
    }).otherwise({
      redirectTo: '/404'
    });
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.directives', []).directive('customPage', function() {
    return {
      restrict: "A",
      controller: [
        '$scope', '$element', '$location', 'SessionService', 'ModalService', function($scope, $element, $location, SessionService, ModalService) {
          var addBg, checkLogin, path;
          path = function() {
            return $location.path();
          };
          checkLogin = function(path) {
            var requireLogin, sessionId;
            requireLogin = true;
            sessionId = SessionService.getSessionId();
            switch (path) {
              case '':
              case '/404':
                requireLogin = false;
                break;
              case '/wms/signin':
                requireLogin = false;
            }
            if (requireLogin && !sessionId) {
              ModalService.showSignInForm();
            }
          };
          addBg = function(path) {
            $element.removeClass('body-wide body-err body-lock body-auth');
            switch (path) {
              case '/404':
                return $element.addClass('body-wide body-err');
              case '/wms/signin':
                return $element.addClass('body-wide body-auth');
            }
          };
          checkLogin($location.path());
          addBg($location.path());
          return $scope.$watch(path, function(newVal, oldVal) {
            if (newVal === oldVal) {
              return;
            }
            checkLogin(newVal);
            return addBg(newVal);
          });
        }
      ]
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.directives').directive('toggleNavCollapsedMin', [
    '$rootScope', function($rootScope) {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var app;
          app = $('#app');
          return ele.on('click', function(e) {
            if (app.hasClass('nav-collapsed-min')) {
              app.removeClass('nav-collapsed-min');
            } else {
              app.addClass('nav-collapsed-min');
              $rootScope.$broadcast('nav:reset');
            }
            return e.preventDefault();
          });
        }
      };
    }
  ]).directive('collapseNav', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var $a, $aRest, $app, $lists, $listsRest, $nav, $window, Timer, firstList, hasActive, prevWidth, updateClass;
          $window = $(window);
          $lists = ele.find('ul').parent('li');
          $lists.append('<i class="ti-angle-down icon-has-ul-h"></i><i class="ti-angle-double-right icon-has-ul"></i>');
          $a = $lists.children('a');
          $listsRest = ele.children('li').not($lists);
          $aRest = $listsRest.children('a');
          $app = $('#app');
          $nav = $('#nav-container');
          hasActive = false;
          angular.forEach($lists, function(list) {
            var $list;
            $list = angular.element(list);
            if ($list.hasClass('active')) {
              hasActive = true;
              $list.addClass('open').find('ul').stop().slideToggle();
              return event.preventDefault();
            }
          });
          if (hasActive === false) {
            firstList = angular.element($lists[0]);
            firstList.addClass('open').find('ul').stop().slideToggle();
          }
          $a.on('click', function(event) {
            var $parent, $this;
            if ($app.hasClass('nav-collapsed-min') || ($nav.hasClass('nav-horizontal') && $window.width() >= 768)) {
              return false;
            }
            $this = $(this);
            $parent = $this.parent('li');
            $lists.not($parent).removeClass('open').find('ul').slideUp();
            $parent.toggleClass('open').find('ul').stop().slideToggle();
            return event.preventDefault();
          });
          $aRest.on('click', function(event) {
            return $lists.removeClass('open').find('ul').slideUp();
          });
          scope.$on('nav:reset', function(event) {
            return $lists.removeClass('open').find('ul').slideUp();
          });
          Timer = void 0;
          prevWidth = $window.width();
          updateClass = function() {
            var currentWidth;
            currentWidth = $window.width();
            if (currentWidth < 768) {
              $app.removeClass('nav-collapsed-min');
            }
            if (prevWidth < 768 && currentWidth >= 768 && $nav.hasClass('nav-horizontal')) {
              $lists.removeClass('open').find('ul').slideUp();
            }
            return prevWidth = currentWidth;
          };
          return $window.resize(function() {
            var t;
            clearTimeout(t);
            return t = setTimeout(updateClass, 300);
          });
        }
      };
    }
  ]).directive('highlightActive', [
    function() {
      return {
        restrict: "A",
        controller: [
          '$scope', '$element', '$i18next', '$attrs', '$location', 'SessionService', function($scope, $element, $i18next, $attrs, $location, SessionService) {
            var highlightActive, links, path;
            links = $element.find('a');
            path = function() {
              return $location.path();
            };
            highlightActive = function(links, path) {
              path = '#' + path;
              return angular.forEach(links, function(link) {
                var $li, $link, href;
                $link = angular.element(link);
                $li = $link.parent('li');
                href = $link.attr('href');
                if ($li.hasClass('active')) {
                  $li.removeClass('active');
                }
                if (href.indexOf(path) === 0 && href !== "") {
                  $li.addClass('active');
                  return $li.parent().parent("li").addClass('active');
                }
              });
            };
            highlightActive(links, $location.path());
            return $scope.$watch(path, function(newVal, oldVal) {
              if (newVal === oldVal) {
                return;
              }
              return highlightActive(links, $location.path());
            });
          }
        ]
      };
    }
  ]).directive('showMenuActive', [
    function() {
      return {
        restrict: "A",
        controller: [
          '$scope', '$element', '$i18next', '$attrs', '$location', 'SessionService', function($scope, $element, $i18next, $attrs, $location, SessionService) {
            var getRoleHref, roleLis, showMenu;
            roleLis = $element.children('li');
            getRoleHref = function() {
              return SessionService.getHrefList();
            };
            showMenu = function(roleLis, roleHrefList) {
              if (roleHrefList !== void 0) {
                return angular.forEach(roleLis, function(li) {
                  var $li, href;
                  $li = angular.element(li);
                  href = $li.find('ul > li').children(':first').attr('href');
                  $li.removeClass('hide');
                  if (href !== void 0) {
                    href = href.substr('#/wms/'.length);
                  }
                  if (href !== void 0 && href.indexOf('?') > 0) {
                    href = href.substr(0, href.indexOf('?'));
                  }
                  if (roleHrefList !== void 0 && href !== void 0 && href !== '' && roleHrefList.indexOf(href) < 0) {
                    return $li.addClass('hide');
                  }
                });
              }
            };
            showMenu(roleLis, getRoleHref());
            return $scope.$watch(getRoleHref, function(newVal, oldVal) {
              if (newVal === oldVal) {
                return;
              }
              return showMenu(roleLis, getRoleHref());
            });
          }
        ]
      };
    }
  ]).directive('showMenuList', [
    function() {
      return {
        restrict: "A",
        controller: [
          '$scope', '$element', '$i18next', '$attrs', '$location', 'SessionService', function($scope, $element, $i18next, $attrs, $location, SessionService) {
            var divs, getRoleHref, showMenu;
            divs = $element.children('div');
            getRoleHref = function() {
              return SessionService.getHrefList();
            };
            showMenu = function(divs, roleHrefList) {
              if (roleHrefList !== void 0) {
                return angular.forEach(divs, function(div) {
                  var $div, href;
                  $div = angular.element(div);
                  href = $div.find('a:first').attr('href');
                  if (href !== void 0) {
                    href = href.substr('#/wms/'.length);
                  }
                  if (href !== void 0 && href.indexOf('?') > 0) {
                    href = href.substr(0, href.indexOf('?'));
                  }
                  if (roleHrefList !== void 0 && href !== void 0 && href !== '' && roleHrefList.indexOf(href) < 0) {
                    return $div.addClass('hide');
                  }
                });
              }
            };
            showMenu(divs, getRoleHref());
            return $scope.$watch(getRoleHref, function(newVal, oldVal) {
              if (newVal === oldVal) {
                return;
              }
              return showMenu(divs, getRoleHref());
            });
          }
        ]
      };
    }
  ]).directive('toggleOffCanvas', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.on('click', function() {
            return $('#app').toggleClass('on-canvas');
          });
        }
      };
    }
  ]).directive('slimScroll', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.slimScroll({
            height: attrs.scrollHeight || '100%'
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  'use strict';
  angular.module('app').directive('ngThumb', [
    '$window', function($window) {
      var helper;
      helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
          return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
          var type;
          type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      };
      return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
          var canvas, onLoadFile, onLoadImage, params, reader;
          onLoadFile = function(event) {
            var img;
            img = new Image;
            img.onload = onLoadImage;
            img.src = event.target.result;
          };
          onLoadImage = function() {
            var height, width;
            width = params.width || this.width / this.height * params.height;
            height = params.height || this.height / this.width * params.width;
            canvas.attr({
              width: width,
              height: height
            });
            canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
          };
          if (!helper.support) {
            return;
          }
          params = scope.$eval(attributes.ngThumb);
          if (!helper.isFile(params.file)) {
            return;
          }
          if (!helper.isImage(params.file)) {
            return;
          }
          canvas = element.find('canvas');
          reader = new FileReader;
          reader.onload = onLoadFile;
          reader.readAsDataURL(params.file);
        }
      };
    }
  ]);

}).call(this);
