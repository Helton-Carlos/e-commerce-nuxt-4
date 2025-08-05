import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null as null | { id: number; name: string; email: string })
  const isAuthenticated = computed(() => !!user.value)

  function setUser(newUser: { id: number; name: string; email: string }) {
    user.value = newUser
  }

  function clearUser() {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
  }
})
