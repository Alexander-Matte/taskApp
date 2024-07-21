<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const supabase = useSupabaseClient();
const tasks = ref([]);

// Function to fetch tasks initially
async function fetchTasks() {
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    console.error("Error fetching tasks:", error);
    return;
  }

  tasks.value = data;
}

onMounted(async () => {
  await fetchTasks(); // Initial fetch

  // Re-fetch tasks when authentication state changes
  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      await fetchTasks();
    } else if (event === "SIGNED_OUT") {
      tasks.value = [];
    }
  });

  // Set up real-time updates
  handleRealtimeUpdates();
});

// Function to handle real-time updates
function handleRealtimeUpdates() {
  const subscription = supabase
    .channel("tasks")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "tasks" },
      (payload) => {
        console.log("Change received!", payload);
        handlePayload(payload);
      }
    )
    .subscribe();

  // Clean up subscription on component unmount
  onUnmounted(() => {
    supabase.removeSubscription(subscription);
  });
}

// Function to handle and apply payload updates
function handlePayload(payload) {
  const { eventType, new: newTask, old: oldTask } = payload;

  switch (eventType) {
    case "INSERT":
      // Add new task
      tasks.value.push(newTask);
      break;
    case "UPDATE":
      // Update existing task
      const index = tasks.value.findIndex((task) => task.id === newTask.id);
      if (index !== -1) {
        tasks.value[index] = newTask;
      }
      break;
    case "DELETE":
      // Remove task
      tasks.value = tasks.value.filter((task) => task.id !== oldTask.id);
      break;
    default:
      console.log("Unhandled event type:", eventType);
  }
}

function findById(id) {
  return tasks.value.find((task) => task.id === id) || null;
}

async function toggleCompleted(task) {
  const { data } = await useFetch("/api/tasks", {
    method: "PATCH",
    body: JSON.stringify({ completed: task.completed, id: task.id }),
  });

  if (!data) {
    console.log("Error toggling completed!");
    console.log(error);
    return;
  }
}
</script>

<template>
  <ClientOnly>
    <div v-if="tasks.length" id="task-list">
      <div v-for="task in tasks" :key="task.id" class="card mb-3">
        <div class="card-body task-item d-flex align-items-center">
          <div class="task-status">
            <div v-if="task.completed" @click="toggleCompleted(task)">
              <svg
                style="width: 1.7em"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                />
              </svg>
            </div>
            <div v-else @click="toggleCompleted(task)">
              <svg
                style="width: 1.7em"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                />
              </svg>
            </div>
          </div>
          <div
            class="task-title mx-3 green"
            :class="{ completed: task.completed }"
            @click="toggleCompleted(task)"
          >
            {{ task.title }}
          </div>
          <div class="ms-auto">
            <button type="button" class="btn btn-sm">
              <NuxtLink :to="`task/${task.id}`">Edit</NuxtLink>
            </button>

            <button type="button" class="btn btn-sm">
              <svg
                style="width: 1.7em"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center" v-else>No tasks available, time to relax!</div>
  </ClientOnly>
</template>

<style>
.completed {
  text-decoration: line-through;
}

.task-item:hover {
  cursor: pointer;
}

.task-title {
  user-select: none;
}
</style>
