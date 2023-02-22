import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Paginate from 'vuejs-paginate-next'

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'
import { SetupCalendar } from 'v-calendar'
import breadcrumbs from 'vue-3-breadcrumbs'

import ApiPlugin from './plugins/api'
import LoadPlugin from './plugins/load'

import '@/assets/styles.scss'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(ApiPlugin)
  .use(LoadPlugin)
  .use(Paginate)
  .use(mdiVue, {
    icons: mdijs
  })
  .use(SetupCalendar, {})
  .use(PrimeVue, { ripple: true })
  .use(breadcrumbs, {
    includeComponent: true
  })
  .component('AutoComplete', AutoComplete)
  .mount('#app')
