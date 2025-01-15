import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { firebaseApp } from './firebase';
import { VueFire, VueFireAuth } from 'vuefire';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(VueFire, {
	firebaseApp,
	modules: [
		VueFireAuth(),
	],
});

app.use(router);
app.use(pinia);

app.mount('#app');