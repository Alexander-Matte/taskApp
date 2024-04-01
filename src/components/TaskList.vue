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
</script>
<template>
  <div id="task-list">
    <div
      v-for="(task, index) in tasks"
      :key="task.id"
      class="task-item d-flex align-items-center d-flex align-items-center"
    >
      <div class="task-status"><font-awesome-icon :icon="['far', 'circle']" /></div>
      <div class="task-title">{{ task.title }}</div>
      <div class="ms-auto">
        <button type="button" class="btn btn-primary btn-sm mr-2">Edit</button>
        <button type="button" class="btn btn-danger btn-sm" @click="deleteTask(index)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>