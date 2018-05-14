angular.module 'app'

.service 'WmsSellerGoodsUploadService', ($q, ApiService) ->
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoodsUpload.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerGoodsUpload.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  delete: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerGoodsUpload.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise