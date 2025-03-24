import { useFetch } from '#app';

export default function useAuth() {

    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const loginUser = async (email, password) => {
        const { data, error } = await useFetch(`${apiBase}/auth/login`, {
            method: 'POST',
            body: { email, password },
            headers: { 'Content-Type': 'application/json' }
        });
        if (error.value) {
            const errorData = error.value.data;

            return {
                success: false,
                errors: errorData?.errors || {},
                message: errorData?.message || 'Invalid credentials'
            };
        }
        if (data.value?.success) {
            return {
                success: true,
                message: data.value.message,
                token: data.value.token,
                user: data.value.user
            };
        }
        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };


    const registerUser = async (first_name, last_name, email, password, password_confirmation, phone) => {
        const { data, error } = await useFetch(`${apiBase}/auth/register`, {
            method: 'POST',
            body: {
                first_name,
                last_name,
                email,
                password,
                password_confirmation,
                phone
            },
            headers: { 'Content-Type': 'application/json' }
        });
        if (error.value) {
            const errorData = error.value.data;

            return {
                success: false,
                errors: errorData?.errors || {},
                message: errorData?.message || 'Registration failed'
            };
        }
        if (data.value?.success) {
            return {
                success: true,
                message: data.value.message,
            };
        }
        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };

    const sendPasswordResetLink = async (email) => {
        const { data, error } = await useFetch(`${apiBase}/auth/password/email`, {
            method: 'POST',
            body: { email },
            headers: { 'Content-Type': 'application/json' }
        });
        if (error.value) {
            const errorData = error.value.data;

            return {
                success: false,
                errors: errorData?.errors || {},
                message: errorData?.message || 'Unexpected error occurred'
            };
        }
        if (data.value?.success) {
            return {
                success: true,
                message: data.value.message,
            };
        }
        return {
            success: false,
            errors: {},
            message: data.value?.message || 'Unexpected error occurred'
        };
    };

    const resetPassword = async (email, password, password_confirmation, token) => {
        const { data, error } = await useFetch(`${apiBase}/auth/password/reset`, {
            method: 'POST',
            body: {
                email,
                password,
                password_confirmation,
                token
            },
            headers: { 'Content-Type': 'application/json' }
        });
        if (error.value) {
            const errorData = error.value.data;

            return {
                success: false,
                errors: errorData?.errors || {},
                message: errorData?.message || 'Unexpected error occurred'
            };
        }
        if (data.value?.success) {
            return {
                success: true,
                message: data.value.message,
            };
        }
        return {
            success: false,
            errors: {},
            message: data.value?.message || 'Unexpected error occurred'
        };
    };

    const logoutUser = async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            return {
                success: false,
                message: 'No auth token found!'
            };
        }

        const { data, error } = await useFetch(`${apiBase}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (error.value) {
            return {
                success: false,
                errors: error.value.data?.errors || {},
                message: error.value.data?.message || 'Failed to log out'
            };
        }

        if (data.value?.success) {
            localStorage.clear();
            sessionStorage.clear();
            return {
                success: true,
                message: 'Successfully logged out'
            };
        }

        return {
            success: false,
            message: 'Unexpected error occurred'
        };
    };

    return {
        loginUser,
        registerUser,
        sendPasswordResetLink,
        resetPassword,
        logoutUser
    };
}