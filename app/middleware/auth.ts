export default defineNuxtRouteMiddleware((to, _from) => {
  const { isAuthenticated } = useUserStore()

  if (to.path === '/dashboard') {
    console.log(isAuthenticated)
  }
})