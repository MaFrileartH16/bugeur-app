import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const RootApp = (
      <MantineProvider>
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
