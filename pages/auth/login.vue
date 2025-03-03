<template>
  <title>Web files</title>
  <link rel="icon" href="/Logo.png"/>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

  <div class="container">
    <img class="icon" alt="Login Icon" src="/public/Login.png" />

    <div class="login-box">
      <h2>Log in with</h2>
      <form @submit.prevent="login">
        <label for="email">Email</label>
        <input v-model="form.email" type="email" id="email" placeholder="Enter email address" />
        <div v-if="errors.email" class="error-message">* {{ errors.email }}</div>

        <label for="password">
          Password
          <NuxtLink class="forgot" to="/auth/email">Forgot Password?</NuxtLink>
        </label>
        <div class="password-wrapper">
          <input v-model="form.password" :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter your password" />
          <button type="button" id="togglePassword" @click="togglePassword">
            <span class="material-icons">{{ showPassword ? 'visibility' : 'visibility_off' }}</span>
          </button>
        </div>
        <div v-if="errors.password" class="error-message">* {{ errors.password }}</div>

        <div class="divider">or</div>

        <div class="btn-google">
          <a href="#" class="google-btn-link">
            <img src="/public/Google.svg" alt="Google Icon" class="google-icon" />
            Google
          </a>
        </div>

        <button type="submit" class="login-btn">LOG IN</button>

        <div v-if="errors.general" class="error-message">{{ errors.general }}</div>
      </form>
      <p class="signup">Don’t have an account? <NuxtLink to="/auth/register">Sign up</NuxtLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '@/services/authService.js';

const router = useRouter();
const { loginUser } = useAuth();

const form = ref({
  email: '',
  password: '',
});

const errors = ref({
  email: '',
  password: '',
  general: '',
});

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const login = async () => {

  if (!form.value.email || !form.value.password) {
    if (!form.value.email) errors.value.email = 'Email is required.';
    if (!form.value.password) errors.value.password = 'Password is required.';
    return;
  }

  try {
    const response = await loginUser(form.value.email, form.value.password);

    if (response.success) {
      localStorage.clear();
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_id', response.user.id);
      localStorage.setItem('user_first_name', response.user.first_name);
      localStorage.setItem('user_last_name', response.user.last_name);
      localStorage.setItem('user_email', response.user.email);
      localStorage.setItem('user_phone', response.user.phone);

      router.push('/main');
      alert("Authenticated successfully.");
    }
    else {
      errors.value = { email: '', password: '', general: '' };
      if (response.errors) {
        for (const [field, message] of Object.entries(response.errors)) {
          if (errors.value.hasOwnProperty(field)) {
            errors.value[field] = message;
          } else {
            errors.value.general = message;
          }
        }
      } else {
        errors.value.general = response.message || 'Login failed';
      }
    }
  } catch (error) {
    errors.value.general = error.message || 'An unexpected error occurred.';
  }
};
</script>

<style scoped src="@/assets/styles/auth/login.css"></style>