angular.module 'app'

.service 'WmsWarehouseService', ($q, ApiService) ->
  
  update: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.warehouse.update"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.warehouse.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.warehouse.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.warehouse.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                