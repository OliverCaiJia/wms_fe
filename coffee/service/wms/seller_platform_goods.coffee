angular.module 'app'

.service 'WmsSellerPlatformGoodsService', ($q, ApiService) ->
  
  updateDisabled: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerPlatformGoods.updateDisabled"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateUniqueCode: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerPlatformGoods.updateUniqueCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerPlatformGoods.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerPlatformGoods.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listBySellerIdAndMapBySourceId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerPlatformGoods.listBySellerIdAndMapBySourceId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                