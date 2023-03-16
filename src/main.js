import { createApp } from 'vue'
import App from './App.vue'

import "./styles/index.scss";

import { setup as setupRouter } from "./router";
import { setup as setupStore } from "./store";

const setup = () => {
    const app = createApp(App);
    setupStore(app);
    setupRouter(app);
    app.mount('#app');
}
setup();