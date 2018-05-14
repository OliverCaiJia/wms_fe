'use strict'

angular.module 'app.controllers'

.controller 'WmsMemberListCtrl', ($scope, $routeParams, $filter, CommonService, WmsMemberService, ClickEditService
  SessionService) ->
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
    promise = WmsMemberService.add($scope.member)
    promise.then (data) ->
      $scope.member.id = data
      $scope.items.unshift($scope.member)
      $scope.createMember = {}
      $scope.member = {isSellerMember: false}
      initSearch()
                
  # delete
  $scope.delete = (id, i) ->
    params = {id: id}
    promise = WmsMemberService.delete(params)
    promise.then ->
      $scope.items.splice(i, 1)
      initSearch()

  # disabled
  $scope.disabledMember = (member, bool) ->
    member.disabled = bool
    promise = WmsMemberService.disabledMember(member)
    promise.then ->
                
  # update
  $scope.updateName = (member, fieldName) ->
    if ClickEditService.updateNode(member, fieldName)
      promise = WmsMemberService.updateName(member)
      promise.then ->

  # update
  $scope.updateMobilePhone = (member, fieldName) ->
    if ClickEditService.updateNode(member, fieldName)
      promise = WmsMemberService.updateMobilePhone(member)
      promise.then ->

  # update
  $scope.updateRealName = (member, fieldName) ->
    if ClickEditService.updateNode(member, fieldName)
      promise = WmsMemberService.updateRealName(member)
      promise.then ->

  # update
  $scope.updateJobNumber = (member, fieldName) ->
    if ClickEditService.updateNode(member, fieldName)
      promise = WmsMemberService.updateJobNumber(member)
      promise.then ->
                
  $scope.switchCollapse = (node) ->
    CommonService.switchCollapse(node)

  $scope.switchNode = (member, fieldName, bool) ->
    ClickEditService.switchNode(member, fieldName, bool)

  prepareConst = ->

  main = ->
    $scope.createMember = {}
    $scope.member = {isSellerMember: false}
    $scope.username = SessionService.getUsername()
    promise = WmsMemberService.listMember()
    promise.then (data) ->
      $scope.items = data
      initSearch()
    prepareConst()

  main()