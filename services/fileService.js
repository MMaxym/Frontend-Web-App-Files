import { useFetch } from '#app';

export default function useFileService() {

    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const getUserFiles = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }
        const { data, error } = await useFetch(`${apiBase}/users/${userId}/files`, {
            method: 'GET'
        });
        if (error.value) {
            return {
                success: false,
                errors: error.value.data?.errors || {},
                message: error.value.data?.message || 'Failed to fetch files'
            };
        }
        if (data.value?.success) {
            return {
                success: true,
                files: data.value.files
            };
        }
        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };


    const getUserFilesTotalCount = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }
        const { data, error } = await useFetch(`${apiBase}/users/${userId}/files/total-count`, {
            method: 'GET'
        });
        if (error.value) {
            return {
                success: false,
                errors: error.value.data?.errors || {},
                message: error.value.data?.message || 'Failed to fetch files count'
            };
        }
        if (data.value?.success) {
            return {
                success: true,
                files_count: data.value.files_count
            };
        }
        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };


    const getUserFilesTotalViews = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }
        const { data, error } = await useFetch(`${apiBase}/users/${userId}/files/total-views`, {
            method: 'GET'
        });
        if (error.value) {
            return {
                success: false,
                errors: error.value.data?.errors || {},
                message: error.value.data?.message || 'Failed to fetch files count'
            };
        }
        if (data.value?.success) {
            return {
                success: true,
                total_views: data.value.total_views
            };
        }
        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };


    const getUserFilesExisting = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }
        const { data, error } = await useFetch(`${apiBase}/users/${userId}/files/existing-count`, {
            method: 'GET'
        });
        if (error.value) {
            return {
                success: false,
                errors: error.value.data?.errors || {},
                message: error.value.data?.message || 'Failed to fetch files count'
            };
        }
        if (data.value?.success) {
            return {
                success: true,
                existing_files_count: data.value.existing_files_count
            };
        }
        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };


    const getUserFilesDeleted = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }
        const { data, error } = await useFetch(`${apiBase}/users/${userId}/files/deleted-count`, {
            method: 'GET'
        });
        if (error.value) {
            return {
                success: false,
                errors: error.value.data?.errors || {},
                message: error.value.data?.message || 'Failed to fetch files count'
            };
        }
        if (data.value?.success) {
            return {
                success: true,
                deleted_files_count: data.value.deleted_files_count
            };
        }
        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };


    const deleteFile = async (fileId) => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }

        const { data, error } = await useFetch(`${apiBase}/users/${userId}/files/${fileId}`, {
            method: 'DELETE'
        });

        if (error.value) {
            return {
                success: false,
                errors: error.value.data?.errors || {},
                message: error.value.data?.message || 'Failed to delete file'
            };
        }

        return {
            success: true,
            message: data.value?.message || 'File deleted successfully'
        };
    };


    const uploadFile = async (file, comment = '', expiration_date = '') => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', userId);

        if (comment) {
            formData.append('comment', comment);
        }

        if (expiration_date) {
            formData.append('expiration_date', expiration_date);
        }

        const { data, error } = await useFetch(`${apiBase}/files/upload`, {
            method: 'POST',
            body: formData
        });

        if (error.value) {
            return {
                success: false,
                errors: error.value.data?.errors || {},
                message: error.value.data?.message || 'Failed to upload file'
            };
        }

        if (data.value?.success) {
            return {
                success: true,
                message: data.value.message || 'File uploaded successfully'
            };
        }

        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred during file upload'
        };
    };

    return {
        getUserFiles,
        getUserFilesTotalCount,
        getUserFilesTotalViews,
        getUserFilesExisting,
        getUserFilesDeleted,
        deleteFile,
        uploadFile
    };
}