<script setup>
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { ref, computed, watchEffect, onBeforeUnmount } from "vue";
import NavBar from "./NavBar.vue";
import dayjs from "dayjs";
import { useTaskStore } from "@/stores/TaskStore";
import { useSaveDescription } from "@/helpers";
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const titleInput = ref(null);
watchEffect(() => {
  if (titleInput.value) {
    titleInput.value.focus();
  }
});

const store = useTaskStore();
const task = computed(() => {
  return store.getTaskById(props.id);
});
const taskTitle = ref(task.value.title);
const titleEditing = ref(false);
const descriptionEditing = computed(() => {
  return store.getDescriptionEditingStatus;
});
const description = ref(task.value.description);
onBeforeUnmount(() => {
  store.setEditingStatus(false);
});

function saveTitle() {
  if (taskTitle.value === task.value.title || !taskTitle.value) {
    titleEditing.value = false;
    if (taskTitle.value === task.value.title) {
      Toastify({
        text: "No change to title detected",
        duration: 3000,
        newWindow: true,
        className: "warning-msg",
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {}, // Callback after click
      }).showToast();
    } else {
      Toastify({
        text: "Title cannot be empty!",
        className: "error-msg",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {}, // Callback after click
      }).showToast();
      taskTitle.value = task.value.title;
    }

    return;
  } else {
    task.value.updated_at = dayjs().format("DD-MM-YYYY HH:mm:ss");
    titleEditing.value = false;
    store.updateTaskTitle(task.value.id, taskTitle.value);
    Toastify({
      text: "Title saved succcessfully!!",
      className: "success-msg",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function () {}, // Callback after click
    }).showToast();
  }
}

function editTaskTitle() {
  titleEditing.value = true;

  Toastify({
    text: "Press enter to save!",
    className: "info-msg",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () {}, // Callback after click
  }).showToast();
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
          <button
            v-else
            type="button"
            @click="editTaskTitle"
            class="btn cust-btn-outline-primary"
          >
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

      <div class="task-detail">
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
            <button
              type="button"
              class="btn"
              @click="store.setEditingStatus(true)"
            >
              <i class="bi bi-pencil"></i>
            </button>
          </div>
        </div>

        <div v-else class="decription-edit">
          <textarea
            v-model="description"
            name="description"
            id="taskDescription"
            cols="30"
            rows="5"
            placeholder="Add a short description for your task at hand..."
          ></textarea>
          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn"
              @click="useSaveDescription(store, task.id, description)"
            >
              <i class="bi bi-floppy"></i>
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

.task-detail .bi {
  font-size: 1.5em;
  color: white;
}
</style>
