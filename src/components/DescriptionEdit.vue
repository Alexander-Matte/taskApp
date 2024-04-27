<script setup>
import { ref } from 'vue'
import data from '@/data.json'
import SaveBtn from './SaveBtn.vue'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const tasks = ref(data.tasks)
const task = taskById(props.id)
const editedDescription = ref(task.description)
function taskById(id) {
  return tasks.value.find((task) => task.id === id)
}

const emit = defineEmits(['saveComplete'])
</script>
<template>
  <textarea
    v-model="editedDescription"
    name="description"
    id="taskDescription"
    cols="30"
    rows="10"
    placeholder="Add a short discription for your task at hand..."
  ></textarea>
  <div class="d-flex justify-content-end">
    <SaveBtn :description="editedDescription" :task="task" @click="emit('saveComplete')" />
  </div>
</template>

<style scoped>
textarea {
  width: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>