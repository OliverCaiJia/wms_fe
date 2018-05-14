angular.module 'app'

.service 'ClickEditService', ->
  OLD_PRE = "Old"

  updateNode :(node, fieldName) ->
    node[node.id+fieldName] = false
    if node[fieldName] != node[ OLD_PRE + fieldName]
      return true
    else
      return false

  switchNode :(node, fieldName, bool) ->
    node[node.id+fieldName] = bool
    if bool
      node[OLD_PRE+fieldName] = node[fieldName]
    else
      node[fieldName] = node[OLD_PRE+fieldName]