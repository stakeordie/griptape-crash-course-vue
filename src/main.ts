import { createApp } from 'vue'
import { getKeplrAccountProvider, gripApp } from '@stakeordie/griptape.js';

import App from './App.vue'
import './contracts';
import './assets/index.css';

const restUrl = 'https://api.holodeck.stakeordie.com';
const provider = getKeplrAccountProvider();
const runApp = () => {
  createApp(App).mount('#app');
}

gripApp(restUrl, provider, runApp);
