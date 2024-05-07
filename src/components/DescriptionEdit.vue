<script setup>
import { ref, computed } from 'vue'
import SaveBtn from './SaveBtn.vue'
import { useTaskStore } from '@/stores/TaskStore'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useTaskStore()
const task = computed(() => {
  return store.getTaskById(props.id)
})
const description = ref(task.value.description)
</script>
<template>
  <textarea
    v-model="description"
    name="description"
    id="taskDescription"
    cols="30"
    rows="10"
    placeholder="Add a short discription for your task at hand..."
  ></textarea>
  <div class="d-flex justify-content-end">
    <SaveBtn :description="description" :id="task.id" />
  </div>
</template>

<style scoped>
textarea {
  width: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>
