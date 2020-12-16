import _ from 'lodash';
import { Variable, variableTypes } from './variable';
import { assignModelProperties } from './model_utils';

export class CustomVariable implements Variable {
  query: string;
  options: any;
  includeAll: boolean;
  multi: boolean;
  current: any;
  skipUrlSync: boolean;

  defaults = {
    type: 'custom',
    name: '',
    label: '',
    hide: 0,
    options: [],
    current: {},
    query: '',
    includeAll: false,
    multi: false,
    allValue: null,
    skipUrlSync: false,
  };

  /** @ngInject */
  constructor(private model, private variableSrv2) {
    assignModelProperties(this, model, this.defaults);
  }

  setValue(option) {
    return this.variableSrv2.setOptionAsCurrent(this, option);
  }

  getSaveModel() {
    assignModelProperties(this.model, this, this.defaults);
    return this.model;
  }

  updateOptions() {
    // extract options in comma separated string (use backslash to escape wanted commas)
    this.options = _.map(this.query.match(/(?:\\,|[^,])+/g), text => {
      text = text.replace(/\\,/g, ',');
      return { text: text.trim(), value: text.trim() };
    });

    if (this.includeAll) {
      this.addAllOption();
    }

    return this.variableSrv2.validateVariableSelectionState(this);
  }

  addAllOption() {
    this.options.unshift({ text: 'All', value: '$__all' });
  }

  dependsOn(variable) {
    return false;
  }

  setValueFromUrl(urlValue) {
    return this.variableSrv2.setOptionFromUrl(this, urlValue);
  }

  getValueForUrl() {
    if (this.current.text === 'All') {
      return 'All';
    }
    return this.current.value;
  }
}

variableTypes['custom'] = {
  name: 'Custom',
  ctor: CustomVariable,
  description: 'Define variable values manually',
  supportsMulti: true,
};
