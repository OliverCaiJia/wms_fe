'use strict';

angular.module 'app'

.service 'WmsMenuService', () ->

#    $scope.roleAclList = {
#      "1004":"1-1-仓库总监",
#      "1005":"1-2-仓库商品管理员",
#      "1006":"1-3-仓库招商运营经理",
#      "1007":"1-4-仓库财务",
#      "1016":"1-5-仓库拣货员",
#      "1003":"1-6-仓库打包员",
#      "1010":"1-7-仓库包裹核查员",
#
#      "1017":"2-1-商家总监",
#      "1011":"2-2-商家商品管理员",
#      "1015":"2-3-商家审单员",
#      "1013":"2-4-商家物流员",
#      "1014":"2-5-商家采购员",
#      "1018":"2-6-商家财务"
#    }

  roleHrefList = {
    "3":"logistic_order_pick_search,express_order_pack,express_order_list,seller_goods_manage_list,print_select_seller,member_list,pick_order_list,container_list,seller_list,freight_group_list,check_device_scale,check_device_printer",
    "1004":"logistic_order_pick_search,express_order_pack,express_order_list,seller_goods_manage_list,print_select_seller,member_list,pick_order_list,container_list,seller_list,freight_group_list,check_device_scale,check_device_printer",
    "1005":"container_list,seller_goods_manage_list,check_device_scale,check_device_printer,freight_group_list",
    "1006":"pick_order_list,seller_goods_manage_list,container_list,seller_list,freight_group_list,logistic_company_list,express_order_list,check_device_scale,check_device_printer",
    "1007":"",
    "1016":"logistic_order_pick_search,pick_order_wait_pick_no_print,pick_order_wait_pick_printed,pick_order_wait_pack_list",
    "1003":"express_order_pack,print_select_seller,check_device_scale,check_device_printer",
    "1010":"",

    "1017":"order_list_wait_verify,seller_platform_source_list,seller_member_list,seller_pick_order_list,seller_goods_list",
    "1011":"seller_goods_list",
    "1015":"order_list_wait_verify,seller_pick_order_list",
    "1013":"seller_pick_order_list",
    "1014":""

  }
  commonHref = ',change_password'

  getRoleHrefList: ->
    return roleHrefList

  getCommonHref: ->
    return commonHref



