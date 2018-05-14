angular.module 'app'

.service 'WmsSellerAvailableContainerService', ($q, ApiService,CommonService) ->
  
  listByContainerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableContainer.listByContainerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapByContainerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableContainer.listByContainerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "sellerId")
    deferred.promise
                
  updatePrice: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableContainer.updatePrice"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateDisabled: (params,bool) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.sellerAvailableContainer.updateDisabled"
        version: "1.0"
      params:
        id:params.id
        disabled:bool
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateQuantity: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableContainer.updateQuantity"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updatePayMode: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableContainer.updatePayMode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableContainer.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.sellerAvailableContainer.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableContainer.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listBySellerIdAndDisabled: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableContainer.listBySellerIdAndDisabled"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableContainer.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listContainerBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableContainer.listContainerBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapContainerBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableContainer.listContainerBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data,'id')
    deferred.promise


  detailBySellerIdAndBarCode: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailableContainer.detailBySellerIdAndBarCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

                