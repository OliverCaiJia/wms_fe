angular.module 'app'

.service 'WmsInventoryTransferService', ($q, ApiService) ->
  
  listByResponseSeller: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.inventoryTransfer.listByResponseSeller"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listByRequestSeller: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.inventoryTransfer.listByRequestSeller"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateVoucher: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.inventoryTransfer.updateVoucher"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.inventoryTransfer.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.inventoryTransfer.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.inventoryTransfer.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  submitInventoryTransfer: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.inventoryTransfer.submit"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  passInventoryTransfer: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.inventoryTransfer.pass"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  rejectInventoryTransfer: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.inventoryTransfer.reject"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  completeInventoryTransfer: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.inventoryTransfer.complete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  statusEnumList: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.inventoryTransfer.listAllStatusEnum"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                