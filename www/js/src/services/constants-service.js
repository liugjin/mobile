define([], function() {
  var ConstantService, exports;
  ConstantService = (function() {
    function ConstantService($rootScope, $http) {
      var ip, preference;
      this.$rootScope = $rootScope;
      this.$http = $http;
      if (localStorage.getItem('preference')) {
        preference = JSON.parse(localStorage.getItem('preference'));
        ip = preference != null ? preference.ip : void 0;
      }
      this.ip = ip != null ? ip : "127.0.0.1";
      this.init();
      this.setWindowSetting();
    }

    ConstantService.prototype.changeIp = function(ip) {
      this.ip = ip;
      this.init();
      return this.setWindowSetting();
    };

    ConstantService.prototype.init = function() {
      this.TOAST_SHORT_DELAY = 2000;
      this.TOAST_LONG_DELAY = 3500;
      this.loginCookie = 'clc-login-info';
      this.tokenCookie = 'clc-token-info';
      this.storeName = 'clc-mobile';
      this.urls = {
        login: 'http://' + this.ip + '/auth/login',
        register: 'http://' + this.ip + '/auth/register'
      };
      return this.ioUrl = 'http://' + this.ip;
    };

    ConstantService.prototype.setWindowSetting = function() {
      return window.setting = {
        'entranceUrl': 'http://cloud.huayuan-iot.com/model/clc/api/v1/keyvalues/admin/info/entrance?token=98655510-f850-11e8-9681-c905a56f3896',
        'services': {
          'api': 'clc/api/v1',
          'gateway': '/gateway',
          'auth': '/auth',
          'model': '/model',
          'bus': '/bus',
          'resource': '/resource',
          'visualization': '/visualization',
          'reporting': '/reporting',
          'notification': '/notification',
          'video': '/video',
          'monitoring': '/monitoring',
          'store': '/cloud',
          'portal': '/portal',
          'doc': '/doc',
          'dcim': '/dcim',
          'cloudview': '/cloudview',
          'cmms': '/cmms',
          'connection': '/connection',
          'smartrack': '/smartrack'
        },
        'urls': {
          'login': 'http://' + this.ip + '/auth/#/login',
          'logout': 'http://' + this.ip + '/auth/#/logout',
          'authenticate': 'http://' + this.ip + '/auth/authenticate',
          'changePassword': 'http://' + this.ip + '/auth/#/changepassword',
          'forgetPassword': 'http://' + this.ip + '/auth/#/forgetpassword',
          'resetPassword': 'http://' + this.ip + '/auth/#/resetpassword',
          'getToken': 'http://' + this.ip + '/auth/token/:username/:password',
          'validatePassword': 'http://' + this.ip + '/auth/validatepassword/:username',
          'sendSmsCode': 'http://' + this.ip + '/auth/sendsmscode/:phone',
          'model.login': 'http://' + this.ip + '/model/clc/api/v1/system/login',
          'model.authenticate': 'http://' + this.ip + '/model/clc/api/v1/system/authenticate',
          'model.logout': 'http://' + this.ip + '/model/clc/api/v1/system/logout',
          'model.changePassword': 'http://' + this.ip + '/model/clc/api/v1/system/changepassword',
          'model.changeToken': 'http://' + this.ip + '/model/clc/api/v1/system/changeToken',
          'activateUser': 'http://' + this.ip + '/model/clc/api/v1/system/activate/:user/:key',
          'uploadUrl': 'http://' + this.ip + '/resource/upload/img/public',
          'fileUrl': 'http://' + this.ip + '/resource/upload/file/public',
          'usersUploadUrl': 'http://' + this.ip + '/resource/upload/img/users',
          'downloadUrl': 'http://' + this.ip + '/resource/download/:url',
          'register': 'http://' + this.ip + '/model/clc/api/v1/system/register',
          'users': 'http://' + this.ip + '/model/clc/api/v1/users',
          'user': 'http://' + this.ip + '/model/clc/api/v1/users/:user',
          'projects': 'http://' + this.ip + '/model/clc/api/v1/projects/:user',
          'project': 'http://' + this.ip + '/model/clc/api/v1/projects/:user/:project',
          'datatypes': 'http://' + this.ip + '/model/clc/api/v1/datatypes/:user/:project/:type',
          'signaltypes': 'http://' + this.ip + '/model/clc/api/v1/signaltypes/:user/:project/:type',
          'stationtypes': 'http://' + this.ip + '/model/clc/api/v1/stationtypes/:user/:project/:type',
          'eventtypes': 'http://' + this.ip + '/model/clc/api/v1/eventtypes/:user/:project/:type',
          'eventseverities': 'http://' + this.ip + '/model/clc/api/v1/eventseverities/:user/:project/:severity',
          'eventphases': 'http://' + this.ip + '/model/clc/api/v1/eventphases/:user/:project/:phase',
          'porttypes': 'http://' + this.ip + '/model/clc/api/v1/porttypes/:user/:project/:type',
          'units': 'http://' + this.ip + '/model/clc/api/v1/units/:user/:project/:unit',
          'monitoringunits': 'http://' + this.ip + '/model/clc/api/v1/monitoringunits/:user/:project/:unit',
          'vendors': 'http://' + this.ip + '/model/clc/api/v1/vendors/:user/:project/:vendor',
          'equipmenttypes': 'http://' + this.ip + '/model/clc/api/v1/equipmenttypes/:user/:project/:type',
          'equipmenttemplates': 'http://' + this.ip + '/model/clc/api/v1/equipmenttemplates/:user/:project/:type/:template',
          'equipmentsignals': 'http://' + this.ip + '/model/clc/api/v1/equipmentsignals/:user/:project/:type/:template/:signal',
          'equipmentevents': 'http://' + this.ip + '/model/clc/api/v1/equipmentevents/:user/:project/:type/:template/:event',
          'equipmentcommands': 'http://' + this.ip + '/model/clc/api/v1/equipmentcommands/:user/:project/:type/:template/:command',
          'equipmentproperties': 'http://' + this.ip + '/model/clc/api/v1/equipmentproperties/:user/:project/:type/:template/:property',
          'equipmentports': 'http://' + this.ip + '/model/clc/api/v1/equipmentports/:user/:project/:type/:template/:port',
          'equipmentstates': 'http://' + this.ip + '/model/clc/api/v1/equipmentstates/:user/:project/:state',
          'stationstates': 'http://' + this.ip + '/model/clc/api/v1/stationstates/:user/:project/:state',
          'stations': 'http://' + this.ip + '/model/clc/api/v1/stations/:user/:project/:station',
          'equipments': 'http://' + this.ip + '/model/clc/api/v1/equipments/:user/:project/:station/:equipment',
          'eventnotifications': 'http://' + this.ip + '/model/clc/api/v1/eventnotifications/:user/:project/:notification',
          'roles': 'http://' + this.ip + '/model/clc/api/v1/roles/:user/:project/:role',
          'capacities': 'http://' + this.ip + '/model/clc/api/v1/capacities/:user/:project/:capacity',
          'graphictypes': 'http://' + this.ip + '/model/clc/api/v1/graphictypes/:user/:project/:type',
          'graphictemplates': 'http://' + this.ip + '/model/clc/api/v1/graphictemplates/:user/:project/:template',
          'watches': 'http://' + this.ip + '/model/clc/api/v1/watches/:user/:project/:watch',
          'reporttemplates': 'http://' + this.ip + '/model/clc/api/v1/reporttemplates/:user/:project/:template',
          'reportfiles': 'http://' + this.ip + '/model/clc/api/v1/reportfiles/:user/:project/:file',
          'reporting.signalrecords': 'http://' + this.ip + '/model/clc/api/v1/reporting/signal-records/:user/:project',
          'reporting.signalgrouprecords': 'http://' + this.ip + '/model/clc/api/v1/reporting/signal-group-records/:user/:project',
          'reporting.signalStatistics': 'http://' + this.ip + '/model/clc/api/v1/reporting/signal-statistics/:user/:project',
          'reporting.eventrecords': 'http://' + this.ip + '/model/clc/api/v1/reporting/event-records/:user/:project',
          'reporting.commandrecords': 'http://' + this.ip + '/model/clc/api/v1/reporting/command-records/:user/:project',
          'reporting.operationrecords': 'http://' + this.ip + '/model/clc/api/v1/reporting/operation-records',
          'reporting.records.signal': 'http://' + this.ip + '/model/clc/api/v1/reporting/records/signal/:user/:project',
          'reporting.records.signal-group': 'http://' + this.ip + '/model/clc/api/v1/reporting/records/signal-group/:user/:project',
          'reporting.records.signal-statistic': 'http://' + this.ip + '/model/clc/api/v1/reporting/records/signal-statistic/:user/:project',
          'reporting.records.event': 'http://' + this.ip + '/model/clc/api/v1/reporting/records/event/:user/:project',
          'reporting.records.command': 'http://' + this.ip + '/model/clc/api/v1/reporting/records/command/:user/:project',
          'reporting.records.operation': 'http://' + this.ip + '/model/clc/api/v1/reporting/records/operation',
          'reporting.aggregate.signal': 'http://' + this.ip + '/model/clc/api/v1/reporting/aggregate/signal/:user/:project',
          'reporting.aggregate.signal-group': 'http://' + this.ip + '/model/clc/api/v1/reporting/aggregate/signal-group/:user/:project',
          'reporting.aggregate.signal-statistic': 'http://' + this.ip + '/model/clc/api/v1/reporting/aggregate/signal-statistic/:user/:project',
          'reporting.aggregate.event': 'http://' + this.ip + '/model/clc/api/v1/reporting/aggregate/event/:user/:project',
          'reporting.aggregate.command': 'http://' + this.ip + '/model/clc/api/v1/reporting/aggregate/command/:user/:project',
          'reporting.aggregate.operation': 'http://' + this.ip + '/model/clc/api/v1/reporting/aggregate/operation',
          'reporting.aggregate.notification': 'http://' + this.ip + '/model/clc/api/v1/reporting/aggregate/notification/:user/:project',
          'reporting.aggregate.task': 'http://' + this.ip + '/model/clc/api/v1/reporting/aggregate/task/:user/:project',
          'star': 'http://' + this.ip + '/model/clc/api/v1/star/:user/:project/:starUser',
          'token': 'http://' + this.ip + '/model/clc/api/v1/token/:token',
          'role': 'http://' + this.ip + '/model/clc/api/v1/role/:user/:project',
          'issues': 'http://' + this.ip + '/model/clc/api/v1/issues/:user/:project/:issue',
          'sprints': 'http://' + this.ip + '/model/clc/api/v1/sprints/:user/:project/:sprint',
          'processtypes': 'http://' + this.ip + '/model/clc/api/v1/processtypes/:user/:project/:type',
          'tasks': 'http://' + this.ip + '/model/clc/api/v1/tasks/:user/:project/:type/:process/:task',
          'inventorystatistics': 'http://' + this.ip + '/model/clc/api/v1/statistic/inventory/:user/:project/:station/:equipmentType/:role/:period',
          'dynamicstatistics': 'http://' + this.ip + '/model/clc/api/v1/statistic/dynamic/:user/:project/:station/:equipment/:valueType/:period',
          'notifications': 'http://' + this.ip + '/notification/clc/api/v1/notifications/:user/:project/:notification',
          'notificationrules': 'http://' + this.ip + '/model/clc/api/v1/notificationrules/:user/:project/:notification',
          'notificationrecords': 'http://' + this.ip + '/model/clc/api/v1/notificationrecords/:user/:project/:notification',
          'connectiontypes': 'http://' + this.ip + '/model/clc/api/v1/connectiontypes/:user/:project/:type',
          'connections': 'http://' + this.ip + '/model/clc/api/v1/connections/:user/:project/:station/:connection',
          'connect': 'http://' + this.ip + '/model/clc/api/v1/connect/:user/:project/:station/:equipment',
          'calendarevents': 'http://' + this.ip + '/model/clc/api/v1/calendarevents/:user/:project/:station/:event',
          'todotasks': 'http://' + this.ip + '/model/clc/api/v1/todotasks/:user/:project/:station/:task',
          'apis': 'http://' + this.ip + '/model/clc/api/v1/apis/:api',
          'apifeatures': 'http://' + this.ip + '/model/clc/api/v1/apifeatures/:api/:feature',
          'shorts': 'http://' + this.ip + '/model/clc/api/v1/shorts/:short',
          'short': 'http://' + this.ip + '/model/s',
          'keyvalues': 'http://' + this.ip + '/model/clc/api/v1/keyvalues/:user/:project/:key',
          'keyvalue': 'http://' + this.ip + '/model/kv',
          'operationtemplates': 'http://' + this.ip + '/model/clc/api/v1/operationtemplates/:user/:project/:station/:template',
          'cmms.operationtemplates': 'http://' + this.ip + '/model/clc/api/v1/cmms/operationtemplates/:user/:project/:station/:template',
          'cmms.events': 'http://' + this.ip + '/model/clc/api/v1/cmms/events/:user/:project/:station/:event',
          'cmms.tickets': 'http://' + this.ip + '/model/clc/api/v1/cmms/tickets/:user/:project/:station/:ticket',
          'cmms.teams': 'http://' + this.ip + '/model/clc/api/v1/cmms/teams/:user/:project/:station/:team',
          'cmms.schedules': 'http://' + this.ip + '/model/clc/api/v1/cmms/schedules/:user/:project/:station/:schedule',
          'inventory.statisticByEquipmentTypes': 'http://' + this.ip + '/model/clc/api/v1/inventory/statistic-by-equipment-types/:user/:project/:station',
          'inventory.lifetime': 'http://' + this.ip + '/model/clc/api/v1/inventory/lifetime/:user/:project/:station',
          'doc.search': 'http://' + this.ip + '/portal/clc/api/v1/search',
          'res.search': 'http://' + this.ip + '/resource/clc/api/v1/search',
          'model.search': 'http://' + this.ip + '/model/clc/api/v1/search',
          'resources': 'http://' + this.ip + '/model/clc/api/v1/resources/:user/:project/:resource',
          'operations': 'http://' + this.ip + '/model/clc/api/v1/operations/:user/:type/:operation',
          'updateSignals': 'http://' + this.ip + '/model/clc/api/v1/updateSignals/:user/:project/:station/:equipment',
          'updateEvents': 'http://' + this.ip + '/model/clc/api/v1/updateEvents/:user/:project/:station/:equipment',
          'updateCommands': 'http://' + this.ip + '/model/clc/api/v1/updateCommands/:user/:project/:station/:equipment',
          'pauseChanges': 'http://' + this.ip + '/model/clc/api/v1/pauseChanges/:user/:project/:period',
          'generateProject': 'http://' + this.ip + '/model/clc/api/v1/generateProject/:user/:project'
        }
      };
    };

    return ConstantService;

  })();
  return exports = {
    Constants: ConstantService
  };
});
