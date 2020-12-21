import angular from 'angular';

export class HelloWorldDirective implements angular.IDirective {
  restrict = 'E';
  templateUrl = 'public/plugins/grafana-sensu-app/components/config/template.html';
  controller = HelloWorldDirective;
  bindToController = true;
  controllerAs = 'ctrl';

  /**
  * instance生成
  *
  * @returns {function(): DropdownMenu}
  * @constructor
  */
  public static Factory(): ng.IDirectiveFactory {
    var directive = () => {
      return new HelloWorldDirective();
    };
    directive.$inject = [];
    return directive;
  }
}

angular.module('grafana.directives').directive('helloWorldDirective', HelloWorldDirective.Factory());
