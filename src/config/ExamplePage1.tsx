// Libraries
import React, { PureComponent } from 'react';

// Types
import { PluginConfigPageProps, GrafanaPlugin, PluginMeta } from '@grafana/ui';
import { ExampleAppSettings } from 'types';

// export interface PluginConfigPageProps<T extends GrafanaPlugin> {
// export declare class AppPlugin<T = KeyValue> extends GrafanaPlugin<AppPluginMeta<T>> {
// export interface AppPluginMeta<T = KeyValue> extends PluginMeta<T> {
// export declare class GrafanaPlugin<T extends PluginMeta = PluginMeta> {

//  addConfigPage(tab: PluginConfigPage<GrafanaPlugin>): this;
// export interface PluginConfigPage<T extends GrafanaPlugin> {
// body: ComponentClass<PluginConfigPageProps<T>>;

interface Props extends PluginConfigPageProps<GrafanaPlugin<PluginMeta<ExampleAppSettings>>> {}

export class ExamplePage1 extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentWillUnmount(){
    console.log('componentWillUnmount');
  }

  render() {
    const { query } = this.props;

    return (
      <div>
        11111111111111111111111111111111
        <pre>{JSON.stringify(query)}</pre>
        11111111111111111111111111111111
      </div>
    );
  }
}
