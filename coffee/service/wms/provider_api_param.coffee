angular.module 'app'

.service 'WmsProviderApiParamService', ($q, ApiService) ->
  
  updateDefaultValue: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApiParam.updateDefaultValue"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateApiParamId: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApiParam.updateApiParamId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateRequired: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApiParam.updateRequired"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateDataType: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApiParam.updateDataType"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.providerApiParam.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateVarKey: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApiParam.updateVarKey"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApiParam.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByProviderApiId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.providerApiParam.listByProviderApiId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  dataTypeList: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.providerApiParam.dataTypeList"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                