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
                token: data.value.token
            };
        }
        return {
            success: false,
            errors: {},
            message: 'Unexpected error occurred'
        };
    };
    return { loginUser };
}