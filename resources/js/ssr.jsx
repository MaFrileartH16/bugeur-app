import {MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';

import {createInertiaApp} from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import '@mantine/dates/styles.css';
import {Notifications} from '@mantine/notifications';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import {route} from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(
        `./Pages/${name}.jsx`,
        import.meta.glob('./Pages/**/*.jsx'),
      ),
    setup: ({App, props}) => {
      /* eslint-disable */
      // @ts-expect-error
      global.route = (name, params, absolute) =>
        route(name, params, absolute, {
          ...page.props.ziggy,
          location: new URL(page.props.ziggy.location),
        });
      /* eslint-enable */

      return (
        <MantineProvider>
          <Notifications position="top-center"/>

          <App {...props} />
        </MantineProvider>
      );
    },
  }),
);