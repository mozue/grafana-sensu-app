
import _ from "lodash";
import appEvents from "grafana/app/core/app_events";

export class SensuServersCtrl {
  server: any;
  pageReady: boolean;
  datasources: [any];
  servers: {};
  isOrgEditor: boolean;

  static templateUrl = "components/servers/partials/servers.html";

  /** @ngInject */
  constructor($scope, $injector, private backendSrv, private contextSrv, private $location) {
    var self = this;
    this.isOrgEditor = contextSrv.hasRole("Editor") || contextSrv.hasRole("Admin");
    document.title = "Grafana Sensu App";
    this.servers = {};
    this.pageReady = false;
    this.getSensuServers().then(() => {
      self.pageReady = true;
    });
  }

  getSensuServers() {
    var self = this;
    return this.backendSrv.get("/api/datasources")
    .then((result) => {
      self.servers = result.filter((o: { type: Object; }) => {
        return o.type === "grafana-sensu-datasource";
      });
      console.log("servers..." + JSON.stringify(self.servers));
    });
  }

  confirmDelete(id: any) {
    this.backendSrv.delete("/api/datasources/" + id).then(() => {
      this.getSensuServers();
    });
  }

  deleteSensuServer(server) {
    appEvents.emit("confirm-modal", {
      title: "Delete",
      text: "Are you sure you want to delete this data source?",
      yesText: "Delete",
      icon: "fa-trash",
      onConfirm: () => {
        this.confirmDelete(server.id);
      }
    });
  }

  serverInfo(server) {
    this.$location.path("plugins/grafana-sensu-app/page/server-info").search({"server": server.id});
  }
}