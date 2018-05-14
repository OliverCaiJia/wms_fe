angular.module 'app'

.service 'WmsInventoryTransferScanGoodsService', ($q, ApiService) ->
  
  listByInventoryTransferId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.inventoryTransferScanGoods.listByInventoryTransferId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  scanGoodsCode: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.inventoryTransferScanGoods.scanGoodsCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  emptyScanGoods: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.inventoryTransferScanGoods.emptyScanGoods"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise