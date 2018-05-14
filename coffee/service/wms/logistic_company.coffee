angular.module 'app'

.service 'WmsLogisticCompanyService', ($q, ApiService, CommonService) ->
  
  updateMonthCode: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticCompany.updateMonthCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateSendSite: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticCompany.updateSendSite"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateCustomerPwd: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticCompany.updateCustomerPwd"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateCustomerName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticCompany.updateCustomerName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateCode: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticCompany.updateCode"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticCompany.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.logisticCompany.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticCompany.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticCompany.listUsableAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise