(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', function($scope, UserStorageService) {
    $scope.admin = {
      skin: '11'
    };
    $scope.color = {
      primary: '#5B90BF',
      success: '#A3BE8C',
      info: '#7FABD2',
      infoAlt: '#B48EAD',
      warning: '#EBCB8B',
      danger: '#BF616A',
      gray: '#DCDCDC'
    };
    if (UserStorageService.getLang()) {
      i18n.options.lng = UserStorageService.getLang();
    } else {
      i18n.options.lng = 'zh';
    }
    return $scope.$on("adminSkinReset", function(event, skinId) {
      return $scope.admin = {
        skin: skinId
      };
    });
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('HeaderCtrl', function($scope, $rootScope, $i18next, $location, WmsMemberService, SessionService, UserStorageService) {
    var init;
    $scope.username = SessionService.getUsername();
    $scope.$on("userSignInSuccess", function() {
      $scope.username = SessionService.getUsername();
      $scope.sellerId = SessionService.getSellerId();
      if ($scope.sellerId) {
        return $rootScope.$broadcast("adminSkinReset", '32');
      } else {
        return $rootScope.$broadcast("adminSkinReset", '11');
      }
    });
    $scope.$on("userSignUpSuccess", function() {
      return $scope.username = SessionService.getUsername();
    });
    $scope.$on("userSignOutSuccess", function() {
      return $scope.username = "";
    });
    $scope.signOut = function() {
      return WmsMemberService.signOut();
    };
    $scope.setLang = function(lang) {
      i18n.init({
        lng: lang
      });
      return UserStorageService.saveLang(lang);
    };
    $scope.getFlag = function() {
      var lang;
      if (i18n.options.lng === 'zh-CN') {
        lang = 'zh';
        i18n.init({
          lng: lang
        });
        UserStorageService.saveLang(lang);
      }
      switch (i18n.options.lng) {
        case 'en':
          return 'flags-american';
        case 'en-US':
          return 'flags-american';
        case 'zh':
          return 'flags-china';
        case 'zh-CN':
          return 'flags-china';
      }
    };
    init = function() {
      $scope.sellerId = SessionService.getSellerId();
      if ($scope.sellerId) {
        return $rootScope.$broadcast("adminSkinReset", '31');
      } else {
        return $rootScope.$broadcast("adminSkinReset", '11');
      }
    };
    return init();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('NavCtrl', function($scope, $i18next, $location, WmsMemberService, UserStorageService, SessionService, WmsSellerService) {
    var getSeparator, init;
    $scope.signOut = function() {
      return WmsMemberService.signOut();
    };
    $scope.$on("userSignInSuccess", function() {
      return init();
    });
    $scope.$on("userSignUpSuccess", function() {
      return init();
    });
    $scope.$on("userSignOutSuccess", function() {
      return $scope.username = "";
    });
    getSeparator = function() {
      return " - ";
    };
    init = function() {
      var promise;
      $scope.username = SessionService.getUsername();
      $scope.sellerId = SessionService.getSellerId();
      if ($scope.username && !$scope.sellerId) {
        promise = WmsSellerService.listAllBase();
        return promise.then(function(data) {
          return $scope.sellerList = data;
        });
      }
    };
    return init();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsAddressListCtrl', function($scope, $routeParams, $filter, CommonService, WmsAddressService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.updateName = function(address, fieldName) {
      var promise;
      if (ClickEditService.updateNode(address, fieldName)) {
        promise = WmsAddressService.updateName(address);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(address, fieldName, bool) {
      return ClickEditService.switchNode(address, fieldName, bool);
    };
    prepareConst = function() {};
    main = function() {
      var promise;
      $scope.createAddress = {};
      $scope.address = {};
      promise = WmsAddressService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsApiListCtrl', function($scope, $routeParams, $filter, CommonService, WmsApiService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsApiService.add($scope.api);
      return promise.then(function(data) {
        $scope.api.id = data;
        $scope.items.unshift($scope.api);
        $scope.createApi = {};
        $scope.api = {};
        return initSearch();
      });
    };
    $scope.updateResourceName = function(api, fieldName) {
      var promise;
      if (ClickEditService.updateNode(api, fieldName)) {
        promise = WmsApiService.updateResourceName(api);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(api, fieldName, bool) {
      return ClickEditService.switchNode(api, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsApiService.actionList();
      return promise.then(function(data) {
        return $scope.actionList = data;
      });
    };
    main = function() {
      var promise;
      $scope.createApi = {};
      $scope.api = {};
      promise = WmsApiService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsApiParamListCtrl', function($scope, $routeParams, CommonService, WmsApiParamService, WmsApiService, WmsStructRootService, WmsStructNodeService, ClickEditService) {
    var getApiParamList, getStructNodeMap, main, prepareConst, sortTopLevelMapKey;
    $scope.add = function(apiParam) {
      var promise;
      promise = WmsApiParamService.add(apiParam);
      return promise.then(function() {
        return getApiParamList();
      });
    };
    $scope.remove = function(id) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsApiParamService["delete"](params);
      return promise.then(function() {
        return getApiParamList();
      });
    };
    $scope.updateStructRootId = function(apiParam, fieldName) {
      var promise;
      if (ClickEditService.updateNode(apiParam, fieldName)) {
        promise = WmsApiParamService.updateStructRootId(apiParam);
        return promise.then(function() {});
      }
    };
    $scope.updateVarKey = function(apiParam, fieldName) {
      var promise;
      if (ClickEditService.updateNode(apiParam, fieldName)) {
        promise = WmsApiParamService.updateVarKey(apiParam);
        return promise.then(function() {});
      }
    };
    $scope.updateDataType = function(apiParam, fieldName) {
      var promise;
      if (ClickEditService.updateNode(apiParam, fieldName)) {
        promise = WmsApiParamService.updateDataType(apiParam);
        return promise.then(function() {});
      }
    };
    $scope.updateStructNodeId = function(apiParam, fieldName) {
      var promise;
      if (ClickEditService.updateNode(apiParam, fieldName)) {
        return promise = WmsApiParamService.updateStructNodeId(apiParam);
      }
    };
    $scope.addBrotherAbove = function(baseNode, index) {
      var structRootId;
      baseNode.inEditing = false;
      if (baseNode.structNodeId) {
        structRootId = $scope.structNodeMap[baseNode.structNodeId].rootId;
        $scope.structNodeList[index] = $scope.structNodeMapByRootId[structRootId];
      }
      return $scope.insertNew(index - 1, baseNode.leftValue, baseNode.depth);
    };
    $scope.addBrotherBelow = function(baseNode, index) {
      var structRootId;
      baseNode.inEditing = false;
      if (baseNode.structNodeId) {
        structRootId = $scope.structNodeMap[baseNode.structNodeId].rootId;
        $scope.structNodeList[index + 1] = $scope.structNodeMapByRootId[structRootId];
      }
      return $scope.insertNew(index, baseNode.rightValue / 1 + 1, baseNode.depth);
    };
    $scope.addChild = function(baseNode, index) {
      baseNode.inEditing = false;
      if (baseNode.structRootId) {
        $scope.structNodeList[index + 1] = $scope.structNodeMapByRootId[baseNode.structRootId];
      }
      return $scope.insertNew(index, baseNode.leftValue / 1 + 1, baseNode.depth / 1 + 1);
    };
    $scope.insertNew = function(index, left, depth) {
      var newNode;
      newNode = {
        "inEditing": true,
        "apiId": $routeParams.apiId,
        "depth": depth,
        "leftValue": left,
        "rightValue": left / 1 + 1
      };
      return $scope.apiParamList.splice(index + 1, 0, newNode);
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(apiParam, fieldName, bool) {
      return ClickEditService.switchNode(apiParam, fieldName, bool);
    };
    sortTopLevelMapKey = function(argList) {
      var i, newList;
      i = 0;
      newList = [];
      angular.forEach(argList, function(item, k) {
        if (item.depth === 1) {
          item.mapKey = i;
          i++;
        }
        newList[k] = item;
        if (item.hasOwnProperty("structRootId") && item.structRootId > 0) {
          return getStructNodeMap(item.structRootId);
        }
      });
      return newList;
    };
    getApiParamList = function() {
      var params, promise;
      params = {
        apiId: $routeParams.apiId
      };
      promise = WmsApiParamService.listByApiId(params);
      return promise.then(function(data) {
        return $scope.apiParamList = sortTopLevelMapKey(data);
      });
    };
    getStructNodeMap = function(structRootId) {
      var params, promise;
      if (!$scope.structNodeMapByRootId.hasOwnProperty(structRootId)) {
        params = {
          rootId: structRootId
        };
        promise = WmsStructNodeService.listByRootId(params);
        return promise.then(function(data) {
          var item, _i, _len, _results;
          $scope.structNodeMapByRootId[structRootId] = data;
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            item = data[_i];
            _results.push($scope.structNodeMap[item.id] = item);
          }
          return _results;
        });
      }
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.apiId
      };
      promise = WmsApiService.detail(params);
      promise.then(function(data) {
        return $scope.api = data;
      });
      promise = WmsApiParamService.dataTypeList();
      promise.then(function(data) {
        return $scope.dataTypeList = data;
      });
      promise = WmsStructRootService.listAll();
      return promise.then(function(data) {
        $scope.structRootList = data;
        return $scope.structRootMap = CommonService.convertListToMap(data, "id");
      });
    };
    main = function() {
      $scope.structNodeMap = {};
      $scope.structNodeMapByRootId = {};
      $scope.structNodeList = {};
      getApiParamList();
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsApiReturnDataListCtrl', function($scope, $routeParams, CommonService, WmsApiReturnDataService, WmsApiService, WmsProviderApiService, WmsProviderService, WmsProviderApiReturnDataService, WmsApiReturnDataMapService, ClickEditService) {
    var getApiReturnDataList, main, prepareConst;
    $scope.add = function(apiReturnDataMapId) {
      var promise;
      $scope.apiReturnData.apiReturnDataMapId = apiReturnDataMapId;
      promise = WmsApiReturnDataService.add($scope.apiReturnData);
      return promise.then(function(data) {
        $scope.apiReturnData.id = data;
        $scope.returnDataMap[apiReturnDataMapId] = $scope.apiReturnData;
        return $scope.apiReturnData = {
          providerApiId: $routeParams.providerApiId
        };
      });
    };
    $scope.updateProviderApiReturnDataId = function(apiReturnData, fieldName) {
      var promise;
      if (ClickEditService.updateNode(apiReturnData, fieldName)) {
        promise = WmsApiReturnDataService.updateProviderApiReturnDataId(apiReturnData);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(apiReturnData, fieldName, bool) {
      return ClickEditService.switchNode(apiReturnData, fieldName, bool);
    };
    getApiReturnDataList = function() {
      var params, promise;
      params = {
        providerApiId: $routeParams.providerApiId
      };
      promise = WmsApiReturnDataService.listByProviderApiId(params);
      return promise.then(function(data) {
        return $scope.apiReturnDataList = data;
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.providerApiId
      };
      promise = WmsProviderApiService.detail(params);
      promise.then(function(data) {
        var apiParams, apiReturnDataMapParams, providerParams;
        $scope.providerApi = data;
        apiReturnDataMapParams = {
          apiId: data.apiId
        };
        promise = WmsApiReturnDataMapService.listByApiId(apiReturnDataMapParams);
        promise.then(function(returnDataList) {
          return $scope.returnDataList = returnDataList;
        });
        apiParams = {
          id: data.apiId
        };
        promise = WmsApiService.detail(apiParams);
        promise.then(function(api) {
          return $scope.api = api;
        });
        providerParams = {
          id: data.providerId
        };
        promise = WmsProviderService.detail(providerParams);
        return promise.then(function(provider) {
          return $scope.provider = provider;
        });
      });
      params = {
        providerApiId: $routeParams.providerApiId
      };
      promise = WmsProviderApiReturnDataService.mapByProviderApiId(params);
      return promise.then(function(data) {
        return $scope.providerApiReturnDataMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.apiReturnData = {
        providerApiId: $routeParams.providerApiId
      };
      params = {
        providerApiId: $routeParams.providerApiId
      };
      promise = WmsApiReturnDataService.mapByProviderApiId(params);
      promise.then(function(data) {
        return $scope.returnDataMap = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsApiReturnDataMapListCtrl', function($scope, $routeParams, $filter, CommonService, WmsApiReturnDataMapService, WmsApiService, ClickEditService) {
    var getApiReturnDataMapList, main, prepareConst;
    $scope.add = function(apiReturnDataMap) {
      var promise;
      promise = WmsApiReturnDataMapService.add(apiReturnDataMap);
      return promise.then(function() {
        return getApiReturnDataMapList();
      });
    };
    $scope.remove = function(id) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsApiReturnDataMapService["delete"](params);
      return promise.then(function() {
        return getApiReturnDataMapList();
      });
    };
    $scope.updateRequired = function(apiReturnDataMap, fieldName) {
      var promise;
      if (ClickEditService.updateNode(apiReturnDataMap, fieldName)) {
        promise = WmsApiReturnDataMapService.updateRequired(apiReturnDataMap);
        return promise.then(function() {});
      }
    };
    $scope.updateDataType = function(apiReturnDataMap, fieldName) {
      var promise;
      if (ClickEditService.updateNode(apiReturnDataMap, fieldName)) {
        promise = WmsApiReturnDataMapService.updateDataType(apiReturnDataMap);
        return promise.then(function() {});
      }
    };
    $scope.updateVarKey = function(apiReturnDataMap, fieldName) {
      var promise;
      if (ClickEditService.updateNode(apiReturnDataMap, fieldName)) {
        promise = WmsApiReturnDataMapService.updateVarKey(apiReturnDataMap);
        return promise.then(function() {});
      }
    };
    $scope.addBrotherAbove = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index - 1, baseNode.leftValue, baseNode.depth);
    };
    $scope.addBrotherBelow = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index, baseNode.rightValue / 1 + 1, baseNode.depth);
    };
    $scope.addChild = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index, baseNode.leftValue / 1 + 1, baseNode.depth / 1 + 1);
    };
    $scope.insertNew = function(index, left, depth) {
      var newNode;
      newNode = {
        "inEditing": true,
        "apiId": $routeParams.apiId,
        "depth": depth,
        "leftValue": left,
        "rightValue": left / 1 + 1
      };
      return $scope.apiReturnDataMapList.splice(index + 1, 0, newNode);
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(apiReturnDataMap, fieldName, bool) {
      return ClickEditService.switchNode(apiReturnDataMap, fieldName, bool);
    };
    getApiReturnDataMapList = function() {
      var params, promise;
      params = {
        apiId: $routeParams.apiId
      };
      promise = WmsApiReturnDataMapService.listByApiId(params);
      return promise.then(function(data) {
        return $scope.apiReturnDataMapList = data;
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.apiId
      };
      promise = WmsApiService.detail(params);
      promise.then(function(api) {
        return $scope.api = api;
      });
      promise = WmsApiReturnDataMapService.dataTypeList();
      return promise.then(function(data) {
        return $scope.dataTypeList = data;
      });
    };
    main = function() {
      getApiReturnDataMapList();
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsAvailableGoodsListCtrl', function($scope, $filter, WmsGoodsService, WmsSellerAvailableGoodsService, SessionService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      if ($scope.filteredItems) {
        return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
      }
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsSellerAvailableGoodsService.add($scope.sellerAvailableGoods);
      return promise.then(function(data) {
        $scope.sellerAvailableGoods.id = data;
        $scope.items.unshift($scope.sellerAvailableGoods);
        $scope.createSellerAvailableGoods = {};
        $scope.sellerAvailableGoods = {
          sellerId: $routeParams.sellerId
        };
        return initSearch();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsSellerAvailableGoodsService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.updatePrice = function(sellerAvailableGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableGoods, fieldName)) {
        promise = WmsSellerAvailableGoodsService.updatePrice(sellerAvailableGoods);
        return promise.then(function() {});
      }
    };
    $scope.disabledSellerAvailableGoods = function(sellerAvailableGoods, bool) {
      var promise;
      promise = WmsSellerAvailableGoodsService.updateDisabled(sellerAvailableGoods, bool);
      return promise.then(function() {
        return sellerAvailableGoods.disabled = bool;
      });
    };
    $scope.switchNode = function(sellerAvailableGoods, fieldName, bool) {
      return ClickEditService.switchNode(sellerAvailableGoods, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsGoodsService.mapGoods();
      return promise.then(function(data) {
        $scope.goodsMap = data;
        angular.forEach($scope.items, function(availableGoods, k) {
          return $scope.items[k].goodsName = $scope.goodsMap[availableGoods.goodsId].name;
        });
        return initSearch();
      });
    };
    main = function() {
      var params, promise;
      $scope.sellerId = SessionService.getSellerId();
      $scope.sellerAvailableGoods = {
        sellerId: $scope.sellerId
      };
      params = {
        sellerId: $scope.sellerId,
        disabled: 0
      };
      promise = WmsSellerAvailableGoodsService.listBySellerIdAndDisabled(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  "use strict";
  angular.module("app.controllers").controller("WmsChangePasswordCtrl", function($scope, $i18next, WmsMemberService, ModalService) {
    var main;
    $scope.changePassword = function() {
      if ($scope.member.password !== $scope.member.passwordConfirmation) {
        ModalService.showMessageOnError($i18next("passport:message.validationError.password.notEqual"));
        return;
      }
      return WmsMemberService.changePassword($scope.member);
    };
    main = function() {
      return $scope.member = {
        "originalPassword": "",
        "password": "",
        "passwordConfirmation": ""
      };
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsCheckDevicePrinterCtrl', function($scope, DeviceDriverService) {
    var main;
    $scope.checkPrinter = function() {
      var promise;
      promise = DeviceDriverService.checkPrinterDevice();
      return promise.then(function() {});
    };
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsCheckDeviceScaleCtrl', function($scope, DeviceDriverService) {
    var main;
    $scope.checkScale = function() {
      var promise;
      promise = DeviceDriverService.checkScaleDevice();
      return promise.then(function() {});
    };
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsContainerDetailCtrl', function($scope, $routeParams, WmsContainerService) {
    var main;
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsContainerService.detail(params);
      return promise.then(function(data) {
        return $scope.container = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsContainerEditCtrl', function($scope, $routeParams, CommonService, WmsContainerService, ClickEditService, WmsLogisticRequireService, DeviceDriverService) {
    var main, prepareConst;
    $scope.updateInventory = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateInventory(container);
        return promise.then(function() {});
      }
    };
    $scope.updatePackingCharge = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updatePackingCharge(container);
        return promise.then(function() {});
      }
    };
    $scope.updateLogisticRequire = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateLogisticRequire(container);
        return promise.then(function() {});
      }
    };
    $scope.updateHeight = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateHeight(container);
        return promise.then(function() {});
      }
    };
    $scope.updateWidth = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateWidth(container);
        return promise.then(function() {});
      }
    };
    $scope.updateLength = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateLength(container);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateName(container);
        return promise.then(function() {});
      }
    };
    $scope.updateBarCode = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateBarCode(container);
        return promise.then(function() {});
      }
    };
    $scope.updateWeight = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateWeight(container);
        return promise.then(function() {});
      }
    };
    $scope.updateWeightByScale = function(container) {
      var promise;
      promise = DeviceDriverService.getWeight();
      return promise.then(function(deviceWeight) {
        $scope.deviceWeight = deviceWeight;
        container.weight = deviceWeight;
        promise = WmsContainerService.updateWeight(container);
        return promise.then(function() {});
      });
    };
    $scope.switchNode = function(container, fieldName, bool) {
      return ClickEditService.switchNode(container, fieldName, bool);
    };
    $scope.checkLogisticRequire = function() {
      var promise;
      $scope.container.logisticRequire = [];
      angular.forEach($scope.logisticRequireEnum, function(require) {
        if ($scope.logisticRequireList[require]) {
          return $scope.container.logisticRequire.push(require);
        }
      });
      if ($scope.container.logisticRequire.length === 0) {
        $scope.container.logisticRequire = [''];
      }
      promise = WmsContainerService.updateLogisticRequire($scope.container);
      return promise.then(function() {});
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticRequireService.listAll();
      return promise.then(function(data) {
        return $scope.logisticRequireEnum = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.logisticRequireList = [];
      params = {
        id: $routeParams.id
      };
      promise = WmsContainerService.detail(params);
      return promise.then(function(data) {
        $scope.container = data;
        angular.forEach($scope.container.logisticRequire, function(require) {
          return $scope.logisticRequireList[require] = true;
        });
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsContainerListCtrl', function($scope, $routeParams, $filter, CommonService, WmsContainerService, ClickEditService, WmsLogisticRequireService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsContainerService.add($scope.container);
      return promise.then(function(data) {
        $scope.container.id = data;
        $scope.items.unshift($scope.container);
        $scope.createContainer = {};
        $scope.container = {};
        return initSearch();
      });
    };
    $scope.updatePackingCharge = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updatePackingCharge(container);
        return promise.then(function() {});
      }
    };
    $scope.updateLogisticRequire = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateLogisticRequire(container);
        return promise.then(function() {});
      }
    };
    $scope.updateHeight = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateHeight(container);
        return promise.then(function() {});
      }
    };
    $scope.updateWidth = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateWidth(container);
        return promise.then(function() {});
      }
    };
    $scope.updateLength = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateLength(container);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateName(container);
        return promise.then(function() {});
      }
    };
    $scope.updateBarCode = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateBarCode(container);
        return promise.then(function() {});
      }
    };
    $scope.updateWeight = function(container, fieldName) {
      var promise;
      if (ClickEditService.updateNode(container, fieldName)) {
        promise = WmsContainerService.updateWeight(container);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(container, fieldName, bool) {
      return ClickEditService.switchNode(container, fieldName, bool);
    };
    $scope.checkLogisticRequire = function() {
      $scope.container.logisticRequire = [];
      return angular.forEach($scope.logisticRequireEnum, function(require) {
        if ($scope.logisticRequireList[require]) {
          return $scope.container.logisticRequire.push(require);
        }
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticRequireService.listAll();
      return promise.then(function(data) {
        $scope.logisticRequireEnum = data;
        $scope.logisticRequireList = [];
        return angular.forEach($scope.logisticRequireEnum, function(require) {
          return $scope.logisticRequireList[require] = false;
        });
      });
    };
    main = function() {
      var promise;
      $scope.createContainer = {};
      $scope.container = {};
      promise = WmsContainerService.listAll();
      return promise.then(function(data) {
        $scope.items = data;
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsContainerRelatedSellerCtrl', function($scope, $routeParams, WmsContainerService, WmsSellerService, WmsSellerAvailableContainerService) {
    var main, prepareConst;
    $scope.add = function(sellerId) {
      var promise;
      $scope.sellerAvailableContainer.sellerId = sellerId;
      promise = WmsSellerAvailableContainerService.add($scope.sellerAvailableContainer);
      return promise.then(function(data) {
        $scope.sellerAvailableContainer.id = data;
        $scope.sellerGoodsMap[sellerId] = $scope.sellerAvailableContainer;
        return $scope.sellerAvailableContainer = {
          containerId: $routeParams.id
        };
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsContainerService.detail(params);
      promise.then(function(data) {
        return $scope.container = data;
      });
      params = {
        containerId: $routeParams.id
      };
      promise = WmsSellerAvailableContainerService.mapByContainerId(params);
      return promise.then(function(data) {
        return $scope.sellerContainerMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.sellerAvailableContainer = {
        containerId: $routeParams.id
      };
      promise = WmsSellerService.listAll();
      return promise.then(function(data) {
        $scope.sellerList = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsExpressOrderImportCtrl', function($scope, $routeParams, $filter, ClickEditService, WmsLogisticOrderService, WmsLogisticCompanyService, WmsSellerFreightGroupService, WmsConfigService, WmsAddressService, CommonService, Upload, ModalService) {
    var main, prepareConst;
    $scope.updateLogisticCompanyId = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateExpressSn = function(logisticOrder, fieldName) {
      var promise;
      promise = WmsLogisticOrderService.updateExpressSn(logisticOrder);
      return promise.then(function() {
        promise = WmsLogisticOrderService.listAllEmptyExpressSn({});
        return promise.then(function(data) {
          $scope.items = data;
          return initSearch();
        });
      });
    };
    $scope["import"] = function(refExpressUpload) {
      var promise;
      $scope.showimporting = true;
      promise = WmsLogisticOrderService.importExpressSn(refExpressUpload);
      return promise.then(function() {
        return window.location.reload();
      });
    };
    $scope.uploadFile = function(file, errFiles) {
      $scope.showimporting = false;
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
      if (file) {
        $scope.refExpressUpload.originalFileName = file.name;
        file.upload = Upload.upload({
          url: WmsConfigService.getFileHost() + '/upload_file/related_express',
          file: file
        });
        return file.upload.then((function(response) {
          var result;
          result = response.data;
          if (result.success) {
            return $scope.refExpressUpload.filePath = result.data;
          } else {
            return ModalService.showMessageOnError(result.errorCode);
          }
        }), (function(response) {
          if (response.status !== 200) {
            return ModalService.showMessageOnError(response.statusText);
          }
        }), function(evt) {
          return file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }
    };
    $scope.switchNode = function(logisticOrder, fieldName, bool) {
      var params, promise;
      ClickEditService.switchNode(logisticOrder, fieldName, bool);
      if (fieldName === 'logisticCompanyId' && !$scope.sellerFreightGroupMap.hasOwnProperty(logisticOrder.sellerId)) {
        params = {
          sellerId: logisticOrder.sellerId
        };
        promise = WmsSellerFreightGroupService.listBySellerId(params);
        return promise.then(function(data) {
          return $scope.sellerFreightGroupMap[logisticOrder.sellerId] = data;
        });
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticCompanyService.mapAll();
      promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
      promise = WmsAddressService.mapAll();
      return promise.then(function(data) {
        return $scope.addressMap = data;
      });
    };
    main = function() {
      $scope.refExpressUpload = {};
      $scope.searchOption = {
        "keywords": "",
        "logisticCompanyId": ""
      };
      $scope.logisticCompanyId = "";
      $scope.sellerFreightGroupMap = {};
      $scope.createImportRefExpress = {};
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsExpressOrderListCtrl', function($scope, $routeParams, $filter, WmsLogisticOrderService, WmsAddressService, WmsLogisticCompanyService, WmsSellerFreightGroupService, WmsConfigService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.updateLogisticCompanyId = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(logisticOrder, fieldName, bool) {
      var params, promise;
      ClickEditService.switchNode(logisticOrder, fieldName, bool);
      if (fieldName === 'logisticCompanyId' && !$scope.sellerFreightGroupMap.hasOwnProperty(logisticOrder.sellerId)) {
        params = {
          sellerId: logisticOrder.sellerId
        };
        promise = WmsSellerFreightGroupService.listBySellerId(params);
        return promise.then(function(data) {
          return $scope.sellerFreightGroupMap[logisticOrder.sellerId] = data;
        });
      }
    };
    $scope.checkLogisticCompany = function() {
      var params, promise;
      params = {
        logisticCompanyId: $scope.logisticCompanyId,
        isExport: 0
      };
      promise = WmsLogisticOrderService.listByLogisticCompanyIdAndIsExport(params);
      return promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
    };
    $scope.exportOrder = function(logisticCompanyId) {
      var params, promise;
      params = {
        logisticCompanyId: logisticCompanyId
      };
      promise = WmsLogisticOrderService.exportExpressOrder(params);
      return promise.then(function(data) {
        var url;
        url = WmsConfigService.getFileHost() + '/export_file/express_order?filePath=' + data;
        return window.location.href = url;
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticCompanyService.mapAll();
      promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
      promise = WmsAddressService.mapAll();
      return promise.then(function(data) {
        return $scope.addressMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.logisticCompanyId = "";
      $scope.fileHost = WmsConfigService.getFileHost();
      $scope.sellerFreightGroupMap = {};
      params = {
        isExport: 0
      };
      promise = WmsLogisticOrderService.listByIsExport(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsExpressOrderPackCtrl', function($scope, $location, $i18next, WmsPickOrderService, ModalService) {
    var main;
    $scope.getLogisticOrder = function() {
      var params, promise;
      params = {
        expressSn: $scope.expressSn
      };
      $scope.expressSn = '';
      promise = WmsPickOrderService.detailByExpressSn(params);
      return promise.then(function(data) {
        $scope.pickOrder = data;
        if ($scope.pickOrder.status === 1) {
          $scope.expressSn = '';
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderNotPick"));
        } else if ($scope.pickOrder.status === 2) {
          return $location.path("/wms/pack_goods").search("id", $scope.pickOrder.id);
        } else {
          $scope.expressSn = '';
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderAlreadyPack"));
        }
      });
    };
    main = function() {
      $scope.isOpenNumberFocus = false;
      angular.element('#expressSn').focus();
      $scope.expressSn = '';
      $scope.expressOrder = {
        last4PhoneNumber: '',
        expressSn: ''
      };
      return $scope.pickOrder = {};
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsFreightGroupListCtrl', function($scope, $routeParams, $filter, CommonService, WmsFreightGroupService, WmsLogisticCompanyService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsFreightGroupService.add($scope.freightGroup);
      return promise.then(function(data) {
        $scope.freightGroup.id = data;
        $scope.items.unshift($scope.freightGroup);
        $scope.createFreightGroup = {};
        $scope.freightGroup = {};
        return initSearch();
      });
    };
    $scope.updateAddedWeightPrice = function(freightGroup, fieldName) {
      var promise;
      if (ClickEditService.updateNode(freightGroup, fieldName)) {
        promise = WmsFreightGroupService.updateAddedWeightPrice(freightGroup);
        return promise.then(function() {});
      }
    };
    $scope.updateFirstWeightPrice = function(freightGroup, fieldName) {
      var promise;
      if (ClickEditService.updateNode(freightGroup, fieldName)) {
        promise = WmsFreightGroupService.updateFirstWeightPrice(freightGroup);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(freightGroup, fieldName, bool) {
      return ClickEditService.switchNode(freightGroup, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticCompanyService.mapAll();
      return promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.createFreightGroup = {};
      $scope.freightGroup = {};
      promise = WmsFreightGroupService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsFreightRuleListCtrl', function($scope, $routeParams, $filter, CommonService, WmsFreightRuleService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsFreightRuleService.add($scope.freightRule);
      return promise.then(function(data) {
        $scope.freightRule.id = data;
        $scope.items.unshift($scope.freightRule);
        $scope.createFreightRule = {};
        $scope.freightRule = {};
        return initSearch();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsFreightRuleService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.updateAddedWeightPrice = function(freightRule, fieldName) {
      var promise;
      if (ClickEditService.updateNode(freightRule, fieldName)) {
        promise = WmsFreightRuleService.updateAddedWeightPrice(freightRule);
        return promise.then(function() {});
      }
    };
    $scope.updateFirstWeightPrice = function(freightRule, fieldName) {
      var promise;
      if (ClickEditService.updateNode(freightRule, fieldName)) {
        promise = WmsFreightRuleService.updateFirstWeightPrice(freightRule);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(freightRule, fieldName, bool) {
      return ClickEditService.switchNode(freightRule, fieldName, bool);
    };
    prepareConst = function() {};
    main = function() {
      $scope.createFreightRule = {};
      $scope.freightRule = {};
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsBlacklistDetailCtrl', function($scope, $routeParams, WmsGoodsBlacklistService) {
    var main;
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsBlacklistEditCtrl', function($scope, $routeParams, CommonService, WmsGoodsBlacklistService, ClickEditService) {
    var main;
    $scope.switchNode = function(goodsBlacklist, fieldName, bool) {
      return ClickEditService.switchNode(goodsBlacklist, fieldName, bool);
    };
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsBlacklistListCtrl', function($scope, $routeParams, $filter, WmsGoodsBlacklistService, WmsPlatformSourceService, SessionService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsGoodsBlacklistService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsPlatformSourceService.mapPlatformSource();
      return promise.then(function(data) {
        return $scope.platformSourceMap = data;
      });
    };
    main = function() {
      var params, promise;
      params = {
        sellerId: SessionService.getSellerId()
      };
      promise = WmsGoodsBlacklistService.listBySellerId(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsBreakageCtrl', function($scope, $i18next, $routeParams, WmsGoodsService, WmsGoodsBreakageLogService, WmsSellerAvailableGoodsService, WmsSellerService, ModalService) {
    var main, prepareConst;
    $scope.calcQuantity = function() {
      var str;
      if ($scope.goodsBreakageLog.number) {
        str = $scope.availableGoods.quantity + ' - ' + $scope.goodsBreakageLog.number + " = ";
        return $scope.goodsBreakageLog.calcQuantity = str + (parseInt($scope.availableGoods.quantity) - parseInt($scope.goodsBreakageLog.number));
      } else {
        return $scope.goodsBreakageLog.calcQuantity = "";
      }
    };
    $scope.goodsBreakage = function() {
      var promise;
      $scope.isShowButton = false;
      promise = WmsGoodsBreakageLogService.add($scope.goodsBreakageLog);
      return promise.then(function() {});
    };
    prepareConst = function() {
      var goodsParams, promise, sellerParams;
      sellerParams = {
        id: $scope.availableGoods.sellerId
      };
      promise = WmsSellerService.detail(sellerParams);
      promise.then(function(seller) {
        return $scope.seller = seller;
      });
      goodsParams = {
        id: $scope.availableGoods.goodsId
      };
      promise = WmsGoodsService.detail(goodsParams);
      promise.then(function(goods) {
        $scope.goods = goods;
        return $scope.goodsBreakageLog.goodsCode = goods.barCode;
      });
      promise = WmsGoodsBreakageLogService.reasonEnumList();
      return promise.then(function(data) {
        return $scope.reasonEnumList = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.isShowButton = true;
      params = {
        id: $routeParams.availableGoodsId
      };
      promise = WmsSellerAvailableGoodsService.detail(params);
      return promise.then(function(data) {
        $scope.availableGoods = data;
        $scope.goodsBreakageLog = {
          sellerId: data.sellerId,
          goodsId: data.goodsId,
          encodeType: data.encodeType
        };
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsBreakageLogListCtrl', function($scope, $routeParams, $filter, WmsGoodsBreakageLogService, WmsSellerService, WmsSellerGoodsService, WmsMemberService, CommonService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      $scope.filteredItems = $filter('filter')($scope.filteredItems, {
        'status': $scope.searchOption.status
      });
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": "",
        "status": 1
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.searchByStatus = function(status) {
      $scope.searchOption.status = status;
      return $scope.search();
    };
    $scope.pass = function(goodsBreakageLog) {
      var promise;
      promise = WmsGoodsBreakageLogService.pass(goodsBreakageLog);
      return promise.then(function() {
        goodsBreakageLog.status = 3;
        return initSearch();
      });
    };
    $scope.reject = function(goodsBreakageLog) {
      var promise;
      promise = WmsGoodsBreakageLogService.reject(goodsBreakageLog);
      return promise.then(function() {
        goodsBreakageLog.status = 2;
        return initSearch();
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsGoodsBreakageLogService.statusEnumList();
      promise.then(function(data) {
        return $scope.statusEnumList = data;
      });
      promise = WmsSellerService.mapAll();
      promise.then(function(data) {
        return $scope.sellerMap = data;
      });
      promise = WmsSellerGoodsService.listAll();
      promise.then(function(data) {
        $scope.sellerGoodsList = data;
        return $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, 'id');
      });
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.createGoodsBreakageLog = {};
      $scope.goodsBreakageLog = {};
      promise = WmsGoodsBreakageLogService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsEditCtrl', function($scope, $rootScope, $routeParams, $i18next, CommonService, WmsGoodsService, ClickEditService, FileUploader, WmsConfigService, WmsMemberService, ModalService, DeviceDriverService) {
    var main, prepareConst;
    $scope.updateAbbrName = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateAbbrName(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateImage = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateImage(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateLogisticRequire = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateLogisticRequire(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateWeight = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateWeight(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateWeightByScale = function(goods) {
      var promise;
      promise = DeviceDriverService.getWeight();
      return promise.then(function(deviceWeight) {
        $scope.deviceWeight = deviceWeight;
        goods.weight = deviceWeight;
        promise = WmsGoodsService.updateWeight(goods);
        return promise.then(function() {});
      });
    };
    $scope.updateHeight = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateHeight(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateWidth = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateWidth(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateLength = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateLength(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateName(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateBarCode = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateBarCode(goods);
        return promise.then(function() {});
      }
    };
    $scope.$watch('closeConfirmModal', function() {
      var params, promise;
      if ($rootScope.closeConfirmModal) {
        params = {
          id: $routeParams.id
        };
        promise = WmsGoodsService.detail(params);
        promise.then(function(data) {
          return $scope.goods = data;
        });
      }
    });
    $scope.switchNode = function(goods, fieldName, bool) {
      return ClickEditService.switchNode(goods, fieldName, bool);
    };
    $scope.uploadGoodsImages = function(goods, queueImage) {
      queueImage.upload();
      return $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        var promise;
        if (response.success) {
          $scope.goods[goods.id + 'image'] = false;
          $scope.uploader.queue = [];
          goods.image = response.data;
          promise = WmsGoodsService.updateImage(goods);
          return promise.then(function() {});
        } else {
          return ModalService.showMessageOnError($i18next("wms:message.apiError." + response.errorCode));
        }
      };
    };
    prepareConst = function() {
      var uploader;
      uploader = $scope.uploader = new FileUploader({
        url: WmsConfigService.getFileHost() + '/upload_images/goods'
      });
      return uploader.filters.push({
        name: 'imageFilter',
        fn: function(item, options) {
          var type;
          type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsGoodsService.detail(params);
      promise.then(function(data) {
        return $scope.goods = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsEncodeBreakageCtrl', function($scope, $i18next, $routeParams, WmsGoodsBreakageLogService, WmsGoodsEncodeService, WmsSellerService, WmsSellerGoodsService) {
    var main, prepareConst;
    $scope.goodsBreakage = function() {
      var promise;
      $scope.isShowButton = false;
      promise = WmsGoodsBreakageLogService.add($scope.goodsBreakageLog);
      return promise.then(function() {});
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.goodsEncode.sellerGoodsId
      };
      promise = WmsSellerGoodsService.detail(params);
      promise.then(function(data) {
        $scope.sellerGoods = data;
        $scope.goodsBreakageLog.encodeType = $scope.sellerGoods.encodeType;
        params = {
          id: $scope.sellerGoods.sellerId
        };
        promise = WmsSellerService.detail(params);
        return promise.then(function(data) {
          return $scope.seller = data;
        });
      });
      promise = WmsGoodsBreakageLogService.reasonEnumList();
      return promise.then(function(data) {
        return $scope.reasonEnumList = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.isShowButton = true;
      params = {
        id: $routeParams.id
      };
      promise = WmsGoodsEncodeService.detail(params);
      return promise.then(function(data) {
        $scope.goodsEncode = data;
        $scope.goodsBreakageLog = {
          sellerGoodsId: $scope.goodsEncode.sellerGoodsId,
          goodsCode: $scope.goodsEncode.goodsCode,
          number: 1
        };
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').filter('calArrayTrue', function() {
    return function(items) {
      var trueNumber;
      trueNumber = 0;
      angular.forEach(items, function(item) {
        if (item) {
          return trueNumber = parseInt(trueNumber) + 1;
        }
      });
      return trueNumber;
    };
  }).controller('WmsGoodsEncodeListCtrl', function($scope, $routeParams, $filter, CommonService, ClickEditService, ModalService, WmsGoodsEncodeService, WmsSellerGoodsService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [20, 50, 100, 200];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsGoodsEncodeService.add($scope.goodsEncode);
      return promise.then(function(data) {
        $scope.goodsEncode = data;
        $scope.items.unshift($scope.goodsEncode);
        initSearch();
        return $scope.goodsEncode = {
          sellerGoodsId: $scope.sellerGoodsId
        };
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsGoodsEncodeService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.autoGenerateEncode = function() {
      var params, promise;
      params = {
        sellerGoodsId: $routeParams.sellerGoodsId
      };
      promise = WmsGoodsEncodeService.autoGenerateEncode(params);
      return promise.then(function(data) {
        return $scope.goodsEncode.goodsCode = data;
      });
    };
    $scope.checkAll = function(printItems) {
      var boolValue;
      boolValue = $scope.printAllItems;
      angular.forEach($scope.currentPageItems, function(currentItem) {
        if (printItems.hasOwnProperty(currentItem.goodsCode)) {
          return printItems[currentItem.goodsCode] = boolValue;
        }
      });
      return $scope.calArrayTrue();
    };
    $scope.calArrayTrue = function() {
      var trueNumber;
      trueNumber = 0;
      angular.forEach($scope.currentPageItems, function(currentItem) {
        if ($scope.printItems[currentItem.goodsCode]) {
          return trueNumber = parseInt(trueNumber) + 1;
        }
      });
      return $scope.truePrintNumber = trueNumber;
    };
    $scope.print = function() {
      return ModalService.showMessageOnSuccess($i18next('wms:ui.label.waitingForPrint'));
    };
    $scope.viewIsLoss = function(isLoss) {
      if (isLoss === 'all') {
        $scope.items = $scope.originalItems;
      } else {
        $scope.items = $filter('filter')($scope.originalItems, {
          'isLoss': isLoss
        });
      }
      $scope.search();
      $scope.select($scope.currentPage);
      return $scope.displayIsLoss = isLoss;
    };
    $scope.viewInventoryStatus = function(inventoryStatus) {
      if (inventoryStatus === 'all') {
        $scope.items = $scope.originalItems;
      } else {
        $scope.items = $filter('filter')($scope.originalItems, {
          'inventoryStatus': inventoryStatus
        });
      }
      $scope.search();
      $scope.select($scope.currentPage);
      return $scope.displayInventoryStatus = inventoryStatus;
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(goodsEncode, fieldName, bool) {
      return ClickEditService.switchNode(goodsEncode, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.sellerGoodsId
      };
      promise = WmsSellerGoodsService.detail(params);
      promise.then(function(data) {
        return $scope.sellerGoods = data;
      });
      promise = WmsGoodsEncodeService.goodsInventoryStatusEnumListAll();
      return promise.then(function(data) {
        return $scope.goodsInventoryStatusEnum = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.printItems = {};
      $scope.printAllItems = false;
      $scope.createGoodsEncode = {};
      $scope.displayInventoryStatus = 'all';
      $scope.displayIsLoss = false;
      $scope.sellerGoodsId = $routeParams.sellerGoodsId;
      params = {
        sellerGoodsId: $scope.sellerGoodsId
      };
      promise = WmsGoodsEncodeService.listBySellerGoodsId(params);
      return promise.then(function(data) {
        $scope.items = data;
        $scope.originalItems = data;
        angular.forEach($scope.items, function(item) {
          if (!item.isLoss && !item.isPrinted) {
            return $scope.printItems[item.goodsCode] = false;
          }
        });
        $scope.goodsEncode = {
          sellerGoodsId: $scope.sellerGoodsId
        };
        prepareConst();
        return initSearch();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsInventoryLogListCtrl', function($scope, $routeParams, $filter, CommonService, WmsGoodsInventoryLogService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(goodsInventoryLog, fieldName, bool) {
      return ClickEditService.switchNode(goodsInventoryLog, fieldName, bool);
    };
    prepareConst = function() {};
    main = function() {
      $scope.createGoodsInventoryLog = {};
      $scope.goodsInventoryLog = {};
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsListCtrl', function($scope, $routeParams, $filter, CommonService, WmsGoodsService, ClickEditService) {
    var initSearch, main;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsGoodsService.add($scope.goods);
      return promise.then(function(data) {
        $scope.goods.id = data;
        $scope.goods.isEncode = false;
        $scope.goods.postInventory = $scope.goods.totalInventory;
        $scope.items.unshift($scope.goods);
        $scope.createGoods = {};
        $scope.goods = {
          totalInventory: 0
        };
        return initSearch();
      });
    };
    $scope.updateAbbrName = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateAbbrName(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateImage = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateImage(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateLogisticRequire = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateLogisticRequire(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateWeight = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateWeight(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateHeight = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateHeight(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateWidth = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateWidth(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateLength = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateLength(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateName(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateBarCode = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsGoodsService.updateBarCode(goods);
        return promise.then(function() {});
      }
    };
    $scope.updateIsOwnBox = function(goods) {
      var promise;
      goods.isOwnBox = !goods.isOwnBox;
      promise = WmsGoodsService.updateIsOwnBox(goods);
      return promise.then(function() {});
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(goods, fieldName, bool) {
      return ClickEditService.switchNode(goods, fieldName, bool);
    };
    main = function() {
      var promise;
      $scope.goodsUpload = {};
      $scope.createGoods = {};
      $scope.goods = {
        totalInventory: 0,
        isOwnBox: 0
      };
      promise = WmsGoodsService.listAll();
      return promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsPutawayCtrl', function($scope, $i18next, $routeParams, WmsSellerGoodsService, ModalService) {
    var main, prepareConst;
    $scope.scanGoodsCode = function() {
      var params, promise;
      params = {
        sellerGoodsId: $scope.sellerGoodsId,
        goodsCode: $scope.goodsCode
      };
      promise = WmsSellerGoodsService.goodsPutaway(params);
      return promise.then(function() {
        return $scope.goodsCode = '';
      });
    };
    $scope.scanShelfLocation = function() {
      if ($scope.shelfLocation === $scope.sellerGoods.shelfLocation) {
        angular.element('#scanCodeInput').focus();
        return $scope.goodsCode = '';
      } else {
        $scope.shelfLocation = '';
        return ModalService.showMessageOnError($i18next("wms:message.validationError.shelfLocationError"));
      }
    };
    prepareConst = function() {};
    main = function() {
      var params, promise;
      angular.element('#scanShelfLocationInput').focus();
      $scope.goodsCode = '';
      $scope.shelfLocation = '';
      $scope.sellerGoodsId = $routeParams.sellerGoodsId;
      params = {
        id: $scope.sellerGoodsId
      };
      promise = WmsSellerGoodsService.detail(params);
      return promise.then(function(data) {
        $scope.sellerGoods = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsRelatedPlatformSourceCtrl', function($scope, $routeParams, WmsGoodsService, WmsPlatformSourceService, WmsSellerAvailableGoodsService, WmsSellerGoodsService, CommonService, ClickEditService) {
    var main, prepareConst;
    $scope.add = function(sellerGoods) {
      var promise;
      promise = WmsSellerGoodsService.add($scope.sellerGoods);
      return promise.then(function(data) {
        $scope.sellerGoods.id = data;
        $scope.sellerGoodsList.unshift($scope.sellerGoods);
        $scope.createSellerGoods = {};
        return $scope.sellerGoods = {
          sellerId: $scope.sellerAvailableGoods.sellerId,
          goodsId: $scope.sellerAvailableGoods.goodsId
        };
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsSellerGoodsService["delete"](params);
      return promise.then(function() {
        return $scope.sellerGoodsList.splice(i, 1);
      });
    };
    $scope.updateUniqueCode = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateUniqueCode(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerGoods, fieldName, bool) {
      return ClickEditService.switchNode(sellerGoods, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.sellerAvailableGoods.goodsId
      };
      promise = WmsGoodsService.detail(params);
      promise.then(function(data) {
        return $scope.goods = data;
      });
      params = {
        sellerId: $scope.sellerAvailableGoods.sellerId,
        goodsId: $scope.sellerAvailableGoods.goodsId
      };
      promise = WmsSellerGoodsService.listBySellerIdAndGoodsId(params);
      promise.then(function(data) {
        return $scope.sellerGoodsList = data;
      });
      promise = WmsPlatformSourceService.mapPlatformSource();
      return promise.then(function(data) {
        return $scope.platformSourceMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.createSellerGoods = {};
      params = {
        id: $routeParams.id
      };
      promise = WmsSellerAvailableGoodsService.detail(params);
      return promise.then(function(data) {
        $scope.sellerAvailableGoods = data;
        $scope.sellerGoods = {
          sellerId: $scope.sellerAvailableGoods.sellerId,
          goodsId: $scope.sellerAvailableGoods.goodsId
        };
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsRelatedSellerCtrl', function($scope, $routeParams, WmsGoodsService, WmsSellerService, WmsSellerAvailableGoodsService) {
    var main, prepareConst;
    $scope.add = function(sellerId) {
      var promise;
      $scope.sellerAvailableGoods.sellerId = sellerId;
      promise = WmsSellerAvailableGoodsService.add($scope.sellerAvailableGoods);
      return promise.then(function(data) {
        $scope.sellerAvailableGoods.id = data;
        $scope.sellerGoodsMap[sellerId] = $scope.sellerAvailableGoods;
        return $scope.sellerAvailableGoods = {
          goodsId: $routeParams.id
        };
      });
    };
    $scope.disabledSellerAvailableGoods = function(sellerAvailableGoods, bool) {
      var promise;
      promise = WmsSellerAvailableGoodsService.updateDisabled(sellerAvailableGoods, bool);
      return promise.then(function() {
        return sellerAvailableGoods.disabled = bool;
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsGoodsService.detail(params);
      promise.then(function(data) {
        return $scope.goods = data;
      });
      params = {
        goodsId: $routeParams.id
      };
      promise = WmsSellerAvailableGoodsService.mapByGoodsId(params);
      return promise.then(function(data) {
        return $scope.sellerGoodsMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.sellerAvailableGoods = {
        goodsId: $routeParams.id
      };
      promise = WmsSellerService.listAll();
      return promise.then(function(data) {
        return $scope.sellerList = data;
      });
    };
    prepareConst();
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsGoodsUploadImagesListCtrl', function($scope, $routeParams, $filter, CommonService, WmsSellerGoodsService, ClickEditService, WmsConfigService, FileUploader, WmsMemberService, ModalService, $i18next, WmsSellerService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [20, 50, 100, 200];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.updateAbbrName = function(goods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goods, fieldName)) {
        promise = WmsSellerGoodsService.updateAbbrName(goods);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(goods, fieldName, bool) {
      return ClickEditService.switchNode(goods, fieldName, bool);
    };
    $scope.uploadGoodsImages = function(goods, queueImage, index) {
      var newUpload;
      newUpload = $scope.uploader[goods.id];
      queueImage.upload();
      return newUpload.onCompleteItem = function(fileItem, response, status, headers) {
        var promise;
        if (response.success) {
          goods.image = response.data;
          promise = WmsSellerGoodsService.updateImage(goods);
          promise.then(function() {
            $scope.items.splice(index, 1);
            return initSearch();
          });
        } else {
          ModalService.showMessageOnError($i18next("wms:message.apiError." + response.errorCode));
        }
        return angular.element('#searchBarCode').focus();
      };
    };
    prepareConst = function() {
      var promise;
      promise = WmsSellerService.listAll();
      return promise.then(function(data) {
        $scope.sellerList = data;
        return $scope.sellerMap = CommonService.convertListToMap($scope.sellerList, 'id');
      });
    };
    main = function() {
      var promise, uploader;
      angular.element('#searchBarCode').focus();
      $scope.fileHost = WmsConfigService.getFileHost();
      uploader = $scope.uploader = [];
      $scope.imgHost = WmsConfigService.getImgHost();
      promise = WmsSellerGoodsService.waitToUploadImagesList();
      return promise.then(function(data) {
        $scope.items = data;
        prepareConst();
        initSearch();
        return angular.forEach($scope.items, function(item) {
          uploader[item.id] = $scope.uploader[item.id] = new FileUploader({
            url: $scope.fileHost + '/upload_images/goods'
          });
          return uploader[item.id].filters.push({
            name: 'imageFilter' + item.id,
            fn: function(item, options) {
              var type;
              type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
          });
        });
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsIncreaseAvailableContainerQuantityCtrl', function($scope, $routeParams, WmsContainerService, $i18next, WmsMemberService, WmsSellerAvailableContainerService, WmsAvailableContainerInventoryLogService, WmsSellerService, ModalService) {
    var getAvailableContainerInventoryLogList, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [5, 10, 20, 50, 100];
      $scope.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.filteredItems = $scope.availableContainerInventoryLogList;
      return $scope.select($scope.currentPage);
    };
    $scope.calcQuantity = function() {
      var postStr, str;
      if ($scope.availableContainerInventoryLog.number) {
        str = $scope.availableContainer.quantity + ' + ' + $scope.availableContainerInventoryLog.number + " = ";
        $scope.availableContainerInventoryLog.calcQuantity = str + (parseInt($scope.availableContainer.quantity) + parseInt($scope.availableContainerInventoryLog.number));
        postStr = $scope.container.postInventory + ' - ' + $scope.availableContainerInventoryLog.number + " = ";
        return $scope.container.calcPostInventory = postStr + (parseInt($scope.container.postInventory) - parseInt($scope.availableContainerInventoryLog.number));
      } else {
        $scope.availableContainerInventoryLog.calcQuantity = "";
        return $scope.container.calcPostInventory = "";
      }
    };
    $scope.increaseInventory = function(availableContainerInventoryLog) {
      var promise;
      if ((parseInt($scope.container.postInventory) - parseInt($scope.availableContainerInventoryLog.number)) < 0) {
        return ModalService.showMessageOnError($i18next("wms:ui.label.postInventory") + $i18next("wms:message.inventoryIsNegative"));
      } else {
        promise = WmsAvailableContainerInventoryLogService.increaseInventory($scope.availableContainerInventoryLog);
        return promise.then(function() {
          $scope.availableContainer.quantity = parseInt($scope.availableContainer.quantity) + parseInt($scope.availableContainerInventoryLog.number);
          $scope.container.postInventory = parseInt($scope.container.postInventory) - parseInt($scope.availableContainerInventoryLog.number);
          $scope.container.calcPostInventory = "";
          $scope.availableContainerInventoryLog = {
            availableContainerId: $routeParams.availableContainerId
          };
          return getAvailableContainerInventoryLogList();
        });
      }
    };
    getAvailableContainerInventoryLogList = function() {
      var params, promise;
      params = {
        availableContainerId: $routeParams.availableContainerId
      };
      promise = WmsAvailableContainerInventoryLogService.listByAvailableContainerId(params);
      return promise.then(function(data) {
        $scope.availableContainerInventoryLogList = data;
        return initSearch();
      });
    };
    prepareConst = function() {
      var params, promise;
      getAvailableContainerInventoryLogList();
      params = {
        id: $scope.availableContainer.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(data) {
        return $scope.seller = data;
      });
      params = {
        id: $scope.availableContainer.containerId
      };
      promise = WmsContainerService.detail(params);
      promise.then(function(data) {
        return $scope.container = data;
      });
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.availableContainerInventoryLog = {
        availableContainerId: $routeParams.availableContainerId
      };
      params = {
        id: $routeParams.availableContainerId
      };
      promise = WmsSellerAvailableContainerService.detail(params);
      return promise.then(function(data) {
        $scope.availableContainer = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsIncreaseAvailableGoodsQuantityCtrl', function($scope, $routeParams, WmsGoodsService, WmsMemberService, WmsSellerAvailableGoodsService, WmsAvailableGoodsInventoryLogService, WmsSellerService) {
    var getAvailableGoodsInventoryLogList, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [5, 10, 20, 50, 100];
      $scope.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.filteredItems = $scope.items;
      return $scope.select($scope.currentPage);
    };
    $scope.calcQuantity = function() {
      var str;
      if ($scope.availableGoodsInventoryLog.number) {
        str = $scope.availableGoods.quantity + ' + ' + $scope.availableGoodsInventoryLog.number + " = ";
        return $scope.availableGoodsInventoryLog.calcQuantity = str + (parseInt($scope.availableGoods.quantity) + parseInt($scope.availableGoodsInventoryLog.number));
      } else {
        return $scope.availableGoodsInventoryLog.calcQuantity = "";
      }
    };
    $scope.increaseInventory = function(availableGoodsInventoryLog) {
      var promise;
      promise = WmsAvailableGoodsInventoryLogService.increaseInventory($scope.availableGoodsInventoryLog);
      return promise.then(function() {
        $scope.availableGoods.quantity = parseInt($scope.availableGoods.quantity) + parseInt($scope.availableGoodsInventoryLog.number);
        $scope.availableGoodsInventoryLog = {
          availableGoodsId: $routeParams.availableGoodsId
        };
        return getAvailableGoodsInventoryLogList();
      });
    };
    getAvailableGoodsInventoryLogList = function() {
      var params, promise;
      params = {
        availableGoodsId: $routeParams.availableGoodsId
      };
      promise = WmsAvailableGoodsInventoryLogService.listByAvailableGoodsId(params);
      return promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.availableGoodsId
      };
      promise = WmsSellerAvailableGoodsService.detail(params);
      promise.then(function(availableGoods) {
        var goodsParams, sellerParams;
        $scope.availableGoods = availableGoods;
        sellerParams = {
          id: availableGoods.sellerId
        };
        promise = WmsSellerService.detail(sellerParams);
        promise.then(function(seller) {
          return $scope.seller = seller;
        });
        goodsParams = {
          id: availableGoods.goodsId
        };
        promise = WmsGoodsService.detail(goodsParams);
        return promise.then(function(goods) {
          return $scope.goods = goods;
        });
      });
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      $scope.availableGoodsInventoryLog = {
        availableGoodsId: $routeParams.availableGoodsId
      };
      getAvailableGoodsInventoryLogList();
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsIncreaseContainerInventoryCtrl', function($scope, $routeParams, WmsContainerService, WmsContainerInventoryLogService, WmsMemberService) {
    var getContainerInventoryLogList, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [5, 10, 20, 50, 100];
      $scope.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.filteredItems = $scope.containerInventoryLogList;
      return $scope.select($scope.currentPage);
    };
    $scope.calcInventory = function() {
      var postStr, totalStr;
      if ($scope.containerInventoryLog.number) {
        totalStr = $scope.container.totalInventory + ' + ' + $scope.containerInventoryLog.number + " = ";
        $scope.containerInventoryLog.calcTotalInventory = totalStr + (parseInt($scope.container.totalInventory) + parseInt($scope.containerInventoryLog.number));
        postStr = $scope.container.postInventory + ' + ' + $scope.containerInventoryLog.number + " = ";
        return $scope.containerInventoryLog.calcPostInventory = postStr + (parseInt($scope.container.postInventory) + parseInt($scope.containerInventoryLog.number));
      } else {
        $scope.containerInventoryLog.calcTotalInventory = "";
        return $scope.containerInventoryLog.calcPostInventory = "";
      }
    };
    $scope.increaseInventory = function(containerInventoryLog) {
      var promise;
      promise = WmsContainerInventoryLogService.increaseInventory($scope.containerInventoryLog);
      return promise.then(function() {
        $scope.container.totalInventory = parseInt($scope.container.totalInventory) + parseInt($scope.containerInventoryLog.number);
        $scope.container.postInventory = parseInt($scope.container.postInventory) + parseInt($scope.containerInventoryLog.number);
        $scope.containerInventoryLog = {
          containerId: $scope.container.id
        };
        return getContainerInventoryLogList();
      });
    };
    getContainerInventoryLogList = function() {
      var params, promise;
      params = {
        containerId: $routeParams.containerId
      };
      promise = WmsContainerInventoryLogService.listByContainerId(params);
      return promise.then(function(data) {
        $scope.containerInventoryLogList = data;
        return initSearch();
      });
    };
    prepareConst = function() {
      var promise;
      getContainerInventoryLogList();
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.containerInventoryLog = {
        containerId: $routeParams.containerId
      };
      params = {
        id: $routeParams.containerId
      };
      promise = WmsContainerService.detail(params);
      promise.then(function(data) {
        return $scope.container = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsIncreaseGoodsInventoryCtrl', function($scope, $routeParams, WmsGoodsService, WmsGoodsInventoryLogService, WmsMemberService, ModalService, $i18next) {
    var getGoodsInventoryLogList, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [5, 10, 20, 50, 100];
      $scope.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.filteredItems = $scope.goodsInventoryLogList;
      return $scope.select($scope.currentPage);
    };
    $scope.calcInventory = function() {
      var postStr, totalStr;
      if ($scope.goodsInventoryLog.number) {
        totalStr = $scope.goods.totalInventory + ' + ' + $scope.goodsInventoryLog.number + " = ";
        $scope.goodsInventoryLog.calcTotalInventory = totalStr + (parseInt($scope.goods.totalInventory) + parseInt($scope.goodsInventoryLog.number));
        postStr = $scope.goods.postInventory + ' + ' + $scope.goodsInventoryLog.number + " = ";
        return $scope.goodsInventoryLog.calcPostInventory = postStr + (parseInt($scope.goods.postInventory) + parseInt($scope.goodsInventoryLog.number));
      } else {
        $scope.goodsInventoryLog.calcTotalInventory = "";
        return $scope.goodsInventoryLog.calcPostInventory = "";
      }
    };
    $scope.increaseInventory = function(goodsInventoryLog) {
      var promise;
      if ($scope.goods.isEncode && !$scope.goodsInventoryLog.batchNumber) {
        return ModalService.showMessageOnError($i18next('wms:message.apiError.batch\ number\ not\ exists'));
      } else {
        promise = WmsGoodsInventoryLogService.increaseInventory($scope.goodsInventoryLog);
        return promise.then(function() {
          $scope.goods.totalInventory = parseInt($scope.goods.totalInventory) + parseInt($scope.goodsInventoryLog.number);
          $scope.goods.postInventory = parseInt($scope.goods.postInventory) + parseInt($scope.goodsInventoryLog.number);
          $scope.goodsInventoryLog = {
            goodsId: $scope.goods.id
          };
          return getGoodsInventoryLogList();
        });
      }
    };
    getGoodsInventoryLogList = function() {
      var params, promise;
      params = {
        goodsId: $routeParams.goodsId
      };
      promise = WmsGoodsInventoryLogService.listByGoodsId(params);
      return promise.then(function(data) {
        $scope.goodsInventoryLogList = data;
        return initSearch();
      });
    };
    prepareConst = function() {
      var promise;
      getGoodsInventoryLogList();
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.goodsInventoryLog = {
        goodsId: $routeParams.goodsId
      };
      params = {
        id: $routeParams.goodsId
      };
      promise = WmsGoodsService.detail(params);
      promise.then(function(data) {
        return $scope.goods = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsInventoryTransferEditCtrl', function($scope, $i18next, $routeParams, CommonService, WmsInventoryTransferService, WmsSellerService, WmsMemberService, FileUploader, WmsConfigService, ModalService) {
    var main, prepareConst;
    prepareConst = function() {
      var fileHost, promise, uploader;
      promise = WmsSellerService.mapAll();
      promise.then(function(data) {
        return $scope.sellerMap = data;
      });
      promise = WmsMemberService.mapMember();
      promise.then(function(data) {
        return $scope.memberMap = data;
      });
      fileHost = WmsConfigService.getFileHost();
      uploader = $scope.uploader = new FileUploader({
        url: fileHost + '/upload_images/voucher'
      });
      uploader.filters.push({
        name: 'imageFilter',
        fn: function(item, options) {
          var type;
          type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });
      return uploader.onCompleteItem = function(fileItem, response, status, headers) {
        if (response.success) {
          $scope.uploader.queue = [];
          $scope.inventoryTransfer.voucher = response.data;
          promise = WmsInventoryTransferService.updateVoucher($scope.inventoryTransfer);
          return promise.then(function() {});
        } else {
          return ModalService.showMessageOnError($i18next("wms:message.apiError." + response.errorCode));
        }
      };
    };
    main = function() {
      var params, promise;
      $scope.imgHost = WmsConfigService.getImgHost();
      params = {
        id: $routeParams.id
      };
      promise = WmsInventoryTransferService.detail(params);
      promise.then(function(data) {
        return $scope.inventoryTransfer = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsInventoryTransferGoodsListCtrl', function($scope, $routeParams, WmsSellerService, WmsSellerGoodsService, WmsInventoryTransferGoodsService, WmsInventoryTransferService, WmsConfigService) {
    var main, prepareConst;
    prepareConst = function() {
      var params, promise;
      promise = WmsSellerService.mapAll();
      promise.then(function(data) {
        return $scope.sellerMap = data;
      });
      params = {
        id: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferService.detail(params);
      return promise.then(function(data) {
        var acceptorGoodsParams, sellerGoodsParams;
        $scope.inventoryTransfer = data;
        sellerGoodsParams = {
          sellerId: data.responseSeller
        };
        promise = WmsSellerGoodsService.mapBySellerIdAndNoCombo(sellerGoodsParams);
        promise.then(function(sellerGoodsMap) {
          return $scope.sellerGoodsMap = sellerGoodsMap;
        });
        acceptorGoodsParams = {
          sellerId: data.requestSeller
        };
        promise = WmsSellerGoodsService.mapBySellerIdAndNoCombo(acceptorGoodsParams);
        return promise.then(function(acceptorGoodsMap) {
          return $scope.acceptorGoodsMap = acceptorGoodsMap;
        });
      });
    };
    main = function() {
      var params, promise;
      $scope.imgHost = WmsConfigService.getImgHost();
      $scope.createInventoryTransferGoods = {};
      $scope.inventoryTransferGoods = {
        inventoryTransferId: $routeParams.inventoryTransferId
      };
      params = {
        inventoryTransferId: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferGoodsService.listByInventoryTransferId(params);
      promise.then(function(data) {
        return $scope.transferGoodsList = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsInventoryTransferListCtrl', function($scope, $routeParams, $filter, WmsSellerService, WmsMemberService, WmsInventoryTransferService, WmsConfigService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      $scope.filteredItems = $filter('filter')($scope.filteredItems, {
        'status': $scope.searchOption.status
      });
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": "",
        "status": 2
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.pass = function(node) {
      var params, promise;
      params = {
        id: node.id
      };
      promise = WmsInventoryTransferService.passInventoryTransfer(params);
      return promise.then(function() {
        return node.status = 2;
      });
    };
    $scope.reject = function(node) {
      var params, promise;
      params = {
        id: node.id
      };
      promise = WmsInventoryTransferService.rejectInventoryTransfer(params);
      return promise.then(function() {
        return node.status = 0;
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsSellerService.mapAll();
      promise.then(function(data) {
        return $scope.sellerMap = data;
      });
      promise = WmsMemberService.mapMember();
      promise.then(function(data) {
        return $scope.memberMap = data;
      });
      promise = WmsInventoryTransferService.statusEnumList();
      return promise.then(function(data) {
        return $scope.statusEnumList = data;
      });
    };
    main = function() {
      var promise;
      $scope.imgHost = WmsConfigService.getImgHost();
      promise = WmsInventoryTransferService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsInventoryTransferPickGoodsCtrl', function($scope, $routeParams, $i18next, $location, WmsSellerService, WmsInventoryTransferService, WmsInventoryTransferScanGoodsService, ModalService, WmsInventoryTransferGoodsService, WmsConfigService) {
    var checkScanComplete, main, prepareConst;
    checkScanComplete = function() {
      var params, promise;
      params = {
        inventoryTransferId: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferScanGoodsService.listByInventoryTransferId(params);
      return promise.then(function(scanGoodsList) {
        var item, _i, _len;
        $scope.scanGoodsList = scanGoodsList;
        angular.forEach($scope.goodsMap, function(goods) {
          return $scope.goodsNumberMap[goods.sellerGoodsId] = 0;
        });
        for (_i = 0, _len = scanGoodsList.length; _i < _len; _i++) {
          item = scanGoodsList[_i];
          $scope.goodsNumberMap[item.sellerGoodsId] += parseInt(item.goodsNumber);
        }
        $scope.scanGoodsId = 0;
        angular.forEach($scope.goodsMap, function(goods) {
          if (goods.goodsNumber > $scope.goodsNumberMap[goods.sellerGoodsId] && $scope.scanGoodsId === 0) {
            return $scope.scanGoodsId = goods.sellerGoodsId;
          }
        });
        if ($scope.scanGoodsId === 0) {
          return $scope.completeScanGoods();
        }
      });
    };
    $scope.scanGoodsCode = function() {
      var params, promise;
      if (!$scope.scanGoodsId || $scope.goodsCode === '') {
        return ModalService.showMessageOnError($i18next("wms:message.validationError.goodsBarCodeNotNull"));
      } else {
        params = {
          inventoryTransferId: $routeParams.inventoryTransferId,
          sellerGoodsId: $scope.scanGoodsId,
          goodsCode: $scope.goodsCode
        };
        $scope.goodsCode = '';
        promise = WmsInventoryTransferScanGoodsService.scanGoodsCode(params);
        return promise.then(function() {
          return checkScanComplete();
        });
      }
    };
    $scope.completeScanGoods = function() {
      var params, promise;
      params = {
        id: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferService.completeInventoryTransfer(params);
      return promise.then(function() {
        return $location.path("/wms/inventory_transfer_list");
      });
    };
    $scope.emptyScanGoods = function() {
      var params, promise;
      params = {
        inventoryTransferId: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferScanGoodsService.emptyScanGoods(params);
      return promise.then(function() {
        return checkScanComplete();
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        inventoryTransferId: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferGoodsService.goodsMapByInventoryTransferId(params);
      promise.then(function(goodsMap) {
        $scope.goodsMap = goodsMap;
        return checkScanComplete();
      });
      promise = WmsSellerService.mapAll();
      return promise.then(function(data) {
        return $scope.sellerMap = data;
      });
    };
    main = function() {
      var params, promise;
      angular.element('#scanBarCodeInput').focus();
      $scope.goodsNumberMap = {};
      $scope.imgHost = WmsConfigService.getImgHost();
      params = {
        id: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferService.detail(params);
      return promise.then(function(data) {
        $scope.inventoryTransfer = data;
        if ($scope.inventoryTransfer.status === 2) {
          return prepareConst();
        } else {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.inventoryTransferNotPassStatus"));
        }
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLocationDetailCtrl', function($scope, $routeParams, WmsLocationService, WmsRepositoryService) {
    var main, prepareConst;
    $scope.save = function(location, fieldName) {
      var promise;
      promise = WmsLocationService.update(location);
      return promise.then(function() {});
    };
    prepareConst = function() {
      var promise;
      promise = WmsLocationService.ABCListAll();
      return promise.then(function(data) {
        return $scope.ABCList = data;
      });
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsLocationService.detail(params);
      return promise.then(function(data) {
        $scope.location = data;
        promise = WmsRepositoryService.detail({
          id: $scope.location.repositoryId
        });
        promise.then(function(data) {
          return $scope.repository = data;
        });
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLocationEditCtrl', function($scope, $routeParams, CommonService, WmsLocationService, ClickEditService) {
    var main;
    $scope.update = function(location, fieldName) {
      var promise;
      if (ClickEditService.updateNode(location, fieldName)) {
        promise = WmsLocationService.update(location);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(location, fieldName, bool) {
      return ClickEditService.switchNode(location, fieldName, bool);
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsLocationService.detail(params);
      return promise.then(function(data) {
        return $scope.location = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLocationListCtrl', function($scope, $routeParams, $filter, CommonService, WmsLocationService, ClickEditService, WmsWarehouseService, WmsRepositoryService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.save = function() {
      var promise;
      promise = WmsLocationService.add($scope.location);
      return promise.then(function(data) {
        $scope.location.id = data;
        $scope.items.unshift($scope.location);
        $scope.createLocation = {};
        $scope.location = {
          repositoryId: $routeParams.repositoryId,
          disabled: true
        };
        return initSearch();
      });
    };
    $scope.update = function(location, fieldName) {
      var promise;
      if (ClickEditService.updateNode(location, fieldName)) {
        promise = WmsLocationService.update(location);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(location, fieldName, bool) {
      return ClickEditService.switchNode(location, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsLocationService.ABCListAll();
      return promise.then(function(data) {
        return $scope.ABCList = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.createLocation = {};
      $scope.location = {
        repositoryId: $routeParams.repositoryId,
        disabled: true
      };
      promise = WmsRepositoryService.detail({
        id: $routeParams.repositoryId
      });
      promise.then(function(data) {
        return $scope.repository = data;
      });
      params = {
        repositoryId: $routeParams.repositoryId
      };
      promise = WmsLocationService.listByRepositoryId(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLogisticCompanyDetailCtrl', function($scope, $routeParams, WmsLogisticCompanyService) {
    var main;
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLogisticCompanyListCtrl', function($scope, $routeParams, $filter, CommonService, WmsLogisticCompanyService, WmsUsableLogisticCompanyService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsLogisticCompanyService.add($scope.logisticCompany);
      return promise.then(function(data) {
        $scope.logisticCompany.id = data;
        $scope.items.unshift($scope.logisticCompany);
        $scope.createLogisticCompany = {};
        $scope.logisticCompany = {};
        return initSearch();
      });
    };
    $scope.updateMonthCode = function(logisticCompany, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticCompany, fieldName)) {
        promise = WmsLogisticCompanyService.updateMonthCode(logisticCompany);
        return promise.then(function() {});
      }
    };
    $scope.updateSendSite = function(logisticCompany, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticCompany, fieldName)) {
        promise = WmsLogisticCompanyService.updateSendSite(logisticCompany);
        return promise.then(function() {});
      }
    };
    $scope.updateCustomerPwd = function(logisticCompany, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticCompany, fieldName)) {
        promise = WmsLogisticCompanyService.updateCustomerPwd(logisticCompany);
        return promise.then(function() {});
      }
    };
    $scope.updateCustomerName = function(logisticCompany, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticCompany, fieldName)) {
        promise = WmsLogisticCompanyService.updateCustomerName(logisticCompany);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(logisticCompany, fieldName, bool) {
      return ClickEditService.switchNode(logisticCompany, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsUsableLogisticCompanyService.mapAll();
      return promise.then(function(data) {
        return $scope.usableLogisticCompanyMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.createLogisticCompany = {};
      $scope.logisticCompany = {};
      promise = WmsLogisticCompanyService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLogisticOrderEditCtrl', function($scope, $routeParams, CommonService, WmsLogisticOrderService, WmsAddressService, WmsLogisticCompanyService, ClickEditService, WmsContainerService, WmsSellerAvailableContainerService, WmsSellerFreightGroupService, WmsPickOrderService) {
    var main, prepareConst;
    $scope.updateLogisticCharge = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticCharge(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateTotalWeight = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateTotalWeight(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateContainerId = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateContainerId(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateComment = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateComment(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateLogisticSn = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticSn(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateLogisticCompanyId = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(logisticOrder, fieldName, bool) {
      return ClickEditService.switchNode(logisticOrder, fieldName, bool);
    };
    $scope.getCityList = function(logisticOrder) {
      var params, promise;
      params = {
        level: "2",
        parentId: logisticOrder.province
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.cityList = data;
        });
      } else {
        logisticOrder.city = 0;
        return $scope.cityList = [];
      }
    };
    $scope.getDistrictList = function(logisticOrder) {
      var params, promise;
      params = {
        level: "3",
        parentId: logisticOrder.city
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.districtList = data;
        });
      } else {
        logisticOrder.district = 0;
        return $scope.districtList = [];
      }
    };
    $scope.saveAddress = function(logisticOrder) {
      var promise;
      if (parseInt(logisticOrder.province) > 0 && parseInt(logisticOrder.city) > 0) {
        promise = WmsLogisticOrderService.updateAddress(logisticOrder);
        return promise.then(function() {
          return $scope.logisticOrder[logisticOrder.id + 'address'] = false;
        });
      }
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsAddressService.listAllProvince();
      promise.then(function(data) {
        $scope.provinceList = data;
        $scope.getCityList($scope.logisticOrder);
        return $scope.getDistrictList($scope.logisticOrder);
      });
      promise = WmsLogisticCompanyService.mapAll();
      promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
      params = {
        logisticOrderId: $scope.logisticOrderId
      };
      promise = WmsPickOrderService.detailByLogisticOrderId(params);
      return promise.then(function(data) {
        $scope.pickOrder = data;
        params = {
          sellerId: $scope.pickOrder.sellerId
        };
        promise = WmsSellerAvailableContainerService.listContainerBySellerId(params);
        promise.then(function(data) {
          $scope.containerList = data;
          return $scope.containerMap = CommonService.convertListToMap($scope.containerList, 'id');
        });
        params = {
          sellerId: $scope.pickOrder.sellerId
        };
        promise = WmsSellerFreightGroupService.listBySellerId(params);
        return promise.then(function(data) {
          return $scope.sellerFreightGroupList = data;
        });
      });
    };
    main = function() {
      var params, promise;
      $scope.showLogisticOrderEdit = true;
      $scope.logisticOrderId = $routeParams.id;
      params = {
        id: $routeParams.id
      };
      promise = WmsLogisticOrderService.detail(params);
      return promise.then(function(data) {
        $scope.logisticOrder = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLogisticOrderGoodsDetailCtrl', function($scope, $routeParams, WmsLogisticOrderGoodsService) {
    var main;
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLogisticOrderGoodsListCtrl', function($scope, $routeParams, WmsPickOrderGoodsService, WmsPickOrderService, WmsSellerGoodsService, WmsLogisticOrderService) {
    var main, prepareConst;
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsPickOrderService.detail(params);
      return promise.then(function(data) {
        var sellerGoodsParams;
        $scope.pickOrder = data;
        params = {
          id: data.logisticOrderId
        };
        promise = WmsLogisticOrderService.detail(params);
        promise.then(function(logisticOrder) {
          return $scope.logisticOrder = logisticOrder;
        });
        sellerGoodsParams = {
          sellerId: data.sellerId
        };
        promise = WmsSellerGoodsService.mapBySellerId(sellerGoodsParams);
        return promise.then(function(goodsMap) {
          return $scope.goodsMap = goodsMap;
        });
      });
    };
    main = function() {
      var params, promise;
      params = {
        pickOrderId: $routeParams.id
      };
      promise = WmsPickOrderGoodsService.listByPickOrderId(params);
      promise.then(function(data) {
        return $scope.orderGoodsList = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLogisticOrderImportListCtrl', function($scope, $filter, ClickEditService, CommonService, WmsLogisticOrderService, WmsLogisticCompanyService, WmsAddressService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      $scope.filteredItems = $filter('filter')($scope.filteredItems, {
        'logisticCompanyId': $scope.searchOption.logisticCompanyId
      });
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.updateLogisticCompanyId = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateExpressSn = function(logisticOrder) {
      var promise;
      promise = WmsLogisticOrderService.updateExpressSn(logisticOrder);
      return promise.then(function() {
        promise = WmsLogisticOrderService.listAllEmptyExpressSn({});
        return promise.then(function(data) {
          $scope.items = data;
          return initSearch();
        });
      });
    };
    $scope["import"] = function(refExpressUpload) {
      var promise;
      $scope.showimporting = true;
      promise = WmsLogisticOrderService.importExpressSn(refExpressUpload);
      return promise.then(function() {
        return window.location.reload();
      });
    };
    $scope.switchNode = function(logisticOrder, fieldName, bool) {
      return ClickEditService.switchNode(logisticOrder, fieldName, bool);
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticCompanyService.mapAll();
      promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
      promise = WmsAddressService.mapAll();
      return promise.then(function(data) {
        return $scope.addressMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.refExpressUpload = {};
      $scope.searchOption = {
        "keywords": "",
        "logisticCompanyId": ""
      };
      $scope.logisticCompanyId = "";
      $scope.sellerFreightGroupMap = {};
      $scope.createImportRefExpress = {};
      params = {};
      promise = WmsLogisticOrderService.listAllEmptyExpressSn(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLogisticOrderPickSearchCtrl', function($scope, $routeParams, $location, $i18next, ModalService, WmsLogisticOrderService, WmsPickOrderService) {
    var main;
    $scope.getLogisticOrder = function() {
      var params, promise;
      $scope.logisticOrder = {};
      $scope.isOpenNumberFocus = true;
      params = {
        expressSn: $scope.expressSn
      };
      $scope.expressSn = "";
      promise = WmsLogisticOrderService.detailByExpressSn(params);
      return promise.then(function(data) {
        $scope.logisticOrder = data;
        $scope.expressSn = $scope.logisticOrder.expressSn;
        promise = WmsPickOrderService.detailByExpressSn(params);
        return promise.then(function(data) {
          $scope.pickOrder = data;
          if ($scope.pickOrder.status === 1) {
            return $location.path("/wms/pick_goods").search("pickOrderId", $scope.pickOrder.id);
          } else if ($scope.pickOrder.status === 2 || $scope.pickOrder.status === 3) {
            $scope.expressSn = '';
            $scope.logisticOrder = {};
            return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderAlreadyPack"));
          } else {
            $scope.logisticOrder = {};
            return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderNotPickStatus"));
          }
        });
      });
    };
    main = function() {
      $scope.expressSn = "";
      $scope.expressOrder = {
        last4PhoneNumber: ''
      };
      $scope.isOpenNumberFocus = false;
      return angular.element('#expressSn').focus();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsLogisticOrderRefExpressCtrl', function($scope, $routeParams, $location, $i18next, ModalService, WmsLogisticOrderService) {
    var main;
    $scope.getLogisticOrder = function() {
      var params, promise;
      $scope.isOpenNumberFocus = true;
      params = {
        id: $scope.logisticOrderId
      };
      $scope.logisticOrderId = "";
      promise = WmsLogisticOrderService.detail(params);
      return promise.then(function(data) {
        $scope.logisticOrder = data;
        $scope.logisticOrderId = $scope.logisticOrder.id;
        if ($scope.logisticOrder.status === 1) {
          return angular.element('#last4PhoneNumber').focus();
        } else if ($scope.logisticOrder.status === 2 || $scope.logisticOrder.status === 3) {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderAlreadyPack"));
        } else {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderNotPickStatus"));
        }
      });
    };
    $scope.checkPhoneNumber = function() {
      $scope.showInputExpressSn = true;
      if ($scope.expressOrder.last4PhoneNumber.length === 4) {
        if ($scope.logisticOrder.phoneNumber.substr(-4) !== $scope.expressOrder.last4PhoneNumber) {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.last4PhoneNumberError"));
        } else {
          return angular.element('#inputExpressSn').focus();
        }
      }
    };
    $scope.updateExpressOrder = function() {
      var promise;
      promise = WmsLogisticOrderService.updateExpressSn($scope.logisticOrder);
      return promise.then(function() {
        return window.location.reload();
      });
    };
    return main = function() {
      $scope.logisticOrderId = "";
      $scope.expressOrder = {
        last4PhoneNumber: ''
      };
      $scope.isOpenNumberFocus = false;
      $scope.showInputExpressSn = false;
      angular.element('#logisticId').focus();
      return main();
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').filter('calTotalWeight', function() {
    return function(items) {
      var weight;
      weight = 0;
      angular.forEach(items, function(item) {
        if (item) {
          return weight = parseFloat(weight) + parseFloat(item.goodsTotalWeight);
        }
      });
      return weight;
    };
  }).controller('WmsLogisticOrderWeightCtrl', function($scope, $location, $i18next, $routeParams, CommonService, ModalService, $timeout, WmsLogisticOrderService, WmsLogisticOrderGoodsService, WmsGoodsService, DeviceDriverService, WmsSellerAvailableContainerService, WmsLogisticOrderScanGoodsService) {
    var main, prepareConst;
    $scope.getLogisticOrderTotalWeight = function() {
      var params, promise;
      if ($scope.expressBarCode === $scope.logisticOrder.expressSn) {
        $scope.waitForUpdate = true;
        params = {
          logisticOrderId: $scope.logisticOrderId
        };
        promise = DeviceDriverService.getWeight(params);
        promise.then(function(data) {
          $scope.deviceTotalWeight = data;
          $scope.waitForUpdate = false;
          params = {
            id: $scope.logisticOrderId,
            totalWeight: $scope.deviceTotalWeight
          };
          promise = WmsLogisticOrderService.updateTotalWeight(params);
          return promise.then(function() {
            $scope.logisticOrder.status = 3;
            return $timeout((function() {
              $location.path("/wms/express_order_pack");
            }), 500);
          });
        });
      }
      return $scope.expressBarCode = '';
    };
    prepareConst = function() {
      var params, promise;
      params = {
        logisticOrderId: $scope.logisticOrderId
      };
      promise = WmsLogisticOrderScanGoodsService.mapByLogisticOrderId(params);
      promise.then(function(data) {
        $scope.scanGoodsMap = data;
        $scope.logisticOrderGoodsWeight = 0;
        return angular.forEach($scope.scanGoodsMap, function(scanGoodsList, goodsId) {
          return angular.forEach(scanGoodsList, function(scanGoods) {
            return $scope.logisticOrderGoodsWeight = $scope.logisticOrderGoodsWeight + scanGoods.goodsTotalWeight * 1;
          });
        });
      });
      params = {
        logisticOrderId: $scope.logisticOrderId
      };
      promise = WmsGoodsService.goodsMapByLogisticOrderId(params);
      return promise.then(function(data) {
        return $scope.goodsMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.logisticOrderId = $routeParams.id;
      $scope.logisticOrderGoodsWeight = 0;
      $scope.deviceTotalWeight = 0;
      $scope.waitForUpdate = true;
      $scope.expressBarCode = '';
      params = {
        id: $scope.logisticOrderId
      };
      promise = WmsLogisticOrderService.detail(params);
      return promise.then(function(data) {
        $scope.logisticOrder = data;
        if (parseInt($scope.logisticOrder.status) === 3) {
          if ($scope.logisticOrder.containerId) {
            params = {
              logisticOrderId: $scope.logisticOrderId
            };
            promise = WmsLogisticOrderGoodsService.listByLogisticOrderId(params);
            promise.then(function(data) {
              return $scope.items = data;
            });
            return prepareConst();
          } else {
            $location.path("/wms/logistic_order_container").search("id", $scope.logisticOrderId);
            return ModalService.showMessageOnError($i18next("wms:message.apiError.container not exists"));
          }
        } else if (parseInt($scope.logisticOrder.status) === 1) {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderNotPick"));
        } else if (parseInt($scope.logisticOrder.status) === 2) {
          $location.path("/wms/express_order_pack");
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderAlreadyPack"));
        }
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsMemberDetailCtrl', function($scope, $routeParams, WmsMemberService) {
    var main;
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsMemberService.detail(params);
      return promise.then(function(data) {
        return $scope.member = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsMemberEditCtrl', function($scope, $routeParams, CommonService, WmsMemberService, ClickEditService) {
    var main;
    $scope.updateMobilePhone = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.updateMobilePhone(member);
        return promise.then(function() {});
      }
    };
    $scope.updateRealName = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.updateRealName(member);
        return promise.then(function() {});
      }
    };
    $scope.updateJobNumber = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.updateJobNumber(member);
        return promise.then(function() {});
      }
    };
    $scope.disabledMember = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.disabledMember(member);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.updateName(member);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(member, fieldName, bool) {
      return ClickEditService.switchNode(member, fieldName, bool);
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsMemberService.detail(params);
      return promise.then(function(data) {
        return $scope.member = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsMemberListCtrl', function($scope, $routeParams, $filter, CommonService, WmsMemberService, ClickEditService, SessionService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsMemberService.add($scope.member);
      return promise.then(function(data) {
        $scope.member.id = data;
        $scope.items.unshift($scope.member);
        $scope.createMember = {};
        $scope.member = {
          isSellerMember: false
        };
        return initSearch();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsMemberService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.disabledMember = function(member, bool) {
      var promise;
      member.disabled = bool;
      promise = WmsMemberService.disabledMember(member);
      return promise.then(function() {});
    };
    $scope.updateName = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.updateName(member);
        return promise.then(function() {});
      }
    };
    $scope.updateMobilePhone = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.updateMobilePhone(member);
        return promise.then(function() {});
      }
    };
    $scope.updateRealName = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.updateRealName(member);
        return promise.then(function() {});
      }
    };
    $scope.updateJobNumber = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.updateJobNumber(member);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(member, fieldName, bool) {
      return ClickEditService.switchNode(member, fieldName, bool);
    };
    prepareConst = function() {};
    main = function() {
      var promise;
      $scope.createMember = {};
      $scope.member = {
        isSellerMember: false
      };
      $scope.username = SessionService.getUsername();
      promise = WmsMemberService.listMember();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsMemberRoleDetailCtrl', function($scope, $routeParams, WmsMemberRoleService) {
    var main;
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsMemberRoleEditCtrl', function($scope, $routeParams, CommonService, WmsMemberRoleService, ClickEditService) {
    var main;
    $scope.switchNode = function(memberRole, fieldName, bool) {
      return ClickEditService.switchNode(memberRole, fieldName, bool);
    };
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsMemberRoleListCtrl', function($scope, $routeParams, $filter, CommonService, WmsMemberRoleService, WmsRoleService, WmsMemberService, ClickEditService) {
    var main, prepareConst;
    $scope.add = function() {
      var promise;
      promise = WmsMemberRoleService.add($scope.memberRole);
      return promise.then(function(data) {
        $scope.memberRole.id = data;
        $scope.memberRoleList.unshift($scope.memberRole);
        $scope.createMemberRole = {};
        return $scope.memberRole = {
          memberId: $routeParams.memberId
        };
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsMemberRoleService["delete"](params);
      return promise.then(function() {
        return $scope.memberRoleList.splice(i, 1);
      });
    };
    $scope.update = function(memberRole, fieldName) {
      var promise;
      if (ClickEditService.updateNode(memberRole, fieldName)) {
        promise = WmsMemberRoleService.update(memberRole);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(memberRole, fieldName, bool) {
      return ClickEditService.switchNode(memberRole, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.memberId
      };
      promise = WmsMemberService.detail(params);
      return promise.then(function(member) {
        $scope.member = member;
        if (member.isSellerMember) {
          params = {
            sellerRole: true
          };
        } else {
          params = {
            sellerRole: false
          };
        }
        promise = WmsRoleService.listBySellerRole(params);
        return promise.then(function(data) {
          $scope.roleList = data;
          return $scope.roleMap = CommonService.convertListToMap($scope.roleList, "id");
        });
      });
    };
    main = function() {
      var params, promise;
      $scope.createMemberRole = {};
      $scope.memberRole = {
        memberId: $routeParams.memberId
      };
      params = {
        memberId: $routeParams.memberId
      };
      promise = WmsMemberRoleService.listByMemberId(params);
      promise.then(function(data) {
        return $scope.memberRoleList = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsModuleActionDetailCtrl', function($scope, $routeParams, WmsModuleActionService) {
    var main;
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsModuleActionEditCtrl', function($scope, $routeParams, CommonService, WmsModuleActionService, ClickEditService) {
    var main;
    $scope.updateName = function(moduleAction, fieldName) {
      var promise;
      if (ClickEditService.updateNode(moduleAction, fieldName)) {
        promise = WmsModuleActionService.updateName(moduleAction);
        return promise.then(function() {});
      }
    };
    $scope.updateAlias = function(moduleAction, fieldName) {
      var promise;
      if (ClickEditService.updateNode(moduleAction, fieldName)) {
        promise = WmsModuleActionService.updateAlias(moduleAction);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(moduleAction, fieldName, bool) {
      return ClickEditService.switchNode(moduleAction, fieldName, bool);
    };
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsModuleActionListCtrl', function($scope, $routeParams, $filter, CommonService, WmsModuleActionService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsModuleActionService.add($scope.moduleAction);
      return promise.then(function(data) {
        $scope.moduleAction.id = data;
        $scope.items.unshift($scope.moduleAction);
        $scope.createModuleAction = {};
        $scope.moduleAction = {};
        return initSearch();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsModuleActionService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.updateName = function(moduleAction, fieldName) {
      var promise;
      if (ClickEditService.updateNode(moduleAction, fieldName)) {
        promise = WmsModuleActionService.updateName(moduleAction);
        return promise.then(function() {});
      }
    };
    $scope.updateAlias = function(moduleAction, fieldName) {
      var promise;
      if (ClickEditService.updateNode(moduleAction, fieldName)) {
        promise = WmsModuleActionService.updateAlias(moduleAction);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(moduleAction, fieldName, bool) {
      return ClickEditService.switchNode(moduleAction, fieldName, bool);
    };
    prepareConst = function() {};
    main = function() {
      var promise;
      $scope.createModuleAction = {};
      $scope.moduleAction = {};
      promise = WmsModuleActionService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsOrderDetailCtrl', function($scope, $routeParams, WmsOrderService) {
    var main;
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsOrderService.getTotalPrice(params);
      promise.then(function(data) {
        return $scope.order = data;
      });
      params = {
        id: $routeParams.id
      };
      promise = WmsOrderService.detail(params);
      return promise.then(function(data) {
        return $scope.order = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsOrderEditCtrl', function($scope, $routeParams, $location, CommonService, WmsOrderService, WmsAddressService, ClickEditService, WmsPlatformSourceService) {
    var main, prepareConst;
    $scope.updateIdentityCardContrary = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCardContrary(order);
        return promise.then(function() {});
      }
    };
    $scope.updateIdentityCardFront = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCardFront(order);
        return promise.then(function() {});
      }
    };
    $scope.updateIdentityCard = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCard(order);
        return promise.then(function() {});
      }
    };
    $scope.updateConsigneeAddress = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateConsigneeAddress(order);
        return promise.then(function() {});
      }
    };
    $scope.updateConsigneeName = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateConsigneeName(order);
        return promise.then(function() {});
      }
    };
    $scope.getCityList = function(order) {
      var params, promise;
      params = {
        level: "2",
        parentId: order.province
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.cityList = data;
        });
      } else {
        order.city = 0;
        return $scope.cityList = [];
      }
    };
    $scope.getDistrictList = function(order) {
      var params, promise;
      params = {
        level: "3",
        parentId: order.city
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.districtList = data;
        });
      } else {
        order.district = 0;
        return $scope.districtList = [];
      }
    };
    $scope.saveAddress = function(order) {
      var promise;
      if (parseInt(order.province) > 0 && parseInt(order.city) > 0) {
        promise = WmsOrderService.updateAddress(order);
        return promise.then(function() {
          return $scope.order[order.id + 'address'] = false;
        });
      }
    };
    $scope.updatePhoneNumber = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updatePhoneNumber(order);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(order, fieldName, bool) {
      return ClickEditService.switchNode(order, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsPlatformSourceService.mapPlatformSource();
      promise.then(function(data) {
        return $scope.platformSourceMap = data;
      });
      promise = WmsAddressService.listAllProvince();
      return promise.then(function(data) {
        $scope.provinceList = data;
        $scope.getCityList($scope.order);
        return $scope.getDistrictList($scope.order);
      });
    };
    main = function() {
      var params, promise;
      if ($location.path().indexOf("split_order") > 0) {
        $scope.isSplitOrderPages = true;
      }
      if ($location.path().indexOf("order_goods_list") > 0) {
        $scope.isOrderGoodsListPages = true;
      }
      params = {
        id: $routeParams.orderId
      };
      promise = WmsOrderService.detail(params);
      return promise.then(function(data) {
        $scope.order = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsOrderGoodsListCtrl', function($scope, $routeParams, WmsOrderGoodsService, WmsOrderService, $i18next, CommonService, WmsSellerGoodsService) {
    var main, prepareConst;
    prepareConst = function() {
      var params, promise;
      params = {
        orderId: $scope.orderId
      };
      promise = WmsOrderGoodsService.listByOrderId(params);
      promise.then(function(data) {
        return $scope.orderGoodsList = data;
      });
      params = {
        sellerId: $scope.order.sellerId
      };
      promise = WmsSellerGoodsService.listBySellerId(params);
      promise.then(function(data) {
        $scope.sellerGoodsList = data;
        return $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, 'id');
      });
      promise = WmsSellerGoodsService.listEncodeType();
      return promise.then(function(data) {
        var encodeType, _i, _len, _results;
        $scope.encodeTypeList = data;
        $scope.encodeTypeMap = [];
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          encodeType = data[_i];
          _results.push($scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType." + encodeType));
        }
        return _results;
      });
    };
    main = function() {
      var params, promise;
      $scope.orderId = $routeParams.orderId;
      $scope.orderGoods = {
        orderId: $scope.orderId
      };
      params = {
        id: $scope.orderId
      };
      promise = WmsOrderService.detail(params);
      return promise.then(function(data) {
        $scope.order = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').filter('calTotalPrice', function() {
    return function(items) {
      var totalPrice;
      totalPrice = 0;
      angular.forEach(items, function(item) {
        if (item) {
          return totalPrice = parseFloat(totalPrice) + parseFloat(item.price) * parseFloat(item.goodsNumber);
        }
      });
      return totalPrice;
    };
  }).controller('WmsOrderGoodsWaitVerifyCtrl', function($scope, $filter, ModalService, $i18next, $location, $routeParams, CommonService, WmsOrderGoodsService, WmsOrderService, WmsSellerGoodsService, ClickEditService, WmsSellerService, WmsLogisticCompanyService, WmsSellerFreightGroupService) {
    var getNextVerifyOrder, getOrderGoods, main, prepareConst;
    $scope.search = function(searchKeywords) {
      return $scope.currentSelectSellerGoodsList = $filter('filter')($scope.selectSellerGoodsList, searchKeywords);
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(orderGoods, fieldName, bool) {
      return ClickEditService.switchNode(orderGoods, fieldName, bool);
    };
    $scope.checkSellerGoods = function(sellerGoodsId) {
      var promise;
      $scope.orderGoods = {};
      $scope.orderGoods = {
        orderId: $scope.order.id,
        sellerGoodsId: sellerGoodsId,
        goodsNumber: 1
      };
      promise = WmsOrderGoodsService.add($scope.orderGoods);
      return promise.then(function() {
        return getOrderGoods();
      });
    };
    $scope.removeOrderGoods = function(orderGoods) {
      var params, promise;
      params = {
        id: orderGoods.id
      };
      promise = WmsOrderGoodsService["delete"](params);
      return promise.then(function() {
        return getOrderGoods();
      });
    };
    $scope.updateOrderGoodsNumber = function(orderGoods, fieldName) {
      var promise;
      $scope.showVerifyOrderButton = false;
      promise = WmsOrderGoodsService.updateGoodsNumber(orderGoods);
      return promise.then(function() {
        return getOrderGoods();
      });
    };
    $scope.changeOrderGoodsNumber = function(item, value) {
      $scope.showVerifyOrderButton = false;
      item.goodsNumber = parseInt(item.goodsNumber) + value;
      if (item.goodsNumber <= 1) {
        item.goodsNumber = 1;
      }
      return $scope.updateOrderGoodsNumber(item, 'goodsNumber');
    };
    $scope.refreshOrder = function() {
      $scope.showVerifyOrderButton = true;
      return getOrderGoods();
    };
    $scope.changeCreatePick = function() {
      return $scope.isCreatePickOrder = !$scope.isCreatePickOrder;
    };
    getNextVerifyOrder = function() {
      var params, promise;
      params = {
        sellerId: $scope.order.sellerId
      };
      promise = WmsOrderService.getNextVerifyOrderBySellerId(params);
      return promise.then(function(data) {
        $scope.nextOrderId = data;
        if ($scope.nextOrderId) {
          return $location.path("/wms/order_goods_wait_verify").search("orderId", $scope.nextOrderId);
        } else {
          return $location.path("/wms/order_list_wait_verify");
        }
      });
    };
    $scope.verifyOrder = function() {
      var promise;
      promise = WmsOrderService.verifyOrder($scope.order);
      return promise.then(function() {
        var params;
        if ($scope.isCreatePickOrder) {
          params = {
            orderId: $scope.order.id
          };
          promise = WmsOrderGoodsService.listByOrderIdAndIsSplit(params);
          return promise.then(function(data) {
            var orderGoodsIds;
            $scope.orderGoodsListNoSplit = data;
            orderGoodsIds = [];
            angular.forEach($scope.orderGoodsListNoSplit, function(orderGoods) {
              return orderGoodsIds.unshift(orderGoods.id);
            });
            params = {
              orderId: $scope.order.id,
              orderGoodsIds: orderGoodsIds,
              logisticCompanyId: $scope.order.logisticCompanyId
            };
            promise = WmsOrderService.splitOrderNoConfirm(params);
            return promise.then(function() {
              return getNextVerifyOrder();
            });
          });
        } else {
          return $location.path("/wms/split_order").search("orderId", $scope.order.id);
        }
      });
    };
    $scope.showCombo = function(orderSellerGoods, bool) {
      return orderSellerGoods.isShowCombo = bool;
    };
    getOrderGoods = function() {
      var params, promise;
      params = {
        orderId: $scope.orderId
      };
      promise = WmsOrderGoodsService.listByOrderId(params);
      return promise.then(function(data) {
        var totalPrice;
        $scope.orderGoodsList = data;
        $scope.orderGoodsMapBySellerGoodsId = CommonService.convertListToMap($scope.orderGoodsList, 'sellerGoodsId');
        $scope.selectSellerGoodsList = [];
        angular.forEach($scope.sellerGoodsList, function(sellerGoods) {
          if (!$scope.orderGoodsMapBySellerGoodsId.hasOwnProperty(sellerGoods.id)) {
            return $scope.selectSellerGoodsList.push(sellerGoods);
          }
        });
        totalPrice = 0;
        angular.forEach($scope.orderGoodsList, function(orderGoods) {
          return totalPrice = parseFloat(totalPrice) + parseFloat(orderGoods.price) * parseFloat(orderGoods.goodsNumber);
        });
        $scope.orderPaidPriceDiff = parseFloat($scope.order.paidPrice) - parseFloat(totalPrice);
        return $scope.search($scope.searchKeywords);
      });
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsSellerGoodsService.listEncodeType();
      promise.then(function(data) {
        var encodeType, _i, _len, _results;
        $scope.encodeTypeList = data;
        $scope.encodeTypeMap = [];
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          encodeType = data[_i];
          _results.push($scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType." + encodeType));
        }
        return _results;
      });
      params = {
        sellerId: $scope.order.sellerId,
        platformSourceId: $scope.order.platformSourceId
      };
      promise = WmsSellerGoodsService.listBySellerId(params);
      promise.then(function(data) {
        $scope.sellerGoodsList = data;
        $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, 'id');
        return getOrderGoods();
      });
      params = {
        sellerId: $scope.order.sellerId
      };
      promise = WmsSellerGoodsService.listAllComboBySellerId(params);
      promise.then(function(data) {
        return $scope.allComboSellerGoodsMap = data;
      });
      params = {
        id: $scope.order.sellerId
      };
      promise = WmsSellerService.detail(params);
      return promise.then(function(data) {
        $scope.seller = data;
        promise = WmsLogisticCompanyService.mapAll();
        return promise.then(function(data) {
          $scope.logisticCompanyMap = data;
          params = {
            sellerId: $scope.order.sellerId
          };
          promise = WmsSellerFreightGroupService.mapBySellerId(params);
          return promise.then(function(data) {
            $scope.sellerFreightGroupMap = data;
            if ($scope.seller.hasOwnProperty('sellerFreightGroupId') && $scope.sellerFreightGroupMap.hasOwnProperty($scope.seller.sellerFreightGroupId)) {
              return $scope.order.logisticCompanyId = $scope.logisticCompanyMap[$scope.sellerFreightGroupMap[$scope.seller.sellerFreightGroupId].logisticCompanyId].id;
            }
          });
        });
      });
    };
    main = function() {
      var params, promise;
      $scope.orderId = $routeParams.orderId;
      $scope.orderGoods = {
        orderId: $scope.orderId
      };
      $scope.showVerifyOrderButton = false;
      $scope.orderTotalPriceDiff = 0;
      $scope.isCreatePickOrder = true;
      params = {
        id: $scope.orderId
      };
      promise = WmsOrderService.detail(params);
      return promise.then(function(data) {
        $scope.order = data;
        $scope.totalPrice = data.totalPrice;
        $scope.orderPaidPriceDiff = parseFloat($scope.order.paidPrice) - parseFloat($scope.order.totalPrice);
        if ($scope.order.status !== 0) {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.orderStatusNotWaitVerify"));
        } else {
          return prepareConst();
        }
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').filter('calArrayTrue', function() {
    return function(items) {
      var trueNumber;
      trueNumber = 0;
      angular.forEach(items, function(item) {
        if (item) {
          return trueNumber = parseInt(trueNumber) + 1;
        }
      });
      return trueNumber;
    };
  }).controller('WmsOrderListPartSplitCtrl', function($scope, $routeParams, $filter, CommonService, WmsOrderService, ClickEditService, WmsPlatformSourceService, SessionService, WmsSellerService, WmsLogisticCompanyService, WmsSellerFreightGroupService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      $scope.filteredItems = $filter('filter')($scope.filteredItems, {
        'status': $scope.searchOption.orderStatus
      });
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        keywords: "",
        orderStatus: ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.updateIdentityCardContrary = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCardContrary(order);
        return promise.then(function() {});
      }
    };
    $scope.updateIdentityCardFront = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCardFront(order);
        return promise.then(function() {});
      }
    };
    $scope.updateIdentityCard = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCard(order);
        return promise.then(function() {});
      }
    };
    $scope.updateConsigneeAddress = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateConsigneeAddress(order);
        return promise.then(function() {});
      }
    };
    $scope.updateConsigneeName = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateConsigneeName(order);
        return promise.then(function() {});
      }
    };
    $scope.updatePhoneNumber = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updatePhoneNumber(order);
        return promise.then(function() {});
      }
    };
    $scope.split = function() {
      var orderIds, params, promise;
      orderIds = [];
      angular.forEach($scope.verifyOrderIds, function(boolValue, orderId) {
        if (boolValue) {
          return orderIds.unshift(orderId);
        }
      });
      params = {
        sellerId: $scope.sellerId,
        orderIds: orderIds,
        logisticCompanyId: $scope.splitOrder.logisticCompanyId
      };
      promise = WmsOrderService.splitOrderIds(params);
      return promise.then(function(data) {
        return window.location.reload();
      });
    };
    $scope.checkAll = function(verifyOrderIds) {
      var boolValue;
      boolValue = $scope.verifyAllGoodsIds;
      angular.forEach($scope.currentPageItems, function(currentItem) {
        if (verifyOrderIds.hasOwnProperty(currentItem.id)) {
          return verifyOrderIds[currentItem.id] = boolValue;
        }
      });
      return $scope.calArrayTrue();
    };
    $scope.calArrayTrue = function() {
      var trueNumber;
      trueNumber = 0;
      angular.forEach($scope.currentPageItems, function(currentItem) {
        if ($scope.verifyOrderIds[currentItem.id]) {
          return trueNumber = parseInt(trueNumber) + 1;
        }
      });
      return $scope.chosenOrderIdLength = trueNumber;
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(order, fieldName, bool) {
      return ClickEditService.switchNode(order, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsPlatformSourceService.mapPlatformSource();
      promise.then(function(data) {
        return $scope.platformSourceMap = data;
      });
      promise = WmsOrderService.listAllOrderStatusEnum();
      promise.then(function(data) {
        return $scope.orderStatusEnumList = data;
      });
      params = {
        id: $scope.sellerId
      };
      promise = WmsSellerService.detail(params);
      return promise.then(function(data) {
        $scope.seller = data;
        promise = WmsLogisticCompanyService.mapAll();
        return promise.then(function(data) {
          $scope.logisticCompanyMap = data;
          params = {
            sellerId: $scope.sellerId
          };
          promise = WmsSellerFreightGroupService.mapBySellerId(params);
          return promise.then(function(data) {
            $scope.sellerFreightGroupMap = data;
            if ($scope.seller.hasOwnProperty('sellerFreightGroupId') && $scope.sellerFreightGroupMap.hasOwnProperty($scope.seller.sellerFreightGroupId)) {
              return $scope.splitOrder.logisticCompanyId = $scope.logisticCompanyMap[$scope.sellerFreightGroupMap[$scope.seller.sellerFreightGroupId].logisticCompanyId].id;
            }
          });
        });
      });
    };
    main = function() {
      var params, promise;
      $scope.verifyOrderIds = {};
      $scope.verifyAllGoodsIds = false;
      $scope.chosenOrderIdLength = 0;
      $scope.splitOrder = {};
      $scope.searchOption = {
        keywords: "",
        orderStatus: ""
      };
      $scope.sellerId = SessionService.getSellerId();
      params = {
        sellerId: SessionService.getSellerId()
      };
      promise = WmsOrderService.listBySellerIdAndPartSplit(params);
      return promise.then(function(data) {
        $scope.items = data;
        angular.forEach($scope.items, function(item) {
          return $scope.verifyOrderIds[item.id] = false;
        });
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsOrderListSuccessSplitCtrl', function($scope, $routeParams, $filter, CommonService, WmsOrderService, ClickEditService, WmsPlatformSourceService, SessionService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      $scope.filteredItems = $filter('filter')($scope.filteredItems, {
        'status': $scope.searchOption.orderStatus
      });
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        keywords: "",
        orderStatus: ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.updateIdentityCardContrary = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCardContrary(order);
        return promise.then(function() {});
      }
    };
    $scope.updateIdentityCardFront = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCardFront(order);
        return promise.then(function() {});
      }
    };
    $scope.updateIdentityCard = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCard(order);
        return promise.then(function() {});
      }
    };
    $scope.updateConsigneeAddress = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateConsigneeAddress(order);
        return promise.then(function() {});
      }
    };
    $scope.updateConsigneeName = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateConsigneeName(order);
        return promise.then(function() {});
      }
    };
    $scope.updatePhoneNumber = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updatePhoneNumber(order);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(order, fieldName, bool) {
      return ClickEditService.switchNode(order, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsPlatformSourceService.mapPlatformSource();
      promise.then(function(data) {
        return $scope.platformSourceMap = data;
      });
      promise = WmsOrderService.listAllOrderStatusEnum();
      return promise.then(function(data) {
        return $scope.orderStatusEnumList = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.searchOption = {
        keywords: "",
        orderStatus: ""
      };
      params = {
        sellerId: SessionService.getSellerId()
      };
      promise = WmsOrderService.listBySellerIdAndSuccessSplit(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').filter('calArrayTrue', function() {
    return function(items) {
      var trueNumber;
      trueNumber = 0;
      angular.forEach(items, function(item) {
        if (item) {
          return trueNumber = parseInt(trueNumber) + 1;
        }
      });
      return trueNumber;
    };
  }).controller('WmsOrderListSuccessVerifyCtrl', function($scope, $routeParams, $filter, CommonService, WmsOrderService, ClickEditService, WmsPlatformSourceService, SessionService, WmsSellerService, WmsLogisticCompanyService, WmsSellerFreightGroupService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      $scope.filteredItems = $filter('filter')($scope.filteredItems, {
        'status': $scope.searchOption.orderStatus
      });
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        keywords: "",
        orderStatus: ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.updateIdentityCardContrary = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCardContrary(order);
        return promise.then(function() {});
      }
    };
    $scope.updateIdentityCardFront = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCardFront(order);
        return promise.then(function() {});
      }
    };
    $scope.updateIdentityCard = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCard(order);
        return promise.then(function() {});
      }
    };
    $scope.updateConsigneeAddress = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateConsigneeAddress(order);
        return promise.then(function() {});
      }
    };
    $scope.updateConsigneeName = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateConsigneeName(order);
        return promise.then(function() {});
      }
    };
    $scope.updatePhoneNumber = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updatePhoneNumber(order);
        return promise.then(function() {});
      }
    };
    $scope.split = function() {
      var orderIds, params, promise;
      orderIds = [];
      angular.forEach($scope.verifyOrderIds, function(boolValue, orderId) {
        if (boolValue) {
          return orderIds.unshift(orderId);
        }
      });
      params = {
        sellerId: $scope.sellerId,
        orderIds: orderIds,
        logisticCompanyId: $scope.splitOrder.logisticCompanyId
      };
      promise = WmsOrderService.splitOrderIds(params);
      return promise.then(function(data) {
        return window.location.reload();
      });
    };
    $scope.checkAll = function(verifyOrderIds) {
      var boolValue;
      boolValue = $scope.verifyAllGoodsIds;
      angular.forEach($scope.currentPageItems, function(currentItem) {
        if (verifyOrderIds.hasOwnProperty(currentItem.id)) {
          return verifyOrderIds[currentItem.id] = boolValue;
        }
      });
      return $scope.calArrayTrue();
    };
    $scope.calArrayTrue = function() {
      var trueNumber;
      trueNumber = 0;
      angular.forEach($scope.currentPageItems, function(currentItem) {
        if ($scope.verifyOrderIds[currentItem.id]) {
          return trueNumber = parseInt(trueNumber) + 1;
        }
      });
      return $scope.chosenOrderIdLength = trueNumber;
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(order, fieldName, bool) {
      return ClickEditService.switchNode(order, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsPlatformSourceService.mapPlatformSource();
      promise.then(function(data) {
        return $scope.platformSourceMap = data;
      });
      promise = WmsOrderService.listAllOrderStatusEnum();
      promise.then(function(data) {
        return $scope.orderStatusEnumList = data;
      });
      params = {
        id: $scope.sellerId
      };
      promise = WmsSellerService.detail(params);
      return promise.then(function(data) {
        $scope.seller = data;
        promise = WmsLogisticCompanyService.mapAll();
        return promise.then(function(data) {
          $scope.logisticCompanyMap = data;
          params = {
            sellerId: $scope.sellerId
          };
          promise = WmsSellerFreightGroupService.mapBySellerId(params);
          return promise.then(function(data) {
            $scope.sellerFreightGroupMap = data;
            if ($scope.seller.hasOwnProperty('sellerFreightGroupId') && $scope.sellerFreightGroupMap.hasOwnProperty($scope.seller.sellerFreightGroupId)) {
              return $scope.splitOrder.logisticCompanyId = $scope.logisticCompanyMap[$scope.sellerFreightGroupMap[$scope.seller.sellerFreightGroupId].logisticCompanyId].id;
            }
          });
        });
      });
    };
    main = function() {
      var params, promise;
      $scope.verifyOrderIds = {};
      $scope.verifyAllGoodsIds = false;
      $scope.chosenOrderIdLength = 0;
      $scope.searchOption = {
        keywords: "",
        orderStatus: ""
      };
      $scope.splitOrder = {};
      $scope.sellerId = SessionService.getSellerId();
      params = {
        sellerId: SessionService.getSellerId()
      };
      promise = WmsOrderService.listBySellerIdAndSuccessVerify(params);
      return promise.then(function(data) {
        $scope.items = data;
        angular.forEach($scope.items, function(item) {
          return $scope.verifyOrderIds[item.id] = false;
        });
        console.log();
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsOrderListWaitVerifyCtrl', function($scope, $routeParams, $filter, CommonService, WmsOrderService, ClickEditService, WmsPlatformSourceService, SessionService, $i18next, WmsAddressService, WmsSellerPlatformSourceService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.orderSort = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        keywords: "",
        orderStatus: ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.updateIdentityCardContrary = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCardContrary(order);
        return promise.then(function() {});
      }
    };
    $scope.updateIdentityCardFront = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCardFront(order);
        return promise.then(function() {});
      }
    };
    $scope.updateIdentityCard = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateIdentityCard(order);
        return promise.then(function() {});
      }
    };
    $scope.updateConsigneeAddress = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateConsigneeAddress(order);
        return promise.then(function() {});
      }
    };
    $scope.updateConsigneeName = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updateConsigneeName(order);
        return promise.then(function() {});
      }
    };
    $scope.updatePhoneNumber = function(order, fieldName) {
      var promise;
      if (ClickEditService.updateNode(order, fieldName)) {
        promise = WmsOrderService.updatePhoneNumber(order);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(order, fieldName, bool) {
      return ClickEditService.switchNode(order, fieldName, bool);
    };
    $scope.add = function(order) {
      var promise;
      promise = WmsOrderService.add(order);
      return promise.then(function(data) {
        order.id = data;
        order.status = 0;
        $scope.items.unshift(order);
        $scope.createOrder = {};
        return initSearch();
      });
    };
    $scope.searchPlatformSource = function(platformSource) {
      if (platformSource === 'all') {
        $scope.items = $scope.originalItems;
        return $scope.displayPlatformSource.name = $i18next('global:ui.button.all');
      } else {
        $scope.items = $filter('filter')($scope.originalItems, {
          'platformSourceId': platformSource.id
        });
        $scope.search();
        $scope.select($scope.currentPage);
        return $scope.displayPlatformSource.name = platformSource.name;
      }
    };
    $scope.getCityList = function(order) {
      var params, promise;
      params = {
        level: "2",
        parentId: order.province
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.cityList = data;
        });
      } else {
        order.city = 0;
        return $scope.cityList = [];
      }
    };
    $scope.getDistrictList = function(order) {
      var params, promise;
      params = {
        level: "3",
        parentId: order.city
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.districtList = data;
        });
      } else {
        order.district = 0;
        return $scope.districtList = [];
      }
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsPlatformSourceService.mapPlatformSource();
      promise.then(function(data) {
        return $scope.platformSourceMap = data;
      });
      params = {
        sellerId: SessionService.getSellerId()
      };
      promise = WmsSellerPlatformSourceService.listBySellerId(params);
      promise.then(function(data) {
        $scope.sellerPlatformSourceList = data;
        return $scope.order.platformSourceId = $scope.sellerPlatformSourceList[0].platformSourceId;
      });
      promise = WmsOrderService.listAllOrderStatusEnum();
      promise.then(function(data) {
        return $scope.orderStatusEnumList = data;
      });
      promise = WmsAddressService.listAllProvince();
      return promise.then(function(data) {
        return $scope.provinceList = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.searchOption = {
        keywords: "",
        orderStatus: ""
      };
      $scope.createOrder = {};
      $scope.order = {};
      $scope.displayPlatformSource = {};
      params = {
        sellerId: SessionService.getSellerId()
      };
      promise = WmsOrderService.listBySellerIdAndWaitVerify(params);
      return promise.then(function(data) {
        $scope.items = data;
        $scope.originalItems = data;
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPackGoodsCtrl', function($scope, $location, $i18next, $routeParams, ModalService, $interval, ToastService, DeviceDriverService, CommonService, SessionService, WmsConfigService, WmsSellerService, WmsPickOrderService, WmsPackOrderGoodsService, WmsSellerGoodsService, WmsPickOrderGoodsService) {
    var checkScanComplete, getPackOrderGoodsList, main, prepareConst;
    checkScanComplete = function() {
      var isSuccess;
      isSuccess = true;
      $scope.goodsNumberList = [];
      $scope.goodsScannedNumberList = [];
      angular.forEach($scope.packOrderGoodsMap, function(packOrderGoodsMap, pickOrderGoodsId) {
        $scope.goodsNumberList[pickOrderGoodsId] = 0;
        $scope.goodsScannedNumberList[pickOrderGoodsId] = 0;
        return angular.forEach(packOrderGoodsMap, function(packOrderGoods) {
          if (parseInt(packOrderGoods.goodsNumber) !== parseInt(packOrderGoods.scannedNumber)) {
            isSuccess = false;
          }
          $scope.goodsNumberList[pickOrderGoodsId] += parseInt(packOrderGoods.goodsNumber);
          return $scope.goodsScannedNumberList[pickOrderGoodsId] += parseInt(packOrderGoods.scannedNumber);
        });
      });
      $scope.scanComplete = isSuccess;
      if ($scope.scanComplete) {
        return $scope.packComplete();
      }
    };
    $scope.$on("$destroy", function() {
      return $interval.cancel($scope.timer);
    });
    $scope.updateGoodsEncode = function() {
      var goodsEncode, params, promise;
      $scope.scanGoods = {};
      $scope.weightSuccess = false;
      if ($scope.goodsEncode === '') {
        if ($scope.scanComplete) {
          $scope.packComplete();
        } else {
          ModalService.showMessageOnError($i18next("wms:message.validationError.goodsBarCodeNotNull"));
        }
      } else {
        goodsEncode = $scope.goodsEncode;
        params = {
          goodsEncode: goodsEncode,
          packOrderId: $scope.pickOrder.packOrderId
        };
        promise = WmsSellerGoodsService.detailByGoodsEncodeAndPackOrderId(params);
        promise.then(function(data) {
          var error, interruptCount, notify, success;
          $scope.scanGoods = data;
          if ($scope.seller.isWeightSet) {
            $scope.weightSuccess = false;
            interruptCount = 0;
            $scope.timer = $interval((function() {
              promise = DeviceDriverService.getWeight();
              return promise.then(function(scaleWeight) {
                return $scope.scaleWeight = scaleWeight;
              });
            }), 500);
            success = function() {
              if (!$scope.weightSuccess) {
                ToastService.showMessageOnInfo($i18next('wms:ui.tips.reScanGoodsAndWeight'));
                return $scope.scanGoods = {};
              }
            };
            error = function() {
              return console.log('error');
            };
            notify = function() {
              var weightDiff;
              weightDiff = Math.abs($scope.scaleWeight - $scope.totalWeight - $scope.scanGoods.weight);
              interruptCount++;
              if (!$scope.weightSuccess && parseInt(weightDiff) < 10) {
                $interval.cancel($scope.timer);
                params = {
                  goodsEncode: goodsEncode,
                  sellerGoodsId: $scope.scanGoods.id,
                  packOrderId: $scope.pickOrder.packOrderId,
                  totalWeight: $scope.scaleWeight
                };
                promise = WmsPackOrderGoodsService.packStatusUpdateScanGoodsNumber(params);
                return promise.then(function(data) {
                  if (data.hasOwnProperty('errorCode')) {
                    return ModalService.showMessageOnError($i18next('wms:message.apiError.' + data.errorCode));
                  } else {
                    $scope.packOrderGoodsMap = data;
                    checkScanComplete();
                    $scope.totalWeight = $scope.scaleWeight;
                    $scope.scaleWeight = 0;
                    $scope.weightSuccess = true;
                    $scope.scanGoods = {};
                    ToastService.showMessageOnSuccess($i18next('wms:ui.label.weightSuccess'));
                    return getPackOrderGoodsList();
                  }
                });
              } else {
                $scope.weightSuccess = false;
                ToastService.showMessageOnWeightError($i18next('wms:message.apiError.goods weight error greater than allow error'));
                if (interruptCount >= 25) {
                  ToastService.showMessageOnError($i18next('wms:ui.tips.reScanGoodsAndWeight'));
                  return $interval.cancel($scope.timer);
                }
              }
            };
            return $scope.timer.then(success, error, notify);
          } else {
            params = {
              goodsEncode: goodsEncode,
              sellerGoodsId: $scope.scanGoods.id,
              packOrderId: $scope.pickOrder.packOrderId,
              totalWeight: $scope.totalWeight
            };
            promise = WmsPackOrderGoodsService.packStatusUpdateScanGoodsNumber(params);
            return promise.then(function(data) {
              if (data.hasOwnProperty('errorCode')) {
                return ModalService.showMessageOnError($i18next('wms:message.apiError.' + data.errorCode));
              } else {
                $scope.packOrderGoodsMap = data;
                checkScanComplete();
                return getPackOrderGoodsList();
              }
            });
          }
        });
      }
      return $scope.goodsEncode = '';
    };
    $scope.packComplete = function() {
      var params, promise;
      params = {
        id: $routeParams.id,
        totalWeight: $scope.scaleWeight
      };
      promise = WmsPickOrderService.packScanComplete(params);
      return promise.then(function() {
        return $location.path("/wms/pick_order_container").search("id", $routeParams.id);
      });
    };
    $scope.packScanReject = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsPickOrderService.packScanReject(params);
      return promise.then(function() {
        return $location.path("/wms/express_order_pack");
      });
    };
    $scope.getImagesByCode = function(code) {
      if (code) {
        return JsBarcode("#barcode" + code, code, {
          height: 60,
          barWidth: 1,
          fontSize: 12,
          margin: 10,
          textMargin: 0
        });
      }
    };
    getPackOrderGoodsList = function() {
      var params, promise;
      params = {
        packOrderId: $scope.pickOrder.packOrderId
      };
      promise = WmsPackOrderGoodsService.mapGoodsIdListByPackOrderId(params);
      return promise.then(function(data) {
        return $scope.packOrderGoodsMap = data;
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.pickOrder.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(data) {
        return $scope.seller = data;
      });
      params = {
        sellerId: $scope.pickOrder.sellerId
      };
      promise = WmsSellerGoodsService.listBySellerId(params);
      promise.then(function(data) {
        $scope.sellerGoodsList = data;
        return $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, "id");
      });
      params = {
        pickOrderId: $scope.pickOrder.id
      };
      promise = WmsPickOrderGoodsService.listByPickOrderId(params);
      promise.then(function(data) {
        $scope.pickOrderGoodsList = data;
        return $scope.pickOrderGoodsMap = CommonService.convertListToMap($scope.pickOrderGoodsList, "id");
      });
      params = {
        sellerId: $scope.pickOrder.sellerId
      };
      promise = WmsSellerGoodsService.listAllComboBySellerId(params);
      promise.then(function(data) {
        $scope.allComboSellerGoodsMap = data;
        $scope.comboSellerGoodsMap = [];
        return angular.forEach($scope.allComboSellerGoodsMap, function(sellerGoodsList, comboId) {
          $scope.comboSellerGoodsMap[comboId] = {};
          return $scope.comboSellerGoodsMap[comboId] = CommonService.convertListToMap(sellerGoodsList, 'id');
        });
      });
      return getPackOrderGoodsList();
    };
    main = function() {
      var params, promise;
      angular.element('#goodsEncode').focus();
      $scope.goodsEncode = '';
      $scope.scanComplete = false;
      $scope.showBarcode = SessionService.getTester();
      $scope.totalWeight = 0;
      $scope.scaleWeight = 0;
      if ($routeParams.showBarcode === '1') {
        $scope.showBarcode = true;
        SessionService.setTester(true);
      }
      $scope.imgHost = WmsConfigService.getImgHost();
      params = {
        id: $routeParams.id
      };
      promise = WmsPickOrderService.detail(params);
      return promise.then(function(data) {
        $scope.pickOrder = data;
        if ($scope.pickOrder.totalWeight) {
          $scope.totalWeight = parseInt($scope.pickOrder.totalWeight);
        }
        if (parseInt($scope.pickOrder.status) === 2) {
          return prepareConst();
        } else if (parseInt($scope.pickOrder.status) === 1) {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderNotPick"));
        } else if (parseInt($scope.pickOrder.status) === 3) {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderAlreadyPack"));
        }
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPickGoodsCtrl', function($scope, $routeParams, $i18next, $timeout, $location, SessionService, ModalService, CommonService, WmsPickOrderService, WmsPickOrderGoodsService, WmsPackOrderGoodsService, WmsSellerGoodsService, WmsConfigService, WmsLogisticOrderService) {
    var checkScanComplete, main, prepareConst;
    checkScanComplete = function() {
      var isSuccess;
      isSuccess = true;
      $scope.goodsNumberList = [];
      $scope.goodsScannedNumberList = [];
      angular.forEach($scope.packOrderGoodsMap, function(packOrderGoodsMap, pickOrderGoodsId) {
        $scope.goodsNumberList[pickOrderGoodsId] = 0;
        $scope.goodsScannedNumberList[pickOrderGoodsId] = 0;
        return angular.forEach(packOrderGoodsMap, function(packOrderGoods) {
          if (parseInt(packOrderGoods.goodsNumber) !== parseInt(packOrderGoods.scannedNumber)) {
            isSuccess = false;
          }
          $scope.goodsNumberList[pickOrderGoodsId] += parseInt(packOrderGoods.goodsNumber);
          return $scope.goodsScannedNumberList[pickOrderGoodsId] += parseInt(packOrderGoods.scannedNumber);
        });
      });
      $scope.scanComplete = isSuccess;
      if ($scope.scanComplete) {
        return $scope.pickComplete();
      }
    };
    $scope.pickComplete = function() {
      return $timeout((function() {
        var params, promise;
        params = {
          pickOrderId: $scope.pickOrder.id
        };
        promise = WmsPickOrderService.pickComplete(params);
        promise.then(function() {
          return $location.path("/wms/logistic_order_pick_search");
        });
      }), 500);
    };
    $scope.updateGoodsBarCode = function() {
      var params, pickOrderGoodsId, promise;
      if (!$scope.scanSellerGoodsId || $scope.goodsBarCode === '') {
        ModalService.showMessageOnError($i18next("wms:message.validationError.goodsBarCodeNotNull"));
      } else {
        params = {
          packOrderId: $scope.pickOrder.packOrderId,
          goodsEncode: $scope.goodsBarCode,
          pickOrderGoodsId: $scope.pickOrderGoodsMap[$scope.scanSellerGoodsId].id
        };
        pickOrderGoodsId = $scope.pickOrderGoodsMap[$scope.scanSellerGoodsId].id;
        $scope.goodsBarCode = '';
        promise = WmsPackOrderGoodsService.pickStatusUpdateScanGoodsNumber(params);
        promise.then(function(data) {
          $scope.packOrderGoodsMap = data;
          checkScanComplete();
          if ($scope.nextScanGoodsId && parseInt($scope.goodsNumberList[pickOrderGoodsId]) === parseInt($scope.goodsScannedNumberList[pickOrderGoodsId])) {
            return $timeout((function() {
              $location.path("/wms/pick_goods").search("pickOrderId", $scope.pickOrder.id).search("sellerGoodsId", $scope.nextScanGoodsId);
            }), 500);
          }
        });
      }
      return $scope.goodsBarCode = '';
    };
    $scope.pickReject = function() {
      var params, promise;
      params = {
        pickOrderId: $scope.pickOrder.id
      };
      promise = WmsPickOrderService.pickReject(params);
      return promise.then(function() {
        $location.path("/wms/pick_goods").search("pickOrderId", $scope.pickOrder.id);
        return window.location.reload();
      });
    };
    $scope.getImagesByCode = function(code) {
      if (!$scope.imagesByCode[code]) {
        $scope.imagesByCode[code] = true;
        return JsBarcode("#barcode" + code, code, {
          height: 60,
          barWidth: 1,
          fontSize: 12,
          margin: 10,
          textMargin: 0
        });
      }
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.pickOrder.logisticOrderId
      };
      promise = WmsLogisticOrderService.detail(params);
      promise.then(function(data) {
        return $scope.logisticOrder = data;
      });
      params = {
        sellerId: $scope.pickOrder.sellerId
      };
      promise = WmsSellerGoodsService.listBySellerId(params);
      promise.then(function(data) {
        $scope.sellerGoodsList = data;
        return $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, "id");
      });
      params = {
        pickOrderId: $scope.pickOrderId
      };
      promise = WmsPickOrderGoodsService.listByPickOrderId(params);
      promise.then(function(data) {
        $scope.items = data;
        $scope.pickOrderGoodsList = data;
        angular.forEach($scope.pickOrderGoodsList, function(item, k) {
          if (!$scope.scanSellerGoodsId) {
            $scope.scanSellerGoodsId = item.sellerGoodsId;
          }
          if ((parseInt($scope.scanSellerGoodsId) === parseInt(item.sellerGoodsId)) && $scope.items[parseInt(k) + 1]) {
            return $scope.nextScanGoodsId = $scope.items[parseInt(k) + 1].sellerGoodsId;
          }
        });
        $scope.pickOrderGoodsMap = CommonService.convertListToMap($scope.pickOrderGoodsList, "sellerGoodsId");
        $scope.pickOrderGoodsMapById = CommonService.convertListToMap($scope.pickOrderGoodsList, "id");
        params = {
          packOrderId: $scope.pickOrder.packOrderId
        };
        promise = WmsPackOrderGoodsService.mapGoodsIdListByPackOrderId(params);
        return promise.then(function(data) {
          $scope.packOrderGoodsMap = data;
          return checkScanComplete();
        });
      });
      params = {
        sellerId: $scope.pickOrder.sellerId
      };
      promise = WmsSellerGoodsService.listAllComboBySellerId(params);
      return promise.then(function(data) {
        return $scope.allComboSellerGoodsMap = data;
      });
    };
    main = function() {
      var params, promise;
      angular.element('#scanBarCodeInput').focus();
      if ($routeParams.sellerGoodsId) {
        $scope.scanSellerGoodsId = $routeParams.sellerGoodsId;
      }
      $scope.scanComplete = false;
      $scope.packOrderGoodsMap = {};
      $scope.pickOrderId = $routeParams.pickOrderId;
      $scope.nextScanGoodsId = 0;
      $scope.showBarcode = SessionService.getTester();
      if ($routeParams.showBarcode === '1') {
        $scope.showBarcode = true;
        SessionService.setTester(true);
      }
      $scope.imgHost = WmsConfigService.getImgHost();
      $scope.imagesByCode = [];
      params = {
        id: $scope.pickOrderId
      };
      promise = WmsPickOrderService.detail(params);
      return promise.then(function(data) {
        $scope.pickOrder = data;
        if ($scope.pickOrder.status === 1) {
          return prepareConst();
        } else {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderNotPickStatus"));
        }
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPickOrderContainerCtrl', function($scope, $location, $i18next, $routeParams, ModalService, $timeout, CommonService, WmsSellerGoodsService, $interval, WmsPackOrderGoodsService, WmsSellerAvailableContainerService, DeviceDriverService, ToastService, WmsPickOrderService, WmsPickOrderGoodsService, WmsSellerService) {
    var main, prepareConst;
    $scope.$on("$destroy", function() {
      return $interval.cancel($scope.timer);
    });
    $scope.updateContainerByBarCode = function() {
      var params, promise;
      if ($scope.containerBarCode) {
        params = {
          sellerId: $scope.pickOrder.sellerId,
          barCode: $scope.containerBarCode
        };
        promise = WmsSellerAvailableContainerService.detailBySellerIdAndBarCode(params);
        promise.then(function(container) {
          var error, notify, success;
          $scope.container = container;
          $scope.weightSuccess = false;
          $scope.timer = $interval((function() {
            promise = DeviceDriverService.getWeight();
            return promise.then(function(scaleWeight) {
              return $scope.scaleWeight = scaleWeight;
            });
          }), 500);
          success = function() {
            if (!$scope.weightSuccess) {
              ToastService.showMessageOnInfo($i18next('wms:ui.tips.reScanGoodsAndWeight'));
            }
          };
          error = function() {
            console.log('error');
          };
          notify = function() {
            var containerWeight, weightDiff;
            if ($scope.seller.isWeightSet) {
              containerWeight = parseFloat($scope.scaleWeight) - parseFloat($scope.pickOrder.totalWeight) - parseFloat($scope.container.weight);
              weightDiff = Math.abs(containerWeight);
              if (!$scope.weightSuccess && parseInt($scope.scaleWeight) > 0 && parseInt(weightDiff) < 10) {
                $interval.cancel($scope.timer);
              }
            }
            params = {
              id: $routeParams.id,
              containerId: $scope.container.id,
              totalWeight: $scope.scaleWeight
            };
            if (params.totalWeight > 0) {
              $interval.cancel($scope.timer);
              promise = WmsPickOrderService.updateContainerId(params);
              return promise.then(function(data) {
                $scope.weightSuccess = true;
                $scope.pickOrder.containerId = $scope.container.id;
                ToastService.showMessageOnSuccess($i18next('wms:ui.label.weightSuccess'));
                return $location.path("/wms/express_order_pack");
              });
            } else {
              return ToastService.showMessageOnError($i18next('wms:message.apiError.goods weight must be bigger than 0'));
            }
          };
          return $scope.timer.then(success, error, notify);
        });
      } else {
        ModalService.showMessageOnError($i18next("wms:message.apiError.container not exists"));
      }
      return $scope.containerBarCode = '';
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.pickOrder.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(data) {
        return $scope.seller = data;
      });
      params = {
        sellerId: $scope.pickOrder.sellerId
      };
      promise = WmsSellerGoodsService.listBySellerId(params);
      promise.then(function(data) {
        $scope.sellerGoodsList = data;
        return $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, "id");
      });
      params = {
        packOrderId: $scope.pickOrder.packOrderId
      };
      promise = WmsPackOrderGoodsService.listByPackOrderId(params);
      promise.then(function(data) {
        return $scope.packOrderGoodsList = data;
      });
      params = {
        pickOrderId: $scope.pickOrder.id
      };
      promise = WmsPickOrderGoodsService.listByPickOrderId(params);
      promise.then(function(data) {
        $scope.pickOrderGoodsList = data;
        return $scope.pickOrderGoodsMap = CommonService.convertListToMap($scope.pickOrderGoodsList, "id");
      });
      params = {
        packOrderId: $scope.pickOrder.packOrderId
      };
      promise = WmsPackOrderGoodsService.mapGoodsIdListByPackOrderId(params);
      return promise.then(function(data) {
        return $scope.packOrderGoodsMap = data;
      });
    };
    main = function() {
      var params, promise;
      angular.element('#containerBarCode').focus();
      $scope.containerBarCode = '';
      $scope.scaleWeight = 0;
      params = {
        id: $routeParams.id
      };
      promise = WmsPickOrderService.detail(params);
      return promise.then(function(data) {
        $scope.pickOrder = data;
        if (parseInt($scope.pickOrder.status) === 3) {
          return prepareConst();
        } else if (parseInt($scope.pickOrder.status) === 1) {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderNotPick"));
        } else if (parseInt($scope.pickOrder.status) === 2) {
          return ModalService.showMessageOnError($i18next("wms:message.validationError.logisticOrderNotPack"));
        }
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPickOrderListCtrl', function($scope, $routeParams, $filter, CommonService, WmsLogisticOrderService, WmsLogisticCompanyService, WmsSellerFreightGroupService, WmsAddressService, DeviceDriverService, WmsPickOrderService, ClickEditService) {
    var initSearch, main, prepareConst, printExpressOrder;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      $scope.filteredItems = $filter('filter')($scope.filteredItems, {
        'status': $scope.searchOption.status
      });
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": "",
        "status": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsLogisticOrderService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.updateLogisticCharge = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticCharge(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateTotalWeight = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateTotalWeight(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateContainerId = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateContainerId(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateComment = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateComment(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateLogisticSn = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticSn(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.updateLogisticCompanyId = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.printOrder = function(id) {
      var params, promise;
      params = {
        pickOrderIds: [id]
      };
      promise = WmsPickOrderService.getExpressOrderList(params);
      return promise.then(function(orders) {
        var expressOrders;
        expressOrders = {
          params: orders
        };
        promise = DeviceDriverService.printExpressOrder(expressOrders);
        return promise.then(function() {});
      });
    };
    $scope.setExpressSn = function(pickOrder) {
      var params, promise;
      pickOrder.isSetting = true;
      params = {
        logisticOrderId: pickOrder.logisticOrderId
      };
      promise = WmsLogisticOrderService.setExpressSn(params);
      return promise.then(function(data) {
        pickOrder.isSetting = false;
        if (!data.hasOwnProperty('success')) {
          return pickOrder.expressSn = data;
        }
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(logisticOrder, fieldName, bool) {
      var params, promise;
      ClickEditService.switchNode(logisticOrder, fieldName, bool);
      if (fieldName === 'logisticCompanyId' && !$scope.sellerFreightGroupMap.hasOwnProperty(logisticOrder.sellerId)) {
        params = {
          sellerId: logisticOrder.sellerId
        };
        promise = WmsSellerFreightGroupService.listBySellerId(params);
        return promise.then(function(data) {
          return $scope.sellerFreightGroupMap[logisticOrder.sellerId] = data;
        });
      }
    };
    $scope.viewLogisticStatus = function(status) {
      if (status === 'all') {
        $scope.searchOption.status = '';
      } else {
        $scope.searchOption.status = status;
      }
      $scope.search();
      $scope.select($scope.currentPage);
      return $scope.displayLogisticStatus = status;
    };
    $scope.checkAll = function() {
      var boolValue;
      boolValue = $scope.verifyAllGoodsIds;
      angular.forEach($scope.currentPageItems, function(item) {
        if (item.printable && item.expressSn) {
          return $scope.verifyOrderIds[item.id] = boolValue;
        }
      });
      return $scope.calArrayTrue();
    };
    $scope.calArrayTrue = function() {
      return $scope.chosenOrderIdLength = CommonService.calArrayTrue($scope.currentPageItems, $scope.verifyOrderIds, 'id');
    };
    $scope.printCheck = function() {
      var params, pickOrderIds;
      pickOrderIds = [];
      angular.forEach($scope.currentPageItems, function(item) {
        if ($scope.verifyOrderIds[item.id]) {
          return pickOrderIds.push(item.id);
        }
      });
      params = {
        pickOrderIds: pickOrderIds
      };
      return printExpressOrder(params);
    };
    $scope.printOrder = function(id) {
      var params;
      params = {
        pickOrderIds: [id]
      };
      return printExpressOrder(params);
    };
    printExpressOrder = function(params) {
      var promise;
      promise = WmsPickOrderService.getExpressOrderList(params);
      return promise.then(function(orders) {
        var expressOrders;
        expressOrders = {
          params: orders
        };
        promise = DeviceDriverService.printExpressOrder(expressOrders);
        return promise.then(function() {});
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticCompanyService.mapAll();
      promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
      promise = WmsAddressService.mapAll();
      promise.then(function(data) {
        return $scope.addressMap = data;
      });
      promise = WmsLogisticOrderService.listAllStatusEnum();
      return promise.then(function(data) {
        return $scope.logisticOrderStatusEnumList = data;
      });
    };
    main = function() {
      var promise;
      $scope.createLogisticOrder = {};
      $scope.logisticOrder = {};
      $scope.searchOption = {
        "keywords": "",
        "status": ""
      };
      $scope.sellerFreightGroupMap = {};
      $scope.displayLogisticStatus = 'all';
      $scope.verifyOrderIds = [];
      $scope.chosenOrderIdLength = 0;
      promise = WmsPickOrderService.listAllJoinLogisticOrder();
      promise.then(function(data) {
        $scope.items = data;
        $scope.originalItems = data;
        angular.forEach($scope.items, function(item) {
          if (item.printable && item.expressSn) {
            return $scope.verifyOrderIds[item.id] = false;
          }
        });
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPickOrderWaitDeliveryListCtrl', function($scope, $routeParams, $filter, CommonService, WmsLogisticOrderService, ClickEditService, WmsPickOrderService, WmsLogisticCompanyService, DeviceDriverService, $location) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      if ($scope.filteredItems) {
        return $scope.onFilterChange();
      }
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        keywords: ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 100, 200];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsLogisticOrderService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(logisticOrder, fieldName, bool) {
      return ClickEditService.switchNode(logisticOrder, fieldName, bool);
    };
    $scope.printOrder = function(id) {
      var params, promise;
      params = {
        pickOrderIds: [id]
      };
      promise = WmsPickOrderService.getExpressOrderList(params);
      return promise.then(function(orders) {
        var expressOrders;
        expressOrders = {
          params: orders
        };
        promise = DeviceDriverService.printExpressOrder(expressOrders);
        return promise.then(function() {});
      });
    };
    $scope.weighAgain = function(pickOrder) {
      if (!pickOrder.totalWeight) {
        return $location.path("/wms/pick_order_container").search("id", pickOrder.id);
      }
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticOrderService.listAllStatusEnum();
      promise.then(function(data) {
        return $scope.logisticOrderStatusEnumList = data;
      });
      promise = WmsLogisticCompanyService.mapAll();
      return promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.createLogisticOrder = {};
      $scope.logisticOrder = {};
      $scope.verifyOrderIds = [];
      $scope.chosenOrderIdLength = 0;
      promise = WmsPickOrderService.waitDeliveryList();
      return promise.then(function(data) {
        $scope.items = data;
        angular.forEach($scope.items, function(item) {
          return $scope.verifyOrderIds[item.id] = false;
        });
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPickOrderWaitPackListCtrl', function($scope, $routeParams, $filter, CommonService, WmsLogisticOrderService, ClickEditService, WmsMemberService, SessionService, WmsPickOrderService, WmsLogisticCompanyService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      if ($scope.filteredItems) {
        return $scope.onFilterChange();
      }
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        keywords: ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsLogisticOrderService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.restart = function(id) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsPickOrderService.packScanReject(params);
      return promise.then(function() {
        $scope.items = CommonService.dropListByData($scope.items, 'id', id);
        return initSearch();
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(logisticOrder, fieldName, bool) {
      return ClickEditService.switchNode(logisticOrder, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticOrderService.listAllStatusEnum();
      promise.then(function(data) {
        return $scope.logisticOrderStatusEnumList = data;
      });
      promise = WmsLogisticCompanyService.mapAll();
      return promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.createLogisticOrder = {};
      $scope.logisticOrder = {};
      $scope.pickerName = SessionService.getUsername();
      $scope.LogisticOrderList = [];
      promise = WmsPickOrderService.waitPackNoScanList();
      return promise.then(function(data) {
        $scope.items = data;
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPickOrderWaitPickListCtrl', function($scope, $routeParams, $filter, CommonService, WmsLogisticOrderService, ClickEditService, WmsPickOrderService, WmsLogisticCompanyService, DeviceDriverService) {
    var initSearch, main, prepareConst, printExpressOrder;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      if ($scope.filteredItems) {
        return $scope.onFilterChange();
      }
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        keywords: ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsLogisticOrderService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(logisticOrder, fieldName, bool) {
      return ClickEditService.switchNode(logisticOrder, fieldName, bool);
    };
    $scope.setExpressSn = function(pickOrder) {
      var params, promise;
      pickOrder.isSetting = true;
      params = {
        logisticOrderId: pickOrder.logisticOrderId
      };
      promise = WmsLogisticOrderService.setExpressSn(params);
      return promise.then(function(data) {
        pickOrder.isSetting = false;
        if (!data.hasOwnProperty('success')) {
          return pickOrder.expressSn = data;
        }
      });
    };
    $scope.checkAll = function() {
      var boolValue;
      boolValue = $scope.verifyAllGoodsIds;
      angular.forEach($scope.currentPageItems, function(item) {
        if (item.printable && item.expressSn) {
          return $scope.verifyOrderIds[item.id] = boolValue;
        }
      });
      return $scope.calArrayTrue();
    };
    $scope.calArrayTrue = function() {
      return $scope.chosenOrderIdLength = CommonService.calArrayTrue($scope.currentPageItems, $scope.verifyOrderIds, 'id');
    };
    $scope.printCheck = function() {
      var params, pickOrderIds;
      pickOrderIds = [];
      angular.forEach($scope.currentPageItems, function(item) {
        if ($scope.verifyOrderIds[item.id]) {
          return pickOrderIds.push(item.id);
        }
      });
      params = {
        pickOrderIds: pickOrderIds
      };
      return printExpressOrder(params);
    };
    $scope.printOrder = function(id) {
      var params;
      params = {
        pickOrderIds: [id]
      };
      return printExpressOrder(params);
    };
    printExpressOrder = function(params) {
      var promise;
      promise = WmsPickOrderService.getExpressOrderList(params);
      return promise.then(function(orders) {
        var expressOrders;
        expressOrders = {
          params: orders
        };
        promise = DeviceDriverService.printExpressOrder(expressOrders);
        return promise.then(function() {});
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticOrderService.listAllStatusEnum();
      promise.then(function(data) {
        return $scope.logisticOrderStatusEnumList = data;
      });
      promise = WmsLogisticCompanyService.mapAll();
      return promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.createLogisticOrder = {};
      $scope.logisticOrder = {};
      $scope.verifyOrderIds = [];
      $scope.chosenOrderIdLength = 0;
      promise = WmsPickOrderService.waitPickList();
      return promise.then(function(data) {
        $scope.items = data;
        angular.forEach($scope.items, function(item) {
          if (item.printable && item.expressSn) {
            return $scope.verifyOrderIds[item.id] = false;
          }
        });
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPickOrderWaitPickNoPrintCtrl', function($scope, $routeParams, $filter, CommonService, WmsLogisticOrderService, ClickEditService, WmsPickOrderService, WmsLogisticCompanyService, DeviceDriverService) {
    var getWaitPickNoPrintList, initSearch, main, prepareConst, printExpressOrder;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      if ($scope.filteredItems) {
        return $scope.onFilterChange();
      }
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        keywords: ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsLogisticOrderService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(logisticOrder, fieldName, bool) {
      return ClickEditService.switchNode(logisticOrder, fieldName, bool);
    };
    $scope.setExpressSn = function(pickOrder) {
      var params, promise;
      pickOrder.isSetting = true;
      params = {
        logisticOrderId: pickOrder.logisticOrderId
      };
      promise = WmsLogisticOrderService.setExpressSn(params);
      return promise.then(function(data) {
        pickOrder.isSetting = false;
        if (!data.hasOwnProperty('success')) {
          return pickOrder.expressSn = data;
        }
      });
    };
    $scope.checkAll = function() {
      var boolValue;
      boolValue = $scope.verifyAllGoodsIds;
      angular.forEach($scope.currentPageItems, function(item) {
        if (item.printable && item.expressSn) {
          return $scope.verifyOrderIds[item.id] = boolValue;
        }
      });
      return $scope.calArrayTrue();
    };
    $scope.calArrayTrue = function() {
      return $scope.chosenOrderIdLength = CommonService.calArrayTrue($scope.currentPageItems, $scope.verifyOrderIds, 'id');
    };
    $scope.printCheck = function() {
      var params, pickOrderIds;
      pickOrderIds = [];
      angular.forEach($scope.currentPageItems, function(item) {
        if ($scope.verifyOrderIds[item.id]) {
          return pickOrderIds.push(item.id);
        }
      });
      params = {
        pickOrderIds: pickOrderIds
      };
      return printExpressOrder(params);
    };
    $scope.printOrder = function(id) {
      var params;
      params = {
        pickOrderIds: [id]
      };
      return printExpressOrder(params);
    };
    getWaitPickNoPrintList = function() {
      var promise;
      promise = WmsPickOrderService.waitPickNoPrintList();
      return promise.then(function(data) {
        $scope.items = data;
        initSearch();
        return prepareConst();
      });
    };
    printExpressOrder = function(params) {
      var promise;
      promise = WmsPickOrderService.getExpressOrderList(params);
      return promise.then(function(orders) {
        var expressOrders;
        promise = WmsLogisticOrderService.updateIsPrintedByPickOrderIds(params);
        promise.then(function(data) {});
        expressOrders = {
          params: orders
        };
        promise = DeviceDriverService.printExpressOrder(expressOrders);
        return promise.then(function() {
          return getWaitPickNoPrintList();
        });
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticOrderService.listAllStatusEnum();
      promise.then(function(data) {
        return $scope.logisticOrderStatusEnumList = data;
      });
      promise = WmsLogisticCompanyService.mapAll();
      return promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
    };
    main = function() {
      $scope.createLogisticOrder = {};
      $scope.logisticOrder = {};
      $scope.verifyOrderIds = [];
      $scope.chosenOrderIdLength = 0;
      return getWaitPickNoPrintList();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPickOrderWaitPickPrintedCtrl', function($scope, $routeParams, $filter, CommonService, WmsLogisticOrderService, ClickEditService, WmsPickOrderService, WmsLogisticCompanyService, DeviceDriverService) {
    var initSearch, main, prepareConst, printExpressOrder;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      if ($scope.filteredItems) {
        return $scope.onFilterChange();
      }
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        keywords: ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsLogisticOrderService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(logisticOrder, fieldName, bool) {
      return ClickEditService.switchNode(logisticOrder, fieldName, bool);
    };
    $scope.setExpressSn = function(pickOrder) {
      var params, promise;
      pickOrder.isSetting = true;
      params = {
        logisticOrderId: pickOrder.logisticOrderId
      };
      promise = WmsLogisticOrderService.setExpressSn(params);
      return promise.then(function(data) {
        pickOrder.isSetting = false;
        if (!data.hasOwnProperty('success')) {
          return pickOrder.expressSn = data;
        }
      });
    };
    $scope.checkAll = function() {
      var boolValue;
      boolValue = $scope.verifyAllGoodsIds;
      angular.forEach($scope.currentPageItems, function(item) {
        if (item.printable && item.expressSn) {
          return $scope.verifyOrderIds[item.id] = boolValue;
        }
      });
      return $scope.calArrayTrue();
    };
    $scope.calArrayTrue = function() {
      return $scope.chosenOrderIdLength = CommonService.calArrayTrue($scope.currentPageItems, $scope.verifyOrderIds, 'id');
    };
    $scope.printCheck = function() {
      var params, pickOrderIds;
      pickOrderIds = [];
      angular.forEach($scope.currentPageItems, function(item) {
        if ($scope.verifyOrderIds[item.id]) {
          return pickOrderIds.push(item.id);
        }
      });
      params = {
        pickOrderIds: pickOrderIds
      };
      return printExpressOrder(params);
    };
    $scope.printOrder = function(id) {
      var params;
      params = {
        pickOrderIds: [id]
      };
      return printExpressOrder(params);
    };
    printExpressOrder = function(params) {
      var promise;
      promise = WmsPickOrderService.getExpressOrderList(params);
      return promise.then(function(orders) {
        var expressOrders;
        expressOrders = {
          params: orders
        };
        promise = DeviceDriverService.printExpressOrder(expressOrders);
        return promise.then(function() {});
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticOrderService.listAllStatusEnum();
      promise.then(function(data) {
        return $scope.logisticOrderStatusEnumList = data;
      });
      promise = WmsLogisticCompanyService.mapAll();
      return promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.createLogisticOrder = {};
      $scope.logisticOrder = {};
      $scope.verifyOrderIds = [];
      $scope.chosenOrderIdLength = 0;
      promise = WmsPickOrderService.waitPickPrintedList();
      return promise.then(function(data) {
        $scope.items = data;
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPlatformOrderUploadDetailCtrl', function($scope, $routeParams, WmsPlatformOrderUploadService) {
    var main;
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsPlatformOrderUploadService.detail(params);
      return promise.then(function(data) {
        return $scope.platformOrderUpload = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPlatformOrderUploadEditCtrl', function($scope, $routeParams, CommonService, WmsPlatformOrderUploadService, ClickEditService) {
    var main;
    $scope.switchNode = function(platformOrderUpload, fieldName, bool) {
      return ClickEditService.switchNode(platformOrderUpload, fieldName, bool);
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsPlatformOrderUploadService.detail(params);
      return promise.then(function(data) {
        return $scope.platformOrderUpload = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPlatformOrderUploadListCtrl', function($scope, $routeParams, $filter, CommonService, WmsPlatformSourceService, WmsPlatformOrderUploadService, WmsMemberService, ClickEditService, SessionService, WmsConfigService, $timeout, ModalService, WmsSellerPlatformSourceService, WmsSellerImportRulesService) {
    var initCsv, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      $scope.platformOrderUpload.sellerId = $scope.sellerId;
      $scope.platformOrderUpload.status = 0;
      $scope.platformOrderUpload.fileData = JSON.stringify($scope.csv.result);
      promise = WmsPlatformOrderUploadService.add($scope.platformOrderUpload);
      return promise.then(function(data) {
        $scope.platformOrderUpload.id = data;
        $scope.items.unshift($scope.platformOrderUpload);
        $scope.createPlatformOrderUpload = {};
        $scope.platformOrderUpload = {};
        initCsv();
        return initSearch();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsPlatformOrderUploadService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.deal = function(item) {
      var params, promise;
      params = {
        id: item.id
      };
      promise = WmsPlatformOrderUploadService.deal(params);
      return promise.then(function(data) {
        return item.status = data;
      });
    };
    $scope.deleteRow = function(index) {
      return $scope.csv.result.splice(index, 1);
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(platformOrderUpload, fieldName, bool) {
      return ClickEditService.switchNode(platformOrderUpload, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsPlatformSourceService.mapPlatformSource();
      promise.then(function(data) {
        return $scope.platformSourceMap = data;
      });
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerPlatformSourceService.listBySellerId(params);
      promise.then(function(data) {
        $scope.sellerPlatformSourceList = data;
        $scope.platformOrderUpload.platformSourceId = $scope.sellerPlatformSourceList[0].platformSourceId;
        promise = WmsSellerImportRulesService.listBySellerIdAndOrderImport(params);
        return promise.then(function(data) {
          $scope.sellerImportRulesList = data;
          angular.forEach($scope.sellerImportRulesList, function(sellerImportRules, key) {
            return $scope.sellerImportRulesList[key].rules = JSON.parse(sellerImportRules.rules);
          });
          $scope.sellerImportRulesMap = CommonService.convertListToMap($scope.sellerImportRulesList, 'id');
          $scope.platformOrderUpload.sellerImportRulesId = $scope.sellerImportRulesList[0].id;
          return $scope.rulesMap = $scope.sellerImportRulesList[0].rules;
        });
      });
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsMemberService.mapSellerMember(params);
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    initCsv = function() {
      return $scope.csv = {
        content: null,
        header: false,
        headerVisible: false,
        separator: ',',
        separatorVisible: false,
        result: null,
        encoding: 'gbk',
        encodingVisible: false
      };
    };
    main = function() {
      var params, promise;
      initCsv();
      $scope.createPlatformOrderUpload = {};
      $scope.platformOrderUpload = {};
      $scope.username = SessionService.getUsername();
      $scope.sellerId = SessionService.getSellerId();
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsPlatformOrderUploadService.listBySellerId(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPlatformSourceDetailCtrl', function($scope, $routeParams, WmsPlatformSourceService) {
    var main;
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsPlatformSourceService.detail(params);
      return promise.then(function(data) {
        return $scope.platformSource = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPlatformSourceEditCtrl', function($scope, $routeParams, CommonService, WmsPlatformSourceService, ClickEditService) {
    var main;
    $scope.updateName = function(platformSource, fieldName) {
      var promise;
      if (ClickEditService.updateNode(platformSource, fieldName)) {
        promise = WmsPlatformSourceService.updateName(platformSource);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(platformSource, fieldName, bool) {
      return ClickEditService.switchNode(platformSource, fieldName, bool);
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsPlatformSourceService.detail(params);
      return promise.then(function(data) {
        return $scope.platformSource = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPlatformSourceListCtrl', function($scope, $routeParams, $filter, CommonService, WmsPlatformSourceService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsPlatformSourceService.add($scope.platformSource);
      return promise.then(function(data) {
        $scope.platformSource.id = data;
        $scope.items.unshift($scope.platformSource);
        $scope.createPlatformSource = {};
        $scope.platformSource = {};
        return initSearch();
      });
    };
    $scope.updateName = function(platformSource, fieldName) {
      var promise;
      if (ClickEditService.updateNode(platformSource, fieldName)) {
        promise = WmsPlatformSourceService.updateName(platformSource);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(platformSource, fieldName, bool) {
      return ClickEditService.switchNode(platformSource, fieldName, bool);
    };
    prepareConst = function() {};
    main = function() {
      var promise;
      $scope.createPlatformSource = {};
      $scope.platformSource = {};
      promise = WmsPlatformSourceService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPrepackGoodsCtrl', function($scope, $location, $routeParams, WmsSellerService, WmsPickOrderService) {
    var main;
    $scope.addPrepackOrder = function() {
      var params, promise;
      params = {
        sellerId: $routeParams.sellerId,
        barCode: $scope.barCode
      };
      promise = WmsPickOrderService.addPrepackGoods(params);
      return promise.then(function(data) {
        return $location.path("/wms/pack_goods").search("id", data);
      });
    };
    main = function() {
      var params, promise;
      $scope.barCode = '';
      params = {
        id: $routeParams.sellerId
      };
      promise = WmsSellerService.detail(params);
      return promise.then(function(data) {
        return $scope.seller = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPrepackGoodsGroupCtrl', function($scope, $location, $routeParams, $filter, WmsSellerService, WmsPickOrderService, WmsSellerAvailableGoodsGroupService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.addPrepackOrder = function() {
      var params, promise;
      params = {
        sellerId: $routeParams.sellerId,
        barCode: $scope.barCode
      };
      promise = WmsPickOrderService.addPrepackGoodsGroup(params);
      return promise.then(function(data) {
        return $location.path("/wms/pack_goods").search("id", data);
      });
    };
    $scope.packGoods = function(goodsGroup) {
      var params, promise;
      params = {
        sellerId: goodsGroup.sellerId,
        barCode: goodsGroup.barCode
      };
      promise = WmsPickOrderService.addPrepackGoodsGroup(params);
      return promise.then(function(data) {
        return $location.path("/wms/pack_goods").search("id", data);
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        sellerId: $routeParams.sellerId
      };
      promise = WmsSellerAvailableGoodsGroupService.listBySellerIdAndUsable(params);
      return promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
    };
    main = function() {
      var params, promise;
      $scope.barCode = '';
      params = {
        id: $routeParams.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(data) {
        return $scope.seller = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPrintExpressOrderCtrl', function($scope, $routeParams, WmsSellerService, WmsLogisticOrderService, DeviceDriverService, WmsPickOrderService, WmsSellerGoodsService) {
    var getSellerGoodsList, main, prepareConst;
    $scope.printExpressOrder = function() {
      var params, promise;
      params = {
        sellerId: $routeParams.sellerId,
        barCode: $scope.barCode
      };
      $scope.oldBarCode = $scope.barCode;
      $scope.barCode = '';
      $scope.expressOrders = {};
      promise = WmsLogisticOrderService.getExpressOrderByBarCode(params);
      return promise.then(function(orders) {
        $scope.expressOrders = orders;
        promise = DeviceDriverService.printExpressOrder({
          params: orders
        });
        return promise.then(function() {
          var expressSn;
          getSellerGoodsList();
          expressSn = orders[0].expressSn;
          promise = WmsPickOrderService.prepackComplete({
            expressSn: expressSn
          });
          return promise.then(function() {});
        });
      });
    };
    $scope.reprintExpressOrder = function() {
      var promise;
      promise = DeviceDriverService.printExpressOrder({
        params: $scope.expressOrders
      });
      return promise.then(function() {
        var expressSn;
        getSellerGoodsList();
        expressSn = $scope.expressOrders[0].expressSn;
        promise = WmsPickOrderService.prepackComplete({
          expressSn: expressSn
        });
        return promise.then(function() {});
      });
    };
    getSellerGoodsList = function() {
      var params, promise;
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsPickOrderService.listPrintableSellerGoodsBySellerId(params);
      return promise.then(function(data) {
        return $scope.sellerGoodsList = data;
      });
    };
    prepareConst = function() {
      var params, promise;
      getSellerGoodsList();
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerGoodsService.mapBySellerId(params);
      return promise.then(function(data) {
        return $scope.sellerGoodsMap = data;
      });
    };
    main = function() {
      var params, promise;
      angular.element('#barCode').focus();
      $scope.barCode = '';
      $scope.sellerId = $routeParams.sellerId;
      $scope.expressOrders = {};
      params = {
        id: $scope.sellerId
      };
      promise = WmsSellerService.detail(params);
      return promise.then(function(data) {
        $scope.seller = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsPrintSelectSellerCtrl', function($scope, $location, WmsSellerService) {
    var main;
    $scope.selectSeller = function(sellerId) {
      return $location.path("/wms/print_express_order").search("sellerId", sellerId);
    };
    main = function() {
      var promise;
      promise = WmsSellerService.listAll();
      return promise.then(function(data) {
        var sellerId;
        if (data.length === 1) {
          sellerId = data[0].id;
          $location.path("/wms/print_express_order").search("sellerId", sellerId);
        }
        return $scope.sellerList = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsProviderApiListCtrl', function($scope, $routeParams, $filter, CommonService, WmsProviderApiService, WmsApiService, WmsProviderService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsProviderApiService.add($scope.providerApi);
      return promise.then(function(data) {
        $scope.providerApi.id = data;
        $scope.items.unshift($scope.providerApi);
        $scope.createProviderApi = {};
        $scope.providerApi = {
          apiId: $routeParams.apiId
        };
        return initSearch();
      });
    };
    $scope.updateVersion = function(providerApi, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApi, fieldName)) {
        promise = WmsProviderApiService.updateVersion(providerApi);
        return promise.then(function() {});
      }
    };
    $scope.updateProviderId = function(providerApi, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApi, fieldName)) {
        promise = WmsProviderApiService.updateProviderId(providerApi);
        return promise.then(function() {});
      }
    };
    $scope.updateFilename = function(providerApi, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApi, fieldName)) {
        promise = WmsProviderApiService.updateFilename(providerApi);
        return promise.then(function() {});
      }
    };
    $scope.updateHostName = function(providerApi, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApi, fieldName)) {
        promise = WmsProviderApiService.updateHostName(providerApi);
        return promise.then(function() {});
      }
    };
    $scope.updateAction = function(providerApi, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApi, fieldName)) {
        promise = WmsProviderApiService.updateAction(providerApi);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(providerApi, fieldName, bool) {
      return ClickEditService.switchNode(providerApi, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsProviderService.mapAll();
      promise.then(function(data) {
        return $scope.providerMap = data;
      });
      params = {
        id: $routeParams.apiId
      };
      promise = WmsApiService.detail(params);
      return promise.then(function(data) {
        return $scope.api = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.createProviderApi = {};
      $scope.providerApi = {
        apiId: $routeParams.apiId
      };
      params = {
        apiId: $routeParams.apiId
      };
      promise = WmsProviderApiService.listByApiId(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsProviderApiParamListCtrl', function($scope, $routeParams, $filter, CommonService, WmsProviderApiParamService, WmsProviderApiService, WmsApiService, WmsProviderService, WmsApiParamService, ClickEditService) {
    var getProviderApiParamList, main, prepareConst;
    $scope.add = function(providerApiParam) {
      var promise;
      promise = WmsProviderApiParamService.add(providerApiParam);
      return promise.then(function() {
        return getProviderApiParamList();
      });
    };
    $scope.remove = function(id) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsProviderApiParamService["delete"](params);
      return promise.then(function() {
        return getProviderApiParamList();
      });
    };
    $scope.updateDefaultValue = function(providerApiParam, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApiParam, fieldName)) {
        promise = WmsProviderApiParamService.updateDefaultValue(providerApiParam);
        return promise.then(function() {});
      }
    };
    $scope.updateApiParamId = function(providerApiParam, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApiParam, fieldName)) {
        promise = WmsProviderApiParamService.updateApiParamId(providerApiParam);
        return promise.then(function() {});
      }
    };
    $scope.updateRequired = function(providerApiParam, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApiParam, fieldName)) {
        promise = WmsProviderApiParamService.updateRequired(providerApiParam);
        return promise.then(function() {});
      }
    };
    $scope.updateDataType = function(providerApiParam, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApiParam, fieldName)) {
        promise = WmsProviderApiParamService.updateDataType(providerApiParam);
        return promise.then(function() {});
      }
    };
    $scope.updateVarKey = function(providerApiParam, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApiParam, fieldName)) {
        promise = WmsProviderApiParamService.updateVarKey(providerApiParam);
        return promise.then(function() {});
      }
    };
    $scope.addBrotherAbove = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index - 1, baseNode.leftValue, baseNode.depth);
    };
    $scope.addBrotherBelow = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index, baseNode.rightValue / 1 + 1, baseNode.depth);
    };
    $scope.addChild = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index, baseNode.leftValue / 1 + 1, baseNode.depth / 1 + 1);
    };
    $scope.insertNew = function(index, left, depth) {
      var newNode;
      newNode = {
        "inEditing": true,
        "providerApiId": $routeParams.providerApiId,
        "depth": depth,
        "leftValue": left,
        "rightValue": left / 1 + 1,
        "required": "1"
      };
      return $scope.providerApiParamList.splice(index + 1, 0, newNode);
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(providerApiParam, fieldName, bool) {
      return ClickEditService.switchNode(providerApiParam, fieldName, bool);
    };
    getProviderApiParamList = function() {
      var params, promise;
      params = {
        providerApiId: $routeParams.providerApiId
      };
      promise = WmsProviderApiParamService.listByProviderApiId(params);
      return promise.then(function(data) {
        return $scope.providerApiParamList = data;
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.providerApiId
      };
      promise = WmsProviderApiService.detail(params);
      promise.then(function(data) {
        var apiParamParams, apiParams, providerParams;
        $scope.providerApi = data;
        apiParams = {
          id: data.apiId
        };
        promise = WmsApiService.detail(apiParams);
        promise.then(function(api) {
          return $scope.api = api;
        });
        providerParams = {
          id: data.providerId
        };
        promise = WmsProviderService.detail(providerParams);
        promise.then(function(provider) {
          return $scope.provider = provider;
        });
        apiParamParams = {
          apiId: data.apiId
        };
        promise = WmsApiParamService.mapByApiId(apiParamParams);
        return promise.then(function(apiParamMap) {
          return $scope.apiParamMap = apiParamMap;
        });
      });
      promise = WmsProviderApiParamService.dataTypeList();
      return promise.then(function(data) {
        return $scope.dataTypeList = data;
      });
    };
    main = function() {
      getProviderApiParamList();
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsProviderApiReturnDataListCtrl', function($scope, $routeParams, $filter, CommonService, WmsProviderApiService, WmsProviderApiReturnDataService, WmsApiService, WmsProviderService, ClickEditService) {
    var getProviderApiReturnDataList, main, prepareConst;
    $scope.add = function(providerApiReturnData) {
      var promise;
      promise = WmsProviderApiReturnDataService.add(providerApiReturnData);
      return promise.then(function() {
        return getProviderApiReturnDataList();
      });
    };
    $scope.remove = function(id) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsProviderApiReturnDataService["delete"](params);
      return promise.then(function() {
        return getProviderApiReturnDataList();
      });
    };
    $scope.updateDataType = function(providerApiReturnData, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApiReturnData, fieldName)) {
        promise = WmsProviderApiReturnDataService.updateDataType(providerApiReturnData);
        return promise.then(function() {});
      }
    };
    $scope.updateVarKey = function(providerApiReturnData, fieldName) {
      var promise;
      if (ClickEditService.updateNode(providerApiReturnData, fieldName)) {
        promise = WmsProviderApiReturnDataService.updateVarKey(providerApiReturnData);
        return promise.then(function() {});
      }
    };
    $scope.addBrotherAbove = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index - 1, baseNode.leftValue, baseNode.depth);
    };
    $scope.addBrotherBelow = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index, baseNode.rightValue / 1 + 1, baseNode.depth);
    };
    $scope.addChild = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index, baseNode.leftValue / 1 + 1, baseNode.depth / 1 + 1);
    };
    $scope.insertNew = function(index, left, depth) {
      var newNode;
      newNode = {
        "inEditing": true,
        "providerApiId": $routeParams.providerApiId,
        "depth": depth,
        "leftValue": left,
        "rightValue": left / 1 + 1
      };
      return $scope.providerApiReturnDataList.splice(index + 1, 0, newNode);
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(providerApiReturnData, fieldName, bool) {
      return ClickEditService.switchNode(providerApiReturnData, fieldName, bool);
    };
    getProviderApiReturnDataList = function() {
      var params, promise;
      params = {
        providerApiId: $routeParams.providerApiId
      };
      promise = WmsProviderApiReturnDataService.listByProviderApiId(params);
      return promise.then(function(data) {
        return $scope.providerApiReturnDataList = data;
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.providerApiId
      };
      promise = WmsProviderApiService.detail(params);
      promise.then(function(data) {
        var apiParams, providerParams;
        $scope.providerApi = data;
        apiParams = {
          id: data.apiId
        };
        promise = WmsApiService.detail(apiParams);
        promise.then(function(api) {
          return $scope.api = api;
        });
        providerParams = {
          id: data.providerId
        };
        promise = WmsProviderService.detail(providerParams);
        return promise.then(function(provider) {
          return $scope.provider = provider;
        });
      });
      promise = WmsProviderApiReturnDataService.dataTypeList();
      return promise.then(function(data) {
        return $scope.dataTypeList = data;
      });
    };
    main = function() {
      getProviderApiReturnDataList();
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsProviderListCtrl', function($scope, $routeParams, $filter, CommonService, WmsProviderService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsProviderService.add($scope.provider);
      return promise.then(function(data) {
        $scope.provider.id = data;
        $scope.items.unshift($scope.provider);
        $scope.createProvider = {};
        $scope.provider = {};
        return initSearch();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsProviderService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.updateVersion = function(provider, fieldName) {
      var promise;
      if (ClickEditService.updateNode(provider, fieldName)) {
        promise = WmsProviderService.updateVersion(provider);
        return promise.then(function() {});
      }
    };
    $scope.updateFormat = function(provider, fieldName) {
      var promise;
      if (ClickEditService.updateNode(provider, fieldName)) {
        promise = WmsProviderService.updateFormat(provider);
        return promise.then(function() {});
      }
    };
    $scope.updateAppSecret = function(provider, fieldName) {
      var promise;
      if (ClickEditService.updateNode(provider, fieldName)) {
        promise = WmsProviderService.updateAppSecret(provider);
        return promise.then(function() {});
      }
    };
    $scope.updateAppKey = function(provider, fieldName) {
      var promise;
      if (ClickEditService.updateNode(provider, fieldName)) {
        promise = WmsProviderService.updateAppKey(provider);
        return promise.then(function() {});
      }
    };
    $scope.updateFilename = function(provider, fieldName) {
      var promise;
      if (ClickEditService.updateNode(provider, fieldName)) {
        promise = WmsProviderService.updateFilename(provider);
        return promise.then(function() {});
      }
    };
    $scope.updatePort = function(provider, fieldName) {
      var promise;
      if (ClickEditService.updateNode(provider, fieldName)) {
        promise = WmsProviderService.updatePort(provider);
        return promise.then(function() {});
      }
    };
    $scope.updateHostname = function(provider, fieldName) {
      var promise;
      if (ClickEditService.updateNode(provider, fieldName)) {
        promise = WmsProviderService.updateHostname(provider);
        return promise.then(function() {});
      }
    };
    $scope.updateScheme = function(provider, fieldName) {
      var promise;
      if (ClickEditService.updateNode(provider, fieldName)) {
        promise = WmsProviderService.updateScheme(provider);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(provider, fieldName) {
      var promise;
      if (ClickEditService.updateNode(provider, fieldName)) {
        promise = WmsProviderService.updateName(provider);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(provider, fieldName, bool) {
      return ClickEditService.switchNode(provider, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsProviderService.schemeList();
      return promise.then(function(data) {
        return $scope.schemeList = data;
      });
    };
    main = function() {
      var promise;
      $scope.createProvider = {};
      $scope.provider = {};
      promise = WmsProviderService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsReduceAvailableContainerQuantityCtrl', function($scope, $routeParams, WmsContainerService, ModalService, $i18next, WmsMemberService, WmsSellerAvailableContainerService, WmsAvailableContainerInventoryLogService, WmsSellerService) {
    var getAvailableContainerInventoryLogList, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [5, 10, 20, 50, 100];
      $scope.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.filteredItems = $scope.availableContainerInventoryLogList;
      return $scope.select($scope.currentPage);
    };
    $scope.calcQuantity = function() {
      var postStr, str;
      if ($scope.availableContainerInventoryLog.number) {
        str = $scope.availableContainer.quantity + ' - ' + $scope.availableContainerInventoryLog.number + " = ";
        $scope.availableContainerInventoryLog.calcQuantity = str + (parseInt($scope.availableContainer.quantity) - parseInt($scope.availableContainerInventoryLog.number));
        postStr = $scope.container.postInventory + ' + ' + $scope.availableContainerInventoryLog.number + " = ";
        return $scope.container.calcPostInventory = postStr + (parseInt($scope.container.postInventory) + parseInt($scope.availableContainerInventoryLog.number));
      } else {
        $scope.availableContainerInventoryLog.calcQuantity = "";
        return $scope.container.calcPostInventory = "";
      }
    };
    $scope.reduceInventory = function(availableContainerInventoryLog) {
      var promise;
      if ((parseInt($scope.availableContainer.quantity) - parseInt($scope.availableContainerInventoryLog.number)) < 0) {
        return ModalService.showMessageOnError($i18next("wms:ui.label.quantity") + $i18next("wms:message.inventoryIsNegative"));
      } else {
        promise = WmsAvailableContainerInventoryLogService.reduceInventory($scope.availableContainerInventoryLog);
        return promise.then(function() {
          $scope.availableContainer.quantity = parseInt($scope.availableContainer.quantity) - parseInt($scope.availableContainerInventoryLog.number);
          $scope.container.postInventory = parseInt($scope.container.postInventory) + parseInt($scope.availableContainerInventoryLog.number);
          $scope.container.calcPostInventory = "";
          $scope.availableContainerInventoryLog = {
            availableContainerId: $routeParams.availableContainerId
          };
          return getAvailableContainerInventoryLogList();
        });
      }
    };
    getAvailableContainerInventoryLogList = function() {
      var params, promise;
      params = {
        availableContainerId: $routeParams.availableContainerId
      };
      promise = WmsAvailableContainerInventoryLogService.listByAvailableContainerId(params);
      return promise.then(function(data) {
        $scope.availableContainerInventoryLogList = data;
        return initSearch();
      });
    };
    prepareConst = function() {
      var params, promise;
      getAvailableContainerInventoryLogList();
      params = {
        id: $scope.availableContainer.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(data) {
        return $scope.seller = data;
      });
      params = {
        id: $scope.availableContainer.containerId
      };
      promise = WmsContainerService.detail(params);
      promise.then(function(data) {
        return $scope.container = data;
      });
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.availableContainerInventoryLog = {
        availableContainerId: $routeParams.availableContainerId
      };
      params = {
        id: $routeParams.availableContainerId
      };
      promise = WmsSellerAvailableContainerService.detail(params);
      return promise.then(function(data) {
        $scope.availableContainer = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsReduceAvailableGoodsQuantityCtrl', function($scope, $routeParams, WmsGoodsService, WmsGoodsInventoryLogService, WmsMemberService, WmsSellerAvailableGoodsService, WmsAvailableGoodsInventoryLogService, WmsSellerService, ModalService, $i18next) {
    var getAvailableGoodsInventoryLogList, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [5, 10, 20, 50, 100];
      $scope.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.filteredItems = $scope.availableGoodsInventoryLogList;
      return $scope.select($scope.currentPage);
    };
    $scope.calcQuantity = function() {
      var str;
      if ($scope.availableGoodsInventoryLog.number) {
        str = $scope.availableGoods.quantity + ' - ' + $scope.availableGoodsInventoryLog.number + " = ";
        return $scope.availableGoodsInventoryLog.calcQuantity = str + (parseInt($scope.availableGoods.quantity) - parseInt($scope.availableGoodsInventoryLog.number));
      } else {
        return $scope.availableGoodsInventoryLog.calcQuantity = "";
      }
    };
    $scope.reduceInventory = function(availableGoodsInventoryLog) {
      var promise;
      if ((parseInt($scope.availableGoods.quantity) - parseInt($scope.availableGoodsInventoryLog.number)) < 0) {
        return ModalService.showMessageOnError($i18next("wms:ui.label.quantity") + $i18next("wms:message.inventoryIsNegative"));
      } else {
        promise = WmsAvailableGoodsInventoryLogService.reduceInventory($scope.availableGoodsInventoryLog);
        return promise.then(function() {
          $scope.availableGoods.quantity = parseInt($scope.availableGoods.quantity) - parseInt($scope.availableGoodsInventoryLog.number);
          $scope.availableGoodsInventoryLog = {
            availableGoodsId: $routeParams.availableGoodsId
          };
          return getAvailableGoodsInventoryLogList();
        });
      }
    };
    getAvailableGoodsInventoryLogList = function() {
      var params, promise;
      params = {
        availableGoodsId: $routeParams.availableGoodsId
      };
      promise = WmsAvailableGoodsInventoryLogService.listByAvailableGoodsId(params);
      return promise.then(function(data) {
        $scope.availableGoodsInventoryLogList = data;
        return initSearch();
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.availableGoodsId
      };
      promise = WmsSellerAvailableGoodsService.detail(params);
      promise.then(function(availableGoods) {
        var goodsParams, sellerParams;
        $scope.availableGoods = availableGoods;
        sellerParams = {
          id: availableGoods.sellerId
        };
        promise = WmsSellerService.detail(sellerParams);
        promise.then(function(seller) {
          return $scope.seller = seller;
        });
        goodsParams = {
          id: availableGoods.goodsId
        };
        promise = WmsGoodsService.detail(goodsParams);
        return promise.then(function(goods) {
          return $scope.goods = goods;
        });
      });
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      $scope.availableGoodsInventoryLog = {
        availableGoodsId: $routeParams.availableGoodsId
      };
      getAvailableGoodsInventoryLogList();
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsReduceContainerInventoryCtrl', function($scope, $routeParams, WmsContainerService, WmsContainerInventoryLogService, WmsMemberService) {
    var getContainerInventoryLogList, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [5, 10, 20, 50, 100];
      $scope.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.filteredItems = $scope.containerInventoryLogList;
      return $scope.select($scope.currentPage);
    };
    $scope.calcInventory = function() {
      var postStr, totalStr;
      if ($scope.containerInventoryLog.number) {
        totalStr = $scope.container.totalInventory + ' - ' + $scope.containerInventoryLog.number + " = ";
        $scope.containerInventoryLog.calcTotalInventory = totalStr + (parseInt($scope.container.totalInventory) - parseInt($scope.containerInventoryLog.number));
        postStr = $scope.container.postInventory + ' - ' + $scope.containerInventoryLog.number + " = ";
        return $scope.containerInventoryLog.calcPostInventory = postStr + (parseInt($scope.container.postInventory) - parseInt($scope.containerInventoryLog.number));
      } else {
        $scope.containerInventoryLog.calcTotalInventory = "";
        return $scope.containerInventoryLog.calcPostInventory = "";
      }
    };
    $scope.reduceInventory = function(containerInventoryLog) {
      var promise;
      promise = WmsContainerInventoryLogService.reduceInventory($scope.containerInventoryLog);
      return promise.then(function() {
        $scope.container.totalInventory = parseInt($scope.container.totalInventory) - parseInt($scope.containerInventoryLog.number);
        $scope.container.postInventory = parseInt($scope.container.postInventory) - parseInt($scope.containerInventoryLog.number);
        $scope.containerInventoryLog = {
          containerId: $scope.container.id
        };
        return getContainerInventoryLogList();
      });
    };
    getContainerInventoryLogList = function() {
      var params, promise;
      params = {
        containerId: $routeParams.containerId
      };
      promise = WmsContainerInventoryLogService.listByContainerId(params);
      return promise.then(function(data) {
        $scope.containerInventoryLogList = data;
        return initSearch();
      });
    };
    prepareConst = function() {
      var promise;
      getContainerInventoryLogList();
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.containerInventoryLog = {
        containerId: $routeParams.containerId
      };
      params = {
        id: $routeParams.containerId
      };
      promise = WmsContainerService.detail(params);
      return promise.then(function(data) {
        return $scope.container = data;
      });
    };
    prepareConst();
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsReduceGoodsInventoryCtrl', function($scope, $routeParams, WmsGoodsService, WmsGoodsInventoryLogService, WmsMemberService) {
    var getGoodsInventoryLogList, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [5, 10, 20, 50, 100];
      $scope.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.filteredItems = $scope.goodsInventoryLogList;
      return $scope.select($scope.currentPage);
    };
    $scope.calcInventory = function() {
      var postStr, totalStr;
      if ($scope.goodsInventoryLog.number) {
        totalStr = $scope.goods.totalInventory + ' - ' + $scope.goodsInventoryLog.number + " = ";
        $scope.goodsInventoryLog.calcTotalInventory = totalStr + (parseInt($scope.goods.totalInventory) - parseInt($scope.goodsInventoryLog.number));
        postStr = $scope.goods.postInventory + ' - ' + $scope.goodsInventoryLog.number + " = ";
        return $scope.goodsInventoryLog.calcPostInventory = postStr + (parseInt($scope.goods.postInventory) - parseInt($scope.goodsInventoryLog.number));
      } else {
        $scope.goodsInventoryLog.calcTotalInventory = "";
        return $scope.goodsInventoryLog.calcPostInventory = "";
      }
    };
    $scope.reduceInventory = function(goodsInventoryLog) {
      var promise;
      promise = WmsGoodsInventoryLogService.reduceInventory($scope.goodsInventoryLog);
      return promise.then(function() {
        $scope.goods.totalInventory = parseInt($scope.goods.totalInventory) - parseInt($scope.goodsInventoryLog.number);
        $scope.goods.postInventory = parseInt($scope.goods.postInventory) - parseInt($scope.goodsInventoryLog.number);
        $scope.goodsInventoryLog = {
          goodsId: $scope.goods.id
        };
        return getGoodsInventoryLogList();
      });
    };
    getGoodsInventoryLogList = function() {
      var params, promise;
      params = {
        goodsId: $routeParams.goodsId
      };
      promise = WmsGoodsInventoryLogService.listByGoodsId(params);
      return promise.then(function(data) {
        $scope.goodsInventoryLogList = data;
        return initSearch();
      });
    };
    prepareConst = function() {
      var promise;
      getGoodsInventoryLogList();
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.goodsInventoryLog = {
        goodsId: $routeParams.goodsId
      };
      params = {
        id: $routeParams.goodsId
      };
      promise = WmsGoodsService.detail(params);
      return promise.then(function(data) {
        return $scope.goods = data;
      });
    };
    prepareConst();
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRepositoryDetailCtrl', function($scope, $routeParams, CommonService, WmsRepositoryService, ClickEditService, WmsWarehouseService) {
    var main, prepareConst;
    $scope.save = function(repository, fieldName) {
      var promise;
      promise = WmsRepositoryService.update(repository);
      return promise.then(function() {});
    };
    prepareConst = function() {
      var promise;
      promise = WmsRepositoryService.listUseAttribute();
      return promise.then(function(data) {
        return $scope.useAttributeList = data;
      });
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsRepositoryService.detail(params);
      return promise.then(function(data) {
        $scope.repository = data;
        params = {
          id: $scope.repository.warehouseId
        };
        promise = WmsWarehouseService.detail(params);
        promise.then(function(data) {
          return $scope.warehouse = data;
        });
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRepositoryEditCtrl', function($scope, $routeParams, CommonService, WmsRepositoryService, ClickEditService, WmsWarehouseService) {
    var main;
    $scope.update = function(repository, fieldName) {
      var promise;
      if (ClickEditService.updateNode(repository, fieldName)) {
        promise = WmsRepositoryService.update(repository);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(repository, fieldName, bool) {
      return ClickEditService.switchNode(repository, fieldName, bool);
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsRepositoryService.detail(params);
      return promise.then(function(data) {
        $scope.repository = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRepositoryListCtrl', function($scope, $routeParams, $filter, CommonService, $i18next, ClickEditService, WmsWarehouseService, WmsRepositoryService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.save = function() {
      var promise;
      promise = WmsRepositoryService.add($scope.repository);
      return promise.then(function(data) {
        $scope.repository.id = data;
        $scope.items.unshift($scope.repository);
        $scope.createRepository = {};
        $scope.repository = {};
        return initSearch();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsRepositoryService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.update = function(repository, fieldName) {
      var promise;
      if (ClickEditService.updateNode(repository, fieldName)) {
        promise = WmsRepositoryService.update(repository);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(repository, fieldName, bool) {
      return ClickEditService.switchNode(repository, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsRepositoryService.listUseAttribute();
      return promise.then(function(data) {
        var useAttribute, _i, _len, _results;
        $scope.useAttributeList = data;
        $scope.useAttributeMap = [];
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          useAttribute = data[_i];
          _results.push($scope.useAttributeMap[useAttribute] = $i18next("wms:ui.useAttribute." + useAttribute));
        }
        return _results;
      });
    };
    main = function() {
      var params, promise;
      $scope.createRepository = {};
      $scope.warehouseId = $routeParams.warehouseId;
      $scope.repository = {
        warehouseId: $scope.warehouseId
      };
      params = {
        id: $scope.warehouseId
      };
      promise = WmsWarehouseService.detail(params);
      promise.then(function(data) {
        return $scope.warehouse = data;
      });
      params = {
        warehouseId: $scope.warehouseId
      };
      promise = WmsRepositoryService.listByWarehouseId(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRequestInventoryTransferGoodsListCtrl', function($scope, $routeParams, $filter, CommonService, WmsSellerService, WmsInventoryTransferGoodsService, WmsInventoryTransferService, WmsSellerGoodsService, WmsConfigService) {
    var getSelectGoodsList, main, prepareConst;
    $scope.add = function() {
      var promise;
      promise = WmsInventoryTransferGoodsService.add($scope.inventoryTransferGoods);
      return promise.then(function(data) {
        $scope.inventoryTransferGoods.id = data;
        $scope.transferGoodsList.unshift($scope.inventoryTransferGoods);
        $scope.createInventoryTransferGoods = {};
        $scope.inventoryTransferGoods = {
          inventoryTransferId: $routeParams.inventoryTransferId
        };
        return getSelectGoodsList();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsInventoryTransferGoodsService["delete"](params);
      return promise.then(function() {
        $scope.transferGoodsList.splice(i, 1);
        return getSelectGoodsList();
      });
    };
    $scope.checkGoods = function(sellerGoodsId) {
      return $scope.inventoryTransferGoods.sellerGoodsId = sellerGoodsId;
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.search = function(searchKeywords) {
      return $scope.currentSelectGoodsList = $filter('filter')($scope.selectGoodsList, searchKeywords);
    };
    getSelectGoodsList = function() {
      var goods, _i, _len, _ref;
      $scope.transferGoodsMap = CommonService.convertListToMap($scope.transferGoodsList, 'sellerGoodsId');
      $scope.selectGoodsList = [];
      _ref = $scope.sellerGoodsList;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        goods = _ref[_i];
        if (!$scope.transferGoodsMap.hasOwnProperty(goods.id)) {
          $scope.selectGoodsList.push(goods);
        }
      }
      return $scope.search($scope.searchKeywords);
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsSellerService.mapAll();
      promise.then(function(data) {
        return $scope.sellerMap = data;
      });
      params = {
        id: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferService.detail(params);
      return promise.then(function(data) {
        var acceptorGoodsParams, sellerGoodsParams;
        $scope.inventoryTransfer = data;
        sellerGoodsParams = {
          sellerId: data.responseSeller
        };
        promise = WmsSellerGoodsService.listBySellerIdAndNoCombo(sellerGoodsParams);
        promise.then(function(sellerGoodsList) {
          $scope.sellerGoodsList = sellerGoodsList;
          $scope.sellerGoodsMap = CommonService.convertListToMap(sellerGoodsList, 'id');
          return getSelectGoodsList();
        });
        acceptorGoodsParams = {
          sellerId: data.requestSeller
        };
        promise = WmsSellerGoodsService.mapBySellerIdAndNoCombo(acceptorGoodsParams);
        return promise.then(function(acceptorGoodsMap) {
          return $scope.acceptorGoodsMap = acceptorGoodsMap;
        });
      });
    };
    main = function() {
      var params, promise;
      $scope.createInventoryTransferGoods = {};
      $scope.imgHost = WmsConfigService.getImgHost();
      $scope.inventoryTransferGoods = {
        inventoryTransferId: $routeParams.inventoryTransferId
      };
      params = {
        inventoryTransferId: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferGoodsService.listByInventoryTransferId(params);
      promise.then(function(data) {
        return $scope.transferGoodsList = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRequestInventoryTransferListCtrl', function($scope, $routeParams, $filter, CommonService, WmsSellerService, WmsInventoryTransferService, WmsMemberService, WmsConfigService, FileUploader) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsInventoryTransferService.add($scope.inventoryTransfer);
      return promise.then(function(data) {
        $scope.inventoryTransfer.id = data;
        $scope.inventoryTransfer.status = 0;
        $scope.items.unshift($scope.inventoryTransfer);
        $scope.createInventoryTransfer = {};
        $scope.inventoryTransfer = {
          requestSeller: $routeParams.requestSeller
        };
        return initSearch();
      });
    };
    $scope.request = function(node) {
      var params, promise;
      params = {
        id: node.id
      };
      promise = WmsInventoryTransferService.submitInventoryTransfer(params);
      return promise.then(function() {
        return node.status = 1;
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(inventoryTransfer, fieldName, bool) {
      return ClickEditService.switchNode(inventoryTransfer, fieldName, bool);
    };
    prepareConst = function() {
      var fileHost, promise, uploader;
      promise = WmsSellerService.mapAll();
      promise.then(function(data) {
        return $scope.sellerMap = data;
      });
      promise = WmsMemberService.mapMember();
      promise.then(function(data) {
        return $scope.memberMap = data;
      });
      fileHost = WmsConfigService.getFileHost();
      uploader = $scope.uploader = new FileUploader({
        url: fileHost + '/upload_images/voucher'
      });
      uploader.filters.push({
        name: 'imageFilter',
        fn: function(item, options) {
          var type;
          type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });
      return uploader.onCompleteItem = function(fileItem, response, status, headers) {
        if (response.success) {
          $scope.uploader.queue = [];
          return $scope.inventoryTransfer.voucher = response.data;
        }
      };
    };
    main = function() {
      var params, promise;
      $scope.createInventoryTransfer = {};
      $scope.inventoryTransfer = {
        requestSeller: $routeParams.requestSeller
      };
      $scope.imgHost = WmsConfigService.getImgHost();
      params = {
        requestSeller: $routeParams.requestSeller
      };
      promise = WmsInventoryTransferService.listByRequestSeller(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  "use strict";
  angular.module("app.controllers").controller("WmsResetPasswordCtrl", function($scope, $i18next, $routeParams, WmsMemberService, ModalService, SessionService) {
    var main, prepareConst;
    $scope.resetPassword = function() {
      if ($scope.member.password !== $scope.member.passwordConfirmation) {
        ModalService.showMessageOnError($i18next("passport:message.validationError.password.notEqual"));
        return;
      }
      return WmsMemberService.resetPassword($scope.member);
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsMemberService.detail(params);
      return promise.then(function(data) {
        return $scope.currentMember = data;
      });
    };
    main = function() {
      $scope.sellerId = SessionService.getSellerId();
      return $scope.member = {
        "memberId": $routeParams.id,
        "password": "",
        "passwordConfirmation": ""
      };
    };
    prepareConst();
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsResponseInventoryTransferGoodsListCtrl', function($scope, $routeParams, WmsSellerService, WmsSellerGoodsService, WmsInventoryTransferGoodsService, WmsInventoryTransferService, WmsConfigService, SessionService) {
    var main, prepareConst;
    prepareConst = function() {
      var params, promise;
      promise = WmsSellerService.mapAll();
      promise.then(function(data) {
        return $scope.sellerMap = data;
      });
      params = {
        id: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferService.detail(params);
      promise.then(function(data) {
        return $scope.inventoryTransfer = data;
      });
      params = {
        sellerId: SessionService.getSellerId()
      };
      promise = WmsSellerGoodsService.mapBySellerIdAndNoCombo(params);
      return promise.then(function(goodsMap) {
        return $scope.goodsMap = goodsMap;
      });
    };
    main = function() {
      var params, promise;
      $scope.createInventoryTransferGoods = {};
      $scope.inventoryTransferGoods = {
        inventoryTransferId: $routeParams.inventoryTransferId
      };
      $scope.imgHost = WmsConfigService.getImgHost();
      params = {
        inventoryTransferId: $routeParams.inventoryTransferId
      };
      promise = WmsInventoryTransferGoodsService.listByInventoryTransferId(params);
      promise.then(function(data) {
        return $scope.transferGoodsList = data;
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsResponseInventoryTransferListCtrl', function($scope, $routeParams, $filter, WmsSellerService, WmsMemberService, WmsInventoryTransferService, SessionService, WmsConfigService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.pass = function(node) {
      var params, promise;
      params = {
        id: node.id
      };
      promise = WmsInventoryTransferService.passInventoryTransfer(params);
      return promise.then(function() {
        return node.status = 2;
      });
    };
    $scope.reject = function(node) {
      var params, promise;
      params = {
        id: node.id
      };
      promise = WmsInventoryTransferService.rejectInventoryTransfer(params);
      return promise.then(function() {
        return node.status = 0;
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsSellerService.mapAll();
      promise.then(function(data) {
        return $scope.sellerMap = data;
      });
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.imgHost = WmsConfigService.getImgHost();
      $scope.sellerId = SessionService.getSellerId();
      params = {
        responseSeller: $routeParams.responseSeller
      };
      promise = WmsInventoryTransferService.listByResponseSeller(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRoleAclDetailCtrl', function($scope, $routeParams, WmsRoleAclService) {
    var main;
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRoleAclEditCtrl', function($scope, $routeParams, CommonService, WmsRoleAclService, ClickEditService) {
    var main;
    $scope.switchNode = function(roleAcl, fieldName, bool) {
      return ClickEditService.switchNode(roleAcl, fieldName, bool);
    };
    main = function() {};
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRoleAclListCtrl', function($scope, $routeParams, $filter, WmsRoleAclService, WmsRoleService, WmsModuleActionService, CommonService, DisplayService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [100, 200, 300, 400];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.showEmptyObject = function() {
      $scope.items = $scope.originalItems;
      if ($scope.items && $scope.items.length > 0) {
        console.log($scope.items.length);
        $scope.items = DisplayService.showEmptyObject($scope.items, $scope.roleAclMap);
        return initSearch();
      }
    };
    $scope.showExistObject = function() {
      $scope.items = $scope.originalItems;
      if ($scope.items && $scope.items.length > 0) {
        $scope.items = DisplayService.showExistObject($scope.items, $scope.roleAclMap);
        return initSearch();
      }
    };
    $scope.showAll = function() {
      $scope.items = $scope.originalItems;
      $scope.itemsLength = CommonService.countMapLength(countMap);
      return initSearch();
    };
    $scope.countMapLength = function(countMap) {
      return CommonService.countMapLength(countMap);
    };
    $scope.add = function(moduleActionId) {
      var params, promise;
      params = {
        roleId: $routeParams.roleId,
        moduleActionId: moduleActionId
      };
      promise = WmsRoleAclService.add(params);
      return promise.then(function(data) {
        params.id = data;
        return $scope.roleAclMap[params.moduleActionId] = params;
      });
    };
    $scope["delete"] = function(roleAcl) {
      var params, promise;
      params = {
        id: roleAcl.id
      };
      promise = WmsRoleAclService["delete"](params);
      return promise.then(function() {
        return delete $scope.roleAclMap[roleAcl.moduleActionId];
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.roleId
      };
      promise = WmsRoleService.detail(params);
      promise.then(function(data) {
        return $scope.role = data;
      });
      params = {
        roleId: $routeParams.roleId
      };
      promise = WmsRoleAclService.mapByRoleId(params);
      return promise.then(function(data) {
        return $scope.roleAclMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.createRoleAcl = {};
      promise = WmsModuleActionService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        $scope.originalItems = $scope.items;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRoleDetailCtrl', function($scope, $routeParams, WmsRoleService, WmsSellerService, WmsMemberRoleService, WmsMemberService) {
    var main, prepareConst;
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsMemberRoleService["delete"](params);
      return promise.then(function() {
        return $scope.memberRoleList.splice(i, 1);
      });
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsMemberService.mapAllBase();
      promise.then(function(data) {
        return $scope.memberMap = data;
      });
      params = {
        roleId: $scope.roleId
      };
      promise = WmsMemberRoleService.listByRoleId(params);
      promise.then(function(data) {
        return $scope.memberRoleList = data;
      });
      params = {
        roleId: $scope.roleId
      };
      promise = WmsSellerService.mapAll(params);
      return promise.then(function(data) {
        return $scope.sellerMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.roleId = $routeParams.roleId;
      params = {
        id: $scope.roleId
      };
      promise = WmsRoleService.detail(params);
      return promise.then(function(data) {
        $scope.role = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRoleEditCtrl', function($scope, $routeParams, CommonService, WmsRoleService, ClickEditService) {
    var main;
    $scope.updateName = function(role, fieldName) {
      var promise;
      if (ClickEditService.updateNode(role, fieldName)) {
        promise = WmsRoleService.updateName(role);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(role, fieldName, bool) {
      return ClickEditService.switchNode(role, fieldName, bool);
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsRoleService.detail(params);
      return promise.then(function(data) {
        return $scope.role = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsRoleListCtrl', function($scope, $routeParams, $filter, CommonService, WmsRoleService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [30, 50, 100, 200];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsRoleService.add($scope.role);
      return promise.then(function(data) {
        $scope.role.id = data;
        $scope.items.unshift($scope.role);
        $scope.createRole = {};
        $scope.role = {};
        return initSearch();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsRoleService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.updateName = function(role, fieldName) {
      var promise;
      if (ClickEditService.updateNode(role, fieldName)) {
        promise = WmsRoleService.updateName(role);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(role, fieldName, bool) {
      return ClickEditService.switchNode(role, fieldName, bool);
    };
    prepareConst = function() {};
    main = function() {
      var promise;
      $scope.createRole = {};
      $scope.role = {
        sellerRole: false
      };
      promise = WmsRoleService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  "use strict";
  angular.module("app.controllers").controller("WmsRouteIndexCtrl", function($scope, WmsMemberService, WmsMemberRoleService, SessionService, WmsMenuService) {
    var init;
    init = function() {
      var params, promise;
      $scope.username = SessionService.getUsername();
      $scope.sellerId = SessionService.getSellerId();
      params = {
        id: $scope.sellerId
      };
      promise = WmsMemberRoleService.detailBySession();
      return promise.then(function(data) {
        var roleHref;
        $scope.aclList = data;
        roleHref = '';
        $scope.roleHrefList = WmsMenuService.getRoleHrefList();
        $scope.commonHref = WmsMenuService.getCommonHref();
        angular.forEach($scope.aclList, function(acl) {
          if ($scope.roleHrefList[acl]) {
            return roleHref += $scope.roleHrefList[acl];
          }
        });
        roleHref += $scope.commonHref;
        return SessionService.setHrefList(roleHref);
      });
    };
    return init();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerAvailableContainerListCtrl', function($scope, $routeParams, $filter, $i18next, ModalService, CommonService, WmsContainerService, WmsSellerAvailableContainerService, ClickEditService, WmsSellerService, WmsSellerAvailableService) {
    var convertContainerList, initSearch, main, prepareConst;
    $scope.searchContainerList = function(containerKeywords) {
      return $scope.currentContainerList = $filter('filter')($scope.containerList, containerKeywords);
    };
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      if (!$scope.sellerAvailableContainer.hasOwnProperty("containerId")) {
        return ModalService.showMessageOnError($i18next("wms:ui.tips.chooseLeftSideContainer"));
      } else {
        promise = WmsSellerAvailableContainerService.add($scope.sellerAvailableContainer);
        return promise.then(function(data) {
          $scope.sellerAvailableContainer.id = data;
          $scope.items.unshift($scope.sellerAvailableContainer);
          $scope.itemsMapByContainerId[$scope.sellerAvailableContainer.containerId] = $scope.sellerAvailableContainer;
          $scope.createSellerAvailableContainer = {};
          $scope.sellerAvailableContainer = {
            sellerId: $routeParams.sellerId,
            payMode: "pre",
            price: "0",
            quantity: "0"
          };
          convertContainerList();
          return initSearch();
        });
      }
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsSellerAvailableContainerService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.updateQuantity = function(sellerAvailableContainer, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableContainer, fieldName) && sellerAvailableContainer.payMode === 'post') {
        promise = WmsSellerAvailableContainerService.updateQuantity(sellerAvailableContainer);
        return promise.then(function() {});
      }
    };
    $scope.updatePrice = function(sellerAvailableContainer, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableContainer, fieldName)) {
        promise = WmsSellerAvailableContainerService.updatePrice(sellerAvailableContainer);
        return promise.then(function() {});
      }
    };
    $scope.updatePayMode = function(sellerAvailableContainer, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableContainer, fieldName)) {
        promise = WmsSellerAvailableContainerService.updatePayMode(sellerAvailableContainer);
        return promise.then(function() {});
      }
    };
    $scope.disabledSellerAvailableContainer = function(sellerAvailableContainer, bool) {
      var promise;
      promise = WmsSellerAvailableContainerService.updateDisabled(sellerAvailableContainer, bool);
      return promise.then(function() {
        return sellerAvailableContainer.disabled = bool;
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerAvailableContainer, fieldName, bool) {
      return ClickEditService.switchNode(sellerAvailableContainer, fieldName, bool);
    };
    $scope.checkedContainer = function(container) {
      $scope.sellerAvailableContainer.containerId = container.id;
      $scope.sellerAvailableContainer.containerName = container.name;
      return $scope.sellerAvailableContainer.containerInventory = container.totalInventory;
    };
    convertContainerList = function() {
      var i;
      i = 0;
      $scope.containerList = [];
      angular.forEach($scope.tempContainerList, function(container, key) {
        if (!$scope.itemsMapByContainerId[container.id]) {
          $scope.containerList[i] = container;
          return i++;
        }
      });
      return $scope.searchContainerList();
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsSellerAvailableService.getPayModeList();
      promise.then(function(data) {
        return $scope.payModeList = data;
      });
      params = {
        id: $scope.sellerAvailableContainer.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(data) {
        return $scope.seller = data;
      });
      promise = WmsContainerService.listAll();
      return promise.then(function(data) {
        $scope.tempContainerList = data;
        $scope.containerMap = CommonService.convertListToMap($scope.tempContainerList, "id");
        return convertContainerList();
      });
    };
    main = function() {
      var params, promise;
      $scope.createSellerAvailableContainer = {};
      $scope.sellerAvailableContainer = {
        sellerId: $routeParams.sellerId,
        payMode: "pre",
        price: "0",
        quantity: "0"
      };
      params = {
        sellerId: $routeParams.sellerId
      };
      promise = WmsSellerAvailableContainerService.listBySellerId(params);
      return promise.then(function(data) {
        $scope.items = data;
        $scope.itemsMapByContainerId = CommonService.convertListToMap(data, "containerId");
        prepareConst();
        return initSearch();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerAvailableGoodsGroupDetailCtrl', function($scope, $routeParams, CommonService, $filter, SessionService, ClickEditService, WmsSellerAvailableGoodsGroupService, WmsSellerAvailableGoodsService, WmsGoodsService, WmsSellerAvailableGoodsGroupRefService) {
    var filterAvailableGoodsList, getAvailableGoodsList, getGoodsGroupRefList, main, prepareConst;
    $scope.search = function() {
      return $scope.filteredAvailableGoodsList = $filter('filter')($scope.availableGoodsList, $scope.searchOption.keywords);
    };
    $scope.searchRef = function() {
      return $scope.filteredGoodsGroupRefList = $filter('filter')($scope.goodsGroupRefList, $scope.searchOption.keywordsRef);
    };
    $scope.addGoods = function(goodsId) {
      var promise;
      $scope.goodsGroupRef = {
        goodsId: goodsId,
        goodsGroupId: $scope.goodsGroupId
      };
      promise = WmsSellerAvailableGoodsGroupRefService.add($scope.goodsGroupRef);
      return promise.then(function(data) {
        $scope.goodsGroupRef.id = data;
        $scope.goodsGroupRef.goodsNumber = 1;
        $scope.goodsGroupRefList.unshift($scope.goodsGroupRef);
        $scope.goodsGroupRefGoodsMap = CommonService.convertListToMap($scope.goodsGroupRefList, "goodsId");
        $scope.availableGoodsList = filterAvailableGoodsList($scope.availableGoodsList, $scope.goodsGroupRefGoodsMap);
        $scope.search();
        return $scope.searchRef();
      });
    };
    $scope.updateGoodsNumber = function(goodsGroup, fieldName) {
      var promise;
      if (ClickEditService.updateNode(goodsGroup, fieldName)) {
        promise = WmsSellerAvailableGoodsGroupRefService.updateGoodsNumber(goodsGroup);
        return promise.then(function() {});
      }
    };
    $scope.goodsGroupRefDelete = function(goodsGroupRef) {
      var params, promise;
      params = {
        id: goodsGroupRef.id
      };
      promise = WmsSellerAvailableGoodsGroupRefService["delete"](params);
      return promise.then(function() {
        getGoodsGroupRefList();
        return getAvailableGoodsList();
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(goodsGroup, fieldName, bool) {
      return ClickEditService.switchNode(goodsGroup, fieldName, bool);
    };
    filterAvailableGoodsList = function(availableGoodsList, goodsGroupRefGoodsMap) {
      var returnList;
      returnList = [];
      angular.forEach(availableGoodsList, function(availableGoods) {
        if (!goodsGroupRefGoodsMap.hasOwnProperty(availableGoods.goodsId)) {
          return returnList.push(availableGoods);
        }
      });
      return returnList;
    };
    getGoodsGroupRefList = function() {
      var params, promise;
      params = {
        goodsGroupId: $scope.goodsGroupId
      };
      promise = WmsSellerAvailableGoodsGroupRefService.listByGoodsGroupId(params);
      return promise.then(function(data) {
        $scope.goodsGroupRefList = data;
        $scope.goodsGroupRefGoodsMap = CommonService.convertListToMap($scope.goodsGroupRefList, "goodsId");
        angular.forEach($scope.goodsGroupRefList, function(goodsGroupRef, key) {
          $scope.goodsGroupRefList[key].goodsName = $scope.goodsMap[goodsGroupRef.goodsId].name;
          return $scope.goodsGroupRefList[key].barCode = $scope.goodsMap[goodsGroupRef.goodsId].barCode;
        });
        return $scope.searchRef();
      });
    };
    getAvailableGoodsList = function() {
      var params, promise;
      params = {
        sellerId: $scope.sellerId,
        disabled: 0
      };
      promise = WmsSellerAvailableGoodsService.listBySellerIdAndDisabled(params);
      return promise.then(function(data) {
        $scope.availableGoodsAllMap = CommonService.convertListToMap(data, "goodsId");
        $scope.availableGoodsList = filterAvailableGoodsList(data, $scope.goodsGroupRefGoodsMap);
        angular.forEach($scope.availableGoodsList, function(availableGoods, key) {
          $scope.availableGoodsList[key].goodsName = $scope.goodsMap[availableGoods.goodsId].name;
          return $scope.availableGoodsList[key].barCode = $scope.goodsMap[availableGoods.goodsId].barCode;
        });
        return $scope.search();
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsGoodsService.mapGoods();
      return promise.then(function(data) {
        $scope.goodsMap = data;
        getGoodsGroupRefList();
        return getAvailableGoodsList();
      });
    };
    main = function() {
      var params, promise;
      $scope.sellerId = SessionService.getSellerId();
      $scope.goodsGroupId = $routeParams.id;
      $scope.searchOption = {
        "keywords": "",
        "keywordsRef": ""
      };
      params = {
        id: $routeParams.id
      };
      promise = WmsSellerAvailableGoodsGroupService.detail(params);
      return promise.then(function(data) {
        $scope.sellerAvailableGoodsGroup = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerAvailableGoodsGroupEditCtrl', function($scope, $routeParams, CommonService, ClickEditService, SessionService, WmsSellerAvailableGoodsGroupService) {
    var main;
    $scope.updateDisabled = function(sellerAvailableGoodsGroup, bool) {
      var params, promise;
      params = {
        id: sellerAvailableGoodsGroup.id,
        disabled: bool
      };
      promise = WmsSellerAvailableGoodsGroupService.updateDisabled(params);
      return promise.then(function() {
        return sellerAvailableGoodsGroup.disabled = bool;
      });
    };
    $scope.updateBarCode = function(sellerAvailableGoodsGroup, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableGoodsGroup, fieldName)) {
        promise = WmsSellerAvailableGoodsGroupService.updateBarCode(sellerAvailableGoodsGroup);
        return promise.then(function() {});
      }
    };
    $scope.updateGroupName = function(sellerAvailableGoodsGroup, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableGoodsGroup, fieldName)) {
        promise = WmsSellerAvailableGoodsGroupService.updateGroupName(sellerAvailableGoodsGroup);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerAvailableGoodsGroup, fieldName, bool) {
      return ClickEditService.switchNode(sellerAvailableGoodsGroup, fieldName, bool);
    };
    main = function() {
      var params, promise;
      $scope.sellerId = SessionService.getSellerId();
      $scope.searchOption = {
        "keywords": ""
      };
      params = {
        id: $routeParams.id
      };
      promise = WmsSellerAvailableGoodsGroupService.detail(params);
      return promise.then(function(data) {
        return $scope.sellerAvailableGoodsGroup = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsAvailableGoodsGroupListCtrl', function($scope, $routeParams, $filter, CommonService, ClickEditService, SessionService, WmsSellerAvailableGoodsGroupService, WmsSellerService, WmsSellerAvailableGoodsService, WmsGoodsService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsSellerAvailableGoodsGroupService.add($scope.sellerAvailableGoodsGroup);
      return promise.then(function(data) {
        $scope.sellerAvailableGoodsGroup.id = data;
        $scope.sellerAvailableGoodsGroup.disabled = false;
        $scope.items.unshift($scope.sellerAvailableGoodsGroup);
        $scope.createAvailableGoodsGroup = {};
        $scope.sellerAvailableGoodsGroup = {};
        return initSearch();
      });
    };
    $scope.updateDisabled = function(sellerAvailableGoodsGroup, bool) {
      var params, promise;
      params = {
        id: sellerAvailableGoodsGroup.id,
        disabled: bool
      };
      promise = WmsSellerAvailableGoodsGroupService.updateDisabled(params);
      return promise.then(function() {
        return sellerAvailableGoodsGroup.disabled = bool;
      });
    };
    $scope.updateBarCode = function(sellerAvailableGoodsGroup, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableGoodsGroup, fieldName)) {
        promise = WmsSellerAvailableGoodsGroupService.updateBarCode(sellerAvailableGoodsGroup);
        return promise.then(function() {});
      }
    };
    $scope.updateGroupName = function(sellerAvailableGoodsGroup, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableGoodsGroup, fieldName)) {
        promise = WmsSellerAvailableGoodsGroupService.updateGroupName(sellerAvailableGoodsGroup);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerAvailableGoodsGroup, fieldName, bool) {
      return ClickEditService.switchNode(sellerAvailableGoodsGroup, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      params = {
        sellerId: $scope.sellerId,
        disabled: 0
      };
      promise = WmsSellerAvailableGoodsService.listBySellerIdAndDisabled(params);
      promise.then(function(data) {
        return $scope.availableGoodsList = data;
      });
      promise = WmsGoodsService.listAll(params);
      return promise.then(function(data) {
        $scope.goodsList = data;
        return $scope.goodsMap = CommonService.convertListToMap($scope.goodsList, 'id');
      });
    };
    main = function() {
      var params, promise;
      $scope.sellerId = SessionService.getSellerId();
      $scope.createAvailableGoodsGroup = {};
      $scope.sellerAvailableGoodsGroup = {
        sellerId: $scope.sellerId
      };
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerAvailableGoodsGroupService.listBySellerId(params);
      return promise.then(function(data) {
        $scope.items = data;
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerAvailableGoodsListCtrl', function($scope, $routeParams, $filter, $i18next, ModalService, CommonService, WmsGoodsService, WmsSellerAvailableGoodsService, ClickEditService, WmsSellerService) {
    var convertGoodsList, initSearch, main, prepareConst;
    $scope.searchGoodsList = function(goodsKeywords) {
      return $scope.currentGoodsList = $filter('filter')($scope.goodsList, goodsKeywords);
    };
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      if (!$scope.sellerAvailableGoods.hasOwnProperty("goodsId")) {
        return ModalService.showMessageOnError($i18next("wms:ui.tips.chooseLeftSideGoods"));
      } else {
        promise = WmsSellerAvailableGoodsService.add($scope.sellerAvailableGoods);
        return promise.then(function(data) {
          $scope.sellerAvailableGoods.id = data;
          $scope.items.unshift($scope.sellerAvailableGoods);
          $scope.itemsMapByGoodsId[$scope.sellerAvailableGoods.goodsId] = $scope.sellerAvailableGoods;
          $scope.createSellerAvailableGoods = {};
          $scope.sellerAvailableGoods = {
            sellerId: $routeParams.sellerId,
            payMode: "pre",
            price: "0",
            quantity: "0"
          };
          convertGoodsList();
          return initSearch();
        });
      }
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsSellerAvailableGoodsService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.updateShelfLocation = function(sellerAvailableGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableGoods, fieldName)) {
        promise = WmsSellerAvailableGoodsService.updateShelfLocation(sellerAvailableGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateEncodeType = function(sellerAvailableGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableGoods, fieldName)) {
        promise = WmsSellerAvailableGoodsService.updateEncodeType(sellerAvailableGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateQuantity = function(sellerAvailableGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableGoods, fieldName) && sellerAvailableGoods.payMode === 'post') {
        promise = WmsSellerAvailableGoodsService.updateQuantity(sellerAvailableGoods);
        return promise.then(function() {});
      }
    };
    $scope.updatePrice = function(sellerAvailableGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableGoods, fieldName)) {
        promise = WmsSellerAvailableGoodsService.updatePrice(sellerAvailableGoods);
        return promise.then(function() {});
      }
    };
    $scope.updatePayMode = function(sellerAvailableGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerAvailableGoods, fieldName)) {
        promise = WmsSellerAvailableGoodsService.updatePayMode(sellerAvailableGoods);
        return promise.then(function() {});
      }
    };
    $scope.disabledSellerAvailableGoods = function(sellerAvailableGoods, bool) {
      var promise;
      promise = WmsSellerAvailableGoodsService.updateDisabled(sellerAvailableGoods, bool);
      return promise.then(function() {
        return sellerAvailableGoods.disabled = bool;
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerAvailableGoods, fieldName, bool) {
      return ClickEditService.switchNode(sellerAvailableGoods, fieldName, bool);
    };
    $scope.checkedGoods = function(goods) {
      $scope.sellerAvailableGoods.goodsId = goods.id;
      return $scope.sellerAvailableGoods.goodsName = goods.name;
    };
    convertGoodsList = function() {
      var i;
      i = 0;
      $scope.goodsList = [];
      angular.forEach($scope.tempGoodsList, function(goods, key) {
        if (!$scope.itemsMapByGoodsId[goods.id]) {
          $scope.goodsList[i] = goods;
          return i++;
        }
      });
      return $scope.searchGoodsList();
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsSellerAvailableGoodsService.listEncodeType();
      promise.then(function(data) {
        var encodeType, _i, _len, _results;
        $scope.encodeTypeList = data;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          encodeType = data[_i];
          _results.push($scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType." + encodeType));
        }
        return _results;
      });
      params = {
        id: $routeParams.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(data) {
        return $scope.seller = data;
      });
      promise = WmsGoodsService.listAll();
      return promise.then(function(data) {
        $scope.tempGoodsList = data;
        $scope.goodsMap = CommonService.convertListToMap($scope.tempGoodsList, "id");
        angular.forEach($scope.items, function(item, key) {
          return $scope.items[key].goodsName = $scope.goodsMap[item.goodsId].name;
        });
        return convertGoodsList();
      });
    };
    main = function() {
      var params, promise;
      $scope.createSellerAvailableGoods = {};
      $scope.encodeTypeMap = {};
      $scope.sellerAvailableGoods = {
        sellerId: $routeParams.sellerId,
        price: "0",
        quantity: "0"
      };
      params = {
        sellerId: $routeParams.sellerId
      };
      promise = WmsSellerAvailableGoodsService.listBySellerId(params);
      return promise.then(function(data) {
        $scope.items = data;
        $scope.itemsMapByGoodsId = CommonService.convertListToMap(data, "goodsId");
        prepareConst();
        return initSearch();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').filter('calTotalGoodsNumber', function() {
    return function(items) {
      var goodsNumber;
      goodsNumber = 0;
      angular.forEach(items, function(item) {
        if (item) {
          return goodsNumber = parseFloat(goodsNumber) + parseFloat(item.goodsNumber);
        }
      });
      return goodsNumber;
    };
  }).controller('WmsSellerComboGoodsDetailCtrl', function($scope, $routeParams, CommonService, $filter, SessionService, ClickEditService, WmsSellerGoodsService, WmsSellerComboGoodsService, $i18next, WmsSellerService) {
    var getSellerComboGoodsList, main, prepareConst;
    $scope.search = function() {
      return $scope.filteredSellerGoodsList = $filter('filter')($scope.selectSellerGoodsList, $scope.searchOption.keywords);
    };
    $scope.searchCombo = function() {
      return $scope.filteredSellerComboGoodsList = $filter('filter')($scope.sellerComboGoodsList, $scope.searchOption.keywordsRef);
    };
    $scope.syncSellerGoodsPrice = function(sellerGoods, price) {
      var promise;
      sellerGoods.price = price;
      promise = WmsSellerGoodsService.updatePrice(sellerGoods);
      return promise.then(function() {});
    };
    $scope.updateSellerGoodsPrice = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updatePrice(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateSellerGoodsBarcode = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateBarcode(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.addComboGoods = function(sellerGoodsId) {
      var promise;
      $scope.sellerComboGoods = {
        sellerGoodsId: sellerGoodsId,
        comboId: $scope.comboId,
        goodsNumber: 1
      };
      promise = WmsSellerComboGoodsService.add($scope.sellerComboGoods);
      return promise.then(function(data) {
        return getSellerComboGoodsList();
      });
    };
    $scope.updateGoodsNumber = function(sellerComboGoods, fieldName) {
      var promise;
      promise = WmsSellerComboGoodsService.updateGoodsNumber(sellerComboGoods);
      return promise.then(function() {
        return getSellerComboGoodsList();
      });
    };
    $scope.changeComboGoodsNumber = function(item, value) {
      item.goodsNumber = parseInt(item.goodsNumber) + value;
      if (item.goodsNumber <= 1) {
        item.goodsNumber = 1;
      }
      return $scope.updateGoodsNumber(item, 'goodsNumber');
    };
    $scope.comboGoodsDelete = function(sellerComboGoods) {
      var params, promise;
      params = {
        id: sellerComboGoods.id
      };
      promise = WmsSellerComboGoodsService["delete"](params);
      return promise.then(function() {
        return getSellerComboGoodsList();
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerComboGoods, fieldName, bool) {
      return ClickEditService.switchNode(sellerComboGoods, fieldName, bool);
    };
    getSellerComboGoodsList = function() {
      var params, promise;
      params = {
        comboId: $scope.comboId
      };
      promise = WmsSellerComboGoodsService.listByComboId(params);
      return promise.then(function(data) {
        $scope.sellerComboGoodsList = data;
        $scope.sellerComboGoodsMapBySellerGoodsId = CommonService.convertListToMap($scope.sellerComboGoodsList, 'sellerGoodsId');
        $scope.selectSellerGoodsList = [];
        angular.forEach($scope.sellerGoodsList, function(sellerGoods) {
          if (!$scope.sellerComboGoodsMapBySellerGoodsId.hasOwnProperty(sellerGoods.id)) {
            return $scope.selectSellerGoodsList.push(sellerGoods);
          }
        });
        $scope.totalPrice = 0;
        angular.forEach($scope.sellerComboGoodsList, function(item) {
          return $scope.totalPrice = parseFloat($scope.totalPrice) + parseFloat($scope.sellerGoodsMap[item.sellerGoodsId].price) * parseFloat(item.goodsNumber);
        });
        return $scope.search();
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(data) {
        return $scope.seller = data;
      });
      promise = WmsSellerGoodsService.listEncodeType();
      promise.then(function(data) {
        var encodeType, _i, _len, _results;
        $scope.encodeTypeList = data;
        $scope.encodeTypeMap = [];
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          encodeType = data[_i];
          _results.push($scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType." + encodeType));
        }
        return _results;
      });
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerGoodsService.listBySellerIdAndNoCombo(params);
      return promise.then(function(data) {
        $scope.sellerGoodsList = data;
        $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, 'id');
        return getSellerComboGoodsList();
      });
    };
    main = function() {
      var params, promise;
      $scope.comboId = $routeParams.id;
      $scope.searchOption = {
        "keywords": "",
        "keywordsRef": ""
      };
      if (SessionService.getSellerId()) {
        $scope.isSeller = true;
      }
      params = {
        id: $scope.comboId
      };
      promise = WmsSellerGoodsService.detail(params);
      return promise.then(function(data) {
        $scope.sellerGoods = data;
        $scope.sellerId = $scope.sellerGoods.sellerId;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerDetailCtrl', function($scope, $routeParams, $filter, CommonService, WmsSellerService, WmsAddressService, WmsLogisticCompanyService, WmsSellerFreightGroupService, ClickEditService) {
    var main, prepareConst;
    $scope.updateName = function(seller, fieldName) {
      var promise;
      if (ClickEditService.updateNode(seller, fieldName)) {
        promise = WmsSellerService.updateName(seller);
        return promise.then(function() {});
      }
    };
    $scope.updateComment = function(seller, fieldName) {
      var promise;
      if (ClickEditService.updateNode(seller, fieldName)) {
        promise = WmsSellerService.updateComment(seller);
        return promise.then(function() {});
      }
    };
    $scope.updateSellerFreightGroupId = function(seller, fieldName) {
      var promise;
      if (ClickEditService.updateNode(seller, fieldName)) {
        promise = WmsSellerService.updateSellerFreightGroupId(seller);
        return promise.then(function() {});
      }
    };
    $scope.updateCreditLine = function(seller, fieldName) {
      var promise;
      if (ClickEditService.updateNode(seller, fieldName)) {
        promise = WmsSellerService.updateCreditLine(seller);
        return promise.then(function() {});
      }
    };
    $scope.updateIsWeightSet = function(seller, boolValue) {
      var promise;
      seller.isWeightSet = boolValue;
      promise = WmsSellerService.updateIsWeightSet(seller);
      return promise.then(function() {});
    };
    $scope.getCityList = function() {
      var params, promise;
      params = {
        level: "2",
        parentId: $scope.seller.province
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.cityList = data;
        });
      } else {
        $scope.seller.city = 0;
        return $scope.cityList = [];
      }
    };
    $scope.getDistrictList = function() {
      var params, promise;
      params = {
        level: "3",
        parentId: $scope.seller.city
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.districtList = data;
        });
      } else {
        $scope.seller.district = 0;
        return $scope.districtList = [];
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(seller, fieldName, bool) {
      return ClickEditService.switchNode(seller, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsAddressService.listAllProvince();
      promise.then(function(data) {
        return $scope.provinceList = data;
      });
      promise = WmsLogisticCompanyService.mapAll();
      promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
      promise = WmsSellerFreightGroupService.listAll();
      return promise.then(function(data) {
        var item, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          $scope.sellerFreightGroupMap[item.id] = item;
          if (!$scope.sellerFreightGroupList.hasOwnProperty(item.sellerId)) {
            $scope.sellerFreightGroupList[item.sellerId] = [];
          }
          _results.push($scope.sellerFreightGroupList[item.sellerId].unshift(item));
        }
        return _results;
      });
    };
    main = function() {
      var params, promise;
      $scope.sellerFreightGroupMap = {};
      $scope.sellerFreightGroupList = {};
      params = {
        id: $routeParams.sellerId
      };
      promise = WmsSellerService.detail(params);
      return promise.then(function(data) {
        $scope.seller = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerFreightGroupListCtrl', function($scope, $routeParams, $filter, CommonService, WmsSellerFreightGroupService, WmsLogisticCompanyService, WmsFreightGroupService, WmsSellerService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsSellerFreightGroupService.add($scope.sellerFreightGroup);
      return promise.then(function(data) {
        $scope.sellerFreightGroup.id = data;
        $scope.items.unshift($scope.sellerFreightGroup);
        $scope.createSellerFreightGroup = {};
        $scope.sellerFreightGroup = {};
        return initSearch();
      });
    };
    $scope.updateFreightGroupId = function(sellerFreightGroup, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerFreightGroup, fieldName)) {
        promise = WmsSellerFreightGroupService.updateFreightGroupId(sellerFreightGroup);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerFreightGroup, fieldName, bool) {
      var params, promise;
      if (fieldName === 'freightGroupId' && !$scope.companyFreightGroup.hasOwnProperty(sellerFreightGroup.logisticCompanyId)) {
        $scope.companyFreightGroup[sellerFreightGroup.logisticCompanyId] = {};
        params = {
          logisticCompanyId: sellerFreightGroup.logisticCompanyId
        };
        promise = WmsFreightGroupService.listByLogisticCompanyId(params);
        promise.then(function(data) {
          return $scope.companyFreightGroup[sellerFreightGroup.logisticCompanyId] = data;
        });
      }
      return ClickEditService.switchNode(sellerFreightGroup, fieldName, bool);
    };
    $scope.getFreightGroupListByLogisticCompanyId = function() {
      var params, promise;
      params = {
        logisticCompanyId: $scope.sellerFreightGroup.logisticCompanyId
      };
      promise = WmsFreightGroupService.listByLogisticCompanyId(params);
      return promise.then(function(data) {
        return $scope.freightGroupList = data;
      });
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsLogisticCompanyService.mapAll();
      promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
      promise = WmsFreightGroupService.mapAll();
      promise.then(function(data) {
        return $scope.freightGroupMap = data;
      });
      params = {
        id: $routeParams.sellerId
      };
      promise = WmsSellerService.detail(params);
      return promise.then(function(data) {
        return $scope.seller = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.createSellerFreightGroup = {};
      $scope.sellerFreightGroup = {
        sellerId: $routeParams.sellerId
      };
      $scope.companyFreightGroup = {};
      params = {
        sellerId: $routeParams.sellerId
      };
      promise = WmsSellerFreightGroupService.listBySellerId(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerGoodsEditCtrl', function($scope, $routeParams, CommonService, WmsSellerGoodsService, ClickEditService, WmsLogisticRequireService, FileUploader, WmsConfigService, SessionService, $i18next, DeviceDriverService) {
    var main, prepareConst;
    $scope.updateBarCode = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateBarCode(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateWeight = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateWeight(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateName(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateAbbrName = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateAbbrName(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updatePrepackWeight = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updatePrepackWeight(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateLength = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateLength(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateHeight = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateHeight(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateWidth = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateWidth(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateShelfLocation = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateShelfLocation(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateEncodeType = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateEncodeType(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateInventory = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateInventory(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updatePrice = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updatePrice(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateWeight = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateWeight(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateIsCombo = function(sellerGoods) {
      var promise;
      console.log(sellerGoods);
      promise = WmsSellerGoodsService.updateIsCombo(sellerGoods);
      return promise.then(function() {});
    };
    $scope.updateWeightByScale = function(sellerGoods) {
      var promise;
      promise = DeviceDriverService.getWeight();
      return promise.then(function(data) {
        $scope.deviceWeight.weight = data;
        sellerGoods.weight = data;
        promise = WmsSellerGoodsService.updateWeight(sellerGoods);
        return promise.then(function() {});
      });
    };
    $scope.updatePrepackWeightByScale = function(sellerGoods) {
      var promise;
      promise = DeviceDriverService.getWeight();
      return promise.then(function(data) {
        $scope.deviceWeight.prepackWeight = data;
        sellerGoods.prepackWeight = data;
        promise = WmsSellerGoodsService.updatePrepackWeight(sellerGoods);
        return promise.then(function() {});
      });
    };
    $scope.checkLogisticRequire = function() {
      var promise;
      $scope.sellerGoods.logisticRequire = [];
      angular.forEach($scope.logisticRequireEnum, function(require) {
        if ($scope.logisticRequireList[require]) {
          return $scope.sellerGoods.logisticRequire.push(require);
        }
      });
      if ($scope.sellerGoods.logisticRequire.length === 0) {
        $scope.sellerGoods.logisticRequire = [''];
      }
      promise = WmsSellerGoodsService.updateLogisticRequire($scope.sellerGoods);
      return promise.then(function() {});
    };
    $scope.switchNode = function(sellerGoods, fieldName, bool) {
      return ClickEditService.switchNode(sellerGoods, fieldName, bool);
    };
    $scope.uploadGoodsImages = function(sellerGoods, queueImage) {
      queueImage.upload();
      return $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        var promise;
        if (response.success) {
          $scope.sellerGoods[sellerGoods.id + 'image'] = false;
          $scope.uploader.queue = [];
          sellerGoods.image = response.data;
          promise = WmsSellerGoodsService.updateImage(sellerGoods);
          return promise.then(function() {});
        } else {
          return ModalService.showMessageOnError($i18next("wms:message.apiError." + response.errorCode));
        }
      };
    };
    prepareConst = function() {
      var promise, uploader;
      uploader = $scope.uploader = new FileUploader({
        url: WmsConfigService.getFileHost() + '/upload_images/goods'
      });
      uploader.filters.push({
        name: 'imageFilter',
        fn: function(item, options) {
          var type;
          type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });
      promise = WmsLogisticRequireService.listAll();
      promise.then(function(data) {
        return $scope.logisticRequireEnum = data;
      });
      promise = WmsSellerGoodsService.listEncodeType();
      return promise.then(function(data) {
        var encodeType, _i, _len, _results;
        $scope.encodeTypeList = data;
        $scope.encodeTypeMap = [];
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          encodeType = data[_i];
          _results.push($scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType." + encodeType));
        }
        return _results;
      });
    };
    main = function() {
      var params, promise;
      $scope.logisticRequireList = [];
      if (SessionService.getSellerId()) {
        $scope.isSeller = true;
      }
      $scope.imgHost = WmsConfigService.getImgHost();
      $scope.deviceWeight = {};
      params = {
        id: $routeParams.id
      };
      promise = WmsSellerGoodsService.detail(params);
      promise.then(function(data) {
        $scope.sellerGoods = data;
        return angular.forEach($scope.sellerGoods.logisticRequire, function(require) {
          return $scope.logisticRequireList[require] = true;
        });
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerGoodsGroupListCtrl', function($scope, $routeParams, $filter, CommonService, WmsSellerGoodsService, WmsGoodsService, WmsPlatformSourceService, WmsSellerAvailableGoodsService, ClickEditService, SessionService, WmsSellerAvailableGoodsGroupService) {
    var getSellerGoodsListByPlatformSource, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.availableGoodsGroupList, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsSellerGoodsService["delete"](params);
      return promise.then(function() {
        return getSellerGoodsListByPlatformSource();
      });
    };
    $scope.updateUniqueCode = function(sellerGoods, fieldName) {
      var promise;
      if (sellerGoods.id) {
        if (ClickEditService.updateNode(sellerGoods, fieldName)) {
          promise = WmsSellerGoodsService.updateUniqueCode(sellerGoods);
          return promise.then(function() {});
        }
      } else {
        promise = WmsSellerGoodsService.add(sellerGoods);
        return promise.then(function(data) {
          return sellerGoods.id = data;
        });
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerGoods, fieldName, bool) {
      return ClickEditService.switchNode(sellerGoods, fieldName, bool);
    };
    $scope.showSellerGoodsMap = function(platformSourceId, objectId, fieldName) {
      if ($scope.sellerGroupMap[platformSourceId] === void 0 || $scope.sellerGroupMap[platformSourceId] === null) {
        $scope.sellerGroupMap[platformSourceId] = [];
      }
      if ($scope.sellerGroupMap[platformSourceId][objectId] === void 0 || $scope.sellerGroupMap[platformSourceId][objectId] === null) {
        $scope.sellerGroupMap[platformSourceId][objectId] = {};
        $scope.sellerGroupMap[platformSourceId][objectId] = {
          "uniqueCode": " ",
          "objectId": objectId,
          "platformSourceId": platformSourceId,
          "sellerId": SessionService.getSellerId(),
          "goodsType": "group"
        };
      }
      return $scope.switchNode($scope.sellerGroupMap[platformSourceId][objectId], fieldName, true);
    };
    getSellerGoodsListByPlatformSource = function() {
      var params, promise;
      params = {
        sellerId: SessionService.getSellerId(),
        goodsType: "group"
      };
      promise = WmsSellerGoodsService.listBySellerIdAndGoodsType(params);
      return promise.then(function(data) {
        $scope.sellerGroupList = data;
        $scope.sellerGroupMapByObjectId = CommonService.convertListToMap($scope.sellerGroupList, "objectId");
        $scope.sellerGroupListByPlatformSource = [];
        angular.forEach($scope.platformSourceMap, function(item) {
          return $scope.sellerGroupListByPlatformSource[item.id] = [];
        });
        angular.forEach($scope.sellerGroupList, function(sellerGoods) {
          if ($scope.sellerGroupListByPlatformSource[sellerGoods.platformSourceId] === void 0) {
            $scope.sellerGroupListByPlatformSource[sellerGoods.platformSourceId] = [];
          }
          return $scope.sellerGroupListByPlatformSource[sellerGoods.platformSourceId].push(sellerGoods);
        });
        $scope.sellerGroupMap = [];
        angular.forEach($scope.sellerGroupListByPlatformSource, function(sellerGroupList, platformSourceId) {
          if (sellerGroupList.length > 0) {
            return $scope.sellerGroupMap[platformSourceId] = CommonService.convertListToMap(sellerGroupList, "objectId");
          } else {
            return $scope.sellerGroupMap[platformSourceId] = {};
          }
        });
        return initSearch();
      });
    };
    prepareConst = function() {
      var promise;
      promise = WmsPlatformSourceService.mapPlatformSource();
      return promise.then(function(data) {
        $scope.platformSourceMap = data;
        $scope.sellerGroupListByPlatformSource = [];
        return getSellerGoodsListByPlatformSource();
      });
    };
    main = function() {
      var params, promise;
      $scope.createSellerGoods = {};
      $scope.sellerGroupListByPlatformSource = [];
      $scope.sellerGoods = {
        sellerId: SessionService.getSellerId()
      };
      $scope.sellerId = SessionService.getSellerId();
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerAvailableGoodsGroupService.listBySellerId(params);
      return promise.then(function(data) {
        $scope.availableGoodsGroupList = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerGoodsIncreaseCtrl', function($scope, $routeParams, WmsMemberService, WmsSellerService, WmsSellerGoodsService, WmsSellerGoodsInventoryLogService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [5, 10, 20, 50, 100];
      $scope.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.filteredItems = $scope.sellerGoodsInventoryLogList;
      return $scope.select($scope.currentPage);
    };
    $scope.calcInventory = function() {
      var str;
      if ($scope.sellerGoodsInventoryLog.number) {
        str = $scope.sellerGoods.inventory + ' + ' + $scope.sellerGoodsInventoryLog.number + " = ";
        return $scope.sellerGoodsInventoryLog.calcInventory = str + (parseInt($scope.sellerGoods.inventory) + parseInt($scope.sellerGoodsInventoryLog.number));
      } else {
        return $scope.sellerGoodsInventoryLog.calcInventory = "";
      }
    };
    $scope.increaseInventory = function(sellerGoodsInventoryLog) {
      var promise;
      promise = WmsSellerGoodsInventoryLogService.increaseInventory($scope.sellerGoodsInventoryLog);
      return promise.then(function(data) {
        console.log(data);
        sellerGoodsInventoryLog = data;
        $scope.sellerGoods.inventory = parseInt($scope.sellerGoods.inventory) + parseInt($scope.sellerGoodsInventoryLog.number);
        $scope.sellerGoodsInventoryLog = {
          sellerGoodsId: $scope.sellerGoodsId
        };
        $scope.sellerGoodsInventoryLogList.unshift(sellerGoodsInventoryLog);
        return initSearch();
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.sellerGoods.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(seller) {
        return $scope.seller = seller;
      });
      params = {
        sellerGoodsId: $scope.sellerGoodsId
      };
      promise = WmsSellerGoodsInventoryLogService.listBySellerGoodsId(params);
      promise.then(function(data) {
        $scope.sellerGoodsInventoryLogList = data;
        return initSearch();
      });
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.sellerGoodsId = $routeParams.sellerGoodsId;
      params = {
        id: $scope.sellerGoodsId
      };
      promise = WmsSellerGoodsService.detail(params);
      return promise.then(function(sellerGoods) {
        $scope.sellerGoods = sellerGoods;
        $scope.sellerGoodsInventoryLog = {
          sellerGoodsId: $scope.sellerGoodsId
        };
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerGoodsListCtrl', function($scope, $routeParams, $filter, CommonService, WmsSellerGoodsService, ClickEditService, $i18next, WmsLogisticRequireService, SessionService, WmsConfigService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      if ($scope.sellerGoods.hasOwnProperty("name")) {
        promise = WmsSellerGoodsService.add($scope.sellerGoods);
        return promise.then(function(data) {
          $scope.sellerGoods.id = data;
          $scope.items.unshift($scope.sellerGoods);
          $scope.createSellerGoods = {};
          $scope.sellerGoods = {
            isCombo: 0,
            sellerId: $scope.sellerId,
            encodeType: "bar",
            inventory: 0
          };
          return initSearch();
        });
      }
    };
    $scope.updateLogisticRequire = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateLogisticRequire(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateWeight = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateWeight(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateName(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateAbbrName = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateAbbrName(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updatePrepackWeight = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updatePrepackWeight(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateImage = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateImage(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateLength = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateLength(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateHeight = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateHeight(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateWidth = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateWidth(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateShelfLocation = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateShelfLocation(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateEncodeType = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateEncodeType(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updatePrice = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updatePrice(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateBarCode = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateBarCode(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateIsCombo = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateIsCombo(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerGoods, fieldName, bool) {
      return ClickEditService.switchNode(sellerGoods, fieldName, bool);
    };
    $scope.checkLogisticRequire = function() {
      var promise;
      $scope.container.logisticRequire = [];
      angular.forEach($scope.logisticRequireEnum, function(require) {
        if ($scope.logisticRequireList[require]) {
          return $scope.container.logisticRequire.push(require);
        }
      });
      if ($scope.container.logisticRequire.length === 0) {
        $scope.container.logisticRequire = [''];
      }
      promise = WmsSellerGoodsService.updateLogisticRequire($scope.container);
      return promise.then(function() {});
    };
    prepareConst = function() {
      var promise;
      promise = WmsLogisticRequireService.listAll();
      promise.then(function(data) {
        return $scope.logisticRequireEnum = data;
      });
      promise = WmsSellerGoodsService.listEncodeType();
      return promise.then(function(data) {
        var encodeType, _i, _len, _results;
        $scope.encodeTypeList = data;
        $scope.encodeTypeMap = [];
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          encodeType = data[_i];
          _results.push($scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType." + encodeType));
        }
        return _results;
      });
    };
    main = function() {
      var params, promise;
      $scope.createSellerGoods = {};
      $scope.sellerId = SessionService.getSellerId();
      if (SessionService.getSellerId()) {
        $scope.isSeller = true;
      }
      $scope.imgHost = WmsConfigService.getImgHost();
      $scope.sellerGoods = {
        isCombo: 0,
        sellerId: $scope.sellerId,
        encodeType: "bar",
        inventory: 0
      };
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerGoodsService.listBySellerId(params);
      return promise.then(function(data) {
        $scope.items = data;
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerGoodsManageListCtrl', function($scope, $routeParams, $filter, CommonService, $i18next, ClickEditService, WmsSellerGoodsService, WmsLogisticRequireService, WmsSellerService, WmsConfigService, WmsSellerImportRulesService, WmsSellerGoodsUploadService) {
    var initCsv, initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      if ($scope.sellerGoods.hasOwnProperty("name")) {
        promise = WmsSellerGoodsService.add($scope.sellerGoods);
        return promise.then(function(data) {
          $scope.sellerGoods.id = data;
          $scope.items.unshift($scope.sellerGoods);
          $scope.createSellerGoods = {};
          $scope.sellerGoods = {
            isCombo: 0,
            sellerId: $scope.sellerId,
            encodeType: "bar",
            inventory: 0
          };
          return initSearch();
        });
      }
    };
    $scope.updateBarCode = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateBarCode(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateLogisticRequire = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateLogisticRequire(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateWeight = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateWeight(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateName(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateAbbrName = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateAbbrName(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updatePrepackWeight = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updatePrepackWeight(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateImage = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateImage(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateLength = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateLength(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateHeight = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateHeight(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateWidth = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateWidth(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateShelfLocation = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateShelfLocation(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateEncodeType = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateEncodeType(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateInventory = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateInventory(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updatePrice = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updatePrice(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.updateIsCombo = function(sellerGoods, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerGoods, fieldName)) {
        promise = WmsSellerGoodsService.updateIsCombo(sellerGoods);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      CommonService.switchCollapse(node);
      if (!$scope.importSellerGoods.inEditing) {
        return initCsv();
      }
    };
    $scope.switchNode = function(sellerGoods, fieldName, bool) {
      return ClickEditService.switchNode(sellerGoods, fieldName, bool);
    };
    $scope.checkLogisticRequire = function() {
      var promise;
      $scope.container.logisticRequire = [];
      angular.forEach($scope.logisticRequireEnum, function(require) {
        if ($scope.logisticRequireList[require]) {
          return $scope.container.logisticRequire.push(require);
        }
      });
      if ($scope.container.logisticRequire.length === 0) {
        $scope.container.logisticRequire = [''];
      }
      promise = WmsSellerGoodsService.updateLogisticRequire($scope.container);
      return promise.then(function() {});
    };
    $scope.exportOrder = function() {
      var promise;
      promise = WmsSellerGoodsService.exportSellerGoodsTemplate();
      return promise.then(function(data) {
        var url;
        url = WmsConfigService.getFileHost() + '/export_file/express_order?filePath=' + data;
        return window.location.href = url;
      });
    };
    $scope.deleteRow = function(index) {
      return $scope.csv.result.splice(index, 1);
    };
    $scope.upload = function() {
      var promise;
      $scope.sellerGoodsUpload.sellerId = $scope.sellerId;
      $scope.sellerGoodsUpload.fileData = JSON.stringify($scope.csv.result);
      promise = WmsSellerGoodsUploadService.add($scope.sellerGoodsUpload);
      return promise.then(function(data) {
        $scope.items = data;
        $scope.importSellerGoods = {};
        $scope.sellerGoodsUpload.fileData = null;
        initCsv();
        return initSearch();
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(data) {
        return $scope.seller = data;
      });
      promise = WmsLogisticRequireService.listAll();
      promise.then(function(data) {
        return $scope.logisticRequireEnum = data;
      });
      promise = WmsSellerGoodsService.listEncodeType();
      promise.then(function(data) {
        var encodeType, _i, _len, _results;
        $scope.encodeTypeList = data;
        $scope.encodeTypeMap = [];
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          encodeType = data[_i];
          _results.push($scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType." + encodeType));
        }
        return _results;
      });
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerImportRulesService.listBySellerIdAndGoodsImport(params);
      return promise.then(function(data) {
        $scope.sellerImportRulesList = data;
        angular.forEach($scope.sellerImportRulesList, function(sellerImportRules, key) {
          return $scope.sellerImportRulesList[key].rules = JSON.parse(sellerImportRules.rules);
        });
        $scope.sellerImportRulesMap = CommonService.convertListToMap($scope.sellerImportRulesList, 'id');
        $scope.sellerGoodsUpload.sellerImportRulesId = $scope.sellerImportRulesList[0].id;
        return $scope.rulesMap = $scope.sellerImportRulesList[0].rules;
      });
    };
    initCsv = function() {
      return $scope.csv = {
        content: null,
        header: false,
        headerVisible: false,
        separator: ',',
        separatorVisible: false,
        result: null,
        encoding: 'utf-8',
        encodingVisible: false
      };
    };
    main = function() {
      var params, promise;
      initCsv();
      $scope.createSellerGoods = {};
      $scope.importSellerGoods = {};
      $scope.sellerId = $routeParams.sellerId;
      $scope.imgHost = WmsConfigService.getImgHost();
      $scope.sellerGoodsUpload = {};
      $scope.sellerGoods = {
        isCombo: 0,
        sellerId: $scope.sellerId,
        encodeType: "bar",
        inventory: 0
      };
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerGoodsService.listBySellerId(params);
      return promise.then(function(data) {
        $scope.items = data;
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerGoodsReduceCtrl', function($scope, $routeParams, WmsMemberService, WmsSellerService, WmsSellerGoodsService, WmsSellerGoodsInventoryLogService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    initSearch = function() {
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [5, 10, 20, 50, 100];
      $scope.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.filteredItems = $scope.sellerGoodsInventoryLogList;
      return $scope.select($scope.currentPage);
    };
    $scope.calcInventory = function() {
      var str;
      if ($scope.sellerGoodsInventoryLog.number) {
        str = $scope.sellerGoods.inventory + ' - ' + $scope.sellerGoodsInventoryLog.number + " = ";
        return $scope.sellerGoodsInventoryLog.calcInventory = str + (parseInt($scope.sellerGoods.inventory) - parseInt($scope.sellerGoodsInventoryLog.number));
      } else {
        return $scope.sellerGoodsInventoryLog.calcInventory = "";
      }
    };
    $scope.reduceInventory = function(sellerGoodsInventoryLog) {
      var promise;
      promise = WmsSellerGoodsInventoryLogService.reduceInventory($scope.sellerGoodsInventoryLog);
      return promise.then(function(data) {
        sellerGoodsInventoryLog = data;
        $scope.sellerGoods.inventory = parseInt($scope.sellerGoods.inventory) - parseInt($scope.sellerGoodsInventoryLog.number);
        $scope.sellerGoodsInventoryLog = {
          sellerGoodsId: $scope.sellerGoodsId
        };
        $scope.sellerGoodsInventoryLogList.unshift(sellerGoodsInventoryLog);
        return initSearch();
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.sellerGoods.sellerId
      };
      promise = WmsSellerService.detail(params);
      promise.then(function(seller) {
        return $scope.seller = seller;
      });
      params = {
        sellerGoodsId: $scope.sellerGoodsId
      };
      promise = WmsSellerGoodsInventoryLogService.listBySellerGoodsId(params);
      promise.then(function(data) {
        $scope.sellerGoodsInventoryLogList = data;
        return initSearch();
      });
      promise = WmsMemberService.mapMember();
      return promise.then(function(data) {
        return $scope.memberMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.sellerGoodsId = $routeParams.sellerGoodsId;
      params = {
        id: $scope.sellerGoodsId
      };
      promise = WmsSellerGoodsService.detail(params);
      return promise.then(function(sellerGoods) {
        $scope.sellerGoods = sellerGoods;
        $scope.sellerGoodsInventoryLog = {
          sellerGoodsId: $scope.sellerGoodsId
        };
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerListCtrl', function($scope, $routeParams, $filter, CommonService, WmsSellerService, WmsAddressService, WmsLogisticCompanyService, WmsSellerFreightGroupService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsSellerService.add($scope.seller);
      return promise.then(function(data) {
        $scope.seller.id = data;
        $scope.seller.accountBalance = 0.00;
        $scope.items.unshift($scope.seller);
        $scope.createSeller = {};
        $scope.seller = {};
        return initSearch();
      });
    };
    $scope.updateName = function(seller, fieldName) {
      var promise;
      if (ClickEditService.updateNode(seller, fieldName)) {
        promise = WmsSellerService.updateName(seller);
        return promise.then(function() {});
      }
    };
    $scope.updateComment = function(seller, fieldName) {
      var promise;
      if (ClickEditService.updateNode(seller, fieldName)) {
        promise = WmsSellerService.updateComment(seller);
        return promise.then(function() {});
      }
    };
    $scope.updateSellerFreightGroupId = function(seller, fieldName) {
      var promise;
      if (ClickEditService.updateNode(seller, fieldName)) {
        promise = WmsSellerService.updateSellerFreightGroupId(seller);
        return promise.then(function() {});
      }
    };
    $scope.updateIsWeightSet = function(seller, fieldName) {
      var promise;
      if (ClickEditService.updateNode(seller, fieldName)) {
        promise = WmsSellerService.updateIsWeightSet(seller);
        return promise.then(function() {});
      }
    };
    $scope.updateSellerFreightGroupId = function(seller, fieldName) {
      var promise;
      if (ClickEditService.updateNode(seller, fieldName)) {
        promise = WmsSellerService.updateSellerFreightGroupId(seller);
        return promise.then(function() {});
      }
    };
    $scope.updateCreditLine = function(seller, fieldName) {
      var promise;
      if (ClickEditService.updateNode(seller, fieldName)) {
        promise = WmsSellerService.updateCreditLine(seller);
        return promise.then(function() {});
      }
    };
    $scope.getCityList = function() {
      var params, promise;
      params = {
        level: "2",
        parentId: $scope.seller.province
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.cityList = data;
        });
      } else {
        $scope.seller.city = 0;
        return $scope.cityList = [];
      }
    };
    $scope.getDistrictList = function() {
      var params, promise;
      params = {
        level: "3",
        parentId: $scope.seller.city
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.districtList = data;
        });
      } else {
        $scope.seller.district = 0;
        return $scope.districtList = [];
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(seller, fieldName, bool) {
      return ClickEditService.switchNode(seller, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsAddressService.listAllProvince();
      promise.then(function(data) {
        return $scope.provinceList = data;
      });
      promise = WmsLogisticCompanyService.mapAll();
      promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
      promise = WmsSellerFreightGroupService.listAll();
      return promise.then(function(data) {
        var item, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          $scope.sellerFreightGroupMap[item.id] = item;
          if (!$scope.sellerFreightGroupList.hasOwnProperty(item.sellerId)) {
            $scope.sellerFreightGroupList[item.sellerId] = [];
          }
          _results.push($scope.sellerFreightGroupList[item.sellerId].unshift(item));
        }
        return _results;
      });
    };
    main = function() {
      var promise;
      $scope.createSeller = {};
      $scope.seller = {};
      $scope.sellerFreightGroupMap = {};
      $scope.sellerFreightGroupList = {};
      promise = WmsSellerService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerMemberCreateCtrl', function($scope, $routeParams, WmsMemberService) {
    var main;
    $scope.add = function() {
      var promise;
      promise = WmsMemberService.addSellerMember($scope.member);
      return promise.then(function() {
        return $scope.member.id = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.member = {
        sellerId: $routeParams.sellerId,
        isSellerMember: true
      };
      params = {
        sellerId: $routeParams.sellerId
      };
      promise = WmsMemberService.listSellerMember(params);
      return promise.then(function(data) {
        var $sellerMemberList;
        return $sellerMemberList = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerMemberListCtrl', function($scope, $routeParams, $filter, CommonService, WmsMemberService, ClickEditService, SessionService, WmsSellerService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsMemberService.add($scope.member);
      return promise.then(function(data) {
        $scope.member.id = data;
        $scope.items.unshift($scope.member);
        $scope.createMember = {};
        $scope.member = {
          isSellerMember: false
        };
        return initSearch();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsMemberService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.disabledMember = function(member, bool) {
      var promise;
      member.disabled = bool;
      promise = WmsMemberService.disabledMember(member);
      return promise.then(function() {});
    };
    $scope.updateName = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.updateName(member);
        return promise.then(function() {});
      }
    };
    $scope.updateRealName = function(member, fieldName) {
      var promise;
      if (ClickEditService.updateNode(member, fieldName)) {
        promise = WmsMemberService.updateRealName(member);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(member, fieldName, bool) {
      return ClickEditService.switchNode(member, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.member.sellerId
      };
      promise = WmsSellerService.detail(params);
      return promise.then(function(data) {
        return $scope.seller = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.createMember = {};
      $scope.member = {
        isSellerMember: true,
        sellerId: $routeParams.sellerId
      };
      $scope.username = SessionService.getUsername();
      params = {
        sellerId: $routeParams.sellerId
      };
      promise = WmsMemberService.listSellerMember(params);
      return promise.then(function(data) {
        $scope.items = data;
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerPickOrderListCtrl', function($scope, $routeParams, $filter, CommonService, SessionService, ClickEditService, WmsLogisticCompanyService, WmsMemberService, WmsAddressService, WmsSellerGoodsService, WmsLogisticOrderService, WmsPickOrderGoodsService, WmsPickOrderService, WmsSellerFreightGroupService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      $scope.filteredItems = $filter('filter')($scope.filteredItems, {
        'status': $scope.searchOption.status
      });
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": "",
        "status": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.updateComment = function(pickOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(pickOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateComment(pickOrder);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(pickOrder, fieldName, bool) {
      return ClickEditService.switchNode(pickOrder, fieldName, bool);
    };
    $scope.viewLogisticStatus = function(status) {
      if (status === 'all') {
        $scope.searchOption.status = '';
      } else {
        $scope.searchOption.status = status;
      }
      $scope.search();
      $scope.select($scope.currentPage);
      return $scope.displayLogisticStatus = status;
    };
    $scope.setExpressSn = function(pickOrder) {
      var params, promise;
      pickOrder.isSetting = true;
      params = {
        logisticOrderId: pickOrder.logisticOrderId
      };
      promise = WmsLogisticOrderService.setExpressSn(params);
      return promise.then(function(data) {
        pickOrder.isSetting = false;
        if (!data.hasOwnProperty('success')) {
          return pickOrder.expressSn = data;
        }
      });
    };
    $scope.withdrawAudit = function(pickOrderId) {
      var params, promise;
      params = {
        pickOrderId: pickOrderId
      };
      promise = WmsPickOrderService.withdrawAudit(params);
      return promise.then(function() {
        $scope.items = CommonService.dropListByData($scope.items, 'id', pickOrderId);
        return initSearch();
      });
    };
    $scope.updateLogisticCompanyId = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder);
        return promise.then(function() {});
      }
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsLogisticCompanyService.mapAll();
      promise.then(function(data) {
        return $scope.logisticCompanyMap = data;
      });
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerFreightGroupService.listBySellerId(params);
      promise.then(function(data) {
        return $scope.sellerFreightGroupMap = data;
      });
      promise = WmsMemberService.mapMember();
      promise.then(function(data) {
        return $scope.memberMap = data;
      });
      promise = WmsLogisticOrderService.listAllStatusEnum();
      promise.then(function(data) {
        return $scope.logisticOrderStatusEnumList = data;
      });
      promise = WmsAddressService.mapAll();
      promise.then(function(data) {
        return $scope.addressMap = data;
      });
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerGoodsService.listBySellerId(params);
      promise.then(function(data) {
        $scope.sellerGoodsList = data;
        return $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, 'id');
      });
      promise = WmsPickOrderGoodsService.mapPickOrderIdListBySellerId();
      return promise.then(function(data) {
        return $scope.pickOrderGoodsMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.createLogisticOrder = {};
      $scope.logisticOrder = {};
      $scope.searchOption = {
        "keywords": "",
        "status": ""
      };
      $scope.sellerFreightGroupMap = {};
      $scope.displayLogisticStatus = 'all';
      $scope.sellerId = SessionService.getSellerId();
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsPickOrderService.listBySellerId(params);
      return promise.then(function(data) {
        $scope.items = data;
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerPlatformGoodsListCtrl', function($scope, $routeParams, $filter, CommonService, ClickEditService, SessionService, WmsSellerPlatformGoodsService, WmsSellerGoodsService, WmsPlatformSourceService, WmsSellerPlatformSourceService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [20, 50, 100, 200];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.updateUniqueCode = function(sellerPlatformGoods, fieldName) {
      var promise;
      if (sellerPlatformGoods.id) {
        promise = WmsSellerPlatformGoodsService.updateUniqueCode(sellerPlatformGoods);
        return promise.then(function() {
          return sellerPlatformGoods[sellerPlatformGoods.id + fieldName] = false;
        });
      } else {
        promise = WmsSellerPlatformGoodsService.add(sellerPlatformGoods);
        return promise.then(function(data) {
          sellerPlatformGoods.id = data;
          if (!$scope.sellerPlatformGoodsList[sellerPlatformGoods.platformSourceId]) {
            $scope.sellerPlatformGoodsList[sellerPlatformGoods.platformSourceId] = [];
          }
          return $scope.sellerPlatformGoodsList[sellerPlatformGoods.platformSourceId].unshift(sellerPlatformGoods);
        });
      }
    };
    $scope.showSellerGoodsMap = function(platformSourceId, sellerGoodsId, fieldName) {
      if ($scope.sellerPlatformGoodsMap[platformSourceId] === void 0 || $scope.sellerPlatformGoodsMap[platformSourceId] === null) {
        $scope.sellerPlatformGoodsMap[platformSourceId] = [];
      }
      if ($scope.sellerPlatformGoodsMap[platformSourceId][sellerGoodsId] === void 0 || $scope.sellerPlatformGoodsMap[platformSourceId][sellerGoodsId] === null) {
        $scope.sellerPlatformGoodsMap[platformSourceId][sellerGoodsId] = {};
        $scope.sellerPlatformGoodsMap[platformSourceId][sellerGoodsId] = {
          "uniqueCode": " ",
          "sellerGoodsId": sellerGoodsId,
          "platformSourceId": platformSourceId,
          "sellerId": $scope.sellerId
        };
      }
      return $scope.switchNode($scope.sellerPlatformGoodsMap[platformSourceId][sellerGoodsId], fieldName, true);
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerPlatformGoods, fieldName, bool) {
      return ClickEditService.switchNode(sellerPlatformGoods, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsPlatformSourceService.mapPlatformSource();
      promise.then(function(data) {
        return $scope.platformSourceMap = data;
      });
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerPlatformSourceService.listBySellerId(params);
      promise.then(function(data) {
        return $scope.sellerPlatformSourceList = data;
      });
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerPlatformGoodsService.listBySellerIdAndMapBySourceId(params);
      return promise.then(function(data) {
        $scope.sellerPlatformGoodsList = data;
        $scope.sellerPlatformGoodsMap = [];
        return angular.forEach($scope.sellerPlatformGoodsList, function(sellerPlatformGoodsList, platformSourceId) {
          if (sellerPlatformGoodsList !== void 0 && sellerPlatformGoodsList.length > 0) {
            return $scope.sellerPlatformGoodsMap[platformSourceId] = CommonService.convertListToMap(sellerPlatformGoodsList, "sellerGoodsId");
          } else {
            return $scope.sellerPlatformGoodsMap[platformSourceId] = [];
          }
        });
      });
    };
    main = function() {
      var params, promise;
      $scope.createSellerPlatformGoods = {};
      $scope.sellerPlatformGoods = {};
      $scope.sellerId = SessionService.getSellerId();
      params = {
        sellerId: $scope.sellerId
      };
      promise = WmsSellerGoodsService.listBySellerId(params);
      return promise.then(function(data) {
        $scope.items = data;
        $scope.sellerGoodsMap = CommonService.convertListToMap($scope.items, 'id');
        initSearch();
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerPlatformSourceDetailCtrl', function($scope, $routeParams, WmsSellerPlatformSourceService) {
    var main;
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsSellerPlatformSourceService.detail(params);
      return promise.then(function(data) {
        return $scope.sellerPlatformSource = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerPlatformSourceEditCtrl', function($scope, $routeParams, CommonService, WmsSellerPlatformSourceService, WmsPlatformSourceService, ClickEditService) {
    var main, prepareConst;
    $scope.updateSubscribeService = function(sellerPlatformSource, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerPlatformSource, fieldName)) {
        promise = WmsSellerPlatformSourceService.updateSubscribeService(sellerPlatformSource);
        return promise.then(function() {});
      }
    };
    $scope.updateSecret = function(sellerPlatformSource, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerPlatformSource, fieldName)) {
        promise = WmsSellerPlatformSourceService.updateSecret(sellerPlatformSource);
        return promise.then(function() {});
      }
    };
    $scope.updateAppKey = function(sellerPlatformSource, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerPlatformSource, fieldName)) {
        promise = WmsSellerPlatformSourceService.updateAppKey(sellerPlatformSource);
        return promise.then(function() {});
      }
    };
    $scope.updateSubscribeService = function() {
      var promise;
      promise = WmsSellerPlatformSourceService.updateSubscribeService($scope.sellerPlatformSource);
      return promise.then(function() {});
    };
    $scope.switchNode = function(sellerPlatformSource, fieldName, bool) {
      return ClickEditService.switchNode(sellerPlatformSource, fieldName, bool);
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $scope.sellerPlatformSource.platformSourceId
      };
      promise = WmsPlatformSourceService.detail(params);
      return promise.then(function(data) {
        return $scope.platformSource = data;
      });
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsSellerPlatformSourceService.detail(params);
      return promise.then(function(data) {
        $scope.sellerPlatformSource = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSellerPlatformSourceListCtrl', function($scope, $routeParams, $filter, CommonService, SessionService, WmsSellerPlatformSourceService, WmsPlatformSourceService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsSellerPlatformSourceService.add($scope.sellerPlatformSource);
      return promise.then(function(data) {
        $scope.sellerPlatformSource.id = data;
        $scope.items.unshift($scope.sellerPlatformSource);
        $scope.createSellerPlatformSource = {};
        $scope.sellerPlatformSource = {
          sellerId: SessionService.getSellerId(),
          subscribeService: 1
        };
        return initSearch();
      });
    };
    $scope.updateSubscribeService = function(sellerPlatformSource, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerPlatformSource, fieldName)) {
        promise = WmsSellerPlatformSourceService.updateSubscribeService(sellerPlatformSource);
        return promise.then(function() {});
      }
    };
    $scope.updateSecret = function(sellerPlatformSource, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerPlatformSource, fieldName)) {
        promise = WmsSellerPlatformSourceService.updateSecret(sellerPlatformSource);
        return promise.then(function() {});
      }
    };
    $scope.updateAppKey = function(sellerPlatformSource, fieldName) {
      var promise;
      if (ClickEditService.updateNode(sellerPlatformSource, fieldName)) {
        promise = WmsSellerPlatformSourceService.updateAppKey(sellerPlatformSource);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(sellerPlatformSource, fieldName, bool) {
      return ClickEditService.switchNode(sellerPlatformSource, fieldName, bool);
    };
    prepareConst = function() {
      var promise;
      promise = WmsPlatformSourceService.mapPlatformSource();
      return promise.then(function(data) {
        return $scope.platformSourceMap = data;
      });
    };
    main = function() {
      var params, promise;
      $scope.createSellerPlatformSource = {};
      $scope.sellerPlatformSource = {
        sellerId: SessionService.getSellerId(),
        subscribeService: 1
      };
      params = {
        sellerId: SessionService.getSellerId()
      };
      promise = WmsSellerPlatformSourceService.listBySellerId(params);
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSenderAddressEditCtrl', function($scope, $routeParams, CommonService, WmsSenderAddressService, WmsAddressService, ClickEditService) {
    var main, prepareConst;
    $scope.updateAddress = function(senderAddress, fieldName) {
      var promise;
      if (ClickEditService.updateNode(senderAddress, fieldName)) {
        promise = WmsSenderAddressService.updateAddress(senderAddress);
        return promise.then(function() {});
      }
    };
    $scope.updatePhoneNumber = function(senderAddress, fieldName) {
      var promise;
      if (ClickEditService.updateNode(senderAddress, fieldName)) {
        promise = WmsSenderAddressService.updatePhoneNumber(senderAddress);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(senderAddress, fieldName) {
      var promise;
      if (ClickEditService.updateNode(senderAddress, fieldName)) {
        promise = WmsSenderAddressService.updateName(senderAddress);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(senderAddress, fieldName, bool) {
      return ClickEditService.switchNode(senderAddress, fieldName, bool);
    };
    $scope.getCityList = function() {
      var params, promise;
      params = {
        level: "2",
        parentId: $scope.senderAddress.province
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.cityList = data;
        });
      } else {
        order.city = 0;
        return $scope.cityList = [];
      }
    };
    $scope.getDistrictList = function() {
      var params, promise;
      params = {
        level: "3",
        parentId: $scope.senderAddress.city
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.districtList = data;
        });
      } else {
        order.district = 0;
        return $scope.districtList = [];
      }
    };
    $scope.savePrefixAddress = function(senderAddress, fieldName) {
      var promise;
      if (parseInt(senderAddress.province) > 0 && parseInt(senderAddress.city) > 0) {
        promise = WmsSenderAddressService.updatePrefixAddress(senderAddress);
        return promise.then(function() {
          return $scope.senderAddress[senderAddress.id + fieldName] = false;
        });
      }
    };
    prepareConst = function() {
      var promise;
      promise = WmsAddressService.listAllProvince();
      return promise.then(function(data) {
        return $scope.provinceList = data;
      });
    };
    main = function() {
      var params, promise;
      params = {
        sellerId: $routeParams.sellerId
      };
      promise = WmsSenderAddressService.detailBySellerId(params);
      promise.then(function(data) {
        $scope.senderAddress = data;
        $scope.getCityList();
        return $scope.getDistrictList();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  "use strict";
  angular.module("app.controllers").controller("WmsSignInCtrl", function($scope, $location, WmsMemberService, $route, WmsMemberRoleService, SessionService, WmsMenuService) {
    return $scope.signIn = function() {
      var promise;
      promise = WmsMemberService.signIn($scope.member);
      return promise.then(function(data) {
        $scope.member = data;
        promise = WmsMemberRoleService.detailBySession();
        return promise.then(function(data) {
          var roleHref;
          $scope.aclList = data;
          roleHref = '';
          $scope.roleHrefList = WmsMenuService.getRoleHrefList();
          $scope.commonHref = WmsMenuService.getCommonHref();
          angular.forEach($scope.aclList, function(acl) {
            if ($scope.roleHrefList[acl]) {
              return roleHref += $scope.roleHrefList[acl];
            }
          });
          roleHref += $scope.commonHref;
          SessionService.setHrefList(roleHref);
          return $location.path('/');
        });
      });
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsSplitOrderCtrl', function($scope, $location, $routeParams, CommonService, WmsOrderGoodsService, $i18next, WmsOrderService, WmsOrderPickOrderRefService, WmsPickOrderGoodsService, WmsPickOrderService, WmsSellerGoodsService, WmsLogisticCompanyService, WmsSellerFreightGroupService, WmsSellerService, ClickEditService, WmsLogisticOrderService) {
    var getOrderPickOrderRefList, getPickOrderDetail, getPickOrderGoods, main, prepareConst, resetOrderGoodsList;
    $scope.splitOrder = function() {
      var orderGoodsIds, params, promise;
      orderGoodsIds = [];
      angular.forEach($scope.orderGoodsIdMap, function(v, k) {
        if (v) {
          return orderGoodsIds.unshift(k);
        }
      });
      params = {
        orderId: $scope.orderId,
        orderGoodsIds: orderGoodsIds,
        logisticCompanyId: $scope.order.logisticCompanyId
      };
      promise = WmsOrderService.splitOrder(params);
      return promise.then(function() {
        return resetOrderGoodsList();
      });
    };
    $scope.withdraw = function() {
      var params, promise;
      params = {
        orderId: $scope.order.id
      };
      promise = WmsOrderService.withdrawAudit(params);
      return promise.then(function() {
        return $location.path("/wms/split_order").search("orderId", $scope.order.id);
      });
    };
    $scope.checkOrderGoods = function(orderGoodsId) {
      if ($scope.orderGoodsIdMap.hasOwnProperty(orderGoodsId)) {
        $scope.orderGoodsIdMap[orderGoodsId] = !$scope.orderGoodsIdMap[orderGoodsId];
      } else {
        $scope.orderGoodsIdMap[orderGoodsId] = true;
      }
      $scope.showSplitOrderButton = false;
      return angular.forEach($scope.orderGoodsIdMap, function(v, k) {
        if (v) {
          return $scope.showSplitOrderButton = true;
        }
      });
    };
    $scope.checkAllOrderGoods = function(checkAll) {
      angular.forEach($scope.orderGoodsListNoSplit, function(v) {
        return $scope.orderGoodsIdMap[v.id] = checkAll;
      });
      return $scope.showSplitOrderButton = checkAll;
    };
    $scope.getNextVerifyOrder = function() {
      var params, promise;
      params = {
        sellerId: $scope.order.sellerId
      };
      promise = WmsOrderService.getNextVerifyOrderBySellerId(params);
      return promise.then(function(data) {
        $scope.nextOrderId = data;
        if ($scope.nextOrderId) {
          return $location.path("/wms/order_goods_wait_verify").search("orderId", $scope.nextOrderId);
        } else {
          return $location.path("/wms/order_list_wait_verify");
        }
      });
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(pickOrder, fieldName, bool) {
      return ClickEditService.switchNode(pickOrder, fieldName, bool);
    };
    $scope.updateLogisticCompanyId = function(logisticOrder, fieldName) {
      var promise;
      if (ClickEditService.updateNode(logisticOrder, fieldName)) {
        promise = WmsLogisticOrderService.updateLogisticCompanyId(logisticOrder);
        return promise.then(function() {});
      }
    };
    $scope.pickOrderWithdraw = function(pickOrderId) {
      var params, promise;
      params = {
        pickOrderId: pickOrderId
      };
      promise = WmsPickOrderService.withdrawAudit(params);
      return promise.then(function() {
        return resetOrderGoodsList();
      });
    };
    resetOrderGoodsList = function() {
      var params, promise;
      $scope.order.status = 2;
      params = {
        orderId: $scope.orderId
      };
      promise = WmsOrderGoodsService.listByOrderIdAndIsSplit(params);
      return promise.then(function(data) {
        $scope.orderGoodsListNoSplit = data;
        if ($scope.orderGoodsListNoSplit.length === 0) {
          $scope.order.status = 3;
        }
        $scope.orderGoodsIdMap = [];
        getOrderPickOrderRefList();
        return $scope.showSplitOrderButton = false;
      });
    };
    getOrderPickOrderRefList = function() {
      var params, promise;
      params = {
        orderId: $scope.orderId
      };
      promise = WmsOrderPickOrderRefService.listByOrderId(params);
      return promise.then(function(data) {
        var ref, _i, _len, _results;
        $scope.orderPickOrderRefList = data;
        $scope.pickOrderGoodsMap = {};
        $scope.pickOrderMap = {};
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ref = data[_i];
          getPickOrderDetail(ref.pickOrderId);
          _results.push(getPickOrderGoods(ref.pickOrderId));
        }
        return _results;
      });
    };
    getPickOrderDetail = function(id) {
      var params, promise;
      $scope.pickOrderMap[id] = {};
      params = {
        id: id
      };
      promise = WmsPickOrderService.detailPickAndLogisticOrder(params);
      return promise.then(function(data) {
        return $scope.pickOrderMap[id] = data;
      });
    };
    getPickOrderGoods = function(pickOrderId) {
      var params, promise;
      $scope.pickOrderGoodsMap[pickOrderId] = [];
      params = {
        pickOrderId: pickOrderId
      };
      promise = WmsPickOrderGoodsService.listByPickOrderId(params);
      return promise.then(function(data) {
        return $scope.pickOrderGoodsMap[pickOrderId] = data;
      });
    };
    prepareConst = function() {
      var params, promise;
      promise = WmsSellerGoodsService.listEncodeType();
      promise.then(function(data) {
        var encodeType, _i, _len, _results;
        $scope.encodeTypeList = data;
        $scope.encodeTypeMap = [];
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          encodeType = data[_i];
          _results.push($scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType." + encodeType));
        }
        return _results;
      });
      params = {
        sellerId: $scope.order.sellerId
      };
      promise = WmsSellerGoodsService.listBySellerId(params);
      promise.then(function(data) {
        $scope.sellerGoodsList = data;
        return $scope.sellerGoodsMap = CommonService.convertListToMap($scope.sellerGoodsList, 'id');
      });
      params = {
        sellerId: $scope.order.sellerId
      };
      promise = WmsSellerGoodsService.listAllComboBySellerId(params);
      promise.then(function(data) {
        return $scope.allComboSellerGoodsMap = data;
      });
      params = {
        id: $scope.order.sellerId
      };
      promise = WmsSellerService.detail(params);
      return promise.then(function(data) {
        $scope.seller = data;
        promise = WmsLogisticCompanyService.mapAll();
        return promise.then(function(data) {
          $scope.logisticCompanyMap = data;
          params = {
            sellerId: $scope.order.sellerId
          };
          promise = WmsSellerFreightGroupService.mapBySellerId(params);
          return promise.then(function(data) {
            $scope.sellerFreightGroupMap = data;
            if ($scope.seller.hasOwnProperty('sellerFreightGroupId') && $scope.sellerFreightGroupMap.hasOwnProperty($scope.seller.sellerFreightGroupId)) {
              return $scope.order.logisticCompanyId = $scope.logisticCompanyMap[$scope.sellerFreightGroupMap[$scope.seller.sellerFreightGroupId].logisticCompanyId].id;
            }
          });
        });
      });
    };
    main = function() {
      var params, promise;
      $scope.orderGoodsIdMap = [];
      $scope.showSplitOrderButton = false;
      $scope.orderId = $routeParams.orderId;
      $scope.logisticCompanyId = 0;
      params = {
        orderId: $scope.orderId
      };
      promise = WmsOrderGoodsService.listByOrderIdAndIsSplit(params);
      promise.then(function(data) {
        return $scope.orderGoodsListNoSplit = data;
      });
      params = {
        id: $scope.orderId
      };
      promise = WmsOrderService.detail(params);
      promise.then(function(data) {
        $scope.order = data;
        return prepareConst();
      });
      return getOrderPickOrderRefList();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsStructNodeListCtrl', function($scope, $routeParams, CommonService, WmsStructNodeService, WmsStructRootService, ClickEditService) {
    var getStructNodeList, main, prepareConst;
    $scope.updateStructRoot = function(structRoot) {
      var promise;
      promise = WmsStructRootService.updateName(structRoot);
      return promise.then(function() {});
    };
    $scope.insertNew = function(index, fieldName, left, depth) {
      var newNode;
      newNode = {
        "inEditing": true,
        "rootId": $routeParams.rootId,
        "fieldName": fieldName,
        "depth": depth,
        "leftValue": left,
        "rightValue": left / 1 + 1
      };
      return $scope.structNodeList.splice(index + 1, 0, newNode);
    };
    $scope.add = function(structNode) {
      var promise;
      promise = WmsStructNodeService.add(structNode);
      return promise.then(function(data) {
        structNode.id = data;
        return getStructNodeList();
      });
    };
    $scope.updateDataType = function(structNode, fieldName) {
      var promise;
      if (ClickEditService.updateNode(structNode, fieldName)) {
        promise = WmsStructNodeService.updateDataType(structNode);
        return promise.then(function() {});
      }
    };
    $scope.updateFieldName = function(structNode, fieldName) {
      var promise;
      if (ClickEditService.updateNode(structNode, fieldName)) {
        promise = WmsStructNodeService.updateFieldName(structNode);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(structNode, fieldName, bool) {
      return ClickEditService.switchNode(structNode, fieldName, bool);
    };
    $scope.addBrotherAbove = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index - 1, 'brother_above', baseNode.leftValue, baseNode.depth);
    };
    $scope.addBrotherBelow = function(baseNode, index) {
      baseNode.inEditing = false;
      return $scope.insertNew(index, 'brother_below', baseNode.rightValue / 1 + 1, baseNode.depth);
    };
    getStructNodeList = function() {
      var params, promise;
      params = {
        rootId: $routeParams.rootId
      };
      promise = WmsStructNodeService.listByRootId(params);
      return promise.then(function(data) {
        return $scope.structNodeList = data;
      });
    };
    prepareConst = function() {
      var params, promise;
      params = {
        id: $routeParams.rootId
      };
      promise = WmsStructRootService.detail(params);
      promise.then(function(data) {
        return $scope.structRoot = data;
      });
      promise = WmsStructNodeService.dataTypeList();
      return promise.then(function(data) {
        return $scope.dataTypeList = data;
      });
    };
    main = function() {
      getStructNodeList();
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsStructRootListCtrl', function($scope, $routeParams, $filter, CommonService, WmsStructRootService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsStructRootService.add($scope.structRoot);
      return promise.then(function(data) {
        $scope.structRoot.id = data;
        $scope.items.unshift($scope.structRoot);
        $scope.createStructRoot = {};
        $scope.structRoot = {};
        return initSearch();
      });
    };
    $scope.updateName = function(structRoot, fieldName) {
      var promise;
      if (ClickEditService.updateNode(structRoot, fieldName)) {
        promise = WmsStructRootService.updateName(structRoot);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(structRoot, fieldName, bool) {
      return ClickEditService.switchNode(structRoot, fieldName, bool);
    };
    prepareConst = function() {};
    main = function() {
      var promise;
      $scope.createStructRoot = {};
      $scope.structRoot = {};
      promise = WmsStructRootService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsUsableLogisticCompanyListCtrl', function($scope, $routeParams, $filter, CommonService, WmsUsableLogisticCompanyService, ClickEditService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.order = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.add = function() {
      var promise;
      promise = WmsUsableLogisticCompanyService.add($scope.usableLogisticCompany);
      return promise.then(function(data) {
        $scope.usableLogisticCompany.id = data;
        $scope.items.unshift($scope.usableLogisticCompany);
        $scope.createUsableLogisticCompany = {};
        $scope.usableLogisticCompany = {};
        return initSearch();
      });
    };
    $scope["delete"] = function(id, i) {
      var params, promise;
      params = {
        id: id
      };
      promise = WmsUsableLogisticCompanyService["delete"](params);
      return promise.then(function() {
        $scope.items.splice(i, 1);
        return initSearch();
      });
    };
    $scope.updateCode = function(usableLogisticCompany, fieldName) {
      var promise;
      if (ClickEditService.updateNode(usableLogisticCompany, fieldName)) {
        promise = WmsUsableLogisticCompanyService.updateCode(usableLogisticCompany);
        return promise.then(function() {});
      }
    };
    $scope.updateName = function(usableLogisticCompany, fieldName) {
      var promise;
      if (ClickEditService.updateNode(usableLogisticCompany, fieldName)) {
        promise = WmsUsableLogisticCompanyService.updateName(usableLogisticCompany);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(usableLogisticCompany, fieldName, bool) {
      return ClickEditService.switchNode(usableLogisticCompany, fieldName, bool);
    };
    prepareConst = function() {};
    main = function() {
      var promise;
      $scope.createUsableLogisticCompany = {};
      $scope.usableLogisticCompany = {};
      promise = WmsUsableLogisticCompanyService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsWarehouseDetailCtrl', function($scope, $routeParams, WmsWarehouseService, WmsAddressService) {
    var main, prepareConst;
    $scope.save = function() {
      var promise;
      promise = WmsWarehouseService.update($scope.warehouse);
      return promise.then(function(data) {});
    };
    $scope.getCityList = function(warehouse) {
      var params, promise;
      params = {
        level: "2",
        parentId: warehouse.provinceId
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.cityList = data;
        });
      } else {
        warehouse.cityId = 0;
        return $scope.cityList = [];
      }
    };
    $scope.getDistrictList = function(warehouse) {
      var params, promise;
      params = {
        level: "3",
        parentId: warehouse.cityId
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.districtList = data;
        });
      } else {
        warehouse.districtId = 0;
        return $scope.districtList = [];
      }
    };
    prepareConst = function() {
      var promise;
      promise = WmsAddressService.listAllProvince();
      return promise.then(function(data) {
        $scope.provinceList = data;
        $scope.getCityList($scope.warehouse);
        return $scope.getDistrictList($scope.warehouse);
      });
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsWarehouseService.detail(params);
      return promise.then(function(data) {
        $scope.warehouse = data;
        return prepareConst();
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsWarehouseEditCtrl', function($scope, $routeParams, CommonService, WmsWarehouseService, ClickEditService) {
    var main;
    $scope.update = function(warehouse, fieldName) {
      var promise;
      if (ClickEditService.updateNode(warehouse, fieldName)) {
        promise = WmsWarehouseService.update(warehouse);
        return promise.then(function() {});
      }
    };
    $scope.switchNode = function(warehouse, fieldName, bool) {
      return ClickEditService.switchNode(warehouse, fieldName, bool);
    };
    main = function() {
      var params, promise;
      params = {
        id: $routeParams.id
      };
      promise = WmsWarehouseService.detail(params);
      return promise.then(function(data) {
        return $scope.warehouse = data;
      });
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app.controllers').controller('WmsWarehouseListCtrl', function($scope, $routeParams, $filter, CommonService, WmsWarehouseService, ClickEditService, WmsAddressService) {
    var initSearch, main, prepareConst;
    $scope.select = function(page) {
      var end, start;
      start = (page - 1) * $scope.searchOption.numPerPage;
      end = start + $scope.searchOption.numPerPage;
      return $scope.currentPageItems = $scope.filteredItems.slice(start, end);
    };
    $scope.onFilterChange = function() {
      $scope.select(1);
      $scope.currentPage = 1;
      return $scope.row = '';
    };
    $scope.onNumPerPageChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.onOrderChange = function() {
      $scope.select(1);
      return $scope.currentPage = 1;
    };
    $scope.search = function() {
      $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords);
      return $scope.onFilterChange();
    };
    $scope.warehouse = function(rowName) {
      if ($scope.row === rowName) {
        return;
      }
      $scope.row = rowName;
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName);
      return $scope.onOrderChange();
    };
    initSearch = function() {
      $scope.searchOption = {
        "keywords": ""
      };
      $scope.filteredItems = [];
      $scope.row = '';
      $scope.numPerPageOpt = [10, 20, 50, 100];
      $scope.searchOption.numPerPage = $scope.numPerPageOpt[0];
      $scope.currentPage = 1;
      $scope.currentPageItems = [];
      $scope.search();
      return $scope.select($scope.currentPage);
    };
    $scope.save = function() {
      var promise;
      promise = WmsWarehouseService.add($scope.warehouse);
      return promise.then(function(data) {
        $scope.warehouse.id = data;
        $scope.items.unshift($scope.warehouse);
        $scope.createWarehouse = {};
        $scope.warehouse = {};
        return initSearch();
      });
    };
    $scope.update = function(warehouse, fieldName) {
      var promise;
      if (ClickEditService.updateNode(warehouse, fieldName)) {
        promise = WmsWarehouseService.update(warehouse);
        return promise.then(function() {});
      }
    };
    $scope.switchCollapse = function(node) {
      return CommonService.switchCollapse(node);
    };
    $scope.switchNode = function(warehouse, fieldName, bool) {
      return ClickEditService.switchNode(warehouse, fieldName, bool);
    };
    $scope.getCityList = function(warehouse) {
      var params, promise;
      params = {
        level: "2",
        parentId: warehouse.provinceId
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.cityList = data;
        });
      } else {
        warehouse.cityId = 0;
        return $scope.cityList = [];
      }
    };
    $scope.getDistrictList = function(warehouse) {
      var params, promise;
      params = {
        level: "3",
        parentId: warehouse.cityId
      };
      if (params.parentId > 0) {
        promise = WmsAddressService.listAllByLevelAndParentId(params);
        return promise.then(function(data) {
          return $scope.districtList = data;
        });
      } else {
        warehouse.districtId = 0;
        return $scope.districtList = [];
      }
    };
    prepareConst = function() {
      var promise;
      promise = WmsAddressService.listAllProvince();
      promise.then(function(data) {
        return $scope.provinceList = data;
      });
      promise = WmsAddressService.mapAll();
      return promise.then(function(data) {
        return $scope.addressMap = data;
      });
    };
    main = function() {
      var promise;
      $scope.createWarehouse = {};
      $scope.warehouse = {};
      promise = WmsWarehouseService.listAll();
      promise.then(function(data) {
        $scope.items = data;
        return initSearch();
      });
      return prepareConst();
    };
    return main();
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app').service('AjaxService', function($http, $i18next, ModalService) {
    return {
      call: function(obj) {
        return $http({
          method: "POST",
          url: obj.url,
          data: obj.data,
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
          },
          transformRequest: function(data) {
            var param;
            param = function(obj) {
              var fullSubName, i, innerObj, name, query, subName, subValue, value;
              query = '';
              for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                  i = 0;
                  while (i < value.length) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                    ++i;
                  }
                } else if (value instanceof Object) {
                  for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                  }
                } else if (value !== void 0 && value !== null) {
                  query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
              }
              return query;
            };
            return param(data);
          }
        }).success(function(response) {
          var errorMessageKey, i18nextNamespace;
          if (response.success) {
            if (obj.successCallBack !== void 0 && typeof obj.successCallBack === 'function') {
              return obj.successCallBack(response.data);
            } else {
              return ModalService.showMessageOnSuccess($i18next("global:message.onSuccess"));
            }
          } else {
            if (response.subErrorCode) {
              if (obj.errorCallBack !== void 0 && typeof obj.errorCallBack === 'function') {
                return obj.errorCallBack(response.subErrorCode);
              } else {
                i18nextNamespace = obj.api.name.split(".")[0];
                return ModalService.showMessageOnError($i18next(i18nextNamespace + ":message.apiError." + response.subErrorCode));
              }
            } else if (response.errorCode) {
              errorMessageKey = "global:message.apiError." + response.errorCode;
              if ($i18next(errorMessageKey) !== errorMessageKey) {
                return ModalService.showMessageOnError($i18next(errorMessageKey));
              } else {
                return ModalService.showMessageOnError(response.errorMessage);
              }
            } else {
              return ModalService.showMessageOnError($i18next("global:message.onError.responseNotJson") + "\n" + response);
            }
          }
        });
      }
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app').service('ApiService', function($http, $i18next, $location, $rootScope, $timeout, WmsConfigService, ModalService, SessionService, ToastService) {
    return {
      callApi: function(obj) {
        obj.callType = "default";
        return this.callApi(obj);
      },
      get: function(obj) {
        obj.callType = "get";
        return this.callApi(obj);
      },
      post: function(obj) {
        obj.callType = "post";
        return this.callApi(obj);
      },
      "delete": function(obj) {
        return ModalService.showMessageOnCheckDelete($i18next("global:message.confirmDelete"), obj);
      },
      confirm: function(obj) {
        return ModalService.showMessageOnConfirm($i18next("global:message.confirm"), obj);
      },
      callApi: function(obj) {
        var beginSeconds, callType, paramsJson, signKey, timestamp;
        paramsJson = JSON.stringify(obj.params);
        callType = obj.callType;
        signKey = "OA-Sign";
        timestamp = new Date().getTime();
        beginSeconds = 0;
        if (obj.params !== void 0 && typeof obj.params === "object") {
          sessionStorage.setItem(signKey, obj.api.name + obj.api.version + paramsJson + timestamp);
        } else {
          sessionStorage.setItem(signKey, obj.api.name + obj.api.version + timestamp);
        }
        calcHash();
        $http({
          method: "POST",
          url: WmsConfigService.getApiHost() + "/gw?debug=" + obj.api.name,
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "OA-Session-Id": SessionService.getSessionId(),
            "OA-App-Key": 1001520,
            "OA-App-Market-ID": 678,
            "OA-App-Version": "1.0",
            "OA-Device-Id": new Fingerprint({
              canvas: true
            }).get(),
            "OA-Sign": sessionStorage.getItem(signKey)
          },
          data: {
            "api": obj.api.name,
            "version": obj.api.version,
            "timestamp": timestamp,
            "params": paramsJson
          },
          transformRequest: function(data) {
            var param;
            param = function(obj) {
              var fullSubName, i, innerObj, name, query, subName, subValue, value;
              query = '';
              for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                  i = 0;
                  while (i < value.length) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                    ++i;
                  }
                } else if (value instanceof Object) {
                  for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                  }
                } else if (value !== void 0 && value !== null) {
                  query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
              }
              beginSeconds = new Date().getTime();
              $rootScope.toggle = {
                overTime: false,
                showSignInModal: false,
                showErrorMsg: false
              };
              return query;
            };
            return param(data);
          }
        }).success(function(response) {
          var differSeconds, endSeconds, errorMessageKey, i18nextNamespace;
          endSeconds = new Date().getTime();
          differSeconds = parseInt(endSeconds) - parseInt(beginSeconds);
          if (differSeconds < 1500) {
            $rootScope.toggle.overTime = true;
          }
          if (response.success) {
            if (obj.successCallBack !== void 0 && typeof obj.successCallBack === 'function') {
              obj.successCallBack(response.data);
            } else {
              ModalService.showMessageOnSuccess($i18next("global:message.onSuccess"));
            }
            if (callType === "post") {
              return ToastService.showMessageOnSuccess($i18next("global:message.onSuccess"));
            }
          } else if (response.errorCode) {
            if (parseInt(response.errorCode) === 174) {
              if (!$rootScope.toggle.showSignInModal && SessionService.getSessionId()) {
                ModalService.showSignInForm();
                return $rootScope.toggle.showSignInModal = true;
              }
            } else if (obj.errorCallBack !== void 0 && typeof obj.errorCallBack === 'function') {
              return obj.errorCallBack(response);
            } else {
              if (!$rootScope.toggle.showErrorMsg && !$rootScope.toggle.showSignInModal) {
                i18nextNamespace = obj.api.name.split(".")[0];
                errorMessageKey = i18nextNamespace + ":message.apiError." + response.errorCode;
                $rootScope.toggle.showErrorMsg = true;
                if ($i18next(errorMessageKey) !== errorMessageKey) {
                  return ModalService.showMessageOnError($i18next(errorMessageKey));
                } else {
                  errorMessageKey = "global:message.apiError." + response.errorCode;
                  if ($i18next(errorMessageKey) !== errorMessageKey) {
                    return ModalService.showMessageOnError($i18next(errorMessageKey));
                  } else {
                    if ($rootScope.toggle.showSignInModal || response.errorMessage !== "SESSION_ID_IS_EMPTY") {
                      return ModalService.showMessageOnError(response.errorMessage);
                    }
                  }
                }
              }
            }
          } else {
            if (!$rootScope.toggle.showErrorMsg) {
              $rootScope.toggle.showErrorMsg = true;
              return ModalService.showMessageOnError($i18next("global:message.onError.responseNotJson") + "\n" + response);
            }
          }
        }).error(function() {});
        $timeout((function() {
          if (!$rootScope.toggle.overTime && callType === "post") {
            ToastService.showMessageInProgress($i18next("global:message.inProgress"));
          }
        }), 1500);
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('ClickEditService', function() {
    var OLD_PRE;
    OLD_PRE = "Old";
    return {
      updateNode: function(node, fieldName) {
        node[node.id + fieldName] = false;
        if (node[fieldName] !== node[OLD_PRE + fieldName]) {
          return true;
        } else {
          return false;
        }
      },
      switchNode: function(node, fieldName, bool) {
        node[node.id + fieldName] = bool;
        if (bool) {
          return node[OLD_PRE + fieldName] = node[fieldName];
        } else {
          return node[fieldName] = node[OLD_PRE + fieldName];
        }
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('CommonService', function($i18next, ApiService, ModalService) {
    return {
      convertListToMap: function(objList, keyName) {
        return objList.reduce((function(map, obj) {
          map[obj[keyName]] = obj;
          return map;
        }), {});
      },
      convertSuggestions: function(suggestions) {
        var array;
        array = [];
        suggestions.forEach(function(opt) {
          return array.push({
            label: opt.text,
            value: opt.text
          });
        });
        return array;
      },
      countMapLength: function(objMap) {
        var countNum;
        countNum = 0;
        angular.forEach(objMap, function(obj, k) {
          if (k > 0) {
            return countNum++;
          }
        });
        return countNum;
      },
      isBlank: function(field) {
        return field === "undefined" || field.trim() === "" || field === null;
      },
      showHighlight: function(pkg, field, highlightMap) {
        if (highlightMap[pkg.id] && highlightMap[pkg.id].hasOwnProperty(field)) {
          return highlightMap[pkg.id][field].join("\n...");
        } else if (pkg.hasOwnProperty(field)) {
          return pkg[field];
        }
      },
      switchCollapse: function(node) {
        if (node.inEditing) {
          return node.inEditing = false;
        } else {
          return node.inEditing = true;
        }
      },
      showMessageOnError: function(jsonName, response) {
        var errorMessageKey;
        errorMessageKey = jsonName + ":message.apiError." + response.errorCode;
        if ($i18next(errorMessageKey) !== errorMessageKey) {
          return ModalService.showMessageOnError($i18next(errorMessageKey));
        } else {
          errorMessageKey = "global:message.apiError." + response.errorCode;
          if ($i18next(errorMessageKey) !== errorMessageKey) {
            return ModalService.showMessageOnError($i18next(errorMessageKey));
          } else {
            return ModalService.showMessageOnError(response.errorMessage);
          }
        }
      },
      showDiffObject: function(objectList, objectEnvMap, productEnvList, fieldList) {
        var defaultValue, diffObjectList, field, object, productEnv, tmpValue, _i, _j, _k, _l, _len, _len1, _len2, _len3;
        diffObjectList = [];
        for (_i = 0, _len = objectList.length; _i < _len; _i++) {
          object = objectList[_i];
          defaultValue = {};
          for (_j = 0, _len1 = fieldList.length; _j < _len1; _j++) {
            field = fieldList[_j];
            if (objectEnvMap[object.id] !== void 0 && objectEnvMap[object.id][productEnvList[0].id] !== void 0 && objectEnvMap[object.id][productEnvList[0].id].hasOwnProperty(field)) {
              defaultValue[field] = objectEnvMap[object.id][productEnvList[0].id][field];
            } else {
              defaultValue[field] = void 0;
            }
          }
          for (_k = 0, _len2 = productEnvList.length; _k < _len2; _k++) {
            productEnv = productEnvList[_k];
            tmpValue = {};
            for (_l = 0, _len3 = fieldList.length; _l < _len3; _l++) {
              field = fieldList[_l];
              if (objectEnvMap[object.id] !== void 0 && objectEnvMap[object.id][productEnv.id] !== void 0 && objectEnvMap[object.id][productEnv.id].hasOwnProperty(field)) {
                tmpValue[field] = objectEnvMap[object.id][productEnv.id][field];
              } else {
                tmpValue[field] = void 0;
              }
            }
            if (!angular.equals(defaultValue, tmpValue)) {
              diffObjectList.push(object);
              break;
            }
          }
        }
        return diffObjectList;
      },
      dropListByData: function(list, fieldName, value) {
        var array;
        array = [];
        list.forEach(function(opt) {
          if (opt[fieldName] !== value) {
            return array.push(opt);
          }
        });
        return array;
      },
      objectConnected: function(objectList, connectedName, connectedMap, connectedFieldList) {
        objectList.forEach(function(obj, key) {
          var connectedField, _i, _len, _results;
          if (obj[connectedName] > 0 && connectedMap[obj[connectedName]]) {
            _results = [];
            for (_i = 0, _len = connectedFieldList.length; _i < _len; _i++) {
              connectedField = connectedFieldList[_i];
              if (connectedMap[obj[connectedName]][connectedField] !== void 0) {
                _results.push(objectList[key][connectedField] = connectedMap[obj[connectedName]][connectedField]);
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }
        });
        return objectList;
      },
      checkAll: function(list, boolValue, fieldName) {
        var checkList;
        checkList = [];
        list.forEach(function(opt) {
          if (opt.hasOwnProperty(fieldName)) {
            return checkList[opt[fieldName]] = boolValue;
          }
        });
        return checkList;
      },
      calArrayTrue: function(list, checkList, fieldName) {
        var trueNumber;
        trueNumber = 0;
        list.forEach(function(opt) {
          if (checkList[opt[fieldName]]) {
            return trueNumber = parseInt(trueNumber) + 1;
          }
        });
        return trueNumber;
      }
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app').service('WmsConfigService', function($location) {
    var API_PREFIX, FILE_PREFIX, IMG_HOST;
    API_PREFIX = "wms-api";
    FILE_PREFIX = "wms-upload";
    IMG_HOST = "wms-upload";
    return {
      getApiHost: function() {
        return this.getHost(API_PREFIX);
      },
      getFileHost: function() {
        return this.getHost(FILE_PREFIX);
      },
      getImgHost: function() {
        return this.getHost(IMG_HOST);
      },
      getHost: function(prefix) {
        var arr, protocol;
        arr = $location.host().split('.');
        protocol = $location.protocol();
        arr[0] = prefix;
        return protocol + '://' + arr.join('.');
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('DeviceDriverService', function($q, $i18next, AjaxService, ToastService) {
    var URL;
    URL = 'http://127.0.0.1';
    return {
      getWeight: function() {
        var deferred;
        deferred = $q.defer();
        AjaxService.call({
          url: URL + '/scale/',
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      printExpressOrder: function(params) {
        var deferred;
        deferred = $q.defer();
        AjaxService.call({
          url: URL + '/printer/order',
          data: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      checkScaleDevice: function() {
        var deferred;
        deferred = $q.defer();
        AjaxService.call({
          url: URL + '/check_device/checkScale',
          successCallBack: function(data) {
            deferred.resolve(data);
            return ToastService.showMessageOnSuccess($i18next("global:message.onSuccess"));
          }
        });
        return deferred.promise;
      },
      checkPrinterDevice: function() {
        var deferred;
        deferred = $q.defer();
        AjaxService.call({
          url: URL + '/check_device/checkPrinter',
          successCallBack: function(data) {
            deferred.resolve(data);
            return ToastService.showMessageOnSuccess($i18next("global:message.onSuccess"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('DisplayService', function() {
    return {
      showEmptyObject: function(objList, objMap) {
        var object, returnObjList, _i, _len;
        returnObjList = [];
        for (_i = 0, _len = objList.length; _i < _len; _i++) {
          object = objList[_i];
          if (objMap[object.id] === void 0) {
            returnObjList.push(object);
          }
        }
        return returnObjList;
      },
      showExistObject: function(objList, objMap) {
        var object, returnObjList, _i, _len;
        returnObjList = [];
        for (_i = 0, _len = objList.length; _i < _len; _i++) {
          object = objList[_i];
          if (objMap[object.id] !== void 0 && objMap[object.id] !== null) {
            returnObjList.push(object);
          }
        }
        return returnObjList;
      }
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app').service('WmsMenuService', function() {
    var commonHref, roleHrefList;
    roleHrefList = {
      "3": "logistic_order_pick_search,express_order_pack,express_order_list,seller_goods_manage_list,print_select_seller,member_list,pick_order_list,container_list,seller_list,freight_group_list,check_device_scale,check_device_printer",
      "1004": "logistic_order_pick_search,express_order_pack,express_order_list,seller_goods_manage_list,print_select_seller,member_list,pick_order_list,container_list,seller_list,freight_group_list,check_device_scale,check_device_printer",
      "1005": "container_list,seller_goods_manage_list,check_device_scale,check_device_printer,freight_group_list",
      "1006": "pick_order_list,seller_goods_manage_list,container_list,seller_list,freight_group_list,logistic_company_list,express_order_list,check_device_scale,check_device_printer",
      "1007": "",
      "1016": "logistic_order_pick_search,pick_order_wait_pick_no_print,pick_order_wait_pick_printed,pick_order_wait_pack_list",
      "1003": "express_order_pack,print_select_seller,check_device_scale,check_device_printer",
      "1010": "",
      "1017": "order_list_wait_verify,seller_platform_source_list,seller_member_list,seller_pick_order_list,seller_goods_list",
      "1011": "seller_goods_list",
      "1015": "order_list_wait_verify,seller_pick_order_list",
      "1013": "seller_pick_order_list",
      "1014": ""
    };
    commonHref = ',change_password';
    return {
      getRoleHrefList: function() {
        return roleHrefList;
      },
      getCommonHref: function() {
        return commonHref;
      }
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app').controller('ModalApiResultCtrl', function($scope, $uibModalInstance, apiResult) {
    var main;
    $scope.ok = function() {
      return $uibModalInstance.close($scope.apiResult);
    };
    $scope.dismiss = function() {
      return $uibModalInstance.dismiss("dismiss");
    };
    main = function() {
      return $scope.apiResult = apiResult;
    };
    return main();
  }).controller('ModalSignInCtrl', function($scope, $uibModalInstance, $i18next, $rootScope, $route, WmsMemberService, ModalService, WmsMemberRoleService, SessionService, WmsMenuService) {
    var main;
    $scope.$on("userSignInSuccess", function(event, currentUsername) {
      return $scope.username = currentUsername;
    });
    $scope.dismiss = function() {
      return $uibModalInstance.dismiss("dismiss");
    };
    $scope.signIn = function() {
      var promise;
      promise = WmsMemberService.signIn($scope.member);
      return promise.then(function() {
        $scope.dismiss();
        promise = WmsMemberRoleService.detailBySession();
        return promise.then(function(data) {
          var roleHref;
          $scope.aclList = data;
          roleHref = '';
          $scope.roleHrefList = WmsMenuService.getRoleHrefList();
          $scope.commonHref = WmsMenuService.getCommonHref();
          angular.forEach($scope.aclList, function(acl) {
            if ($scope.roleHrefList[acl]) {
              return roleHref += $scope.roleHrefList[acl];
            }
          });
          roleHref += $scope.commonHref;
          SessionService.setHrefList(roleHref);
          return $route.reload();
        });
      });
    };
    main = function() {
      $rootScope.toggle = {
        showSignInModal: true
      };
      $scope.errorMsg = "";
      return $scope.member = {
        name: SessionService.getUsername()
      };
    };
    return main();
  }).controller('ModalCheckDeleteCtrl', function($scope, $uibModalInstance, ApiService, apiResult) {
    var main;
    $scope.dismiss = function() {
      return $uibModalInstance.dismiss("dismiss");
    };
    $scope.close = function() {
      return $uibModalInstance.dismiss("dismiss");
    };
    $scope["delete"] = function() {
      ApiService.post(apiResult.obj);
      return $uibModalInstance.dismiss("dismiss");
    };
    main = function() {
      $scope.apiResult = {};
      return $scope.apiResult.message = apiResult.message;
    };
    return main();
  }).controller('ModalCheckConfirmCtrl', function($scope, $rootScope, $uibModalInstance, ApiService, apiResult) {
    var main;
    $scope.dismiss = function() {
      return $uibModalInstance.dismiss("dismiss");
    };
    $scope.close = function() {
      $rootScope.closeConfirmModal = true;
      return $uibModalInstance.dismiss("dismiss");
    };
    $scope.confirm = function() {
      ApiService.post(apiResult.obj);
      return $uibModalInstance.dismiss("dismiss");
    };
    main = function() {
      $scope.apiResult = {};
      $rootScope.closeConfirmModal = false;
      return $scope.apiResult.message = apiResult.message;
    };
    return main();
  }).service('ModalService', function($uibModal) {
    return {
      showMessageOnSuccess: function(msg) {
        return $uibModal.open({
          templateUrl: "views/modal/api_success.html",
          controller: 'ModalApiResultCtrl',
          resolve: {
            apiResult: function() {
              return {
                message: msg
              };
            }
          }
        });
      },
      showMessageOnError: function(msg) {
        return $uibModal.open({
          templateUrl: "views/modal/api_error.html",
          controller: 'ModalApiResultCtrl',
          resolve: {
            apiResult: function() {
              return {
                message: msg
              };
            }
          }
        });
      },
      showSignInForm: function() {
        return $uibModal.open({
          templateUrl: "views/modal/signin.html",
          controller: 'ModalSignInCtrl'
        });
      },
      showMessageOnCheckDelete: function(msg, obj) {
        return $uibModal.open({
          templateUrl: "views/modal/api_check_delete.html",
          controller: 'ModalCheckDeleteCtrl',
          resolve: {
            apiResult: function() {
              return {
                message: msg,
                obj: obj
              };
            }
          }
        });
      },
      showMessageOnConfirm: function(msg, obj) {
        return $uibModal.open({
          templateUrl: "views/modal/api_check_confirm.html",
          controller: 'ModalCheckConfirmCtrl',
          resolve: {
            apiResult: function() {
              return {
                message: msg,
                obj: obj
              };
            }
          }
        });
      }
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app').service('SessionService', function($cookieStore, $location) {
    var SESSION_HREF_LIST, SESSION_SELLER_ID, SESSION_SESSION_ID, SESSION_TESTER, SESSION_USERNAME;
    SESSION_SESSION_ID = "session_id";
    SESSION_USERNAME = "username";
    SESSION_SELLER_ID = "seller_id";
    SESSION_TESTER = "tester_id";
    SESSION_HREF_LIST = "href_list";
    return {
      getPrefix: function() {
        return $location.host() + "/";
      },
      setUsername: function(username) {
        return $cookieStore.put(SESSION_USERNAME, username);
      },
      getUsername: function() {
        return $cookieStore.get(SESSION_USERNAME);
      },
      setSessionId: function(sessionId) {
        return $cookieStore.put(SESSION_SESSION_ID, sessionId);
      },
      getSessionId: function() {
        return $cookieStore.get(SESSION_SESSION_ID);
      },
      setSellerId: function(sellerId) {
        return $cookieStore.put(SESSION_SELLER_ID, sellerId);
      },
      getSellerId: function() {
        return $cookieStore.get(SESSION_SELLER_ID);
      },
      setTester: function(bool) {
        return $cookieStore.put(SESSION_TESTER, bool);
      },
      getTester: function() {
        return $cookieStore.get(SESSION_TESTER);
      },
      setHrefList: function(hrefList) {
        return $cookieStore.put(SESSION_HREF_LIST, hrefList);
      },
      getHrefList: function() {
        return $cookieStore.get(SESSION_HREF_LIST);
      },
      clear: function() {
        $cookieStore.remove(SESSION_USERNAME);
        $cookieStore.remove(SESSION_SESSION_ID);
        return $cookieStore.remove(SESSION_SELLER_ID);
      }
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app').service('ToastService', function(toastr, toastrConfig) {
    toastrConfig.autoDismiss = false;
    toastrConfig.allowHtml = false;
    toastrConfig.extendedTimeOut = parseInt('1000', 10);
    toastrConfig.positionClass = 'toast-bottom-right';
    toastrConfig.timeOut = parseInt('3000', 10);
    toastrConfig.closeButton = true;
    toastrConfig.tapToDismiss = true;
    toastrConfig.progressBar = false;
    toastrConfig.closeHtml = '<button>&times;</button>';
    toastrConfig.newestOnTop = true;
    toastrConfig.maxOpened = 0;
    toastrConfig.preventDuplicates = false;
    toastrConfig.preventOpenDuplicates = false;
    toastrConfig.templates = {
      toast: 'views/toast/toast_info.html'
    };
    return {
      showMessageOnInfo: function(message, title) {
        return toastr.info(message, title);
      },
      showMessageOnSuccess: function(message, title) {
        toastrConfig.templates.toast = 'views/toast/toast_success.html';
        return toastr.success(message, title);
      },
      showMessageOnError: function(message, title) {
        toastrConfig.templates.toast = 'views/toast/toast_error.html';
        toastrConfig.timeOut = parseInt('3000', 10);
        return toastr.error(message, title);
      },
      showMessageOnWeightError: function(message, title) {
        toastrConfig.templates.toast = 'views/toast/toast_error.html';
        toastrConfig.timeOut = parseInt('2000', 5);
        return toastr.error(message, title);
      },
      showMessageOnWarning: function(message, title) {
        toastrConfig.templates.toast = 'views/toast/toast_warning.html';
        return toastr.warning(message, title);
      },
      showMessageInProgress: function(message, title) {
        toastrConfig.timeOut = parseInt('2000', 10);
        return toastr.info(message, title);
      }
    };
  });

}).call(this);

(function() {
  'use strict';
  angular.module('app').service('UserStorageService', function(SessionService) {
    var US_LANG, US_PRODUCT_ID, US_PRODUCT_VERSION_ID, US_SERVER_ID;
    US_LANG = "lang";
    US_PRODUCT_ID = "product_id";
    US_PRODUCT_VERSION_ID = "product_version_id";
    US_SERVER_ID = "server_id";
    return {
      getPrefix: function() {
        return SessionService.getPrefix() + SessionService.getUsername() + "/";
      },
      getLang: function() {
        return localStorage.getItem(this.getPrefix() + US_LANG);
      },
      getProductId: function() {
        return localStorage.getItem(this.getPrefix() + US_PRODUCT_ID);
      },
      getProductVersionId: function() {
        return localStorage.getItem(this.getPrefix() + US_PRODUCT_VERSION_ID);
      },
      getServerId: function() {
        return localStorage.getItem(this.getPrefix() + US_SERVER_ID);
      },
      saveLang: function(lang) {
        return localStorage.setItem(this.getPrefix() + US_LANG, lang);
      },
      saveProductId: function(id) {
        return localStorage.setItem(this.getPrefix() + US_PRODUCT_ID, id);
      },
      saveProductVersionId: function(id) {
        return localStorage.setItem(this.getPrefix() + US_PRODUCT_VERSION_ID, id);
      },
      saveServerId: function(id) {
        return localStorage.setItem(this.getPrefix() + US_SERVER_ID, id);
      },
      removeLang: function() {
        return localStorage.removeItem(this.getPrefix() + US_LANG);
      },
      removeProductId: function() {
        return localStorage.removeItem(this.getPrefix() + US_PRODUCT_ID);
      },
      removeProductVersionId: function() {
        return localStorage.removeItem(this.getPrefix() + US_PRODUCT_VERSION_ID);
      },
      removeServerId: function() {
        return localStorage.removeItem(this.getPrefix() + US_SERVER_ID);
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsAddressService', function($q, ApiService, CommonService) {
    return {
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.address.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAllProvince: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.address.listAllProvince",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAllByLevelAndParentId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.address.listAllByLevelAndParentId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.address.listAll",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapAll: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.address.listAll",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsApiService', function($q, ApiService, CommonService) {
    return {
      updateResourceName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.api.updateResourceName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.api.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.api.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.api.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      actionList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.api.actionList",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapAll: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.api.listAll",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsApiParamService', function($q, ApiService) {
    return {
      updateStructRootId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiParam.updateStructRootId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateVarKey: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiParam.updateVarKey",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateDataType: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiParam.updateDataType",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.apiParam.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateStructNodeId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiParam.updateStructNodeId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiParam.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByApiId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.apiParam.listByApiId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      dataTypeList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.apiParam.dataTypeList",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapByApiId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.apiParam.mapByApiId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsApiReturnDataService', function($q, ApiService, CommonService) {
    return {
      updateProviderApiReturnDataId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiReturnData.updateProviderApiReturnDataId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiReturnData.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByProviderApiId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.apiReturnData.listByProviderApiId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapByProviderApiId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.apiReturnData.listByProviderApiId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "apiReturnDataMapId"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsApiReturnDataMapService', function($q, ApiService) {
    return {
      updateRequired: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiReturnDataMap.updateRequired",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateDataType: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiReturnDataMap.updateDataType",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.apiReturnDataMap.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateVarKey: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiReturnDataMap.updateVarKey",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.apiReturnDataMap.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByApiId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.apiReturnDataMap.listByApiId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      dataTypeList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.apiReturnDataMap.dataTypeList",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsAvailableContainerInventoryLogService', function($q, ApiService) {
    return {
      listByAvailableContainerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.availableContainerInventoryLog.listByAvailableContainerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      increaseInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.availableContainerInventoryLog.increaseInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      reduceInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.availableContainerInventoryLog.reduceInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsContainerService', function($q, ApiService) {
    return {
      updateTotalInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.updateTotalInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePostInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.updatePostInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePackingCharge: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.updatePackingCharge",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateLogisticRequire: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.updateLogisticRequire",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateHeight: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.updateHeight",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateWidth: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.updateWidth",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateLength: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.updateLength",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateBarCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.updateBarCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateWeight: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.updateWeight",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.container.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.container.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.container.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsContainerInventoryLogService', function($q, ApiService) {
    return {
      listByContainerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.containerInventoryLog.listByContainerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      increaseInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.containerInventoryLog.increaseInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      reduceInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.containerInventoryLog.reduceInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsFreightGroupService', function($q, ApiService, CommonService) {
    return {
      listByLogisticCompanyId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.freightGroup.listByLogisticCompanyId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateAddedWeightPrice: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.freightGroup.updateAddedWeightPrice",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateFirstWeightPrice: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.freightGroup.updateFirstWeightPrice",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.freightGroup.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.freightGroup.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.freightGroup.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsFreightRuleService', function($q, ApiService) {
    return {
      updateAddedWeightPrice: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.freightRule.updateAddedWeightPrice",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.freightRule.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateFirstWeightPrice: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.freightRule.updateFirstWeightPrice",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.freightRule.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByFreightGroupId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.freightRule.listByFreightGroupId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsGoodsService', function($q, ApiService, CommonService) {
    return {
      updateAbbrName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.updateAbbrName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detailByBarCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goods.detailByBarCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateImage: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.updateImage",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateLogisticRequire: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.updateLogisticRequire",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateWeight: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.updateWeight",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateHeight: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.updateHeight",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateWidth: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.updateWidth",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateLength: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.updateLength",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateBarCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.updateBarCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateIsOwnBox: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.updateIsOwnBox",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goods.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goods.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goods.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapGoods: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goods.listAll",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      },
      goodsMapByPickOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goods.listByPickOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsGoodsBlacklistService', function($q, ApiService, CommonService) {
    return {
      listByPlatformSourceIdAndSellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goodsBlacklist.listByPlatformSourceIdAndSellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapByPlatformSourceIdAndSellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goodsBlacklist.listByPlatformSourceIdAndSellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "uniqueCode"));
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.goodsBlacklist.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goodsBlacklist.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goodsBlacklist.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsGoodsBreakageLogService', function($q, ApiService) {
    return {
      pass: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.goodsBreakageLog.pass",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      reject: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.goodsBreakageLog.reject",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goodsBreakageLog.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goodsBreakageLog.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      reasonEnumList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goodsBreakageLog.listAllReasonEnum",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      statusEnumList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goodsBreakageLog.listAllStatusEnum",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsGoodsEncodeService', function($q, ApiService) {
    return {
      updateBatchNumber: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goodsEncode.updateBatchNumber",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.goodsEncode.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateInventoryStatus: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goodsEncode.updateInventoryStatus",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      goodsInventoryStatusEnumListAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goodsInventoryStatusEnum.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goodsEncode.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goodsEncode.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      autoGenerateEncode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.goodsEncode.autoGenerateEncode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerGoodsId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goodsEncode.listBySellerGoodsId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsGoodsInventoryLogService', function($q, ApiService) {
    return {
      listByGoodsId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.goodsInventoryLog.listByGoodsId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      increaseInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.goodsInventoryLog.increaseInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      reduceInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.goodsInventoryLog.reduceInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsInventoryTransferService', function($q, ApiService) {
    return {
      listByResponseSeller: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.inventoryTransfer.listByResponseSeller",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByRequestSeller: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.inventoryTransfer.listByRequestSeller",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateVoucher: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.inventoryTransfer.updateVoucher",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.inventoryTransfer.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.inventoryTransfer.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.inventoryTransfer.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      submitInventoryTransfer: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.inventoryTransfer.submit",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      passInventoryTransfer: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.inventoryTransfer.pass",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      rejectInventoryTransfer: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.inventoryTransfer.reject",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      completeInventoryTransfer: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.inventoryTransfer.complete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      statusEnumList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.inventoryTransfer.listAllStatusEnum",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsInventoryTransferGoodsService', function($q, ApiService, CommonService) {
    return {
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.inventoryTransferGoods.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.inventoryTransferGoods.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByInventoryTransferId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.inventoryTransferGoods.listByInventoryTransferId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      goodsMapByInventoryTransferId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.inventoryTransferGoods.goodsListByInventoryTransferId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, 'sellerGoodsId'));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsInventoryTransferScanGoodsService', function($q, ApiService) {
    return {
      listByInventoryTransferId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.inventoryTransferScanGoods.listByInventoryTransferId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      scanGoodsCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.inventoryTransferScanGoods.scanGoodsCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      emptyScanGoods: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.inventoryTransferScanGoods.emptyScanGoods",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsLocationService', function($q, ApiService) {
    return {
      listByRepositoryId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.location.listByRepositoryId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      update: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.location.update",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.location.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.location.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.location.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      ABCListAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.abcEnum.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsLogisticCompanyService', function($q, ApiService, CommonService) {
    return {
      updateMonthCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticCompany.updateMonthCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateSendSite: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticCompany.updateSendSite",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateCustomerPwd: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticCompany.updateCustomerPwd",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateCustomerName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticCompany.updateCustomerName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticCompany.updateCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticCompany.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticCompany.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticCompany.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticCompany.listUsableAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsLogisticOrderService', function($q, ApiService, ModalService, $i18next) {
    return {
      updateLogisticCharge: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.updateLogisticCharge",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateTotalWeight: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.updateTotalWeight",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateContainerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.updateContainerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateContainerIdAndTotalWeight: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.updateContainerIdAndTotalWeight",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateExpressSn: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.updateExpressSn",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detailByLogisticSn: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.detailByLogisticSn",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByLogisticCompanyIdAndIsExport: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.listByLogisticCompanyIdAndIsExport",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByIsExport: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.listByIsExport",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateComment: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.updateComment",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateLogisticSn: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.updateLogisticSn",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.logisticOrder.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateLogisticCompanyId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.updateLogisticCompanyId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateIsPrintedByPickOrderIds: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.updateIsPrintedByPickOrderIds",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detailByExpressSn: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.detailByExpressSn",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAllStatusEnum: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.listAllStatusEnum",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      scanComplete: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.logisticOrder.scanComplete",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      pickScanComplete: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.pickScanComplete",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      checkExpressSn: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.checkExpressSn",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      waitPackNoScanList: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.waitPackNoScanList",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateAddress: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.updateAddress",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      exportExpressOrder: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.exportExpressOrder",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAllEmptyExpressSn: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.listAllEmptyExpressSn",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      importExpressSn: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.importExpressSn",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      getExpressOrderByBarCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrder.getExpressOrderByBarCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      setExpressSn: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrder.setExpressSn",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          },
          errorCallBack: function(respond) {
            ModalService.showMessageOnError($i18next('wms:message.apiError.' + respond.errorCode));
            return deferred.resolve(respond);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsLogisticOrderGoodsService', function($q, ApiService, CommonService) {
    return {
      listByLogisticOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrderGoods.listByLogisticOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapByLogisticOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrderGoods.listByLogisticOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "goodsId"));
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrderGoods.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsLogisticOrderScanGoodsService', function($q, ApiService, CommonService) {
    return {
      updatePickGoodsNumber: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrderScanGoods.updatePickGoodsNumber",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePackGoodsNumber: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.logisticOrderScanGoods.updatePackGoodsNumber",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByLogisticOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrderScanGoods.listByLogisticOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapByLogisticOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticOrderScanGoods.listByLogisticOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsLogisticRequireService', function($q, ApiService) {
    return {
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.logisticRequireEnum.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsMemberService', function($i18next, $q, $rootScope, ApiService, ModalService, SessionService, CommonService) {
    return {
      updateMobilePhone: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.member.updateMobilePhone",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateRealName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.member.updateRealName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateJobNumber: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.member.updateJobNumber",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      disabledMember: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.member.disabledMember",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listSellerMember: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.member.listSellerMember",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapSellerMember: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.member.listSellerMember",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.member.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.member.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.member.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.member.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listMember: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.member.listMember",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapMember: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.member.listMember",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      },
      changePassword: function(member) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.member.changePassword",
            version: "1.0"
          },
          params: member,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      resetPassword: function(member) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.member.resetPassword",
            version: "1.0"
          },
          params: member,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      signIn: function(member) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.member.login",
            version: "1.0"
          },
          params: member,
          successCallBack: function(data) {
            SessionService.clear();
            SessionService.setSessionId(data.sessionId);
            if (data.hasOwnProperty("sellerId")) {
              SessionService.setSellerId(data.sellerId);
            }
            SessionService.setUsername(member.name);
            $rootScope.$broadcast("userSignInSuccess", member.name);
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      signOut: function() {
        SessionService.clear();
        $rootScope.$broadcast("userSignOutSuccess");
        return ModalService.showMessageOnSuccess($i18next("passport:message.onSignOutSuccess"));
      },
      addSellerMember: function(member) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.member.addSellerMember",
            version: "1.0"
          },
          params: member,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAllBase: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.member.listAllBase",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapAllBase: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.member.listAllBase",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsMemberRoleService', function($q, ApiService) {
    return {
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.memberRole.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.memberRole.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByMemberId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.memberRole.listByMemberId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detailBySession: function(member) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.memberRole.detailBySession",
            version: "1.0"
          },
          params: member,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByRoleId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.memberRole.listByRoleId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsModuleActionService', function($q, ApiService) {
    return {
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.moduleAction.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.moduleAction.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateAlias: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.moduleAction.updateAlias",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.moduleAction.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.moduleAction.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsOrderService', function($q, ApiService) {
    return {
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.order.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateIdentityCardContrary: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.order.updateIdentityCardContrary",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateIdentityCardFront: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.order.updateIdentityCardFront",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateIdentityCard: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.order.updateIdentityCard",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateConsigneeAddress: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.order.updateConsigneeAddress",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateConsigneeName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.order.updateConsigneeName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.order.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePhoneNumber: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.order.updatePhoneNumber",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.order.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      splitOrder: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.order.splitOrder",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      splitOrderNoConfirm: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.order.splitOrder",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      splitOrderIds: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.order.splitOrderIds",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      verifyOrder: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.order.verifyOrder",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      listAllOrderStatusEnum: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.orderStatusEnum.listAll",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndWaitVerify: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.order.listBySellerIdAndWaitVerify",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndSuccessVerify: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.order.listBySellerIdAndSuccessVerify",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndPartSplit: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.order.listBySellerIdAndPartSplit",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndSuccessSplit: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.order.listBySellerIdAndSuccessSplit",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      getTotalPrice: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.order.getTotalPrice",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateAddress: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.order.updateAddress",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      withdrawAudit: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.order.withdrawAudit",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      getNextVerifyOrderBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.order.getNextVerifyOrderBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsOrderGoodsService', function($q, ApiService, CommonService) {
    return {
      updateGoodsNumber: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.orderGoods.updateGoodsNumber",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.orderGoods.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.orderGoods.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.orderGoods.listByOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapByOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.orderGoods.listByOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      },
      listByOrderIdAndIsSplit: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.orderGoods.listByOrderIdAndIsSplit",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByOrderIdAndIsSplitMap: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.orderGoods.listByOrderIdAndIsSplit",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsOrderPickOrderRefService', function($q, ApiService) {
    return {
      listByPickOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.orderPickOrderRef.listByPickOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.orderPickOrderRef.listByOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsPackOrderGoodsService', function($q, ApiService) {
    return {
      listByPackOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.packOrderGoods.listByPackOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      packStatusUpdateScanGoodsNumber: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.packOrderGoods.packStatusUpdateScanGoodsNumber",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          },
          errorCallBack: function(respond) {
            return deferred.resolve(respond);
          }
        });
        return deferred.promise;
      },
      mapGoodsIdListByPackOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.packOrderGoods.mapGoodsIdListByPackOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      pickStatusUpdateScanGoodsNumber: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.packOrderGoods.pickStatusUpdateScanGoodsNumber",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByPickOrderGoodsId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.packOrderGoods.listByPickOrderGoodsId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsPickOrderService', function($q, ApiService) {
    return {
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detailPickAndLogisticOrder: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.detailPickAndLogisticOrder",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAllJoinLogisticOrder: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.listAllJoinLogisticOrder",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      addPrepackGoods: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.pickOrder.addPrepackGoods",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      addPrepackGoodsGroup: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.pickOrder.addPrepackGoodsGroup",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detailByExpressSn: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.detailByExpressSn",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detailByLogisticOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.detailByLogisticOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      pickComplete: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.pickOrder.pickComplete",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      pickReject: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.pickOrder.pickReject",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      packScanComplete: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.pickOrder.packScanComplete",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      updateContainerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.pickOrder.updateContainerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      packScanReject: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.pickOrder.packScanReject",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      listGoodsBarcodeForDemo: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.listGoodsBarcodeForDemo",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      waitPackNoScanList: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.waitPackNoScanList",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      waitPickList: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.waitPickList",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      withdrawAudit: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.pickOrder.withdrawAudit",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listPrintableSellerGoodsBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.listPrintableSellerGoodsBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      prepackComplete: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.pickOrder.prepackComplete",
            version: "1.0"
          },
          params: params,
          successCallBack: function() {
            return deferred.resolve(true);
          }
        });
        return deferred.promise;
      },
      waitDeliveryList: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.waitDeliveryList",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      getExpressOrderList: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.getExpressOrderList",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      waitPickNoPrintList: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.waitPickNoPrintList",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      waitPickPrintedList: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrder.waitPickPrintedList",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsPickOrderGoodsService', function($q, ApiService) {
    return {
      listByPickOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrderGoods.listByPickOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByLogisticOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrderGoods.listByLogisticOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapPickOrderIdListBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrderGoods.mapPickOrderIdListBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsPickOrderLogService', function($q, ApiService) {
    return {
      listByLogisticOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.pickOrderLog.listByLogisticOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsPlatformOrderUploadService', function($q, ApiService) {
    return {
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.platformOrderUpload.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.platformOrderUpload.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.platformOrderUpload.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.platformOrderUpload.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      deal: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.platformOrderUpload.deal",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsPlatformSourceService', function($q, ApiService, CommonService) {
    return {
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.platformSource.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.platformSource.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.platformSource.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.platformSource.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapPlatformSource: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.platformSource.listAll",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsProviderService', function($q, ApiService, CommonService) {
    return {
      updateVersion: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.provider.updateVersion",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateFormat: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.provider.updateFormat",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateAppSecret: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.provider.updateAppSecret",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateAppKey: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.provider.updateAppKey",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateFilename: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.provider.updateFilename",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePort: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.provider.updatePort",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateHostname: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.provider.updateHostname",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateScheme: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.provider.updateScheme",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.provider.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.provider.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.provider.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.provider.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.provider.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      schemeList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.provider.schemeList",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapAll: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.provider.listAll",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsProviderApiService', function($q, ApiService) {
    return {
      updateVersion: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApi.updateVersion",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateProviderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApi.updateProviderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateFilename: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApi.updateFilename",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateHostName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApi.updateHostName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateAction: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApi.updateAction",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.providerApi.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApi.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByApiId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.providerApi.listByApiId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsProviderApiParamService', function($q, ApiService) {
    return {
      updateDefaultValue: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApiParam.updateDefaultValue",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateApiParamId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApiParam.updateApiParamId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateRequired: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApiParam.updateRequired",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateDataType: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApiParam.updateDataType",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.providerApiParam.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateVarKey: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApiParam.updateVarKey",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApiParam.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByProviderApiId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.providerApiParam.listByProviderApiId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      dataTypeList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.providerApiParam.dataTypeList",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsProviderApiReturnDataService', function($q, ApiService) {
    return {
      updateDataType: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApiReturnData.updateDataType",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.providerApiReturnData.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateVarKey: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApiReturnData.updateVarKey",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.providerApiReturnData.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByProviderApiId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.providerApiReturnData.listByProviderApiId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      dataTypeList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.providerApiReturnData.dataTypeList",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapByProviderApiId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.providerApiReturnData.mapByProviderApiId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsRepositoryService', function($q, ApiService) {
    return {
      listByWarehouseId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.repository.listByWarehouseId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      update: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.repository.update",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.repository.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.repository.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.repository.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listUseAttribute: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.useAttributeEnum.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsRoleService', function($q, ApiService, CommonService) {
    return {
      listBySellerRole: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.role.listBySellerRole",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapRoleBySellerRole: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.role.listBySellerRole",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.role.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.role.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.role.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.role.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.role.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsRoleAclService', function($q, ApiService, CommonService) {
    return {
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.roleAcl.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.roleAcl.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByRoleId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.roleAcl.listByRoleId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapByRoleId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.roleAcl.listByRoleId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "moduleActionId"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerService', function($q, ApiService, CommonService) {
    return {
      updateSellerFreightGroupId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.seller.updateSellerFreightGroupId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.seller.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.seller.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateComment: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.seller.updateComment",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateCreditLine: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.seller.updateCreditLine",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.seller.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateComment: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.seller.updateComment",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateIsWeightSet: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.seller.updateIsWeightSet",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.seller.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.seller.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapAll: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.seller.listAll",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, 'id'));
          }
        });
        return deferred.promise;
      },
      listAllBase: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.seller.listAllBase",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerAvailableService', function($q, ApiService) {
    return {
      getPayModeList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailable.payModeList",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerAvailableContainerService', function($q, ApiService, CommonService) {
    return {
      listByContainerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableContainer.listByContainerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapByContainerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableContainer.listByContainerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "sellerId"));
          }
        });
        return deferred.promise;
      },
      updatePrice: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableContainer.updatePrice",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateDisabled: function(params, bool) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.sellerAvailableContainer.updateDisabled",
            version: "1.0"
          },
          params: {
            id: params.id,
            disabled: bool
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateQuantity: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableContainer.updateQuantity",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePayMode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableContainer.updatePayMode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableContainer.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableContainer.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableContainer.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndDisabled: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableContainer.listBySellerIdAndDisabled",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableContainer.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listContainerBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableContainer.listContainerBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapContainerBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableContainer.listContainerBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, 'id'));
          }
        });
        return deferred.promise;
      },
      detailBySellerIdAndBarCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableContainer.detailBySellerIdAndBarCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerAvailableGoodsService', function($q, ApiService, CommonService) {
    return {
      detailByUK: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableGoods.detailByUK",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateShelfLocation: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableGoods.updateShelfLocation",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateEncodeType: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableGoods.updateEncodeType",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateQuantity: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableGoods.updateQuantity",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePrice: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableGoods.updatePrice",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndDisabled: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableGoods.listBySellerIdAndDisabled",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndUseable: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableGoods.listBySellerIdAndUseable",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByGoodsId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableGoods.listByGoodsId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapByGoodsId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableGoods.listByGoodsId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "sellerId"));
          }
        });
        return deferred.promise;
      },
      updateDisabled: function(params, bool) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.sellerAvailableGoods.updateDisabled",
            version: "1.0"
          },
          params: {
            id: params.id,
            disabled: bool
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableGoods.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableGoods.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableGoods.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listGoodsBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerAvailableGoods.listGoodsBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listEncodeType: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.encodeTypeEnum.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      goodsStorage: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableGoods.goodsStorage",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      goodsPutaway: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerAvailableGoods.goodsPutaway",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerComboGoodsService', function($q, ApiService) {
    return {
      updateGoodsNumber: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerComboGoods.updateGoodsNumber",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.sellerComboGoods.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerComboGoods.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByComboId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerComboGoods.listByComboId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerFreightGroupService', function($q, ApiService, CommonService) {
    return {
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerFreightGroup.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateFreightGroupId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerFreightGroup.updateFreightGroupId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerFreightGroup.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerFreightGroup.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerFreightGroup.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, 'id'));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerGoodsService', function($q, ApiService, CommonService) {
    return {
      updateBarCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.sellerGoods.updateBarCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateAbbrName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateAbbrName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePrepackWeight: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updatePrepackWeight",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateImage: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateImage",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateLength: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateLength",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateHeight: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateHeight",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateWidth: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateWidth",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateWeight: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateWeight",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detailByBarCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.detailByBarCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateShelfLocation: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateShelfLocation",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateEncodeType: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateEncodeType",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePrice: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updatePrice",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateLogisticRequire: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateLogisticRequire",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateIsCombo: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.updateIsCombo",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndNoCombo: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.listBySellerIdAndNoCombo",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapBySellerIdAndNoCombo: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.listBySellerIdAndNoCombo",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      },
      listEncodeType: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.encodeTypeEnum.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      },
      listByPlatformSourceIdAndSellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.listByPlatformSourceIdAndSellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAllComboBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.listAllComboBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      goodsPutaway: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoods.goodsPutaway",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detailByGoodsEncodeAndPackOrderId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.detailByGoodsEncodeAndPackOrderId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      waitToUploadImagesList: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoods.waitToUploadImagesList",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerGoodsInventoryLogService', function($q, ApiService) {
    return {
      listBySellerGoodsId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoodsInventoryLog.listBySellerGoodsId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      increaseInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoodsInventoryLog.increaseInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      reduceInventory: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.confirm({
          api: {
            name: "wms.sellerGoodsInventoryLog.reduceInventory",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerGoodsUploadService', function($q, ApiService) {
    return {
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoodsUpload.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerGoodsUpload.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerGoodsUpload.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerImportRulesService', function($q, ApiService) {
    return {
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerImportRules.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndOrderImport: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerImportRules.listBySellerIdAndOrderImport",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndGoodsImport: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerImportRules.listBySellerIdAndGoodsImport",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerPlatformGoodsService', function($q, ApiService) {
    return {
      updateDisabled: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerPlatformGoods.updateDisabled",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateUniqueCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerPlatformGoods.updateUniqueCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerPlatformGoods.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerPlatformGoods.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerIdAndMapBySourceId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerPlatformGoods.listBySellerIdAndMapBySourceId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSellerPlatformSourceService', function($q, ApiService) {
    return {
      updateSubscribeService: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerPlatformSource.updateSubscribeService",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateSecret: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerPlatformSource.updateSecret",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateAppKey: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerPlatformSource.updateAppKey",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerPlatformSource.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.sellerPlatformSource.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.sellerPlatformSource.listBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsSenderAddressService', function($q, ApiService) {
    return {
      updateAddress: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.senderAddress.updateAddress",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePrefixAddress: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.senderAddress.updatePrefixAddress",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updatePhoneNumber: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.senderAddress.updatePhoneNumber",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.senderAddress.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detailBySellerId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.senderAddress.detailBySellerId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.senderAddress.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsStructNodeService', function($q, ApiService) {
    return {
      updateDataType: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.structNode.updateDataType",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.structNode.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateFieldName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.structNode.updateFieldName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.structNode.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listByRootId: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.structNode.listByRootId",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      dataTypeList: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.structNode.dataTypeList",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsStructRootService', function($q, ApiService, CommonService) {
    return {
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.structRoot.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.structRoot.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.structRoot.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.structRoot.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapAll: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.structRoot.listAll",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsUsableLogisticCompanyService', function($q, ApiService, CommonService) {
    return {
      updateCode: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.usableLogisticCompany.updateCode",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      "delete": function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService["delete"]({
          api: {
            name: "wms.usableLogisticCompany.delete",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      updateName: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.usableLogisticCompany.updateName",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.usableLogisticCompany.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.usableLogisticCompany.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      mapAll: function() {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.usableLogisticCompany.listAll",
            version: "1.0"
          },
          successCallBack: function(data) {
            return deferred.resolve(CommonService.convertListToMap(data, "id"));
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module('app').service('WmsWarehouseService', function($q, ApiService) {
    return {
      update: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.warehouse.update",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      detail: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.warehouse.detail",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      add: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.post({
          api: {
            name: "wms.warehouse.add",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      },
      listAll: function(params) {
        var deferred;
        deferred = $q.defer();
        ApiService.get({
          api: {
            name: "wms.warehouse.listAll",
            version: "1.0"
          },
          params: params,
          successCallBack: function(data) {
            return deferred.resolve(data);
          }
        });
        return deferred.promise;
      }
    };
  });

}).call(this);
