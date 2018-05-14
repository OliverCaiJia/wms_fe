angular.module 'app'

.service 'DisplayService', () ->
  showEmptyObject : (objList, objMap) ->
    returnObjList = []
    for object in objList
      if objMap[object.id] == undefined
        returnObjList.push(object)
    return returnObjList

  showExistObject : (objList, objMap) ->
    returnObjList = []
    for object in objList
      if objMap[object.id] != undefined && objMap[object.id] != null
        returnObjList.push(object)
    return returnObjList
