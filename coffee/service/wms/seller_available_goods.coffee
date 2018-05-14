angular.module 'app'

.service 'WmsSellerAvailableGoodsService', ($q, ApiService, CommonService) ->
  detailByUK: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableGoods.detailByUK"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateShelfLocation: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableGoods.updateShelfLocation"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateEncodeType: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableGoods.updateEncodeType"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateQuantity: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableGoods.updateQuantity"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updatePrice: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableGoods.updatePrice"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listBySellerIdAndDisabled: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableGoods.listBySellerIdAndDisabled"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listBySellerIdAndUseable: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableGoods.listBySellerIdAndUseable"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listByGoodsId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableGoods.listByGoodsId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapByGoodsId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableGoods.listByGoodsId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "sellerId")
    deferred.promise
                
  updateDisabled: (params,bool) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.sellerAvailableGoods.updateDisabled"
        version: "1.0"
      params:
        id:params.id
        disabled:bool
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableGoods.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableGoods.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableGoods.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listGoodsBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableGoods.listGoodsBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listEncodeType: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.encodeTypeEnum.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  goodsStorage: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableGoods.goodsStorage"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  goodsPutaway: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableGoods.goodsPutaway"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise