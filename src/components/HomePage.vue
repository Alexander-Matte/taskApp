<script setup>
import dayjs from 'dayjs'
import data from '@/data.json'
import { ref } from 'vue'
import TaskList from './TaskList.vue'
import { v4 as uuidv4 } from 'uuid'
const tasks = ref(data.tasks)
const newTaskText = ref('')

const generateTaskId = () => {
  return uuidv4()
}
// Create addTask function which add task to tasks
function addTask() {
  if (!newTaskText.value) {
    return
  }
  const taskObj = {
    id: generateTaskId(),
    title: newTaskText.value,
    description: '',
    due_date: '',
    priority: 'med',
    status: 'incomplete',
    created_at: dayjs().format('DD-MM-YYYY HH:mm:ss'),
    updated_at: '',
    user: {
      id: 1234,
      name: 'John Doe',
      email: 'john.doe@example.com'
    }
  }
  tasks.value.push(taskObj)
  newTaskText.value = ''
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Task List</h1>
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
              <button class="btn btn-primary" type="submit" id="addTaskBtn">Add Task</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <TaskList :tasks="tasks" />
  </div>
</template>
