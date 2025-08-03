export const useApi = () => {
  const config = useRuntimeConfig();

  const get = async <T = any>(endpoint: string, options: any = {}) => {
    try {
      const data = await $fetch<T>(`${config.public.apiUrl}${endpoint}`, options);

      return data;
    } catch (error) {
      console.error('Erro ao fazer requisição GET:', error)
      throw error
    }
  }

  const post = async <T = any>(endpoint: string, body: any, options: any = {}) => {
    try {
      const data = await $fetch<T>(`${config.public.apiUrl}${endpoint}`, {
        ...options,
        method: 'POST',
        body,
      });

      return data;
    } catch (error) {
      console.error('Erro ao fazer POST:', error)
      throw error
    }
  }

  return { get, post }
}
