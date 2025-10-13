export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue);

  onMounted(() => {
    if (import.meta.client) {
      const stored = localStorage.getItem(key);
      data.value = stored ? JSON.parse(stored) : defaultValue;
    }
  });

  return data;
}
