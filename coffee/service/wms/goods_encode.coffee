angular.module 'app'

.service 'WmsGoodsEncodeService', ($q, ApiService) ->
  updateBatchNumber: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goodsEncode.updateBatchNumber"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.goodsEncode.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateInventoryStatus: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goodsEncode.updateInventoryStatus"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  goodsInventoryStatusEnumListAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goodsInventoryStatusEnum.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goodsEncode.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goodsEncode.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  autoGenerateEncode: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goodsEncode.autoGenerateEncode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listBySellerGoodsId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goodsEncode.listBySellerGoodsId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


