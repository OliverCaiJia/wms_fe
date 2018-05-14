angular.module 'app'

.service 'WmsGoodsBreakageLogService', ($q, ApiService) ->
  
  pass: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.goodsBreakageLog.pass"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  reject: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.goodsBreakageLog.reject"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goodsBreakageLog.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goodsBreakageLog.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  reasonEnumList: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goodsBreakageLog.listAllReasonEnum"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  statusEnumList: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goodsBreakageLog.listAllStatusEnum"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                