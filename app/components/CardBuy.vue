<script setup lang="ts">
import type { Product } from '@/types/card.types';
import { useProductStore } from '~/stores/product';

defineEmits(['buy']);

const props = defineProps<{
  product: Product;
}>();

const productStore = useProductStore();

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      productStore.product = newProduct;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="bg-base-100 w-full shadow-sm lg:w-96">
    <figure>
      <img
        class="w-full h-64 object-cover"
        :src="
          Array.isArray(product.images) ? product.images[0] : product.images
        "
        :alt="product.title"
      />
    </figure>

    <div class="card-body">
      <div class="flex justify-between items-center gap-2">
        <h2 class="card-title">
          {{ product.title }}
        </h2>
        <span class="badge badge-secondary my-2">NEW</span>
      </div>

      <div class="card-actions justify-end">
        <p class="text-base">{{ maskPrice(product.price ?? 0) }}</p>
        <span class="badge badge-outline">{{ product.category.name }}</span>
      </div>

      <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <button class="drawer-content">
          <label for="my-drawer" class="btn btn-primary drawer-button">
            Comprar
          </label>
        </button>

        <Aside />
      </div>
    </div>
  </div>
</template>
