<script setup lang="ts">
import { useApi } from '~/composable/api';
import type { Product } from '~/types/card.types';

const { get } = useApi();

const { data } = await useAsyncData<Product[]>('produtos', () =>
  get('/produtos'),
);

async function buy(id: number | undefined) {
  console.log(id);
}
</script>

<template>
  <div>
    <Main />

    <section class="container flex flex-col">
      <h2 class="my-8 font-medium text-3xl">Lançamentos</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CardBuy
          v-for="card in data ?? []"
          :key="card.id"
          :index="card.id"
          :title="card.title"
          :description="card.description"
          :images="card.images"
          :category="card.category"
          @buy="buy(card.id)"
        />
      </div>
    </section>
  </div>
</template>
