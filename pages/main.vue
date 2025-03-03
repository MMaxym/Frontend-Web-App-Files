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
    <div class="content">
      <div class="header">
        <div class="logo">
          <img src="/main-logo.svg" alt="Logo" class="main-logo" />
        </div>
        <div class="toolbar">
          <button class="btn-add" @click="addFile">
            <span class="icon-circle"><i class="fas fa-plus"></i></span> Add file
          </button>
          <button class="btn-else" @click="copyFileName">
            <i class="fas fa-copy"></i> Copy file name
          </button>
          <button class="btn-else" @click="deleteFile">
            <i class="fas fa-trash-alt"></i> Delete file
          </button>
        </div>
        <div class="account">
          <button id="user-icon" class="user-icon">
            <i class="fas fa-user-circle"></i>
          </button>
          <form class="logout-form">
            <button type="submit" class="logout-btn" id="logout-btn">
              <i class="fas fa-sign-out-alt logout"></i>
            </button>
          </form>
        </div>
      </div>



      <div class="main-content">
        <div class="sidebar">
          <button class="sidebar-btn" @click="generateDisposableLink">
            <i class="fas fa-link"></i> Generate disposable <span>link</span>
          </button>
          <button class="sidebar-btn" @click="generateMultipleLink">
            <i class="fas fa-link"></i> Generate multiple <span>link</span>
          </button>
          <div class="total-count">
            <span>Total Count Files</span>
<!--            <strong>{{ countFiles }}</strong>-->
            <strong>0</strong>
          </div>
        </div>

        <div class="second-content">
          <div class="stats">
            <div class="stat-box">
              <i class="far fa-eye stat-icon1"></i>
              <div class="card-content">
                <span class="stat-title">Total Views</span>
<!--                <span class="stat-value">{{ $totalViews }}</span>-->
                <span class="stat-value">0</span>
              </div>
            </div>
            <div class="stat-box">
              <i class="fas fa-file-alt stat-icon2"></i>
              <div class="card-content">
                <span class="stat-title">Count of existing files</span>
<!--                <span class="stat-value">{{ $existingFilesCount }}</span>-->
                <span class="stat-value">0</span>
              </div>
            </div>
            <div class="stat-box">
              <i class="fas fa-file-excel stat-icon3"></i>
              <div class="card-content">
                <span class="stat-title">Count of deleted files</span>
<!--                <span class="stat-value">{{ $deletedFilesCount }}</span>-->
                <span class="stat-value">0</span>
              </div>
            </div>
            <div class="stat-box">
              <i class="fas fa-link stat-icon4"></i>
              <div class="card-content">
                <span class="stat-title">Total of disposable links</span>
<!--                <span class="stat-value">{{ $totalDisposableLinks }} ({{ $usedDisposableLinks }} used)</span>-->
                <span class="stat-value">0 (0 used)</span>
              </div>
            </div>
          </div>

          <div class="file-list">
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Views</th>
                <th>Date <i class="fas fa-arrow-down"></i></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="file in files" :key="file.id" class="file-row">
                <td class="file-info">
                  <i class="far fa-file-alt file-icon"></i>
                  <div class="row-content">
                    <span class="file-name">{{ file.file_name }}</span>
                    <span class="file-desc">{{ file.comment }}</span>
                  </div>
                </td>
                <td>{{ file.views_count }}</td>
                <td>{{ file.expiration_date }}</td>
              </tr>
              <tr v-if="files.length === 0">
                <td colspan="3">No files found</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>






    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const files = ref([]);


const addFile = () => {
  alert("Open modal logic here");
};

const copyFileName = () => {
  alert("Copy file name logic here");
};

const deleteFile = () => {
  alert("Delete file logic here");
};

const generateDisposableLink = () => {
  alert("Generate disposable link");
};

const generateMultipleLink = () => {
  alert("Generate multiple link");
};



</script>

<style scoped src="@/assets/styles/main.css"></style>