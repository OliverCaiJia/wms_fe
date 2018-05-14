angular.module 'app'

.service 'WmsPickOrderGoodsService', ($q, ApiService) ->
  
  listByPickOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrderGoods.listByPickOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listByLogisticOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrderGoods.listByLogisticOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapPickOrderIdListBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrderGoods.mapPickOrderIdListBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
