import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './index.css'
import mermaid from 'mermaid'

// Mermaidの初期化
mermaid.initialize({
  startOnLoad: false,  // コンポーネントで個別に初期化するため
  theme: 'default',
  securityLevel: 'loose',
  flowchart: {
    curve: 'basis',
    padding: 20
  },
  sequence: {
    showSequenceNumbers: true,
    actorMargin: 50,
    messageMargin: 40
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')