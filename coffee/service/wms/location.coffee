angular.module 'app'

.service 'WmsLocationService', ($q, ApiService) ->
  
  listByRepositoryId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.location.listByRepositoryId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  update: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.location.update"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.location.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.location.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.location.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  ABCListAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.abcEnum.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
