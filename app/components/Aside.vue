<script setup lang="ts">
const { product } = useProductStore();

const checked = ref(false);
</script>

<template>
  <div class="drawer-side">
    <label
      for="my-drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>

    <div class="menu bg-base-200 text-base-content min-h-full w-80 p-8">
      <figure>
        <img
          class="w-full h-64 object-cover"
          :src="
            Array.isArray(product?.images)
              ? product?.images[0]
              : product?.images
          "
          :alt="product?.title"
        />
      </figure>

      <h3 class="text-base py-4">{{ product?.title }}</h3>

      <div class="mb-2">
        <span class="badge badge-outline">{{ product?.category.name }}</span>
      </div>

      <div>
        <p class="text-lg">Valor: {{ maskPrice(product?.price ?? 0) }}</p>

        <div class="rating my-4">
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            aria-label="1 star"
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            aria-label="2 star"
            :checked="checked"
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            aria-label="3 star"
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            aria-label="4 star"
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            aria-label="5 star"
          />
        </div>

        <div>Unidade:</div>
      </div>
    </div>
  </div>
</template>
