angular.module 'app'

.service 'WmsGoodsInventoryLogService', ($q, ApiService) ->
  
  listByGoodsId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goodsInventoryLog.listByGoodsId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  increaseInventory: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.goodsInventoryLog.increaseInventory"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  reduceInventory: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.goodsInventoryLog.reduceInventory"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise