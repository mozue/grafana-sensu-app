import angular from 'angular';

export class AppParamService {
  private _param1: string;

  get param1() {
    return this._param1;
  }

  set param1(val: string) {
    this._param1 = val;
  }
}

angular.module('grafana.services').service('appParamService', AppParamService);
