<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'

const store = useTaskStore()

const tasks = computed(() => {
  return store.tasks
})

const toggleCompleted = (task) => {
  task.completed = !task.completed
}
</script>



<template>
  <div v-if="store.tasks.length" id="task-list">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="task-item d-flex align-items-center d-flex align-items-center"
    >
      <div class="task-status">
        <div v-if="task.completed" @click="toggleCompleted(task)">
          <svg style="width: 1.7em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="hsla(160, 100%, 37%, 1)"
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
            />
          </svg>
        </div>
        <div v-else @click="toggleCompleted(task)">
          <svg style="width: 1.7em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="#6C0BA9"
              d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
            />
          </svg>
        </div>
      </div>
      <div
        class="task-title mx-3 green"
        :class="{ completed: task.completed }"
        @click="toggleCompleted(task)"
      >
        {{ task.title }}
      </div>
      <div class="ms-auto">
        <button type="button" class="btn btn-sm">
          <router-link :to="{ name: 'task', params: { id: task.id } }">Edit</router-link>
        </button>

        <button type="button" class="btn btn-sm" @click="store.deleteTask(task)">
          <svg style="width: 1.7em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              fill="#FF0000"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div class="text-center" v-else>No tasks available, time to relax!</div>
</template>


<style scoped>
.completed {
  text-decoration: line-through;
}

.task-item:hover {
  cursor: pointer;
}
</style>