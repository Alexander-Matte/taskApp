<script setup>
import { ref, computed } from "vue";

definePageMeta({
  middleware: "auth",
});

const supabase = useSupabaseClient();
const user = ref(null);
const error = ref(null);

const fetchUser = async () => {
  try {
    const { data, error: fetchError } = await supabase.auth.getUser();
    if (fetchError) {
      error.value = fetchError;
      user.value = null;
    } else {
      user.value = data.user;
    }
  } catch (e) {
    error.value = e;
  }
};

onMounted(async () => {
  await fetchUser();
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      user.value = session.user;
    } else if (event === "SIGNED_OUT") {
      user.value = null;
    }
  });
});

const categories = ref([]);
const isCategoryInputVisible = ref(false);
const taskTitle = ref("");
const newCategory = ref("");
const categoryError = ref(null);

async function handleSignOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error signing the user out!");
    return;
  }
}

// Create addTask function which add task to tasks
const addTask = async () => {
  if (taskTitle.value.trim() === "") return;

  const { data, error } = await useFetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ title: taskTitle.value }),
  });

  if (!data) {
    console.log("Error adding task!");
    return;
  }

  taskTitle.value = "";
};

const toggleCategoryInput = () => {
  isCategoryInputVisible.value = !isCategoryInputVisible.value;
};

const addCategory = () => {
  categoryError.value = "";
  if (newCategory.value.trim() !== "") {
    // Check if the category already exists
    const category = categories.value.find(
      (cat) => cat === newCategory.value.trim()
    );
    if (category) {
      categoryError.value = "Category with this name already exists.";
      newCategory.value = "";
      return;
    }
    categories.value.push(newCategory.value.trim());
    newCategory.value = "";
  } else {
    categoryError.value = "Category name cannot be empty.";
  }
};

const deleteCategory = (categoryToDelete) => {
  categories.value = categories.value.filter(
    (category) => category !== categoryToDelete
  );
};
</script>

<template>
  <div class="container" id="home-container">
    <div class="site-header">
      <div v-if="!user">
        <div class="alert alert-warning text-center" role="alert">
          Trial Mode: You are not signed in, therfore your Tasks will only be
          saved to local storage. To persist tasks to the Database, then please
          login or signup.
        </div>
      </div>
      <div class="site-header-container d-flex justify-content-end">
        <div>
          <p v-if="user">
            Hello {{ user.email }}
            <button @click="handleSignOut">Logout</button>
          </p>
          <p v-else>
            <NuxtLink to="/login"> Login | Register </NuxtLink>
          </p>
        </div>
      </div>
    </div>
    <div class="sidebar-header">
      <div class="d-flex flex-direction-column align-items-center">
        <div>Categories</div>
        <div @click="toggleCategoryInput">
          <i v-if="!isCategoryInputVisible" class="bi bi-plus"></i>
          <i v-else class="bi bi-dash"></i>
        </div>
      </div>

      <div v-if="isCategoryInputVisible" class="category-input">
        <input v-model="newCategory" type="text" placeholder="Add a category" />
        <div class="categoryError" v-if="categoryError">
          {{ categoryError }}
        </div>
        <button class="btn btn-primary" @click="addCategory">Add</button>
      </div>
    </div>
    <div class="sidebar-content">
      <ul v-if="categories" class="category-list list-group mt-3">
        <li
          v-for="category in categories"
          :key="category"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ category }}
          <button
            class="btn btn-danger btn-sm"
            @click="deleteCategory(category)"
          >
            <i class="bi bi-trash3"></i>
          </button>
        </li>
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
                v-model="taskTitle"
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
<style scoped>
.categoryError {
  color: red;
}
</style>