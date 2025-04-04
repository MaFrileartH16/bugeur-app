import { theme } from '@/theme.js';
import { createInertiaApp } from '@inertiajs/react';
import '@mantine/carousel/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '../css/app.css';
import './bootstrap';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx'),
    ),
  setup({ el, App, props }) {
    const RootApp = (
      <MantineProvider theme={theme}>
        <Notifications position="top-center" limit={1} />

        <App {...props} />
      </MantineProvider>
    );

    if (import.meta.env.SSR) {
      hydrateRoot(el, RootApp);
      return;
    }

    createRoot(el).render(RootApp);
  },
  progress: {
    color: '#4B5563',
  },
});
