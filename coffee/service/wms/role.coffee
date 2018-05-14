angular.module 'app'

.service 'WmsRoleService', ($q, ApiService, CommonService) ->
  
  listBySellerRole: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.role.listBySellerRole"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapRoleBySellerRole: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.role.listBySellerRole"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.role.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.role.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.role.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.role.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.role.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                