<template>
  <div class="reset-password-container">
    <h2>Reset Password</h2>
    <form @submit.prevent="handleResetPassword">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="Enter your email"
        required
      />
      <button type="submit">Send Reset Email</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const error = ref("");
const success = ref("");

const handleResetPassword = async () => {};
</script>
