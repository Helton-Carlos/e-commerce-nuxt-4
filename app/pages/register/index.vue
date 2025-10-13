<script setup lang="ts">
import { useApiResponse } from "@/composable/useApiResponse";

const email = ref("");
const name = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const turnstileToken = ref("");
const turnstileRef = ref();

const { post } = useApiResponse();

async function handleRegister() {
  if (!email.value || !name.value || !password.value || !turnstileToken.value) {
    errorMessage.value = "Preencha todos os campos*";
    return;
  }

  try {
    const { data } = await useAsyncData("register", () =>
      post("/register", {
        email: email.value,
        name: name.value,
        password: password.value,
      })
    );

    if (data.value) {
      navigateTo("/dashboard");
    }

    turnstileRef.value.reset();
  } catch (e) {
    console.error("Registration error:", e);
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <fieldset
      class="w-[90%] fieldset bg-base-200 border-base-300 rounded-box border mt-4 p-4 md:w-[380px] mx-auto"
    >
      <legend class="fieldset-legend text-lg py-4">Cadastrar</legend>

      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        class="input w-full"
        placeholder="ex: bob@gmail.com"
        :disabled="isLoading"
      />

      <label for="name" class="label">Nome</label>
      <input
        id="name"
        v-model="name"
        type="text"
        class="input w-full"
        placeholder="ex: Bob Luiz da Silva"
        :disabled="isLoading"
      />

      <label for="password" class="label">Senha</label>
      <input
        id="password"
        v-model="password"
        type="password"
        class="input w-full"
        placeholder="*********"
        :disabled="isLoading"
        @keyup.enter="handleRegister"
      />

      <NuxtTurnstile
        ref="turnstileRef"
        v-model="turnstileToken"
        class="mx-auto mt-4"
        :options="{
          theme: 'auto',
          size: 'normal',
          action: 'login',
          language: 'pt-BR',
        }"
      />

      <button
        type="button"
        class="btn btn-primary mt-4 w-full"
        :class="{ loading: isLoading }"
        :disabled="!turnstileToken || isLoading"
        @click="handleRegister"
      >
        <span>Salvar</span>
      </button>
    </fieldset>
  </div>
</template>
