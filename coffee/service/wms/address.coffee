angular.module 'app'

.service 'WmsAddressService', ($q, ApiService, CommonService) ->
  
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.address.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listAllProvince: () ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.address.listAllProvince"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listAllByLevelAndParentId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.address.listAllByLevelAndParentId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listAll: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.address.listAll"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapAll: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.address.listAll"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise