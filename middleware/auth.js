import { useCookie } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('auth_token').value || (process.client ? localStorage.getItem('auth_token') : null);
    if (!token) {
        return navigateTo('/auth/login');
    }
});