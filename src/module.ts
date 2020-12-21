import { SensuConfigCtrl } from './components/config/config';
import { SensuServersCtrl } from './components/servers/servers';
import { SensuServerInfoCtrl } from './components/server_info/info';
import { ExamplePage1 } from 'components/config/ExamplePage1';
import { ExamplePage2 } from 'components/config/ExamplePage2';
import { ExampleAppSettings } from './types';

import { loadPluginCss } from 'grafana/app/plugins/sdk';
import { AppParamService } from './service/AppParamService';
import { AppPlugin } from '@grafana/ui';
import { HelloWorldDirective } from 'components/config/helloWorldDirective';

loadPluginCss({
  dark: 'plugins/grafana-sensu-app/styles/dark.css',
  light: 'plugins/grafana-sensu-app/styles/light.css',
});

export { SensuConfigCtrl as ConfigCtrl, SensuServerInfoCtrl, SensuServersCtrl, AppParamService, HelloWorldDirective };

export const plugin = new AppPlugin<ExampleAppSettings>()
  .addConfigPage({
    title: 'Page 1',
    icon: 'info-circle',
    body: ExamplePage1,
    id: 'page1',
  })
  .addConfigPage({
    title: 'Page 2',
    icon: 'user',
    body: ExamplePage2,
    id: 'page2',
  });
