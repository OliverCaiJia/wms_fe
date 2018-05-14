angular.module 'app'

.service 'WmsLogisticOrderScanGoodsService', ($q, ApiService, CommonService) ->

  updatePickGoodsNumber: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrderScanGoods.updatePickGoodsNumber"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updatePackGoodsNumber: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrderScanGoods.updatePackGoodsNumber"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByLogisticOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrderScanGoods.listByLogisticOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapByLogisticOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrderScanGoods.listByLogisticOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
#        deferred.resolve CommonService.convertListToMap(data, "goodsId")
    deferred.promise
