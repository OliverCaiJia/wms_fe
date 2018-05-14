angular.module 'app'

.service 'WmsSellerGoodsService', ($q, ApiService, CommonService) ->
  updateBarCode: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.sellerGoods.updateBarCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
  
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateAbbrName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateAbbrName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updatePrepackWeight: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updatePrepackWeight"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateImage: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateImage"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateLength: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateLength"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateHeight: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateHeight"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateWidth: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateWidth"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateWeight: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateWeight"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detailByBarCode: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.detailByBarCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateShelfLocation: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateShelfLocation"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateEncodeType: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateEncodeType"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateInventory: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateInventory"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updatePrice: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updatePrice"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateLogisticRequire: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateLogisticRequire"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateIsCombo: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.updateIsCombo"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listBySellerIdAndNoCombo: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.listBySellerIdAndNoCombo"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapBySellerIdAndNoCombo: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.listBySellerIdAndNoCombo"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
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

  mapBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise

  listByPlatformSourceIdAndSellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.listByPlatformSourceIdAndSellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listAllComboBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.listAllComboBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  goodsPutaway: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoods.goodsPutaway"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  detailByGoodsEncodeAndPackOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.detailByGoodsEncodeAndPackOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  waitToUploadImagesList: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoods.waitToUploadImagesList"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise