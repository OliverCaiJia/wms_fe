'use strict';

angular.module 'jm.i18next'

.config ($i18nextProvider) ->
  $i18nextProvider.options =
    fallbackLng: 'zh'
    load: "all"
    resGetPath: '../i18n/__lng__/__ns__.json'
    useCookie: false
    ns:
      namespaces: ['global', 'wms', 'passport','importRules']
      defaultNs: 'global'