'use strict';

angular.module 'app'

.config ($routeProvider) ->
  routes = [
    'wms/container_list', 'wms/container_edit','wms/container_related_seller',
    'wms/increase_container_inventory', 'wms/reduce_container_inventory',
    'wms/goods_blacklist_detail','wms/goods_blacklist_list',
    'wms/goods_list', 'wms/goods_edit', 'wms/increase_goods_inventory', 'wms/reduce_goods_inventory',
    'wms/goods_upload_images_list',
    'wms/logistic_order_edit', 'wms/pick_order_list','wms/logistic_order_detail',
    'wms/logistic_order_goods_list','wms/pick_order_wait_pick_list','wms/pick_order_wait_pack_list',
    'wms/logistic_order_pick_search',
    'wms/member_list', 'wms/change_password', 'wms/reset_password', 'wms/signin',
    'wms/member_role_list','wms/role_detail',
    'wms/order_edit','wms/pick_goods',
    'wms/order_list_wait_verify','wms/order_list_success_verify','wms/order_list_part_split','wms/order_list_success_split',
    'wms/order_goods_detail', 'wms/order_goods_list','wms/order_goods_wait_verify',
    'wms/platform_source_list',
    'wms/role_acl_list','wms/role_list',
    'wms/seller_available_goods_list', 'wms/available_goods_list','wms/seller_available_goods_detail',
    'wms/reduce_available_goods_quantity','wms/increase_available_goods_quantity',
    'wms/seller_available_container_list', 'wms/available_container_list','wms/seller_available_container_detail',
    'wms/reduce_available_container_quantity','wms/increase_available_container_quantity',
    'wms/seller_list','wms/seller_detail', 'wms/seller_member_list',
    'wms/seller_goods_list','wms/seller_goods_edit',
    'wms/seller_goods_manage_list','wms/seller_goods_manage_edit',
    'wms/seller_combo_goods_list','wms/seller_combo_goods_detail',
    'wms/seller_goods_increase','wms/seller_goods_reduce',
    'wms/seller_platform_goods_list',
    'wms/seller_platform_source_edit', 'wms/seller_platform_source_list',
    'wms/module_list','wms/module_action_list',
    'wms/goods_related_seller', 'wms/goods_related_platform_source',
    'wms/goods_blacklist_list',
    'wms/logistic_company_list',
    'wms/split_order',
    'wms/platform_order_upload_list',
    'wms/express_order_list','wms/express_order_import', 'wms/express_order_pack', 'wms/pack_goods',
    'wms/freight_group_list','wms/seller_freight_group_list',
    'wms/struct_root_list','wms/struct_node_list',
    'wms/api_list','wms/api_param_list',
    'wms/provider_list','wms/provider_api_list','wms/provider_api_param_list','wms/provider_api_return_data_list',
    'wms/sender_address_edit',
    'wms/api_return_data_map_list','wms/api_return_data_list'
    'wms/goods_encode_list',
    'wms/pick_order_container','wms/pick_order_weight',
    'wms/logistic_order_import_list','wms/logistic_order_ref_express',
    'wms/response_inventory_transfer_list','wms/response_inventory_transfer_goods_list',
    'wms/inventory_transfer_edit','wms/inventory_transfer_list','wms/inventory_transfer_goods_list',
    'wms/request_inventory_transfer_list','wms/request_inventory_transfer_goods_list',
    'wms/inventory_transfer_pick_goods',
    'wms/goods_storage','wms/goods_putaway',
    'wms/goods_breakage','wms/goods_encode_breakage','wms/goods_breakage_log_list',
    'wms/prepack_goods','wms/prepack_goods_group','wms/print_express_order', 'wms/print_select_seller',
    'wms/seller_available_goods_group_list','wms/seller_available_goods_group_detail',
    'wms/pick_order_goods_list',
    'wms/seller_pick_order_list',
    'wms/check_device_scale','wms/check_device_printer',
    'wms/usable_logistic_company_list',
    'wms/pick_order_wait_delivery_list','wms/pick_order_wait_pick_no_print','wms/pick_order_wait_pick_printed',

    #warehouse
    'wms/warehouse_list','wms/warehouse_detail',
    #repository
    'wms/repository_detail','wms/repository_edit','wms/repository_list',
    #location
    'wms/location_detail','wms/location_edit','wms/location_list',
  ]

  setRoutes = (route) ->
    url = '/' + route
    config =
      templateUrl: 'views/' + route + '.html'

    $routeProvider.when(url, config)
    return $routeProvider

  routes.forEach( (route) ->
    setRoutes(route)
  )

  $routeProvider
  .when('/', { templateUrl: '/views/wms/route_index.html'} )
  .when('/404', { templateUrl: '/views/pages/404.html'} )
  .otherwise( redirectTo: '/404' )