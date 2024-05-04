<script setup>
import { ref } from 'vue'
import SaveBtn from './SaveBtn.vue'
import { useTaskStore } from '@/stores/TaskStore'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const task = ref(null)
const store = useTaskStore()
task.value = store.getTaskById(props.id)
</script>
<template>
  <textarea
    v-model="task.description"
    name="description"
    id="taskDescription"
    cols="30"
    rows="10"
    placeholder="Add a short discription for your task at hand..."
  ></textarea>
  <div class="d-flex justify-content-end">
    <SaveBtn :description="task.description" :id="task.id" />
  </div>
</template>

<style scoped>
textarea {
  width: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>