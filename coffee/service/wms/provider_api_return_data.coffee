angular.module 'app'

.service 'WmsProviderApiReturnDataService', ($q, ApiService) ->
  
  updateDataType: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApiReturnData.updateDataType"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.providerApiReturnData.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateVarKey: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApiReturnData.updateVarKey"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApiReturnData.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByProviderApiId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.providerApiReturnData.listByProviderApiId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  dataTypeList: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.providerApiReturnData.dataTypeList"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapByProviderApiId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.providerApiReturnData.mapByProviderApiId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                