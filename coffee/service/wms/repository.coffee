angular.module 'app'

.service 'WmsRepositoryService', ($q, ApiService) ->
  
  listByWarehouseId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.repository.listByWarehouseId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  update: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.repository.update"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.repository.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.repository.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.repository.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listUseAttribute: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.useAttributeEnum.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise