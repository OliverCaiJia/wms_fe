'use strict';

angular.module 'app'

.service 'AjaxService', ($http, $i18next, ModalService) ->
  call: (obj) ->
    $http
      method: "POST"
      url: obj.url
      data: obj.data
      headers:
        "Content-Type": 'application/x-www-form-urlencoded'
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
          return query
        param(data)

    .success (response) ->
      if response.success
        if obj.successCallBack != undefined and typeof obj.successCallBack == 'function'
          obj.successCallBack response.data
        else
          ModalService.showMessageOnSuccess $i18next("global:message.onSuccess")
      else
        if response.subErrorCode
          if obj.errorCallBack != undefined and typeof obj.errorCallBack == 'function'
            obj.errorCallBack response.subErrorCode
          else
            i18nextNamespace = obj.api.name.split(".")[0]
            ModalService.showMessageOnError $i18next(i18nextNamespace + ":message.apiError." + response.subErrorCode)
        else if response.errorCode # SDK error or OpenAPI gateway error
          errorMessageKey = "global:message.apiError." + response.errorCode
          if $i18next(errorMessageKey) != errorMessageKey
            ModalService.showMessageOnError $i18next(errorMessageKey)
          else
            ModalService.showMessageOnError response.errorMessage
        else
          ModalService.showMessageOnError $i18next("global:message.onError.responseNotJson") + "\n" + response