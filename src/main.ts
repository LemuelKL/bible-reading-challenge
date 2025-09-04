import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Dialog, Notify } from 'quasar';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';
import '@/css/app-override.sass';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(Quasar, {
  plugins: { Dialog, Notify },
  config: {
    notify: {}
  }
});
app.use(createPinia());
app.use(router);

app.mount('#app');
