angular.module 'app'

.service 'WmsApiReturnDataService', ($q, ApiService, CommonService) ->
  
  updateProviderApiReturnDataId: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiReturnData.updateProviderApiReturnDataId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.apiReturnData.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByProviderApiId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.apiReturnData.listByProviderApiId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapByProviderApiId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.apiReturnData.listByProviderApiId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "apiReturnDataMapId")
    deferred.promise