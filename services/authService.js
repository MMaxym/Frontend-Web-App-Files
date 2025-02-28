import { useFetch } from '#app';

export default function useAuth() {

    const loginUser = async (email, password) => {
        const { data, error } = await useFetch('http://localhost/api/auth/login', {
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
        const { data, error } = await useFetch('http://localhost/api/auth/register', {
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
        const { data, error } = await useFetch('http://localhost/api/auth/password/email', {
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

    return {
        loginUser,
        registerUser,
        sendPasswordResetLink
    };
}