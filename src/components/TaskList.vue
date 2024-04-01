<script setup>
import { ref } from 'vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
})
const tasks = ref(props.tasks)
function deleteTask(index) {
  tasks.value.splice(index, 1)
}

const toggleCompleted = (task) => {
  task.completed = !task.completed
}
</script>
<template>
  <div id="task-list">
    <div
      v-for="(task, index) in tasks"
      :key="task.id"
      class="task-item d-flex align-items-center d-flex align-items-center"
    >
      <div class="task-status">
        <div v-if="task.completed" @click="toggleCompleted(task)">
          <svg style="width: 1.7em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
            />
          </svg>
        </div>
        <div v-else @click="toggleCompleted(task)">
          <svg style="width: 1.7em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
            />
          </svg>
        </div>
      </div>
      <div
        class="task-title mx-3"
        :class="{ completed: task.completed }"
        @click="toggleCompleted(task)"
      >
        {{ task.title }}
      </div>
      <div class="ms-auto">
        <button type="button" class="btn btn-primary btn-sm mr-2">Edit</button>
        <button type="button" class="btn btn-danger btn-sm" @click="deleteTask(index)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.completed {
  text-decoration: line-through;
}
</style>