<script setup lang="ts">
import type { CartItem } from "@/types/cart.types";
import { useLocalStorage } from "~/composable/useLocalStorage";

const carts = useLocalStorage<CartItem[]>("cart", []);
</script>

<template>
  <header>
    <nav class="bg-black shadow-sm">
      <div class="container flex items-center justify-between py-4">
        <NuxtLink to="/" class="text-2xl font-bold flex items-center gap-2">
          <img src="/logo.png" width="33" /> E-commerce Store
        </NuxtLink>

        <div class="flex gap-4">
          <div class="dropdown dropdown-end">
            <Cart :carts="carts" />
          </div>

          <Menu />
        </div>
      </div>
    </nav>
  </header>
</template>
