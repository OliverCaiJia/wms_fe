angular.module 'app'

.service 'WmsOrderPickOrderRefService', ($q, ApiService) ->
  
  listByPickOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.orderPickOrderRef.listByPickOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.orderPickOrderRef.listByOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                