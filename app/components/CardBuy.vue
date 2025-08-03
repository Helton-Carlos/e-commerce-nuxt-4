<script setup lang="ts">
import type { Product } from '@/types/card.types';

defineProps<Product>();

defineEmits(['buy']);
</script>

<template>
  <div class="bg-base-100 w-full shadow-sm lg:w-96">
    <figure>
      <img :src="Array.isArray(images) ? images[0] : images" :alt="title" />
    </figure>

    <div class="card-body gap-4">
      <h2 class="card-title">
        {{ title }}
        <div class="badge badge-secondary">NEW</div>
      </h2>
      <p>
        {{ description }}
      </p>

      <div class="card-actions justify-end">
        <div class="badge badge-outline">{{ category }}</div>
      </div>

      <button class="btn btn-primary" @click="$emit('buy')">Comprar</button>
    </div>
  </div>
</template>
