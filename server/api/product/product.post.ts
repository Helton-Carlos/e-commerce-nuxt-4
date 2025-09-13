export default defineEventHandler(async (event) => {
  const product = await readBody(event);

  if (!product) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Produtoo não encontrado',
    });
  }

  try {
    const products = await $fetch('/api/product/', {
      method: 'POST',
      body: { product },
    });

    if (products) {
      return {
        success: true,
        products,
      };
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: 'Produto inválido',
      });
    }
  } catch (error) {
    console.error('Erro no produto:', error);

    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor',
    });
  }
});
