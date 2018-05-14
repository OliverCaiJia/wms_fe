angular.module 'app'

.service 'WmsPlatformOrderUploadService', ($q, ApiService) ->
  
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.platformOrderUpload.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.platformOrderUpload.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.platformOrderUpload.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.platformOrderUpload.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  deal: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.platformOrderUpload.deal"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                