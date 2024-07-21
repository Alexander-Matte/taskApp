<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="Enter your email"
        required
      />
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Enter your password"
        required
      />
      <button type="submit">Login</button>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p>Don't have an account? <NuxtLink to="/signup">Signup</NuxtLink></p>
      <p><NuxtLink to="/reset-password">Forgot Password?</NuxtLink></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  middleware: "auth",
});

const router = useRouter();
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const errorMsg = ref("");

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorMsg.value = error.message;
  } else {
    router.push("/");
  }
};
</script>

<style scoped>
</style>
