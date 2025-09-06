<script setup lang="ts">
import { useApi } from '~/composable/api';
import type { Product } from '~/types/card.types';

const { get } = useApi();

const { data } = await useAsyncData<Product[]>('produtos', () =>
  get('/products'),
);

const cards = computed(() => data.value?.slice(0, 6) ?? []);
</script>

<template>
  <div>
    <Main />

    <section class="container flex flex-col">
      <h2 class="my-8 font-medium text-3xl">Lançamentos</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CardBuy
          v-for="card in cards ?? []"
          :key="card.id"
          :id="card.id"
          :title="card.title"
          :price="card.price"
          :images="card.images"
          :category="card.category"
        />
      </div>
    </section>
  </div>
</template>
