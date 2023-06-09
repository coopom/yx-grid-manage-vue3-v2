import { createPinia } from "pinia";

const pinia = createPinia();

export const setup = (app) => {
    app.use(pinia);
}

export default pinia;
