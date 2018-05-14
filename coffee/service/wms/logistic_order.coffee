angular.module 'app'

.service 'WmsLogisticOrderService', ($q, ApiService, ModalService, $i18next) ->
  
  updateLogisticCharge: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.updateLogisticCharge"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateTotalWeight: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.updateTotalWeight"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateContainerId: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.updateContainerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateContainerIdAndTotalWeight: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.updateContainerIdAndTotalWeight"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateExpressSn: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.updateExpressSn"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detailByLogisticSn: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.detailByLogisticSn"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByLogisticCompanyIdAndIsExport: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.listByLogisticCompanyIdAndIsExport"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByIsExport: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.listByIsExport"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateComment: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.updateComment"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateLogisticSn: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.updateLogisticSn"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.logisticOrder.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateLogisticCompanyId: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.updateLogisticCompanyId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateIsPrintedByPickOrderIds: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.updateIsPrintedByPickOrderIds"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  detailByExpressSn: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.detailByExpressSn"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listAllStatusEnum: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.listAllStatusEnum"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  scanComplete: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.logisticOrder.scanComplete"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  pickScanComplete: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.pickScanComplete"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  checkExpressSn: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.checkExpressSn"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  waitPackNoScanList: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.waitPackNoScanList"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateAddress: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.updateAddress"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  exportExpressOrder: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.exportExpressOrder"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listAllEmptyExpressSn: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.listAllEmptyExpressSn"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  importExpressSn: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.importExpressSn"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  getExpressOrderByBarCode: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticOrder.getExpressOrderByBarCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  setExpressSn: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticOrder.setExpressSn"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
      errorCallBack: (respond) ->
        ModalService.showMessageOnError $i18next('wms:message.apiError.'+ respond.errorCode)
        deferred.resolve respond
    deferred.promise
