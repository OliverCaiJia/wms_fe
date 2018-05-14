angular.module 'app'

.service 'WmsApiParamService', ($q, ApiService) ->
  
  updateStructRootId: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiParam.updateStructRootId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateVarKey: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiParam.updateVarKey"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateDataType: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiParam.updateDataType"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.apiParam.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateStructNodeId: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiParam.updateStructNodeId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiParam.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByApiId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.apiParam.listByApiId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  dataTypeList: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.apiParam.dataTypeList"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapByApiId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.apiParam.mapByApiId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise