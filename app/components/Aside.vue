<script setup lang="ts">
defineEmits(['close']);
</script>

<template>
  <aside
    class="fixed top-0 translate-x-0 right-0 h-full w-80 bg-base-200 shadow-lg z-50 transform transition-transform duration-300"
  >
    <div class="flex justify-between items-center p-4 border-b border-base-300">
      <h2 class="text-lg font-bold">Produto</h2>
      <button @click="$emit('close')" class="btn btn-sm btn-ghost">✕</button>
    </div>
    <ul class="menu p-4 space-y-2">
      <li>Sidebar Item 1</li>
    </ul>
  </aside>
</template>
