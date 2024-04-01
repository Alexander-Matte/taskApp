<script setup>
import data from '@/data.json'
import { ref } from 'vue'
const tasks = ref(data.tasks)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
function taskById(id) {
  return tasks.value.find((task) => task.id === id)
}
</script>
<template>
  <div class="container mt-5">
    <h1>{{ taskById(props.id).title }}</h1>
    <div class="todo-details">
      <p>Published: {{ taskById(props.id).created_at }}</p>
      <p v-if="taskById(props.id).updated_at">Last Edited: {{ taskById(props.id).updated_at }}</p>
      <p v-else>Last Edited: Not edited yet</p>
      <hr />
      <div v-if="taskById(props.id).description">
        <h2>Description:</h2>
        <p>{{ taskById(props.id).description }}</p>
      </div>
      <div v-else>
        <h2>Description:</h2>
        <textarea
          class="green"
          name="description"
          id="taskDescription"
          cols="30"
          rows="10"
          placeholder="Add a little discription for your task at hand..."
        ></textarea>
      </div>
    </div>
  </div>
</template>