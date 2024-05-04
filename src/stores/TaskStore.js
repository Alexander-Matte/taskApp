import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])

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

  const getTaskById = computed(() => {
    return (taskId) => tasks.value.find((task) => task.id === taskId)
  })

  function addTask(task) {
    tasks.value.push(task)
  }

  function deleteTask(task) {
    const index = tasks.value.findIndex((t) => t.id === task.id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  return {
    addTask,
    deleteTask,
    fetchData,
    getTaskById,
    tasks
  }
})
