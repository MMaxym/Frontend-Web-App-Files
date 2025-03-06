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
          <button class="btn-else" @click="deleteFileById">
            <i class="fas fa-trash-alt"></i> Delete file
          </button>
        </div>
        <div class="account">
          <button id="user-icon" class="user-icon">
            <i class="fas fa-user-circle"></i>
          </button>
          <form class="logout-form" @submit.prevent="handleLogout">
            <button type="submit" class="logout-btn" id="logout-btn">
              <i class="fas fa-sign-out-alt logout"></i>
            </button>
          </form>
        </div>
      </div>

      <div id="dropdown" class="dropdown-content" ref="dropdownRef">
        <div class="account-information">
          <i class="fas fa-address-card"></i>
          Personal Information
        </div>
        <div class="user-info">
          <p class="user-name">{{ user.first_name }} {{ user.last_name }}</p>
          <p class="user-email">{{ user.email }}</p>
          <p class="user-phone">{{ user.phone }}</p>
        </div>
        <button class="btn-edit" id="editButton"  @click="openEditModal">
          <i class="fas fa-pencil-alt"></i>
          Edit
        </button>
      </div>


      <div id="editModal" class="modal">
        <div class="m-content">
          <div class="modal-header">
            <h2>Edit Personal Information</h2>
            <span class="modalClose" id="closeEditModal" @click="closeEditModal">
          <i class="fas fa-times"></i>
        </span>
          </div>
          <div class="modal-description">You can edit your personal information and save it</div>
          <div class="modal-body">
            <form @submit="editUser" class="form-edit">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" name="first_name" v-model="user.first_name">
              <div v-if="errors.first_name" class="error-message">* {{ errors.first_name }}</div>

              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" name="last_name" v-model="user.last_name">
              <div v-if="errors.last_name" class="error-message">* {{ errors.last_name }}</div>

              <label for="email">Email</label>
              <input type="email" id="email" name="email" v-model="user.email">
              <div v-if="errors.email" class="error-message">* {{ errors.email }}</div>

              <label for="phone">Phone</label>
              <input type="tel" id="phone" name="phone" v-model="user.phone">
              <div v-if="errors.phone" class="error-message">* {{ errors.phone }}</div>

              <button type="submit" class="save-btn">SAVE CHANGES</button>

              <div v-if="errors.general" class="error-message">{{ errors.general }}</div>

            </form>
          </div>
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
            <strong>{{ countFiles }}</strong>
          </div>
        </div>

        <div class="second-content">
          <div class="stats">
            <div class="stat-box">
              <i class="far fa-eye stat-icon1"></i>
              <div class="card-content">
                <span class="stat-title">Total Views</span>
                <span class="stat-value">{{ totalViews }}</span>
              </div>
            </div>
            <div class="stat-box">
              <i class="fas fa-file-alt stat-icon2"></i>
              <div class="card-content">
                <span class="stat-title">Count of existing files</span>
                <span class="stat-value">{{ existingFilesCount }}</span>
              </div>
            </div>
            <div class="stat-box">
              <i class="fas fa-file-excel stat-icon3"></i>
              <div class="card-content">
                <span class="stat-title">Count of deleted files</span>
                <span class="stat-value">{{ deletedFilesCount }}</span>
              </div>
            </div>
            <div class="stat-box">
              <i class="fas fa-link stat-icon4"></i>
              <div class="card-content">
                <span class="stat-title">Total of disposable links</span>
                <span class="stat-value">{{ totalDisposableLinks }} ({{ usedDisposableLinks }} used)</span>
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
              <tr
                  v-for="file in files"
                  :key="file.id"
                  :class="{'selected': selectedFile === file.id}"
                  @click="highlightRow(file.id, file.file_name)"
                  @mouseenter="showTooltip($event, 'Double-click to see file details')"
                  @mouseleave="hideTooltip"
                  @dblclick="openFileModal(file)"
              >
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
            <div id="tooltip" class="custom-tooltip" :style="tooltipStyle">{{ tooltipText }}</div>
          </div>

          <div id="fileModal" class="modal">
            <div class="m-content-link">
              <div class="modal-header-link">
                <h2>File Information</h2>
                <span class="modalClose" @click="closeFileModal">
                  <i class="fas fa-times"></i>
                </span>
              </div>
              <div class="modal-description-link">Detailed information about the selected file</div>
              <div class="modal-body-link-file">
                <div class="link-section-name">
                  <i class="far fa-file-alt file-icon"></i>
                  <span id="fileName">{{ selectedFileInfo.file_name }}</span>
                </div>
                <div class="link-section">
                  <label for="fileDescription">Comment:</label>
                  <span id="fileDescription">{{ selectedFileInfo.comment || 'No Comment' }}</span>
                </div>
                <div class="link-section">
                  <label for="fileExpirationDate">Expiration Date:</label>
                  <span id="fileExpirationDate">
                    {{ selectedFileInfo.expiration_date === '-' ? 'No date expiration' : selectedFileInfo.expiration_date }}
                  </span>
                </div>
                <div class="link-section">
                  <label for="fileViews">Views:</label>
                  <span id="fileViews">{{ selectedFileInfo.views_count || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: ['auth']
});

import { useRouter } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';
import { useCookie } from '#app';
import useAuthService from '@/services/authService.js';
import useFileService from '@/services/fileService.js';
import useFileLinkService from '@/services/fileLinkService.js';
import useUserService from '@/services/userService';

const router = useRouter();
const files = ref([]);
const countFiles = ref(0);
const totalViews = ref(0);
const existingFilesCount = ref(0);
const deletedFilesCount = ref(0);
const totalDisposableLinks = ref(0);
const usedDisposableLinks = ref(0);

const selectedFile = ref(null);
const selectedFileName = ref("");
const tooltipText = ref('');
const tooltipStyle = ref({
  top: '0px',
  left: '0px',
});

const selectedFileInfo = ref({});

let dropdown = null;
let userIcon = null;


const {
  logoutUser
} = useAuthService();

const {
  updateUser
} = useUserService();

const {
  getUserFiles,
  getUserFilesTotalCount,
  getUserFilesTotalViews,
  getUserFilesExisting,
  getUserFilesDeleted,
  deleteFile
} = useFileService();

const {
  getUserFileLinksDisposable,
  getUserFileLinksUsedDisposable
} = useFileLinkService();


const user = ref({
  first_name: localStorage.getItem('user_first_name'),
  last_name: localStorage.getItem('user_last_name'),
  email: localStorage.getItem('user_email'),
  phone: localStorage.getItem('user_phone')
});

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
});

const errors = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  general: '',
});



const loadUserFiles = async () => {
  const response = await getUserFiles();
  if (response.success) {
    files.value = response.files;
    sessionStorage.setItem('userFiles', JSON.stringify(response.files));
  } else {
    const storedFiles = sessionStorage.getItem('userFiles');
    if (storedFiles) {
      files.value = JSON.parse(storedFiles);
    }
  }
};

const loadUserFilesTotalCount = async () => {
  const countFilesResponse = await getUserFilesTotalCount();
  if (countFilesResponse.success) {
    countFiles.value = countFilesResponse.files_count;
  } else {
    console.error('Failed to fetch files count:', countFilesResponse.message);
  }
};

const loadUserFilesTotalViews = async () => {
  const countViewsResponse = await getUserFilesTotalViews();
  if (countViewsResponse.success) {
    totalViews.value = countViewsResponse.total_views;
  } else {
    console.error('Failed to fetch views count:', countViewsResponse.message);
  }
};

const loadUserFilesExisting = async () => {
  const countExistingFilesResponse = await getUserFilesExisting();
  if (countExistingFilesResponse.success) {
    existingFilesCount.value = countExistingFilesResponse.existing_files_count;
  } else {
    console.error('Failed to fetch existing files count:', countExistingFilesResponse.message);
  }
};

const loadUserFilesDeleted = async () => {
  const countDeletedFilesResponse = await getUserFilesDeleted();
  if (countDeletedFilesResponse.success) {
    deletedFilesCount.value = countDeletedFilesResponse.deleted_files_count;
  } else {
    console.error('Failed to fetch deleted files count:', countDeletedFilesResponse.message);
  }
};

const loadUserFileLinksDisposable = async () => {
  const countDisposableFileLinksResponse = await getUserFileLinksDisposable();
  if (countDisposableFileLinksResponse.success) {
    totalDisposableLinks.value = countDisposableFileLinksResponse.disposable_links_count;
  } else {
    console.error('Failed to fetch disposable file links count:', countDisposableFileLinksResponse.message);
  }
};

const loadUserFileLinksUsedDisposable = async () => {
  const countUsedDisposableFileLinksResponse = await getUserFileLinksUsedDisposable();
  if (countUsedDisposableFileLinksResponse.success) {
    usedDisposableLinks.value = countUsedDisposableFileLinksResponse.used_disposable_links_count;
  } else {
    console.error('Failed to fetch used disposable file links count:', countUsedDisposableFileLinksResponse.message);
  }
};



const showDropdown = () => {
  if (dropdown) dropdown.style.display = "block";
};

const toggleDropdown = (event) => {
  event.stopPropagation();
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }
};

const hideDropdown = () => {
  if (dropdown) dropdown.style.display = "none";
};

onUnmounted(() => {
  if (userIcon && dropdown) {
    userIcon.removeEventListener("mouseenter", showDropdown);
    userIcon.removeEventListener("click", toggleDropdown);
    dropdown.removeEventListener("mouseleave", hideDropdown);
    document.removeEventListener("click", handleClickOutside);
  }
});

const openEditModal = () => {
  const modal = document.getElementById('editModal');
  if (modal) {
    modal.style.display = 'flex';
  }
};

const closeEditModal = () => {
  const modal = document.getElementById('editModal');
  if (modal) {
    modal.style.display = 'none';
  }
  errors.value = { first_name: '', last_name: '', email: '', phone: '', general: '' };
};

const editUser = async (event) => {
  event.preventDefault();

  errors.value = { first_name: '', last_name: '', email: '', phone: '', general: '' };

  if (!user.value.first_name) errors.value.first_name = 'First name is required.';
  if (!user.value.last_name) errors.value.last_name = 'Last name is required.';
  if (!user.value.email) errors.value.email = 'Email is required.';
  if (!user.value.phone) errors.value.phone = 'Phone is required.';

  if (Object.values(errors.value).some((err) => err)) {
    return;
  }

  try {
    const response = await updateUser(user.value);

    if (response.success) {
      localStorage.setItem('user_first_name', response.user.first_name);
      localStorage.setItem('user_last_name', response.user.last_name);
      localStorage.setItem('user_email', response.user.email);
      localStorage.setItem('user_phone', response.user.phone);

      alert(response.message);
      closeEditModal();
    } else {
      errors.value = { first_name: '', last_name: '', email: '', phone: '', general: '' };
      if (response.errors) {
        for (const [field, message] of Object.entries(response.errors)) {
          if (errors.value.hasOwnProperty(field)) {
            errors.value[field] = message[0];
          } else {
            errors.value.general = message[0];
          }
        }
      } else {
        errors.value.general = response.message || 'Update failed';
      }
    }
  } catch (error) {
    errors.value.general = error.message || 'An unexpected error occurred.';
  }
};

const handleLogout = async () => {
  const isConfirmed = window.confirm('Are you sure you want to log out?');

  if (isConfirmed) {
    const response = await logoutUser();

    if (response.success) {
      useCookie('auth_token').value = null;

      router.push('/auth/login');
      alert(response.message);
    }
    else {
      console.error(response.message);
    }
  }
};

const openFileModal = (file) => {
  selectedFileInfo.value = {
    file_name: file.file_name,
    comment: file.comment,
    expiration_date: file.expiration_date,
    views_count: file.views_count,
  };

  const modal = document.getElementById('fileModal');

  if (modal) {
    modal.style.display = 'flex';
  }
};

const closeFileModal = () => {
  const modal = document.getElementById('fileModal');
  if (modal) {
    modal.style.display = 'none';
  }
};

const showTooltip = (event, text) => {
  tooltipText.value = text;
  const tooltip = document.getElementById("tooltip");
  if (tooltip) {
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = 1;

    tooltipStyle.value = {
      top: `${event.clientY + 15}px`,
      left: `${event.clientX + 15}px`,
    };
  }

  setTimeout(() => {
    hideTooltip();
  }, 1000);
};

const hideTooltip = () => {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) {
    tooltip.style.opacity = 0;
  }
};

const highlightRow = (fileId, fileName) => {
  if (selectedFile.value === fileId) {
    selectedFile.value = null;
    selectedFileName.value = null;
  }
  else {
    selectedFile.value = fileId;
    selectedFileName.value = fileName;
  }
}

const handleClickOutside = (event) => {
  if (!event.target.closest('table')) {
    selectedFile.value = null
    selectedFileName.value = null;
  }

  if (!userIcon.contains(event.target) && !dropdown.contains(event.target)) {
    hideDropdown();
  }
}



const copyFileName = () => {
  if (!selectedFileName.value) {
    alert("Select a file to copy the name!");
    return;
  }

  navigator.clipboard.writeText(selectedFileName.value)
      .then(() => {
        alert("File name copied to clipboard!");
        selectedFileName.value = null;
      })
      .catch(error => {
        console.error("Failed to copy text: ", error);
        alert("Failed to copy file name.");
      });
};

const deleteFileById = async () => {
  if (!selectedFile.value) {
    alert("Select a file to delete!");
    return;
  }

  const isConfirmed = confirm("Are you sure you want to delete this file?");
  if (!isConfirmed) {
    return;
  }

  try {
    const fileId = selectedFile.value;
    const response = await deleteFile(fileId);

    if (!response.success) {
      console.error("Failed to delete file:", response.message);
      alert(response.message || "Failed to delete file.");
      return;
    }

    alert("File deleted successfully!");
    selectedFile.value = null;
    selectedFileName.value = null;


    await loadUserFiles();
    await loadUserFilesTotalCount();
    await loadUserFilesTotalViews();
    await loadUserFilesExisting();
    await loadUserFilesDeleted();
    await loadUserFileLinksDisposable();
    await loadUserFileLinksUsedDisposable();
  }

  catch (err) {
    console.error("Error deleting file:", err);
    alert("An unexpected error occurred.");
  }
};








const addFile = () => {
  alert("Open modal logic here");
};

const generateDisposableLink = () => {
  alert("Generate disposable link");
};

const generateMultipleLink = () => {
  alert("Generate multiple link");
};








onMounted(async () => {

  await nextTick();

  document.addEventListener('click', handleClickOutside)

  userIcon = document.getElementById("user-icon");
  dropdown = document.getElementById("dropdown");

  if (userIcon && dropdown) {
    userIcon.addEventListener("mouseenter", showDropdown);
    userIcon.addEventListener("click", toggleDropdown);
    dropdown.addEventListener("mouseleave", hideDropdown);
    document.addEventListener("click", handleClickOutside);
  }

  await loadUserFiles();
  await loadUserFilesTotalCount();
  await loadUserFilesTotalViews();
  await loadUserFilesExisting();
  await loadUserFilesDeleted();
  await loadUserFileLinksDisposable();
  await loadUserFileLinksUsedDisposable();
});


</script>

<style scoped src="@/assets/styles/main.css"></style>