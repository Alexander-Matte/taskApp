<script setup>
import dayjs from "dayjs";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const store = useTaskStore();
const categories = ref([]);
const isCategoryInputVisible = ref(false);
const newTaskText = ref("");
const newCategory = ref("");
const categoryError = ref(null);
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
    description: null,
    due_date: null,
    priority: "med",
    status: "incomplete",
    created_at: dayjs().format("DD-MM-YYYY HH:mm:ss"),
    updated_at: null,
  };
  store.addTask(newTask);
  newTaskText.value = "";
}

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
      <ul v-if="categories.length" class="category-list list-group mt-3">
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
<style scoped>
.categoryError {
  color: red;
}
</style>