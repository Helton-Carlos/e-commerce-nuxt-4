<script setup lang="ts">
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const turnstileToken = ref('');
const turnstileRef = ref();

async function handleLogin() {
  if (!email.value || !password.value || !turnstileToken.value) {
    errorMessage.value = 'Preencha o email e a senha!';
    return;
  }

  navigateTo('/dashboard');
  turnstileRef.value.reset();
}
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <fieldset
      class="w-[90%] fieldset bg-base-200 border-base-300 rounded-box border mt-4 p-4 md:w-[380px] mx-auto"
    >
      <legend class="fieldset-legend text-lg py-4">Login</legend>

      <div v-if="errorMessage" class="alert alert-error mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="email"
        class="input w-full"
        placeholder="ex: bob@gmail.com"
        :disabled="isLoading"
      />

      <label for="password" class="label">Senha</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="input w-full"
        placeholder="*********"
        :disabled="isLoading"
        @keyup.enter="handleLogin"
      />

      <NuxtTurnstile
        ref="turnstileRef"
        class="mx-auto mt-4"
        v-model="turnstileToken"
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
        @click="handleLogin"
      >
        <span>Entrar</span>
      </button>
    </fieldset>
  </div>
</template>
