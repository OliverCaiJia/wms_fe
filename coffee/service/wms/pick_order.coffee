angular.module 'app'

.service 'WmsPickOrderService', ($q, ApiService) ->
  
  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  detailPickAndLogisticOrder: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.detailPickAndLogisticOrder"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listAllJoinLogisticOrder: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.listAllJoinLogisticOrder"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  addPrepackGoods: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.pickOrder.addPrepackGoods"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  addPrepackGoodsGroup: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.pickOrder.addPrepackGoodsGroup"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  detailByExpressSn: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.detailByExpressSn"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  detailByLogisticOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.detailByLogisticOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  pickComplete: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.pickOrder.pickComplete"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  pickReject: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.pickOrder.pickReject"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  packScanComplete: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.pickOrder.packScanComplete"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  updateContainerId: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.pickOrder.updateContainerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  packScanReject: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.pickOrder.packScanReject"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  listGoodsBarcodeForDemo: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.listGoodsBarcodeForDemo"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  waitPackNoScanList: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.waitPackNoScanList"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  waitPickList: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.waitPickList"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  withdrawAudit: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.pickOrder.withdrawAudit"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listPrintableSellerGoodsBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.listPrintableSellerGoodsBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  prepackComplete: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.pickOrder.prepackComplete"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  waitDeliveryList: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.waitDeliveryList"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  getExpressOrderList: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.getExpressOrderList"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  waitPickNoPrintList: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.waitPickNoPrintList"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  waitPickPrintedList: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrder.waitPickPrintedList"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise