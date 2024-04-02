<script setup>
import data from '@/data.json'
import { ref, computed } from 'vue'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const tasks = ref(data.tasks)

function taskById(id) {
  return tasks.value.find((task) => task.id === id)
}

const task = taskById(props.id)
</script>
<template>
  <div class="container mt-5">
    <h1>{{ task.title }}</h1>
    <div class="todo-details">
      <p>Published: {{ taskById(props.id).created_at }}</p>
      <p v-if="taskById(props.id).updated_at">Last Edited: {{ task.updated_at }}</p>
      <p v-else>Last Edited: Not edited yet</p>
      <hr />
      <div v-if="task.description">
        <h2>Description:</h2>
        <p>{{ task.description }}</p>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-sm">
            <svg style="width: 1.7em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="#F2F3F4"
                d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
              />
            </svg>
          </button>
        </div>
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
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-sm">
            <svg style="width: 1.7em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                fill="#F2F3F4"
                d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>