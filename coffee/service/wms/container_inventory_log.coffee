angular.module 'app'

.service 'WmsContainerInventoryLogService', ($q, ApiService) ->
  
  listByContainerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.containerInventoryLog.listByContainerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
    
    
  increaseInventory: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.containerInventoryLog.increaseInventory"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  reduceInventory: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.containerInventoryLog.reduceInventory"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise