<script setup>
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { ref, computed, watchEffect, onBeforeUnmount } from "vue";
import dayjs from "dayjs";

/* Start Task Store and fetch task  */
const { id } = useRoute().params;
const store = await useTaskStore();
await store.fetchTasks();
const task = computed(() => {
  return store.getTaskById(id);
});

/* Variable initializations  */
const taskTitle = ref(task.value.title);
const titleEditing = ref(false);
const titleInput = ref(null);
const description = ref(task.value.description);
const descriptionEditing = computed(() => {
  return store.getDescriptionEditingStatus;
});

/* Watchers and Lifecycle hooks */
watchEffect(() => {
  if (titleInput.value) {
    titleInput.value.focus();
  }
});

onBeforeUnmount(() => {
  store.setEditingStatus(false);
});

/* Begin function declarations */
function saveTitle() {
  if (taskTitle.value === task.value.title || !taskTitle.value) {
    titleEditing.value = false;
    if (taskTitle.value === task.value.title) {
      Toastify({
        text: "No change to title detected",
        duration: 3000,
        newWindow: true,
        className: "",
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {}, // Callback after click
      }).showToast();
    } else {
      Toastify({
        text: "Title cannot be empty!",
        className: "",
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
    titleEditing.value = false;
    store.updateTaskTitle(task.value.id, taskTitle.value, generateTimeStamp());
    Toastify({
      text: "Title saved succcessfully!!",
      className: "",
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

function generateTimeStamp() {
  return dayjs().format("DD-MM-YYYY HH:mm:ss");
}

function editTaskTitle() {
  titleEditing.value = true;

  Toastify({
    text: "Press enter to save!",
    className: "",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () {}, // Callback after click
  }).showToast();
}
function handleDescriptionSave(id, desc) {
  store.updateTaskDescription(id, desc, generateTimeStamp());
  store.setEditingStatus(false);
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
            class="btn"
          >
            Save Title
            <BootstrapIcon name="bi bi-floppy"></BootstrapIcon>
          </button>
          <button v-else type="button" @click="editTaskTitle" class="btn">
            Edit Title
            <BootstrapIcon name="bi bi-pencil"></BootstrapIcon>
          </button>
        </div>
        <div class="tool-bar-button">
          <button
            v-if="task.completed && !titleEditing"
            type="button"
            @click="store.toggleTaskCompleted(task.id)"
            class="btn"
          >
            Mark task as incomplete
            <BootstrapIcon name="bi bi-x-circle"></BootstrapIcon>
          </button>
          <button
            v-else-if="!titleEditing"
            type="button"
            @click="store.toggleTaskCompleted(task.id)"
            class="btn"
          >
            Mark task as completed
            <BootstrapIcon name="bi bi-check2-circle"></BootstrapIcon>
          </button>
        </div>
        <div class="tool-bar-button">
          <button
            v-if="descriptionEditing"
            type="button"
            @click="handleDescriptionSave(task.id, description)"
            class="btn"
          >
            Save Description
            <BootstrapIcon name="bi bi-floppy"></BootstrapIcon>
          </button>
          <button
            v-else
            type="button"
            @click="store.setEditingStatus(true)"
            class="btn"
          >
            Edit Description
            <BootstrapIcon name="bi bi-pencil"></BootstrapIcon>
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
            <button
              type="button"
              class="btn btn-sm"
              @click="store.setEditingStatus(true)"
            >
              <BootstrapIcon name="bi bi-pencil"></BootstrapIcon>
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
              @click="handleDescriptionSave(task.id, description)"
            >
              <BootstrapIcon name="bi bi-floppy"></BootstrapIcon>
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

i {
  font-size: 1.5em;
}

.edit-icon {
  padding: 0 10px;
}

input {
  width: 100%;
}

textarea {
  width: 100%;
}
</style>
