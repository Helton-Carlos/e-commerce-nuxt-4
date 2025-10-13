export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { token } = body;

  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token do Turnstile é obrigatório',
    });
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Chave secreta do Turnstile não configurada',
    });
  }

  try {
    await $fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          secret: secretKey,
          response: token,
        },
      },
    );
  } catch (error) {
    console.error('Erro ao verificar Turnstile:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor',
    });
  }
});
