angular.module 'app'

.service 'WmsPickOrderLogService', ($q, ApiService) ->
  
  listByLogisticOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.pickOrderLog.listByLogisticOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                