angular.module 'app'

.service 'WmsApiReturnDataMapService', ($q, ApiService) ->
  
  updateRequired: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiReturnDataMap.updateRequired"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateDataType: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiReturnDataMap.updateDataType"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.apiReturnDataMap.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateVarKey: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiReturnDataMap.updateVarKey"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiReturnDataMap.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByApiId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.apiReturnDataMap.listByApiId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  dataTypeList: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.apiReturnDataMap.dataTypeList"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                