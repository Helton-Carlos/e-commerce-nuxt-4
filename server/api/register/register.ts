export default defineEventHandler(
  async (event) => {
    const { email, name, password } = await readBody(event);

    if(!email, !name, !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Erro ao cadastrar',
      });
    }

    try {
      const register = await $fetch('/api/register/', {
        method: 'POST',
        body: { email, name, password },
      });
          
      if (register) {
        return {
          success: true,
          register,
        };
      } else {
        throw createError({
          statusCode: 401,
          statusMessage: 'Cadastro inválido',
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);

      if (error && typeof error === 'object' && 'statusCode' in error) {
        throw error;
      }

      throw createError({
        statusCode: 500,
        statusMessage: 'Erro interno do servidor',
      });
  }
  }
)