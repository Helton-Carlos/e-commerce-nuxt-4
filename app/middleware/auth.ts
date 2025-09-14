export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useUserStore()

  if (to.path === '/dashboard') {
    console.log(isAuthenticated)
  }
})