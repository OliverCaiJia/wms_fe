angular.module 'app'

.service 'WmsGoodsBlacklistService', ($q, ApiService, CommonService) ->
  
  listByPlatformSourceIdAndSellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goodsBlacklist.listByPlatformSourceIdAndSellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapByPlatformSourceIdAndSellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goodsBlacklist.listByPlatformSourceIdAndSellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "uniqueCode")
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.goodsBlacklist.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goodsBlacklist.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goodsBlacklist.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                