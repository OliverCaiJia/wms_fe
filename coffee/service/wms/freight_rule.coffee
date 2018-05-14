angular.module 'app'

.service 'WmsFreightRuleService', ($q, ApiService) ->
  
  updateAddedWeightPrice: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.freightRule.updateAddedWeightPrice"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.freightRule.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateFirstWeightPrice: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.freightRule.updateFirstWeightPrice"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.freightRule.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByFreightGroupId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.freightRule.listByFreightGroupId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                