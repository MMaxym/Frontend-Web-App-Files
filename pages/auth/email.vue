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
    <img class="icon" alt="Login Icon" src="/public/Email.png" />
    <div class="login-box">
      <h2>Password Reset</h2>

      <form @submit.prevent="sendPasswordResetLink">
        <div v-if="status" class="success-message">{{ status }}</div>

        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter email address"
            required
        />
        <div v-if="emailError" class="error-message">* {{ emailError }}</div>

        <div v-if="errors.length" class="error-message">
          <p v-for="(error, index) in errors" :key="index">* {{ error }}</p>
        </div>

        <button type="submit" class="reset-btn">SEND PASSWORD RESET LINK</button>

        <div class="signup">
          <p>Remember your password? <router-link to="/auth/login">Log In</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '@/services/authService.js';
const router = useRouter();

const email = ref('');
const status = ref(null);
const emailError = ref(null);
const errors = ref([]);

const sendPasswordResetLink = async () => {
  errors.value = [];
  emailError.value = null;

  if (!email.value) {
    emailError.value = '* Email is required.';
    return;
  }

  try {
    const response = await useAuth().sendPasswordResetLink(email.value);

    if (response.success) {
      alert(response.message);
      router.push('/auth/login');
    }
    else {
      errors.value = { email: '', general: '' };

      if (response.errors) {
        for (const [field, messages] of Object.entries(response.errors)) {
          if (Array.isArray(messages)) {
            errors.value[field] = messages.join(', ');
          }
          else {
            errors.value[field] = messages;
          }
        }
      } else {
        errors.value.general = response.message || '* Password reset failed';
      }

      if (response.message) {
        emailError.value = response.message;
      }
    }
  } catch (error) {
    errors.value.push(error.message || '* An unexpected error occurred.');
  }
};
</script>

<style scoped src="@/assets/styles/auth/email.css"></style>