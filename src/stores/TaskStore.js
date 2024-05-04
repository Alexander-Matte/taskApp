import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const descriptionEditingStatus = ref(false)

  async function fetchData() {
    try {
      const response = await fetch('/src/data.json')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      tasks.value = data.tasks
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const getDescriptionEditingStatus = computed(() => {
    return descriptionEditingStatus.value
  })

  function getTaskById(taskId) {
    return tasks.value.find((task) => task.id === taskId)
  }

  function addTask(task) {
    tasks.value.push(task)
    saveState()
  }

  function updateTaskDescription(taskId, newDescription) {
    const taskIndex = tasks.value.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      const updatedTask = { ...tasks.value[taskIndex], description: newDescription }
      tasks.value.splice(taskIndex, 1, updatedTask)
      saveState()
    }
  }

  function setEditingStatus(status) {
    descriptionEditingStatus.value = status
  }

  function deleteTask(task) {
    const index = tasks.value.findIndex((t) => t.id === task.id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
      saveState()
    }
  }

  function saveState() {
    localStorage.setItem('taskStore', JSON.stringify(tasks.value))
  }

  function restoreState() {
    const storedTasks = localStorage.getItem('taskStore')
    if (storedTasks) {
      tasks.value = JSON.parse(storedTasks)
    }
  }

  // Call restoreState on application initialization
  fetchData()
  restoreState()

  return {
    addTask,
    deleteTask,
    fetchData,
    getDescriptionEditingStatus,
    updateTaskDescription,
    setEditingStatus,
    getTaskById,
    tasks
  }
})
