angular.module 'app'

.service 'WmsOrderGoodsService', ($q, ApiService, CommonService) ->
  
  updateGoodsNumber: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.orderGoods.updateGoodsNumber"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.orderGoods.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.orderGoods.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.orderGoods.listByOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapByOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.orderGoods.listByOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise


  listByOrderIdAndIsSplit: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.orderGoods.listByOrderIdAndIsSplit"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listByOrderIdAndIsSplitMap: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.orderGoods.listByOrderIdAndIsSplit"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise

