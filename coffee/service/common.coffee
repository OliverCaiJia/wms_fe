angular.module 'app'

.service 'CommonService', ($i18next, ApiService, ModalService) ->
  convertListToMap: (objList, keyName) ->
    objList.reduce ((map, obj) ->
      map[obj[keyName]] = obj
      map
    ), {}

  convertSuggestions: (suggestions) ->
    array = []
    suggestions.forEach (opt) ->
      array.push
        label: opt.text
        value: opt.text
    array

  countMapLength: (objMap) ->
    countNum  = 0
    angular.forEach(objMap,(obj,k)->
      if k > 0
        countNum++
    )
    return countNum


  isBlank: (field) ->
    return field == "undefined" || field.trim() == "" || field == null

  showHighlight: (pkg, field, highlightMap) ->
    if highlightMap[pkg.id] && highlightMap[pkg.id].hasOwnProperty(field)
      highlightMap[pkg.id][field].join("\n...")
    else if pkg.hasOwnProperty(field)
      pkg[field]

  switchCollapse: (node) ->
    if node.inEditing
      node.inEditing = false
    else
      node.inEditing = true

  showMessageOnError: (jsonName, response) ->
    errorMessageKey = jsonName + ":message.apiError." + response.errorCode
    if $i18next(errorMessageKey) != errorMessageKey #user defined message found
      ModalService.showMessageOnError $i18next(errorMessageKey)
    else #global api error message
      errorMessageKey = "global:message.apiError." + response.errorCode
      if $i18next(errorMessageKey) != errorMessageKey
        ModalService.showMessageOnError $i18next(errorMessageKey)
      else
        ModalService.showMessageOnError response.errorMessage

  showDiffObject : (objectList, objectEnvMap, productEnvList, fieldList) ->
    diffObjectList = []
    for object in objectList
      defaultValue = {}
      for field in fieldList
        if objectEnvMap[object.id] != undefined && objectEnvMap[object.id][productEnvList[0].id] != undefined && objectEnvMap[object.id][productEnvList[0].id].hasOwnProperty(field)
          defaultValue[field] = objectEnvMap[object.id][productEnvList[0].id][field]
        else
          defaultValue[field] = undefined
      for productEnv in productEnvList
        tmpValue = {}
        for field in fieldList
          if objectEnvMap[object.id] != undefined && objectEnvMap[object.id][productEnv.id] != undefined && objectEnvMap[object.id][productEnv.id].hasOwnProperty(field)
            tmpValue[field] = objectEnvMap[object.id][productEnv.id][field]
          else
            tmpValue[field] = undefined
        if !angular.equals(defaultValue,tmpValue)
          diffObjectList.push(object)
          break
    return diffObjectList



  dropListByData :(list, fieldName, value) ->
    array = []
    list.forEach (opt) ->
      if opt[fieldName] != value
        array.push(opt)
    array

  objectConnected :(objectList,connectedName, connectedMap, connectedFieldList) ->
    objectList.forEach (obj,key) ->
      if obj[connectedName] > 0 && connectedMap[obj[connectedName]]
        for connectedField in connectedFieldList
          if connectedMap[obj[connectedName]][connectedField] != undefined
            objectList[key][connectedField] = connectedMap[obj[connectedName]][connectedField]
    return objectList


  checkAll: (list,boolValue,fieldName) ->
    checkList = []
    list.forEach (opt) ->
      if opt.hasOwnProperty(fieldName)
        checkList[opt[fieldName]] = boolValue
    checkList

  calArrayTrue: (list,checkList,fieldName) ->
    trueNumber = 0
    list.forEach (opt) ->
      if checkList[opt[fieldName]]
        trueNumber = parseInt(trueNumber) + 1
    trueNumber
