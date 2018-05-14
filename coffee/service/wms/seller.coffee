angular.module 'app'

.service 'WmsSellerService', ($q, ApiService, CommonService) ->
  updateSellerFreightGroupId: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.seller.updateSellerFreightGroupId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.seller.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
  
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.seller.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateComment: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.seller.updateComment"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateCreditLine: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.seller.updateCreditLine"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.seller.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateComment: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.seller.updateComment"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateIsWeightSet: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.seller.updateIsWeightSet"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.seller.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.seller.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapAll: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.seller.listAll"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, 'id')
    deferred.promise


  listAllBase: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.seller.listAllBase"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise