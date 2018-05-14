angular.module 'app'

.service 'WmsRoleAclService', ($q, ApiService, CommonService) ->
  
  delete: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.roleAcl.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.roleAcl.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByRoleId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.roleAcl.listByRoleId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapByRoleId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.roleAcl.listByRoleId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "moduleActionId")
    deferred.promise
                