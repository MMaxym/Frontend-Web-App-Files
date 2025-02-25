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
    <img class="icon" alt="Register Icon" src="/public/Register.png" />

    <div class="register-box">
      <h2>Registration</h2>
      <form @submit.prevent="submitForm">
        <label for="email">Email</label>
        <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="Enter email address"
            :class="{'is-invalid': errors.email}"
        />
        <div v-if="errors.email" class="error-message">* {{ errors.email }}</div>

        <label for="password">Password</label>
        <div class="password-wrapper">
          <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
          />
          <button type="button" class="togglePassword" @click="togglePassword">
            <span class="material-icons">{{ showPassword ? 'visibility' : 'visibility_off' }}</span>
          </button>
        </div>
        <div v-if="errors.password" class="error-message">* {{ errors.password }}</div>

        <label for="confirm-password">Confirm Password</label>
        <div class="password-wrapper">
          <input
              v-model="form.password_confirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirm-password"
              placeholder="Confirm your password"
          />
          <button type="button" class="togglePassword" @click="toggleConfirmPassword">
            <span class="material-icons">{{ showConfirmPassword ? 'visibility' : 'visibility_off' }}</span>
          </button>
        </div>
        <div v-if="errors.password_confirmation" class="error-message">* {{ errors.password_confirmation }}</div>

        <label for="first-name">First Name</label>
        <input
            v-model="form.first_name"
            type="text"
            id="first-name"
            placeholder="Enter first name"
        />
        <div v-if="errors.first_name" class="error-message">* {{ errors.first_name }}</div>

        <label for="last-name">Last Name</label>
        <input
            v-model="form.last_name"
            type="text"
            id="last-name"
            placeholder="Enter last name"
        />
        <div v-if="errors.last_name" class="error-message">* {{ errors.last_name }}</div>

        <label for="phone">Phone Number</label>
        <input
            v-model="form.phone"
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            @input="validatePhoneNumber"
        />
        <div v-if="errors.phone" class="error-message">* {{ errors.phone }}</div>

        <button type="submit" class="register-btn" @click="register">SIGN UP</button>
      </form>

      <p class="login-link">Already have an account? <NuxtLink to="/auth/login">Log in</NuxtLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '@/services/authService.js';

const router = useRouter();
const { registerUser } = useAuth();

const form = ref({
  email: '',
  password: '',
  password_confirmation: '',
  first_name: '',
  last_name: '',
  phone: ''
});

const errors = ref({
  email: '',
  password: '',
  password_confirmation: '',
  first_name: '',
  last_name: '',
  phone: '',
  general: ''
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const validatePhoneNumber = (e) => {
  let value = e.target.value;

  value = value.replace(/[^0-9+]/g, '');
  if (value.indexOf('+') > 0) {
    value = value.substring(0, value.indexOf('+') + 1) + value.replace(/[^0-9]/g, '');
  }
  if (value.length > 13) {
    value = value.substring(0, 13);
  }
  e.target.value = value;
  form.value.phone = value;
};

const register = async () => {

  errors.value = {
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    phone: '',
    general: ''
  };

  if (!form.value.email || !form.value.password || !form.value.password_confirmation || !form.value.first_name || !form.value.last_name || !form.value.phone) {
    if (!form.value.email) errors.value.email = 'Email is required.';
    if (!form.value.password) errors.value.password = 'Password is required.';
    if (!form.value.password_confirmation) errors.value.password_confirmation = 'Password confirmation is required.';
    if (!form.value.first_name) errors.value.first_name = 'First name is required.';
    if (!form.value.last_name) errors.value.last_name = 'Last name is required.';
    if (!form.value.phone) errors.value.phone = 'Phone number is required.';
    return;
  }

  try {
    const response = await registerUser(
        form.value.first_name,
        form.value.last_name,
        form.value.email,
        form.value.password,
        form.value.password_confirmation,
        form.value.phone
    );

    if (response.success) {
      router.push('/auth/login');
      alert("Registered successfully.");
    }
    else {
      errors.value = { email: '', password: '', password_confirmation: '', first_name: '', last_name: '', phone: '', general: '' };
      if (response.errors) {
        for (const [field, messages] of Object.entries(response.errors)) {
          if (Array.isArray(messages)) {
            errors.value[field] = messages.join(', ');
          } else {
            errors.value[field] = messages;
          }
        }
      } else {
        errors.value.general = response.message || 'Registration failed';
      }
    }
  } catch (error) {
    errors.value.general = error.message || 'An unexpected error occurred.';
  }
};
</script>

<style scoped src="@/assets/styles/auth/register.css"></style>