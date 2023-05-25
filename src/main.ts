import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './config/router'

import './assets/styles/index.css'
import './assets/styles/custom.css'

const app = createApp(App)
import { useMasterStore } from '@/core/store/masters.store'

app.use(createPinia())
const masters = useMasterStore()
masters.construct({
  genders: ['Male', 'Female'],
  patientsType: ['Cat', 'Dog', 'Other'],
  reasons: [
    'Main Concern',
    'Skin/Ear Infection',
    'Eye Issues',
    'Urinary problems',
    'Mobility concerns',
    'Behaviors concerns',
    'Trauma Injury',
    'Toxin Ingestion',
    'Potty training',
    'Grooming advice',
    'Preventative wellness'
  ],
  states: ['CA', 'NY', 'VA']
})
app.use(router)

app.mount('#app')
