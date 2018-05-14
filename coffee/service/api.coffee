'use strict';

angular.module 'app'

.service 'ApiService', (
  $http
  $i18next
  $location
  $rootScope
  $timeout
  WmsConfigService
  ModalService
  SessionService
  ToastService
) ->
  callApi: (obj) ->
    obj.callType = "default"
    this.callApi(obj)

  get: (obj) ->
    obj.callType = "get"
    this.callApi(obj)

  post: (obj) ->
    obj.callType = "post"
    this.callApi(obj)

  delete: (obj) ->
    ModalService.showMessageOnCheckDelete($i18next("global:message.confirmDelete"),obj)

  confirm: (obj) ->
    ModalService.showMessageOnConfirm($i18next("global:message.confirm"),obj)

  callApi: (obj) ->
    paramsJson = JSON.stringify(obj.params)
    callType = obj.callType
    signKey = "OA-Sign"
    timestamp = new Date().getTime()
    beginSeconds = 0
    if obj.params != undefined && typeof obj.params == "object"
      sessionStorage.setItem(signKey, obj.api.name + obj.api.version + paramsJson + timestamp)
    else
      sessionStorage.setItem(signKey, obj.api.name + obj.api.version + timestamp)
    calcHash()
    $http
      method: "POST"
      url: WmsConfigService.getApiHost() + "/gw?debug=" + obj.api.name
      headers:
        "Content-Type": 'application/x-www-form-urlencoded'
        "OA-Session-Id": SessionService.getSessionId()
        "OA-App-Key": 1001520
        "OA-App-Market-ID": 678
        "OA-App-Version": "1.0"
        "OA-Device-Id": new Fingerprint({canvas: true}).get()
        "OA-Sign": sessionStorage.getItem(signKey)
      data:
        "api": obj.api.name,
        "version": obj.api.version
        "timestamp": timestamp
        "params": paramsJson
      transformRequest: (data) ->
        param = (obj) ->
          query = ''
          for name of obj
            value = obj[name]
            if value instanceof Array
              i = 0
              while i < value.length
                subValue = value[i]
                fullSubName = name + '[' + i + ']'
                innerObj = {}
                innerObj[fullSubName] = subValue
                query += param(innerObj) + '&'
                ++i
            else if value instanceof Object
              for subName of value
                subValue = value[subName]
                fullSubName = name + '[' + subName + ']'
                innerObj = {}
                innerObj[fullSubName] = subValue
                query += param(innerObj) + '&'
            else if value != undefined and value != null
              query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'

          beginSeconds = new Date().getTime()
          $rootScope.toggle =
            overTime: false
            showSignInModal:false
            showErrorMsg:false

          return query
        param(data)

    .success (response) ->
      endSeconds = new Date().getTime()
      differSeconds = parseInt(endSeconds) - parseInt(beginSeconds)
      if differSeconds < 1500
        $rootScope.toggle.overTime = true;
      if response.success
        if obj.successCallBack != undefined and typeof obj.successCallBack == 'function'
          obj.successCallBack response.data
        else
          ModalService.showMessageOnSuccess $i18next("global:message.onSuccess")
        if callType == "post"
          ToastService.showMessageOnSuccess $i18next("global:message.onSuccess")

      else if response.errorCode
        if parseInt(response.errorCode) == 174
          if !$rootScope.toggle.showSignInModal && SessionService.getSessionId()
            ModalService.showSignInForm()
            $rootScope.toggle.showSignInModal = true

        else if obj.errorCallBack != undefined and typeof obj.errorCallBack == 'function'
          obj.errorCallBack response
        else #show error message
          if !$rootScope.toggle.showErrorMsg && !$rootScope.toggle.showSignInModal
            i18nextNamespace = obj.api.name.split(".")[0]
            errorMessageKey = i18nextNamespace + ":message.apiError." + response.errorCode
            $rootScope.toggle.showErrorMsg = true
            if $i18next(errorMessageKey) != errorMessageKey #user defined message found
              ModalService.showMessageOnError $i18next(errorMessageKey)
            else #global api error message
              errorMessageKey = "global:message.apiError." + response.errorCode
              if $i18next(errorMessageKey) != errorMessageKey
                ModalService.showMessageOnError $i18next(errorMessageKey)
              else
                if $rootScope.toggle.showSignInModal || response.errorMessage != "SESSION_ID_IS_EMPTY"
                  ModalService.showMessageOnError response.errorMessage
      else
        if !$rootScope.toggle.showErrorMsg
          $rootScope.toggle.showErrorMsg = true
          ModalService.showMessageOnError $i18next("global:message.onError.responseNotJson") + "\n" + response
    .error ->

    $timeout (->
      if !$rootScope.toggle.overTime && callType == "post"
        ToastService.showMessageInProgress $i18next("global:message.inProgress")
      return
    ), 1500
    return

