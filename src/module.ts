///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

// React
import { AppPlugin } from '@grafana/ui';
import { ExampleAppSettings } from './types';
import { ExamplePage1 } from './config/ExamplePage1';
import { ExampleRootPage } from './ExampleRootPage';

// Angular pages
import { SensuConfigCtrl } from './components/config/config';
import { SensuServersCtrl } from './components/servers/servers';
import { SensuServerInfoCtrl } from './components/server_info/info';
import { loadPluginCss } from 'grafana/app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/grafana-sensu-app/styles/dark.css',
  light: 'plugins/grafana-sensu-app/styles/light.css',
});

export { SensuConfigCtrl as ConfigCtrl, SensuServerInfoCtrl, SensuServersCtrl };

export const plugin = new AppPlugin<ExampleAppSettings>().addConfigPage({
  title: 'Page 1',
  icon: 'fa fa-info',
  body: ExamplePage1,
  id: 'page1',
});
