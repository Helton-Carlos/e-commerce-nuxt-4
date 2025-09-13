<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const unit = ref(1);

function increment() {
  unit.value++;
}

function decrement() {
  if (unit.value > 1) {
    unit.value--;
  }
}

function addCart() {
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartArray = Array.isArray(existingCart) ? existingCart : [];

  const newItem = {
    ...product.value,
    unit: unit.value,
  };

  const index = cartArray.findIndex((item) => item.id === newItem.id);

  if (index !== -1) {
    cartArray[index] = newItem;
  } else {
    cartArray.push(newItem);
  }

  localStorage.setItem('cart', JSON.stringify(cartArray));
}
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

      <h3 class="text-base mt-2 capitalize">{{ product?.title }}</h3>

      <div class="my-2">
        <p class="badge badge-outline">{{ product?.category.name }}</p>

        <p class="mt-2">Descrição: {{ product?.description }}</p>
      </div>

      <div>
        <p class="text-lg">
          Preço:
          <span class="font-bold">{{ maskPrice(product?.price ?? 0) }}</span>
        </p>

        <div class="flex flex-col my-2">
          <span class="text-sm">Unidade(s):</span>

          <div class="flex justify-between items-center my-4">
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

          <button class="btn btn-primary" @click="addCart">
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
