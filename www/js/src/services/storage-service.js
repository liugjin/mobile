define([], function() {
  var exports, service;
  service = function(store, settingService) {
    return store.getNamespacedStore(settingService.storeName);
  };
  return exports = {
    service: service
  };
});
