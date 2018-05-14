angular.module 'app'

.service 'WmsAvailableContainerInventoryLogService', ($q, ApiService) ->
  
  listByAvailableContainerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.availableContainerInventoryLog.listByAvailableContainerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  increaseInventory: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.availableContainerInventoryLog.increaseInventory"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  reduceInventory: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.availableContainerInventoryLog.reduceInventory"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise
                