<script setup lang="ts">
import type { ICard } from '@/types/card.types';

const cards = ref<ICard[]>([
  {
    id: '1',
    title: 'Card Title 1',
    description:
      'A card component has a figure, a body part, and inside body there are title and actions parts',
    imageUrl:
      'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    type: 'Masculina',
  },
  {
    id: '2',
    title: 'Card Title 2',
    description:
      'A card component has a figure, a body part, and inside body there are title and actions parts',
    imageUrl:
      'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    type: 'Feminina',
  },
  {
    id: '3',
    title: 'Card Title 3',
    description:
      'A card component has a figure, a body part, and inside body there are title and actions parts',
    imageUrl:
      'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    type: 'Feminina',
  },
]);

async function buy(id: string | undefined) {
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
          v-for="card in cards"
          :key="card.id"
          :index="card.id"
          :title="card.title"
          :description="card.description"
          :imageUrl="card.imageUrl"
          :type="card.type"
          @buy="buy(card.id)"
        />
      </div>
    </section>
  </div>
</template>
