// Libraries
import React, { PureComponent } from 'react';

// Types
import { PluginConfigPageProps, GrafanaPlugin, PluginMeta } from '@grafana/ui';
import { ExampleAppSettings } from 'types';
import { AngularComponent, getAngularLoader } from '@grafana/runtime';

interface Props extends PluginConfigPageProps<GrafanaPlugin<PluginMeta<ExampleAppSettings>>> {}

export class ExamplePage2 extends PureComponent<Props> {
  element: HTMLElement;
  angularCmp: AngularComponent;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const loader = getAngularLoader();

    const template = '<hello-world-directive />';
    const scopeProps = {};

    this.angularCmp = loader.load(this.element, scopeProps, template);
  }

  componentWillUnmount() {
    if (this.angularCmp) {
      this.angularCmp.destroy();
    }
  }

  render() {
    return <div ref={element => (this.element = element)} />;
  }
}
