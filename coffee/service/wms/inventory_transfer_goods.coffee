angular.module 'app'

.service 'WmsInventoryTransferGoodsService', ($q, ApiService, CommonService) ->
  
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.inventoryTransferGoods.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.inventoryTransferGoods.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByInventoryTransferId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.inventoryTransferGoods.listByInventoryTransferId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  goodsMapByInventoryTransferId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.inventoryTransferGoods.goodsListByInventoryTransferId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, 'sellerGoodsId')
    deferred.promise
                