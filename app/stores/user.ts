import { defineStore } from 'pinia'
import type { User } from '@/types/user.types'

export const useUserStore = defineStore('user', () => {
  const user = ref(null as null | User)
  const isAuthenticated = computed(() => !!user.value)

  function setUser(newUser: User) {
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
