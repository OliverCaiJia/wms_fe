angular.module 'app'

.service 'WmsSenderAddressService', ($q, ApiService) ->
  
  updateAddress: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.senderAddress.updateAddress"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updatePrefixAddress: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.senderAddress.updatePrefixAddress"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updatePhoneNumber: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.senderAddress.updatePhoneNumber"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.senderAddress.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detailBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.senderAddress.detailBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.senderAddress.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                