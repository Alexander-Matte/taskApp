<template>
  <div class="update-password-container">
    <h2>Update Password</h2>
    <form @submit.prevent="handleUpdatePassword">
      <label for="password">New Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Enter your new password"
        required
      />
      <button type="submit">Update Password</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const password = ref("");
const error = ref("");
const success = ref("");

const query = useRoute().query;

const handleUpdatePassword = async () => {};
</script>

<style scoped>
/* Add styles as needed */
</style>
