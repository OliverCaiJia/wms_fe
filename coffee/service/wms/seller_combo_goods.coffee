angular.module 'app'

.service 'WmsSellerComboGoodsService', ($q, ApiService) ->
  
  updateGoodsNumber: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerComboGoods.updateGoodsNumber"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.sellerComboGoods.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerComboGoods.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByComboId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerComboGoods.listByComboId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                