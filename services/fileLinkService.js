import { useFetch } from '#app';

export default function useFileLinkService(){

    const getUserFileLinksDisposable = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }
        const { data, error } = await useFetch(`http://localhost/api/users/${userId}/file-links/disposable-links-count`, {
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
                disposable_links_count: data.value.disposable_links_count
            };
        }
        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };


    const getUserFileLinksUsedDisposable = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }
        const { data, error } = await useFetch(`http://localhost/api/users/${userId}/file-links/used-disposable-links-count`, {
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
                used_disposable_links_count: data.value.used_disposable_links_count
            };
        }
        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };

    return {
        getUserFileLinksDisposable,
        getUserFileLinksUsedDisposable
    }
}