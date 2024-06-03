<script setup>
import dayjs from "dayjs";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const store = useTaskStore();

const newTaskText = ref("");
const generateTaskId = () => {
  return uuidv4();
};
// Create addTask function which add task to tasks
function addTask() {
  if (!newTaskText.value) {
    return;
  }
  const newTask = {
    id: generateTaskId(),
    title: newTaskText.value,
    description: "",
    due_date: "",
    priority: "med",
    status: "incomplete",
    created_at: dayjs().format("DD-MM-YYYY HH:mm:ss"),
    updated_at: "",
  };
  store.addTask(newTask);
  newTaskText.value = "";
}
</script>

<template>
  <div class="container" id="home-container">
    <div class="sidebar-header">
      <div>Categories:</div>
    </div>
    <div class="sidebar-content">
      <ul>
        <li>Test1</li>
        <li>Test2</li>
        <li>Test3</li>
        <li>Test4</li>
      </ul>
    </div>
    <div class="body-header">
      <h1 class="text-center">Task List</h1>
    </div>
    <div class="body-content">
      <div class="row mb-3">
        <div class="col">
          <form @submit.prevent="addTask">
            <div class="input-group">
              <input
                v-model="newTaskText"
                type="text"
                class="form-control"
                placeholder="Add new task"
                aria-label="Add new task"
                aria-describedby="addTaskBtn"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit" id="addTaskBtn">
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <TaskList />
    </div>
    <div class="footer">
      <ul class="d-flex justify-content-between">
        <li>Footer Item 1</li>
        <li>Footer Item 2</li>
        <li>Footer Item 3</li>
      </ul>
    </div>
  </div>
</template>
