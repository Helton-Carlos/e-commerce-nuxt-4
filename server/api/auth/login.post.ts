export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, turnstileToken } = body;

  if (!email || !password || !turnstileToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email, senha e token de verificação são obrigatórios',
    });
  }

  try {
    const turnstileValidation = await $fetch('/api/auth/verify-turnstile', {
      method: 'POST',
      body: { token: turnstileToken },
    });

    if (email === 'admin@gmail.com' && password === '12345') {
      const token = 'jwt-token-example-' + Date.now();

      return {
        success: true,
        token,
        user: {
          id: 1,
          email,
          name: 'Usuário Admin',
        },
      };
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: 'Credenciais inválidas',
      });
    }
  } catch (error) {
    console.error('Erro no login:', error);

    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor',
    });
  }
});
