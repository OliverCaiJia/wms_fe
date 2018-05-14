angular.module 'app'

.service 'WmsOrderService', ($q, ApiService) ->

  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.order.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
  
  updateIdentityCardContrary: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.order.updateIdentityCardContrary"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateIdentityCardFront: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.order.updateIdentityCardFront"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateIdentityCard: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.order.updateIdentityCard"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateConsigneeAddress: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.order.updateConsigneeAddress"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateConsigneeName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.order.updateConsigneeName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.order.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updatePhoneNumber: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.order.updatePhoneNumber"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.order.listBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  splitOrder: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.order.splitOrder"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  splitOrderNoConfirm: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.order.splitOrder"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  splitOrderIds: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.order.splitOrderIds"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  verifyOrder: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.order.verifyOrder"
        version: "1.0"
      params: params
      successCallBack: ->
        deferred.resolve true
    deferred.promise


  listAllOrderStatusEnum: () ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.orderStatusEnum.listAll"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listBySellerIdAndWaitVerify: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.order.listBySellerIdAndWaitVerify"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listBySellerIdAndSuccessVerify: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.order.listBySellerIdAndSuccessVerify"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listBySellerIdAndPartSplit: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.order.listBySellerIdAndPartSplit"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listBySellerIdAndSuccessSplit: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.order.listBySellerIdAndSuccessSplit"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  getTotalPrice:(params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.order.getTotalPrice"
        version: "1.0"
      params:params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  updateAddress: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.order.updateAddress"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  withdrawAudit: (params) ->
    deferred = $q.defer()
    ApiService.confirm
      api:
        name: "wms.order.withdrawAudit"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  getNextVerifyOrderBySellerId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.order.getNextVerifyOrderBySellerId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise