angular.module 'app'

.service 'WmsStructRootService', ($q, ApiService, CommonService) ->
  
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.structRoot.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.structRoot.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.structRoot.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.structRoot.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapAll: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.structRoot.listAll"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise
                