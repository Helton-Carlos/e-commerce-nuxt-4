export const useApiResponse = () => {
  const config = useRuntimeConfig();

  const get = async <T = unknown>(endpoint: string) => {
    try {
      const data = await $fetch<T>(`${config.public.apiLocal}${endpoint}`);

      return data;
    } catch (e) {
      console.error(`falha no get: ${e}`);
    }
  };

  const post = async <T = unknown>(endpoint: string, body: unknown) => {
    try {
      const data = await $fetch<T>(`${config.public.apiLocal}${endpoint}`, {
        method: "POST",
        body,
      });

      return data;
    } catch (e) {
      console.error(`falha no post: ${e}`);
    }
  };

  return { get, post };
};
