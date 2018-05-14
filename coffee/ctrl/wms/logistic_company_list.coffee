'use strict'

angular.module 'app.controllers'

.controller 'WmsLogisticCompanyListCtrl', ($scope, $routeParams, $filter, CommonService, WmsLogisticCompanyService
  WmsUsableLogisticCompanyService, ClickEditService) ->
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
    promise = WmsLogisticCompanyService.add($scope.logisticCompany)
    promise.then (data) ->
      $scope.logisticCompany.id = data
      $scope.items.unshift($scope.logisticCompany)
      $scope.createLogisticCompany = {}
      $scope.logisticCompany = {}
      initSearch()
                
  # update
  $scope.updateMonthCode = (logisticCompany, fieldName) ->
    if ClickEditService.updateNode(logisticCompany, fieldName)
      promise = WmsLogisticCompanyService.updateMonthCode(logisticCompany)
      promise.then ->
                
  # update
  $scope.updateSendSite = (logisticCompany, fieldName) ->
    if ClickEditService.updateNode(logisticCompany, fieldName)
      promise = WmsLogisticCompanyService.updateSendSite(logisticCompany)
      promise.then ->
                
  # update
  $scope.updateCustomerPwd = (logisticCompany, fieldName) ->
    if ClickEditService.updateNode(logisticCompany, fieldName)
      promise = WmsLogisticCompanyService.updateCustomerPwd(logisticCompany)
      promise.then ->
                
  # update
  $scope.updateCustomerName = (logisticCompany, fieldName) ->
    if ClickEditService.updateNode(logisticCompany, fieldName)
      promise = WmsLogisticCompanyService.updateCustomerName(logisticCompany)
      promise.then ->

  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (logisticCompany, fieldName, bool) ->
    ClickEditService.switchNode(logisticCompany, fieldName, bool)

  prepareConst = ->
    promise = WmsUsableLogisticCompanyService.mapAll()
    promise.then (data) ->
      $scope.usableLogisticCompanyMap = data

  main = ->
    $scope.createLogisticCompany = {}
    $scope.logisticCompany = {}
    promise = WmsLogisticCompanyService.listAll()
    promise.then (data) ->
      $scope.items = data
      initSearch()
                
    prepareConst()

  main()