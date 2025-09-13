export function useSafeLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue);

  onMounted(() => {
    if (process.client) {
      const stored = localStorage.getItem(key);
      data.value = stored ? JSON.parse(stored) : defaultValue;
    }
  });

  return data;
}
