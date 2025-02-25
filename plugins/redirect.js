export default defineNuxtPlugin(nuxtApp => {
    const router = useRouter();

    router.beforeEach((to, from, next) => {
        if (to.path === '/') {
            return next('/auth/login');
        }
        next();
    });
});