import { createApp } from 'vue'
import App from './App.vue'

import LitepieDatepicker from 'litepie-datepicker-tw3';

import './index.css'

import router from './router/index.js'
import store from './store/movies/index.js'

import baseSpinner from './components/baseSpinner.vue'
import basePage from './components/basePage.vue';
import baseButton from './components/baseButton.vue';

const app = createApp(App);

app.use(LitepieDatepicker);
app.component('base-spinner',baseSpinner);
app.component('base-page',basePage);
app.component('base-button',baseButton);

app.use(store);
app.use(router);
app.mount('#app');
