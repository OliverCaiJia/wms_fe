angular.module 'app'

.service 'WmsSellerFreightGroupService', ($q, ApiService,CommonService) ->
  
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerFreightGroup.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateFreightGroupId: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerFreightGroup.updateFreightGroupId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerFreightGroup.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerFreightGroup.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerFreightGroup.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data,'id')
    deferred.promise
                