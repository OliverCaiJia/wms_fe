angular.module 'app'

.service 'WmsSellerAvailableService', ($q, ApiService) ->
  getPayModeList: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerAvailable.payModeList"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                