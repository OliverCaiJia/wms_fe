angular.module 'app'

.service 'WmsPackOrderGoodsService', ($q, ApiService) ->
  
  listByPackOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.packOrderGoods.listByPackOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  packStatusUpdateScanGoodsNumber: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.packOrderGoods.packStatusUpdateScanGoodsNumber"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
      errorCallBack: (respond) ->
        deferred.resolve respond
    deferred.promise

  mapGoodsIdListByPackOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.packOrderGoods.mapGoodsIdListByPackOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  pickStatusUpdateScanGoodsNumber: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.packOrderGoods.pickStatusUpdateScanGoodsNumber"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listByPickOrderGoodsId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.packOrderGoods.listByPickOrderGoodsId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
