angular.module 'app'

.service 'WmsSellerImportRulesService', ($q, ApiService) ->

  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerImportRules.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listBySellerIdAndOrderImport: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerImportRules.listBySellerIdAndOrderImport"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise


  listBySellerIdAndGoodsImport: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.sellerImportRules.listBySellerIdAndGoodsImport"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                