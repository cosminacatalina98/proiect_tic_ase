import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice"; 




const app = createApp(App)

app.use(router)

app.use(store)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});


app.use(ToastService);
app.use(ConfirmationService); 

store.dispatch("checkUser");

app.mount('#app')



