import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
    apiKey: "AIzaSyDnDG4H2wPFO2UCoeIIrhckB_uiCQJ7K-8",
    authDomain: "https://tomatempo.netlify.app",
    projectId: "Tomatempo",
    storageBucket: "pomodoro-fb6a8.appspot.com",
    messagingSenderId: "1057727873271",
    appId: "1:1057727873271:web:17b69062d65c0dd5e013f2",
    measurementId: "G-DR3ZHKGS8W"
};



const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
})
initializeApp(firebaseConfig);


createApp(App).use(vuetify).mount('#app')



