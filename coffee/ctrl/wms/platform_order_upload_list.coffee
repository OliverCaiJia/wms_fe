'use strict'

angular.module 'app.controllers'

.controller 'WmsPlatformOrderUploadListCtrl', ($scope, $routeParams, $filter, CommonService, WmsPlatformSourceService
  WmsPlatformOrderUploadService, WmsMemberService, ClickEditService, SessionService, WmsConfigService,
  $timeout, ModalService,WmsSellerPlatformSourceService,WmsSellerImportRulesService) ->
  $scope.select = (page) ->
    start = (page - 1) * $scope.searchOption.numPerPage
    end = start + $scope.searchOption.numPerPage
    $scope.currentPageItems = $scope.filteredItems.slice(start, end)

  $scope.onFilterChange = ->
    $scope.select(1)
    $scope.currentPage = 1
    $scope.row = ''

  $scope.onNumPerPageChange = ->
    $scope.select(1)
    $scope.currentPage = 1

  $scope.onOrderChange = ->
    $scope.select(1)
    $scope.currentPage = 1

  $scope.search = ->
    $scope.filteredItems = $filter('filter')($scope.items, $scope.searchOption.keywords)
    $scope.onFilterChange()

  # orderBy
  $scope.order = (rowName)->
    if $scope.row == rowName
      return
    $scope.row = rowName
    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, rowName)
    $scope.onOrderChange()

  # initSearch
  initSearch = ->
    $scope.searchOption = {"keywords":""}
    $scope.filteredItems = []
    $scope.row = ''
    $scope.numPerPageOpt = [10, 20, 50, 100]
    $scope.searchOption.numPerPage = $scope.numPerPageOpt[0]
    $scope.currentPage = 1
    $scope.currentPageItems = []
    $scope.search()
    $scope.select($scope.currentPage)
        
  # add
  $scope.add = ->
    $scope.platformOrderUpload.sellerId = $scope.sellerId
    $scope.platformOrderUpload.status = 0
    $scope.platformOrderUpload.fileData = JSON.stringify($scope.csv.result)
    promise = WmsPlatformOrderUploadService.add($scope.platformOrderUpload)
    promise.then (data) ->
      $scope.platformOrderUpload.id = data
      $scope.items.unshift($scope.platformOrderUpload)
      $scope.createPlatformOrderUpload = {}
      $scope.platformOrderUpload = {}
      initCsv()
      initSearch()
                
  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsPlatformOrderUploadService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()

  # deal
  $scope.deal = (item) ->
    params = {id: item.id}
    promise = WmsPlatformOrderUploadService.deal(params)
    promise.then (data) ->
      item.status = data

  $scope.deleteRow = (index) ->
    $scope.csv.result.splice(index,1)

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (platformOrderUpload, fieldName, bool) ->
    ClickEditService.switchNode(platformOrderUpload, fieldName, bool)

  prepareConst = ->
    promise = WmsPlatformSourceService.mapPlatformSource()
    promise.then (data) ->
      $scope.platformSourceMap = data

    params = {sellerId: $scope.sellerId}
    promise = WmsSellerPlatformSourceService.listBySellerId(params)
    promise.then (data) ->
      $scope.sellerPlatformSourceList = data
      $scope.platformOrderUpload.platformSourceId = $scope.sellerPlatformSourceList[0].platformSourceId

      promise = WmsSellerImportRulesService.listBySellerIdAndOrderImport(params)
      promise.then (data) ->
        $scope.sellerImportRulesList = data
        angular.forEach($scope.sellerImportRulesList,(sellerImportRules,key) ->
          $scope.sellerImportRulesList[key].rules =  JSON.parse(sellerImportRules.rules)
        )
        $scope.sellerImportRulesMap = CommonService.convertListToMap($scope.sellerImportRulesList,'id')
        $scope.platformOrderUpload.sellerImportRulesId = $scope.sellerImportRulesList[0].id
        $scope.rulesMap =  $scope.sellerImportRulesList[0].rules

    params = {sellerId: $scope.sellerId}
    promise = WmsMemberService.mapSellerMember(params)
    promise.then (data) ->
      $scope.memberMap = data

  initCsv = ->
    $scope.csv = {
      content: null,
      header: false,
      headerVisible: false,
      separator: ',',
      separatorVisible: false,
      result: null,
      encoding: 'gbk',
      encodingVisible: false,
    }

  main = ->
    initCsv()
    $scope.createPlatformOrderUpload = {}
    $scope.platformOrderUpload = {}
    $scope.username = SessionService.getUsername()
    $scope.sellerId = SessionService.getSellerId()
    params = {sellerId: $scope.sellerId}
    promise = WmsPlatformOrderUploadService.listBySellerId(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()
    prepareConst()

  main()