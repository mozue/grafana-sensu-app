import angular from 'angular';
import _ from 'lodash';

export class SubMenuCtrl {
  annotations: any;
  variables: any;
  dashboard: any;

  /** @ngInject */
  constructor(private variableSrv2, private $location) {
    this.annotations = this.dashboard.templating.list;
    this.variables = this.variableSrv2.variables;
  }

  annotationStateChanged() {
    this.dashboard.startRefresh();
  }

  variableUpdated(variable) {
    this.variableSrv2.variableUpdated(variable, true);
  }

  openEditView(editview) {
    const search = _.extend(this.$location.search(), { editview: editview });
    this.$location.search(search);
  }
}

export function submenuDirective2() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/dashboard/components/SubMenu/template.html',
    controller: SubMenuCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    scope: {
      dashboard: '=',
    },
  };
}

angular.module('grafana.directives').directive('dashboardSubmenu2', submenuDirective2);
