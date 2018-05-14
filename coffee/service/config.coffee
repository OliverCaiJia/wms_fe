'use strict';

angular.module 'app'

.service 'WmsConfigService', ($location) ->

  API_PREFIX = "wms-api"
  FILE_PREFIX = "wms-upload"

  IMG_HOST = "wms-upload"

  getApiHost: ->
    return this.getHost(API_PREFIX)

  getFileHost: ->
    return this.getHost(FILE_PREFIX)

  getImgHost: ->
    return this.getHost(IMG_HOST)

  getHost: (prefix) ->
    arr = $location.host().split('.')
    protocol = $location.protocol()
    arr[0] = prefix
    return protocol + '://' + arr.join('.')


