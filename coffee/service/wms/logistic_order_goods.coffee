angular.module 'app'

.service 'WmsLogisticOrderGoodsService', ($q, ApiService, CommonService) ->
  listByLogisticOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrderGoods.listByLogisticOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapByLogisticOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrderGoods.listByLogisticOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "goodsId")
    deferred.promise

  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrderGoods.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise