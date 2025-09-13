<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const unit = ref(1);

const increment = () => {
  unit.value++;
};

const decrement = () => {
  if (unit.value > 1) {
    unit.value--;
  }
};
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

      <h3 class="text-base mt-4 capitalize">{{ product?.title }}</h3>

      <span class="badge badge-outline my-4">{{ product?.category.name }}</span>

      <div>
        <p class="text-lg">
          Preço:
          <span class="font-bold">{{ maskPrice(product?.price ?? 0) }}</span>
        </p>

        <div class="mb-2 flex flex-col mt-4">
          <span class="text-sm">unit:</span>

          <div class="flex justify-between items-center mt-4">
            <button class="btn btn-error px-4" @click="decrement">-</button>

            <input
              class="flex-1 py-2 mx-1 text-center"
              type="number"
              name="item"
              id="item"
              v-model="unit"
            />

            <button class="btn btn-success px-4" @click="increment">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
