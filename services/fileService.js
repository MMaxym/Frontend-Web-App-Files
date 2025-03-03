import { useFetch } from '#app';

export default function useFileService() {
    const getUserFiles = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }
        const { data, error } = await useFetch(`http://localhost/api/users/${userId}/files`, {
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
        const { data, error } = await useFetch(`http://localhost/api/users/${userId}/files/total-count`, {
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
        const { data, error } = await useFetch(`http://localhost/api/users/${userId}/files/total-views`, {
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
        const { data, error } = await useFetch(`http://localhost/api/users/${userId}/files/existing-count`, {
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
        const { data, error } = await useFetch(`http://localhost/api/users/${userId}/files/deleted-count`, {
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

    return {
        getUserFiles,
        getUserFilesTotalCount,
        getUserFilesTotalViews,
        getUserFilesExisting,
        getUserFilesDeleted
    };
}