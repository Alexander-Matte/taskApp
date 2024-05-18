import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import TaskView from "@/components/TaskView.vue";
import LoginPage from "@/components/LoginPage.vue";
import { useTaskStore } from "@/stores/TaskStore";
import NotFound from "@/components/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/task/:id",
      name: "task",
      component: TaskView,
      props: true,
      // check if task exists and handle redirect based on result
      beforeEnter(to, from, next) {
        const store = useTaskStore();
        // check if task is available with given id
        const taskExists = store.getTaskById(to.params.id);

        if (taskExists) {
          return next();
        } else {
          //redirect to not-found page keeping user url params,querys and hashs in url
          next({
            name: "notfound",
            params: { pathMatch: to.path.substring(1).split("/") },
            query: to.query,
            hash: to.hash,
          });
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NotFound,
    },
  ],
});

export default router;
