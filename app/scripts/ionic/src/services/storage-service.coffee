

define [], () ->

  service = (store, settingService) ->
    store.getNamespacedStore settingService.storeName

  exports =
    service: service
