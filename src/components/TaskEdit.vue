<script setup>
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import data from '@/data.json'
import { ref, onMounted, watchEffect } from 'vue'
import DescriptionEdit from './DescriptionEdit.vue'
import NavBar from './NavBar.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const tasks = ref(data.tasks)
const task = taskById(props.id)
let titleEditing = ref(false)
let descriptionEditing = ref(false)
const editedTitle = ref(task.title)
const titleInputRef = ref(null) // Define a ref for the input element

function taskById(id) {
  return tasks.value.find((task) => task.id === id)
}

function saveEditedTitle() {
  if (editedTitle.value.trim() !== '') {
    titleEditing.value = false
    taskById(props.id).title = editedTitle.value
  } else {
    // TODO: Add error message so user knows they cannot enter empty string
    titleEditing.value = false
  }
}

function editTaskTitle() {
  titleEditing.value = true
  Toastify({
    text: 'Press enter to save!',
    duration: 5000,
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)'
    },
    onClick: function () {} // Callback after click
  }).showToast()

  // Focus the input field when editing title
  if (titleInputRef.value) {
    titleInputRef.value.focus()
  }
}

// Ensure input field is focused when titleEditing changes to true
onMounted(() => {
  watchEffect(() => {
    if (titleEditing.value) {
      if (titleInputRef.value) {
        titleInputRef.value.focus()
      }
    }
  })
})
</script>
<template>
  <div class="container mt-5">
    <NavBar />
    <div class="title-container pt-3">
      <h1 class="d-flex justify-content-between" v-if="!titleEditing">
        {{ task.title }}
        <button type="button" @click="editTaskTitle" class="btn btn-sm">
          <svg style="width: 1.7em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="#F2F3F4"
              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
            />
          </svg>
        </button>
      </h1>
      <input
        class="h1"
        ref="titleInputRef"
        v-else
        v-model="editedTitle"
        @keyup.enter="saveEditedTitle"
        @blur="saveEditedTitle"
      />
    </div>

    <div class="task-details">
      <p>Published: {{ taskById(props.id).created_at }}</p>
      <p v-if="taskById(props.id).updated_at">Last Edited: {{ task.updated_at }}</p>
      <p v-else>Last Edited: Not edited yet</p>
      <hr />
      <h2>Description:</h2>
      <!-- If there is already description, then load the description with the editing button -->

      <div v-if="task.description && descriptionEditing === false">
        <p>{{ task.description }}</p>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-sm" @click="descriptionEditing = true">
            <svg style="width: 1.7em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="#F2F3F4"
                d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- Otherwise, load the textarea with the save button -->
      <!-- emit in actually saveComplete but Vue recommends using kebab-cased listener in the parent -->
      <DescriptionEdit :id="task.id" @save-complete="descriptionEditing = false" v-else />
    </div>
  </div>
</template>

<style scoped>
.title-container h1 {
  gap: 10px;
}

.edit-icon {
  padding: 0 10px;
}

input {
  width: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>


