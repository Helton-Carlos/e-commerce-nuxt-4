<script setup lang="ts">
import type { Product } from '@/types/card.types';

defineProps<Product>();

defineEmits(['buy']);
</script>

<template>
  <div class="bg-base-100 w-full shadow-sm lg:w-96">
    <figure>
      <img
        class="w-full h-64 object-cover"
        :src="Array.isArray(images) ? images[0] : images"
        :alt="title"
      />
    </figure>

    <div class="card-body">
      <div class="flex justify-between items-center gap-2">
        <h2 class="card-title">
          {{ title }}
        </h2>
        <span class="badge badge-secondary my-2">NEW</span>
      </div>

      <div class="card-actions justify-end">
        <p class="text-base">{{ maskPrice(price ?? 0) }}</p>
        <span class="badge badge-outline">{{ category.name }}</span>
      </div>

      <div>
        <button class="btn btn-primary" @click="$emit('buy')">Comprar</button>
      </div>
    </div>
  </div>
</template>
