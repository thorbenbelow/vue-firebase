import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {initializeApp} from 'firebase/app'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import vuetify from './plugins/vuetify'
import {getFirestore} from 'firebase/firestore'
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false

Vue.use(firestorePlugin)

export const app = initializeApp({
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY
})

export const auth = () => getAuth(app);
export const db = getFirestore(app)

const unsubscribe = onAuthStateChanged(auth(), () => {
  new Vue({
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

  unsubscribe()
})
