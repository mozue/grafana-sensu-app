import appEvents from 'grafana/app/core/app_events';
import { IHttpService } from 'angular';
import { getBackendSrv } from '@grafana/runtime';
import { VariableSrv2 } from 'grafana_app/features/templating/variable_srv';
import 'grafana_app/features/templating/all';
import { AppParamService } from 'service/AppParamService';
import { DashboardModel } from 'grafana/app/features/dashboard/model';
import { DashboardSrv } from 'grafana/app/features/dashboard/dashboard_srv';

export { SubMenuCtrl } from 'grafana_app/features/dashboard/components/SubMenu/SubMenuCtrl';

export class SensuServersCtrl {
  server: any;
  pageReady: boolean;
  datasources: [any];
  servers: any;
  isOrgEditor: boolean;
  dashboard: DashboardModel;

  static templateUrl = 'components/servers/partials/servers.html';

  /** @ngInject */
  constructor(
    $scope,
    $injector,
    $http: IHttpService,
    private backendSrv,
    private dashboardSrv,
    private dashboardLoaderSrv,
    private contextSrv,
    private timeSrv,
    private variableSrv2: VariableSrv2,
    private appParamService: AppParamService,
    private $location,
    private $rootScope
  ) {
    const self = this;
    this.isOrgEditor = contextSrv.hasRole('Editor') || contextSrv.hasRole('Admin');
    document.title = 'Grafana Sensu App';
    this.servers = [];
    this.pageReady = false;
    this.getSensuServers();
    getBackendSrv()
      .get('/api/dashboards/uid/test')
      .then((result: any) => {
        this.dashboard = this.dashboardSrv.create(result.dashboard, result.meta);
        this.dashboardSrv.setCurrent(this.dashboard);
        // this.dashboard.
        // this.dashboard.time = { from: 'now-30d', to: 'now' };
        // this.variableSrv2.init(this.dashboard);
        // this.timeSrv.init(this.dashboard);
      });

    appParamService.param1 = 'test test';
  }

  async getSensuServers() {
    const self = this;
    return this.backendSrv.get('/api/datasources').then((result: any) => {
      self.servers = result.filter((o: { type: {} }) => {
        return o.type === 'grafana-sensucore-datasource';
      });
      console.log('servers...' + JSON.stringify(self.servers));
      self.pageReady = true;
    });
  }

  confirmDelete(id: any) {
    this.backendSrv.delete('/api/datasources/' + id).then(() => {
      this.getSensuServers();
    });
  }

  deleteSensuServer(server) {
    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: 'Are you sure you want to delete this data source?',
      yesText: 'Delete',
      icon: 'fa-trash',
      onConfirm: () => {
        this.confirmDelete(server.id);
      },
    });
  }

  /*
    1) POST new datasource
        POST to http://localhost:3000/api/datasources
        {
          "name":"Sensu Core-2",
          "type":"grafana-sensucore-datasource",
          "access":"proxy",
          "isDefault":false
        }
    2) Get the id of the created datasource (will be in response)
        response.datasource.id
    3) Send user to the datasource config page http://localhost:3000/datasources/edit/7
        window.location.href = ds_editor_uri;
        this.$location.url('/datasources/edit/7');

   */
  postSave(clone, data) {
    this.dashboard.version = data.version;

    // important that these happens before location redirect below
    this.$rootScope.appEvent('dashboard-saved', this.dashboard);
    this.$rootScope.appEvent('alert-success', ['Dashboard saved']);

    // const newUrl = locationUtil.stripBaseFromUrl(data.url);
    // const currentPath = this.$location.path();

    // if (newUrl !== currentPath) {
    //   this.$location.url(newUrl).replace();
    // }

    // return this.dashboard;
  }

  handleSaveDashboardError(clone, options, err) {
    options = options || {};
    options.overwrite = true;

    if (err.data && err.data.status === 'version-mismatch') {
      err.isHandled = true;

      this.$rootScope.appEvent('confirm-modal', {
        title: 'Conflict',
        text: 'Someone else has updated this dashboard.',
        text2: 'Would you still like to save this dashboard?',
        yesText: 'Save & Overwrite',
        icon: 'fa-warning',
        onConfirm: () => {
          this.save(clone, { overwrite: true });
        },
      });
    }

    if (err.data && err.data.status === 'name-exists') {
      err.isHandled = true;

      this.$rootScope.appEvent('confirm-modal', {
        title: 'Conflict',
        text: 'A dashboard with the same name in selected folder already exists.',
        text2: 'Would you still like to save this dashboard?',
        yesText: 'Save & Overwrite',
        icon: 'fa-warning',
        onConfirm: () => {
          this.save(clone, { overwrite: true });
        },
      });
    }
  }

  async addSensuServer() {
    const options = { folderId: this.dashboard.meta.folderId };
    const clone = this.dashboard.getSaveModelClone();
    clone.id = null;
    clone.uid = '';
    clone.editable = true;

    this.save(clone, options);
    // this.dashboardSrv.save(this.dashboard);
    // const payload = {
    //   name: 'SensuAppCore-' + this.servers.length,
    //   type: 'grafana-sensucore-datasource',
    //   access: 'proxy',
    //   isDefault: false,
    // };
    // const response = await this.backendSrv.post('/api/datasources', payload);
    // const instanceId = response.datasource.id;
    // this.$location.url('/plugins/grafana-sensu-app/page/sensu-servers');
    // window.location.href = '/datasources/edit/' + instanceId;
  }

  save(clone, options) {
    options = options || {};
    options.folderId = options.folderId >= 0 ? options.folderId : this.dashboard.meta.folderId || clone.folderId;

    return this.backendSrv
      .saveDashboard(clone, options)
      .then(this.postSave.bind(this, clone))
      .catch(this.handleSaveDashboardError.bind(this, clone, options));
  }

  serverInfo(server) {
    this.$location.path('plugins/grafana-sensu-app/page/sensu-server-info').search({ server: server.id });
  }
}
