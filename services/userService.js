import { useFetch } from '#app';

export default function useUserService() {

    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const updateUser = async (userData) => {
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('auth_token');

        if (!userId) {
            return {
                success: false,
                message: 'User ID is missing in localStorage'
            };
        }
        if (!token) {
            return {
                success: false,
                message: 'No auth token found!'
            };
        }

        const { data, error } = await useFetch(`${apiBase}/users/${userId}`, {
            method: 'PUT',
            body: userData,
            headers: {
                'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${token}`
            }
        });

        if (error.value) {
            const errorData = error.value.data;

            return {
                success: false,
                errors: errorData?.errors || {},
                message: errorData?.message || 'Failed to update user information'
            };
        }

        if (data.value?.success) {
            const updatedUser = data.value.user;
            localStorage.setItem('first_name', updatedUser.first_name);
            localStorage.setItem('last_name', updatedUser.last_name);
            localStorage.setItem('email', updatedUser.email);
            localStorage.setItem('phone', updatedUser.phone);

            return {
                success: true,
                message: data.value.message,
                user: updatedUser
            };
        }

        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };

    return {
        updateUser
    };
}