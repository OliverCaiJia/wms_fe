angular.module 'app'

.service 'WmsLogisticRequireService', ($q, ApiService) ->

  listAll: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.logisticRequireEnum.listAll"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise