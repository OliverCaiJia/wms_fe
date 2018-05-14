angular.module 'app'

.service 'WmsContainerService', ($q, ApiService) ->

  updateTotalInventory: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.updateTotalInventory"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updatePostInventory: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.updatePostInventory"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updatePackingCharge: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.updatePackingCharge"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateLogisticRequire: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.updateLogisticRequire"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateHeight: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.updateHeight"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateWidth: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.updateWidth"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateLength: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.updateLength"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateBarCode: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.updateBarCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateWeight: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.updateWeight"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.container.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.container.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.container.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
