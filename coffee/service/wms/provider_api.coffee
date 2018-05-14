angular.module 'app'

.service 'WmsProviderApiService', ($q, ApiService) ->
  
  updateVersion: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApi.updateVersion"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateProviderId: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApi.updateProviderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateFilename: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApi.updateFilename"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateHostName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApi.updateHostName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateAction: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApi.updateAction"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.providerApi.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.providerApi.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByApiId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.providerApi.listByApiId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                