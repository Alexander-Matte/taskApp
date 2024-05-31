import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = reactive([]);
  const descriptionEditingStatus = ref(false);

  async function fetchTasks() {
    try {
      const { data } = await useFetch("/api/tasks");
      if (!data.value) {
        console.log("An error occured fetching the tasks");
        return;
      }
      tasks.splice(0, tasks.length, ...data.value);
    } catch (error) {
      console.log(error);
    }
  }

  async function addTask(task) {
    try {
      const response = await $fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      });
      if (!response) {
        console.log("ERROR OCCURED DELETING TASK");
        return;
      }
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTaskDescription(taskId, newDescription) {
    const task = getTaskById(taskId);
    try {
      const response = await $fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({
          task: task,
          action: "updateTaskDescription",
          params: { description: newDescription },
        }),
      });
      if (!response) {
        console.log("ERROR OCCURED DELETING TASK");
        return;
      }
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTaskTitle(taskId, newTitle) {
    const task = getTaskById(taskId);
    try {
      const response = await $fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({
          task: task,
          action: "updateTaskTitle",
          params: { title: newTitle },
        }),
      });

      if (!response) {
        console.log("ERROR OCCURED DELETING TASK");
        return;
      }
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleTaskCompleted(taskId) {
    const task = getTaskById(taskId);
    try {
      const response = await $fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ task: task, action: "toggleTaskCompleted" }),
      });
      if (!response) {
        console.log("ERROR OCCURED DELETING TASK");
        return;
      }
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(taskId) {
    const task = getTaskById(taskId);
    try {
      const response = await $fetch("/api/tasks", {
        method: "DELETE",
        body: JSON.stringify(task),
      });
      if (!response) {
        console.log("ERROR OCCURED DELETING TASK");
        return;
      }
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  const getDescriptionEditingStatus = computed(() => {
    return descriptionEditingStatus.value;
  });

  function getTaskById(taskId) {
    return tasks.find((task) => task.id === taskId);
  }

  function setEditingStatus(status) {
    descriptionEditingStatus.value = status;
  }

  return {
    tasks,
    fetchTasks,
    addTask,
    deleteTask,
    getDescriptionEditingStatus,
    toggleTaskCompleted,
    updateTaskDescription,
    updateTaskTitle,
    setEditingStatus,
    getTaskById,
  };
});
