angular.module 'app'

.service 'WmsGoodsService', ($q, ApiService, CommonService) ->
  
  updateAbbrName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.updateAbbrName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detailByBarCode: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goods.detailByBarCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateImage: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.updateImage"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateLogisticRequire: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.updateLogisticRequire"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateWeight: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.updateWeight"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateHeight: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.updateHeight"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateWidth: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.updateWidth"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateLength: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.updateLength"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateBarCode: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.updateBarCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  updateIsOwnBox: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.updateIsOwnBox"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goods.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.goods.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goods.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapGoods: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goods.listAll"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise


  goodsMapByPickOrderId: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.goods.listByPickOrderId"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise
