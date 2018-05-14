'use strict';

angular.module 'app'

.service 'UserStorageService', (SessionService) ->
  US_LANG = "lang"
  US_PRODUCT_ID = "product_id"
  US_PRODUCT_VERSION_ID = "product_version_id"
  US_SERVER_ID = "server_id"

  getPrefix : ->
    SessionService.getPrefix() + SessionService.getUsername() + "/"

  getLang: ->
    localStorage.getItem(this.getPrefix() + US_LANG)

  getProductId: ->
    localStorage.getItem(this.getPrefix() + US_PRODUCT_ID)

  getProductVersionId: ->
    localStorage.getItem(this.getPrefix() + US_PRODUCT_VERSION_ID)

  getServerId: ->
    localStorage.getItem(this.getPrefix() + US_SERVER_ID)

  saveLang: (lang) ->
    localStorage.setItem(this.getPrefix() + US_LANG, lang)

  saveProductId: (id) ->
    localStorage.setItem(this.getPrefix() + US_PRODUCT_ID, id)

  saveProductVersionId: (id) ->
    localStorage.setItem(this.getPrefix() + US_PRODUCT_VERSION_ID, id)

  saveServerId: (id) ->
    localStorage.setItem(this.getPrefix() + US_SERVER_ID, id)

  removeLang: () ->
    localStorage.removeItem(this.getPrefix() + US_LANG)

  removeProductId: () ->
    localStorage.removeItem(this.getPrefix() + US_PRODUCT_ID)

  removeProductVersionId: () ->
    localStorage.removeItem(this.getPrefix() + US_PRODUCT_VERSION_ID)

  removeServerId: () ->
    localStorage.removeItem(this.getPrefix() + US_SERVER_ID)
