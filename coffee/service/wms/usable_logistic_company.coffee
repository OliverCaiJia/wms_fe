angular.module 'app'

.service 'WmsUsableLogisticCompanyService', ($q, ApiService, CommonService) ->
  
  updateCode: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.usableLogisticCompany.updateCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.usableLogisticCompany.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.usableLogisticCompany.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.usableLogisticCompany.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.usableLogisticCompany.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapAll: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.usableLogisticCompany.listAll"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise
                