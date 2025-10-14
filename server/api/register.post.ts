export default defineEventHandler(async (event) => {
  try {
    const { email, name, password } = await readBody(event);

    if (!email || !name || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Erro ao cadastrar",
      });
    }

    return {
      email,
      name,
      password,
    };
  } catch (error) {
    console.error("Erro ao cadastrar:", error);

    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor",
    });
  }
});
