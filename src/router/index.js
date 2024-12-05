import { createRouter, createWebHistory } from 'vue-router'
import FileList from '../views/FileList.vue'
import AnalysisDashboard from '../views/AnalysisDashboard.vue'
import DocumentView from '../views/DocumentView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'files',
      component: FileList
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: AnalysisDashboard
    },
    {
      path: '/document',
      name: 'document',
      component: DocumentView
    }
  ]
})

export default router