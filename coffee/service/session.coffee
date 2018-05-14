'use strict';

angular.module 'app'

.service 'SessionService', ($cookieStore, $location) ->
  SESSION_SESSION_ID = "session_id"
  SESSION_USERNAME = "username"
  SESSION_SELLER_ID = "seller_id"
  SESSION_TESTER = "tester_id"
  SESSION_HREF_LIST= "href_list"

  getPrefix: ->
    $location.host() + "/"

  setUsername: (username) ->
    $cookieStore.put(SESSION_USERNAME, username)

  getUsername: ->
    $cookieStore.get(SESSION_USERNAME)

  setSessionId: (sessionId) ->
    $cookieStore.put(SESSION_SESSION_ID, sessionId)

  getSessionId: ->
    $cookieStore.get(SESSION_SESSION_ID)

  setSellerId: (sellerId) ->
    $cookieStore.put(SESSION_SELLER_ID, sellerId)

  getSellerId: ->
    $cookieStore.get(SESSION_SELLER_ID)

  setTester: (bool) ->
    $cookieStore.put(SESSION_TESTER, bool)

  getTester: ->
    $cookieStore.get(SESSION_TESTER)


  setHrefList: (hrefList) ->
    $cookieStore.put(SESSION_HREF_LIST, hrefList)

  getHrefList: ->
    $cookieStore.get(SESSION_HREF_LIST)

  clear: ->
    $cookieStore.remove(SESSION_USERNAME)
    $cookieStore.remove(SESSION_SESSION_ID)
    $cookieStore.remove(SESSION_SELLER_ID)