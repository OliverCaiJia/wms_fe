angular.module 'app'

.service 'WmsSellerPlatformSourceService', ($q, ApiService) ->
  
  updateSubscribeService: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerPlatformSource.updateSubscribeService"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateSecret: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerPlatformSource.updateSecret"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateAppKey: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerPlatformSource.updateAppKey"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerPlatformSource.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerPlatformSource.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerPlatformSource.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                