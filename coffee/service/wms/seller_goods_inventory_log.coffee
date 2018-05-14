angular.module 'app'

.service 'WmsSellerGoodsInventoryLogService', ($q, ApiService) ->
  
  listBySellerGoodsId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoodsInventoryLog.listBySellerGoodsId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  increaseInventory: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoodsInventoryLog.increaseInventory"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  reduceInventory: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.sellerGoodsInventoryLog.reduceInventory"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
