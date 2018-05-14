angular.module 'app'

.service 'WmsFreightGroupService', ($q, ApiService, CommonService) ->
  
  listByLogisticCompanyId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.freightGroup.listByLogisticCompanyId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateAddedWeightPrice: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.freightGroup.updateAddedWeightPrice"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateFirstWeightPrice: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.freightGroup.updateFirstWeightPrice"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.freightGroup.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.freightGroup.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.freightGroup.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise