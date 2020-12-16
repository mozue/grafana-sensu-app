import { Variable, variableTypes } from './variable';
import { assignModelProperties } from './model_utils';

export class TextBoxVariable implements Variable {
  query: string;
  current: any;
  options: any[];
  skipUrlSync: boolean;

  defaults = {
    type: 'textbox',
    name: '',
    hide: 0,
    label: '',
    query: '',
    current: {},
    options: [],
    skipUrlSync: false,
  };

  /** @ngInject */
  constructor(private model, private variableSrv2) {
    assignModelProperties(this, model, this.defaults);
  }

  getSaveModel() {
    assignModelProperties(this.model, this, this.defaults);
    return this.model;
  }

  setValue(option) {
    this.variableSrv2.setOptionAsCurrent(this, option);
  }

  updateOptions() {
    this.options = [{ text: this.query.trim(), value: this.query.trim() }];
    this.current = this.options[0];
    return Promise.resolve();
  }

  dependsOn(variable) {
    return false;
  }

  setValueFromUrl(urlValue) {
    this.query = urlValue;
    return this.variableSrv2.setOptionFromUrl(this, urlValue);
  }

  getValueForUrl() {
    return this.current.value;
  }
}

variableTypes['textbox'] = {
  name: 'Text box',
  ctor: TextBoxVariable,
  description: 'Define a textbox variable, where users can enter any arbitrary string',
};
