<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import type { CartItem } from '@/types/cart.types';
import { useSafeLocalStorage } from '~/composable/localStorage';

const userStore = useUserStore();

const carts = useSafeLocalStorage<CartItem[]>('cart', []);

onMounted(() => {
  userStore.setUser({
    id: 1,
    name: 'Maria da Silva',
    email: 'maria@example.com',
  });
});
</script>

<template>
  <header>
    <nav class="bg-black shadow-sm">
      <div class="container flex items-center justify-between py-4">
        <NuxtLink to="/" class="text-2xl font-bold">
          E-commerce Store
        </NuxtLink>

        <div class="flex gap-4">
          <div class="dropdown dropdown-end">
            <Cart :carts="carts" />
          </div>

          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar"
            >
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li class="text-2xl">
                <a class="justify-between">
                  Profile: {{ userStore.user?.name }}
                </a>
              </li>
              <li class="text-xl">
                <NuxtLink to="/login">Login</NuxtLink>
              </li>
              <li class="text-xl"><a>Settings</a></li>
              <li class="text-xl"><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
