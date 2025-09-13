import { defineStore } from 'pinia'
import type { Product } from '@/types/card.types';

export const useProductStore = defineStore('product', () => {
  const product = ref(null as null | Product)
  
  const isProduct = computed(() => !!product.value)

  function setProduct(newProduct: Product) {
    product.value = newProduct
  }

  function clearProduct() {
    product.value = null
  }

  return {
    product,
    isProduct,
    setProduct,
    clearProduct,
  }
})
