'use strict'

angular.module 'app.controllers'

.controller 'WmsSellerGoodsManageListCtrl', ($scope, $routeParams, $filter, CommonService,$i18next, ClickEditService,
  WmsSellerGoodsService,WmsLogisticRequireService,WmsSellerService,WmsConfigService,
  WmsSellerImportRulesService,WmsSellerGoodsUploadService) ->
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
    if $scope.sellerGoods.hasOwnProperty("name")
      promise = WmsSellerGoodsService.add($scope.sellerGoods)
      promise.then (data) ->
        $scope.sellerGoods.id = data
        $scope.items.unshift($scope.sellerGoods)
        $scope.createSellerGoods = {}
        $scope.sellerGoods = {isCombo:0,sellerId:$scope.sellerId,encodeType:"bar",inventory:0}
        initSearch()

  # update
  $scope.updateBarCode = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateBarCode(sellerGoods)
      promise.then ->

# update
  $scope.updateLogisticRequire = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateLogisticRequire(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateWeight = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateWeight(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateName = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateName(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateAbbrName = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateAbbrName(sellerGoods)
      promise.then ->
                
  # update
  $scope.updatePrepackWeight = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updatePrepackWeight(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateImage = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateImage(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateLength = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateLength(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateHeight = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateHeight(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateWidth = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateWidth(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateShelfLocation = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateShelfLocation(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateEncodeType = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateEncodeType(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateInventory = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateInventory(sellerGoods)
      promise.then ->
                
  # update
  $scope.updatePrice = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updatePrice(sellerGoods)
      promise.then ->
                
  # update
  $scope.updateIsCombo = (sellerGoods, fieldName) ->
    if ClickEditService.updateNode(sellerGoods, fieldName)
      promise = WmsSellerGoodsService.updateIsCombo(sellerGoods)
      promise.then ->

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)
    if !$scope.importSellerGoods.inEditing
      initCsv()

  $scope.switchNode = (sellerGoods, fieldName, bool) ->
    ClickEditService.switchNode(sellerGoods, fieldName, bool)

  $scope.checkLogisticRequire = () ->
    $scope.container.logisticRequire = []
    angular.forEach($scope.logisticRequireEnum,(require)->
      if $scope.logisticRequireList[require]
        $scope.container.logisticRequire.push(require)
    )
    if $scope.container.logisticRequire.length == 0
      $scope.container.logisticRequire = ['']
    promise = WmsSellerGoodsService.updateLogisticRequire($scope.container)
    promise.then ->

  $scope.exportOrder = () ->
    promise = WmsSellerGoodsService.exportSellerGoodsTemplate()
    promise.then (data) ->
      url = WmsConfigService.getFileHost() + '/export_file/express_order?filePath=' + data
      window.location.href = url

  $scope.deleteRow = (index) ->
    $scope.csv.result.splice(index,1)

  # upload
  $scope.upload = ->
    $scope.sellerGoodsUpload.sellerId = $scope.sellerId
    $scope.sellerGoodsUpload.fileData = JSON.stringify($scope.csv.result)
    promise = WmsSellerGoodsUploadService.add($scope.sellerGoodsUpload)
    promise.then (data) ->
      $scope.items = data
      $scope.importSellerGoods = {}
      $scope.sellerGoodsUpload.fileData = null
      initCsv()
      initSearch()

  prepareConst = ->
    params = {id:$scope.sellerId}
    promise = WmsSellerService.detail(params)
    promise.then (data) ->
      $scope.seller = data

    promise = WmsLogisticRequireService.listAll()
    promise.then (data) ->
      $scope.logisticRequireEnum = data

    promise = WmsSellerGoodsService.listEncodeType()
    promise.then (data) ->
      $scope.encodeTypeList = data
      $scope.encodeTypeMap = []
      for encodeType in data
        $scope.encodeTypeMap[encodeType] = $i18next("wms:ui.statusEnum.encodeType."+encodeType)

    params = {sellerId: $scope.sellerId}
    promise = WmsSellerImportRulesService.listBySellerIdAndGoodsImport(params)
    promise.then (data) ->
      $scope.sellerImportRulesList = data
      angular.forEach($scope.sellerImportRulesList,(sellerImportRules,key) ->
        $scope.sellerImportRulesList[key].rules =  JSON.parse(sellerImportRules.rules)
      )
      $scope.sellerImportRulesMap = CommonService.convertListToMap($scope.sellerImportRulesList,'id')

      $scope.sellerGoodsUpload.sellerImportRulesId = $scope.sellerImportRulesList[0].id
      $scope.rulesMap =  $scope.sellerImportRulesList[0].rules


  initCsv = ->
    $scope.csv = {
      content: null,
      header: false,
      headerVisible: false,
      separator: ',',
      separatorVisible: false,
      result: null,
      encoding: 'utf-8',
      encodingVisible: false,
    }

  main = ->
    initCsv()
    $scope.createSellerGoods = {}
    $scope.importSellerGoods = {}
    $scope.sellerId = $routeParams.sellerId
    $scope.imgHost = WmsConfigService.getImgHost()
    $scope.sellerGoodsUpload = {}

    $scope.sellerGoods = {isCombo:0,sellerId:$scope.sellerId,encodeType:"bar",inventory:0}
    params = {sellerId:$scope.sellerId}
    promise = WmsSellerGoodsService.listBySellerId(params)
    promise.then (data) ->
      $scope.items = data
      initSearch()
      prepareConst()

  main()