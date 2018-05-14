angular.module 'app'

.service 'WmsMemberRoleService', ($q, ApiService) ->
  
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.memberRole.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.memberRole.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByMemberId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.memberRole.listByMemberId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  detailBySession: (member) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.memberRole.detailBySession"
        version: "1.0"
      params: member
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listByRoleId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.memberRole.listByRoleId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
