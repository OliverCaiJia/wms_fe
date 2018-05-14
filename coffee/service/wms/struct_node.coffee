angular.module 'app'

.service 'WmsStructNodeService', ($q, ApiService) ->
  
  updateDataType: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.structNode.updateDataType"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.structNode.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateFieldName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.structNode.updateFieldName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.structNode.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByRootId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.structNode.listByRootId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  dataTypeList: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.structNode.dataTypeList"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise