<script setup>
</script>

<template>
  <div class="container mt-5">
    <h1>Task List</h1>
    <div class="row mb-3">
      <div class="col">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Add new task"
            aria-label="Add new task"
            aria-describedby="button-addon2"
          />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" id="button-addon2">Add Task</button>
          </div>
        </div>
      </div>
    </div>

    <div id="task-list">
      <!-- task Items -->
      <div class="task-item d-flex align-items-center d-flex align-items-center">
        <div class="task-status"></div>
        <div class="task-title">Task 1</div>
        <div class="ms-auto">
          <button type="button" class="btn btn-primary btn-sm mr-2">Edit</button>
          <button type="button" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>

      <div class="task-item d-flex align-items-center">
        <div class="task-status"></div>
        <div class="task-title">Task 2</div>
        <div class="ms-auto" iv>
          <button type="button" class="btn btn-primary btn-sm mr-2">Edit</button>
          <button type="button" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>

      <div class="task-item d-flex align-items-center">
        <div class="task-status"></div>
        <div class="task-title">Task 3</div>
        <div class="ms-auto">
          <button type="button" class="btn btn-primary btn-sm mr-2">Edit</button>
          <button type="button" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>

      <div class="task-item d-flex align-items-center">
        <div class="task-status"></div>
        <div class="task-title">Task 4</div>
        <div class="ms-auto">
          <button type="button" class="btn btn-primary btn-sm mr-2">Edit</button>
          <button type="button" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>

      <div class="task-item d-flex align-items-center">
        <div class="task-status"></div>
        <div class="task-title">Task 5</div>
        <div class="ms-auto">
          <button type="button" class="btn btn-primary btn-sm mr-2">Edit</button>
          <button type="button" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>
      <!-- End task Items -->
    </div>
  </div>
</template>
