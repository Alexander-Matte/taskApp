import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import TaskEdit from '@/components/TaskEdit.vue'
import data from '@/data.json'
import NotFound from '@/components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/task/:id',
      name: 'task',
      component: TaskEdit,
      props: true,
      // check if thread exists and handle redirect based on result
      beforeEnter(to, from, next) {
        // check if thread is available with given id
        const taskExists = data.tasks.find((task) => task.id === to.params.id)

        if (taskExists) {
          return next()
        } else {
          //redirect to not-found page keeping user url params,querys and hashs in url
          next({
            name: 'notfound',
            params: { pathMatch: to.path.substring(1).split('/') },
            query: to.query,
            hash: to.hash
          })
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound
    }
  ]
})

export default router
