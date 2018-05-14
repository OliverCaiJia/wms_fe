angular.module 'app'

.service 'WmsMemberService', ($i18next, $q, $rootScope, ApiService, ModalService, SessionService, CommonService) ->
  
  updateMobilePhone: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.member.updateMobilePhone"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateRealName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.member.updateRealName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateJobNumber: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.member.updateJobNumber"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  disabledMember: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.member.disabledMember"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listSellerMember: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.member.listSellerMember"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapSellerMember: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.member.listSellerMember"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise
                
  delete: (params) ->
    deferred = $q.defer()
    ApiService.delete
      api:
        name: "wms.member.delete"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  updateName: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.member.updateName"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  detail: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.member.detail"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  add: (params) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.member.add"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise
                
  listMember: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.member.listMember"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapMember: ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.member.listMember"
        version: "1.0"
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise

  changePassword: (member) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.member.changePassword"
        version: "1.0"
      params: member
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  resetPassword: (member) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.member.resetPassword"
        version: "1.0"
      params: member
      successCallBack: ->
        deferred.resolve true
    deferred.promise

  signIn: (member) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.member.login"
        version: "1.0"
      params: member
      successCallBack: (data) ->
        SessionService.clear()
        SessionService.setSessionId data.sessionId
        if (data.hasOwnProperty("sellerId"))
          SessionService.setSellerId data.sellerId
        SessionService.setUsername member.name
        $rootScope.$broadcast("userSignInSuccess", member.name)
        deferred.resolve data
    deferred.promise

  signOut: ->
    SessionService.clear()
    $rootScope.$broadcast("userSignOutSuccess")
    ModalService.showMessageOnSuccess $i18next("passport:message.onSignOutSuccess")

  addSellerMember: (member) ->
    deferred = $q.defer()
    ApiService.post
      api:
        name: "wms.member.addSellerMember"
        version: "1.0"
      params: member
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  listAllBase: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.member.listAllBase"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve data
    deferred.promise

  mapAllBase: (params) ->
    deferred = $q.defer()
    ApiService.get
      api:
        name: "wms.member.listAllBase"
        version: "1.0"
      params: params
      successCallBack: (data) ->
        deferred.resolve CommonService.convertListToMap(data, "id")
    deferred.promise