angular.module 'app'

.service 'WmsProviderService', ($q, ApiService, CommonService) ->
  
  updateVersion: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.provider.updateVersion"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateFormat: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.provider.updateFormat"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateAppSecret: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.provider.updateAppSecret"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateAppKey: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.provider.updateAppKey"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateFilename: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.provider.updateFilename"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updatePort: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.provider.updatePort"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateHostname: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.provider.updateHostname"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateScheme: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.provider.updateScheme"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.provider.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.provider.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.provider.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.provider.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.provider.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  schemeList: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.provider.schemeList"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapAll: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.provider.listAll"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise