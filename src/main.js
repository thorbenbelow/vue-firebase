import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {initializeApp} from 'firebase/app'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

export const app = initializeApp({
  projectId: 'secret-santa-bbcfd',
  apiKey: 'AIzaSyBpdbFO9Ww_zlyxFPFeZ22e0zsmZgLfDMc'
})
// export const db = getFirestore(app);

const unsubscribe = onAuthStateChanged(getAuth(app), () => {
  new Vue({
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

  unsubscribe()
})
