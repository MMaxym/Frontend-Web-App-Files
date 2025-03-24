import { useFetch } from '#app';

export default function useFileLinkService(){

    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const getUserFileLinksDisposable = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return {
                success: false,
                errors: {},
                message: 'User ID not found!'
            };
        }
        const { data, error } = await useFetch(`${apiBase}/users/${userId}/file-links/disposable-links-count`, {
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
        const { data, error } = await useFetch(`${apiBase}/users/${userId}/file-links/used-disposable-links-count`, {
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

    const generateFileLink = async (fileId, type) => {
        if (!fileId || !type) {
            return {
                success: false,
                errors: {},
                message: 'File ID and type are required!'
            };
        }

        const { data, error } = await useFetch(`${apiBase}/files/${fileId}/generate-link`, {
            method: 'POST',
            body: { type }
        });

        if (error.value) {
            return {
                success: false,
                errors: error.value.data?.errors || {},
                message: error.value.data?.message || 'Failed to generate file link'
            };
        }

        if (data.value?.success) {
            return {
                success: true,
                link: data.value.link,
                message: data.value.message || 'File link generated successfully'
            };
        }

        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred while generating file link'
        };
    };

    return {
        getUserFileLinksDisposable,
        getUserFileLinksUsedDisposable,
        generateFileLink
    }
}