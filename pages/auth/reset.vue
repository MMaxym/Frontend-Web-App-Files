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
    <div class="reset-box">
      <h2>Update Password</h2>
      <form @submit.prevent="submitPasswordUpdate">
        <input type="hidden" name="token" :value="token">

        <div v-if="status" class="success-message">{{ status }}</div>

        <label for="email">Email</label>
        <input
            v-model="form.email"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
        />
        <div v-if="errors.email" class="error-message">* {{ errors.email }}</div>

        <div v-if="formErrors.length" class="error-message">
          <p v-for="(error, index) in formErrors" :key="index">* {{ error }}</p>
        </div>

        <label for="password">New Password</label>
        <div class="password-wrapper">
          <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              name="password"
              placeholder="Enter new password"
              required
          />
          <button type="button" class="togglePassword" @click="togglePassword">
            <span class="material-icons">{{ showPassword ? 'visibility' : 'visibility_off' }}</span>
          </button>
        </div>
        <div v-if="errors.password" class="error-message">* {{ errors.password }}</div>

        <label for="password_confirmation">Confirm New Password</label>
        <div class="password-wrapper">
          <input
              v-model="form.password_confirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Confirm new password"
              required
          />
          <button type="button" class="togglePassword" @click="toggleConfirmPassword">
            <span class="material-icons">{{ showConfirmPassword ? 'visibility' : 'visibility_off' }}</span>
          </button>
        </div>
        <div v-if="errors.password_confirmation" class="error-message">* {{ errors.password_confirmation }}</div>

        <button type="submit" class="reset-btn">UPDATE PASSWORD</button>

        <div v-if="errors.general" class="error-message">{{ errors.general }}</div>
      </form>

      <p class="login-link">
        Remember your password? <router-link to="/auth/login">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '@/services/authService.js';

const router = useRouter();

const form = ref({
  email: '',
  password: '',
  password_confirmation: '',
});

const errors = ref({
  email: '',
  password: '',
  password_confirmation: '',
  token: ''
});

const formErrors = ref([]);
const status = ref('');
const token = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const submitPasswordUpdate = async () => {
  formErrors.value = [];
  errors.value = {};

  try {
    const response = await useAuth().resetPassword(
        form.value.email,
        form.value.password,
        form.value.password_confirmation,
        token.value
    );

    if (response.success) {
      status.value = response.message;
      alert(response.message);
      router.push('/login');
    }
    else {
      errors.value = { email: '', password: '', password_confirmation: '', token: '', general: '' };

      if (response.message) {
        const message = response.message;

        if (message.password) {
          errors.value.password = message.password.join(', *');
        }

        if (message.email) {
          errors.value.email = message.email.join(', *');
        }

        if (message.password_confirmation) {
          errors.value.password_confirmation = message.password_confirmation.join(', *');
        }

        if (message.token) {
          errors.value.general = "* Password reset failed";
        }

      } else {
        errors.value.general = response.message || '* Password reset failed';
      }
    }
  } catch (error) {
    formErrors.value.push(error.message || '* An unexpected error occurred.');
  }
};
</script>

<style scoped src="@/assets/styles/auth/reset.css"></style>