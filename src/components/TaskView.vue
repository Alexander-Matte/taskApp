<script setup>
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import { ref, computed, watchEffect, onBeforeUnmount } from 'vue'
import NavBar from './NavBar.vue'
import dayjs from 'dayjs'
import { useTaskStore } from '@/stores/TaskStore'
import { useSaveDescription } from '@/helpers'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const titleInput = ref(null)
watchEffect(() => {
  if (titleInput.value) {
    titleInput.value.focus()
  }
})

const store = useTaskStore()
const task = computed(() => {
  return store.getTaskById(props.id)
})
const taskTitle = ref(task.value.title)
const titleEditing = ref(false)
const descriptionEditing = computed(() => {
  return store.getDescriptionEditingStatus
})
const description = ref(task.value.description)
onBeforeUnmount(() => {
  store.setEditingStatus(false)
})

function saveTitle() {
  if (taskTitle.value === task.value.title || !taskTitle.value) {
    titleEditing.value = false
    if (taskTitle.value === task.value.title) {
      Toastify({
        text: 'No change to title detected',
        duration: 3000,
        newWindow: true,
        className: 'warning-msg',
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {} // Callback after click
      }).showToast()
    } else {
      Toastify({
        text: 'Title cannot be empty!',
        className: 'error-msg',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {} // Callback after click
      }).showToast()
      taskTitle.value = task.value.title
    }

    return
  } else {
    task.value.updated_at = dayjs().format('DD-MM-YYYY HH:mm:ss')
    titleEditing.value = false
    store.updateTaskTitle(task.value.id, taskTitle.value)
    Toastify({
      text: 'Title saved succcessfully!!',
      className: 'success-msg',
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function () {} // Callback after click
    }).showToast()
  }
}

function editTaskTitle() {
  titleEditing.value = true

  Toastify({
    text: 'Press enter to save!',
    className: 'info-msg',
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () {} // Callback after click
  }).showToast()
}
</script>
<template>
  <div class="container mt-5">
    <NavBar />
    <div v-if="task" class="task-details">
      <div class="tool-bar d-flex pt-2 justify-content-between">
        <div class="tool-bar-button">
          <button
            v-if="titleEditing"
            type="button"
            @click="saveTitle"
            class="btn cust-btn-outline-primary"
          >
            Save Title
            <i class="bi bi-floppy"></i>
          </button>
          <button v-else type="button" @click="editTaskTitle" class="btn cust-btn-outline-primary">
            Edit Title
            <i class="bi bi-pencil"></i>
          </button>
        </div>
        <div class="tool-bar-button">
          <button
            v-if="task.completed && !titleEditing"
            type="button"
            @click="store.toggleTaskCompleted(task.id)"
            class="btn cust-btn-outline-primary"
          >
            Mark task as incomplete
            <i class="bi bi-x-circle"></i>
          </button>
          <button
            v-else-if="!titleEditing"
            type="button"
            @click="store.toggleTaskCompleted(task.id)"
            class="btn cust-btn-outline-primary"
          >
            Mark task as completed
            <i class="bi bi-check2-circle"></i>
          </button>
        </div>
        <div class="tool-bar-button">
          <button
            v-if="descriptionEditing"
            type="button"
            @click="useSaveDescription(store, task.id, description)"
            class="btn cust-btn-outline-primary"
          >
            Save Description
            <i class="bi bi-floppy"></i>
          </button>
          <button
            v-else
            type="button"
            @click="store.setEditingStatus(true)"
            class="btn cust-btn-outline-primary"
          >
            Edit Description
            <i class="bi bi-pencil"></i>
          </button>
        </div>
      </div>
      <div class="title-container py-2">
        <h1
          :class="{ completed: task.completed }"
          class="d-flex justify-content-between"
          v-if="!titleEditing"
        >
          {{ task.title }}
        </h1>
        <input
          class="h1"
          ref="titleInput"
          v-if="titleEditing"
          v-model="taskTitle"
          @keyup.enter="saveTitle"
        />
      </div>

      <div class="task-details">
        <p>Published: {{ task.created_at }}</p>
        <p v-if="task.updated_at">Last Edited: {{ task.updated_at }}</p>
        <p v-else>Last Edited: Not edited yet</p>
        <hr />
        <h2>Description:</h2>
        <!-- If there is already description, then load the description with the editing button -->

        <div v-if="descriptionEditing === false">
          <p v-if="task.description">{{ task.description }}</p>
          <p v-else>Add a short description for your task at hand...</p>

          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-sm" @click="store.setEditingStatus(true)">
              <svg style="width: 1.7em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#F2F3F4"
                  d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div v-else class="decription-edit">
          <textarea
            v-model="description"
            name="description"
            id="taskDescription"
            cols="30"
            rows="10"
            placeholder="Add a short description for your task at hand..."
          ></textarea>
          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-sm"
              @click="useSaveDescription(store, task.id, description)"
            >
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
    <div v-else>This task does not exist</div>
  </div>
</template>

<style>
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

.info-msg,
.success-msg,
.warning-msg,
.error-msg {
  margin: 10px 0 !important;
  padding: 10px !important;
  border-radius: 3px 3px 3px 3px !important;
  background: none;
}
.info-msg {
  color: #0d6efd;
  border: 1px solid #0d6efd;
}
.success-msg {
  color: hsla(160, 100%, 37%, 1);
  border: 1px solid hsla(160, 100%, 37%, 1);
}
.warning-msg {
  color: #ffa500;
  border: 1px solid #ffa500;
}
.error-msg {
  color: #ff6347;
  border: 1px solid #ff6347;
}

.cust-btn-outline-primary {
  color: hsla(160, 100%, 37%, 1);
  border-color: hsla(160, 100%, 37%, 1);
}

.cust-btn-outline-primary:hover {
  color: white;
  background-color: hsla(160, 100%, 37%, 1);
  border-color: transparent;
}

textarea {
  width: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>
