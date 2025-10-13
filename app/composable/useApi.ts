export const useApi = () => {
  const config = useRuntimeConfig();

  const get = async <T = unknown>(endpoint: string) => {
    try {
      const data = await $fetch<T>(`${config.public.apiUrl}${endpoint}`);

      return data;
    } catch (error) {
      console.error("Erro ao fazer requisição GET:", error);
      throw error;
    }
  };

  const post = async <T = unknown>(
    endpoint: string,
    body: unknown,
    options: unknown = {}
  ) => {
    try {
      const data = await $fetch<T>(`${config.public.apiUrl}${endpoint}`, {
        ...options,
        method: "POST",
        body,
      });

      return data;
    } catch (error) {
      console.error("Erro ao fazer POST:", error);
      throw error;
    }
  };

  return { get, post };
};
