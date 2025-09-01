<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useTurnstile } from '~/composable/useTurnstile';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const showTurnstile = ref(false);

// Configuração do Turnstile
const {
  turnstileToken,
  isLoaded,
  loadTurnstileScript,
  renderTurnstile,
  resetTurnstile,
  removeTurnstile,
} = useTurnstile();

// Substitua pela sua chave do site Cloudflare Turnstile
const TURNSTILE_SITE_KEY =
  process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

onMounted(async () => {
  try {
    // Apenas carrega o script, não renderiza o widget ainda
    await loadTurnstileScript();
  } catch (error) {
    console.error('Erro ao carregar Turnstile:', error);
    errorMessage.value = 'Erro ao carregar verificação de segurança.';
  }
});

onUnmounted(() => {
  removeTurnstile();
});

async function handleLogin() {
  // Validação inicial dos campos
  if (!email.value || !password.value) {
    errorMessage.value = 'Preencha o email e a senha!';
    return;
  }

  // Se o Turnstile ainda não foi mostrado, mostra agora
  if (!showTurnstile.value) {
    showTurnstile.value = true;
    errorMessage.value = '';

    // Aguarda o DOM atualizar e renderiza o widget
    await nextTick();

    renderTurnstile('turnstile-widget', {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'auto',
      size: 'normal',
      callback: async (token: string) => {
        console.log('Turnstile token recebido:', token);
        errorMessage.value = '';
        // Automaticamente faz o login quando o CAPTCHA é completado
        await proceedWithLogin(token);
      },
      'error-callback': () => {
        errorMessage.value = 'Erro na verificação do CAPTCHA. Tente novamente.';
        isLoading.value = false;
      },
      'expired-callback': () => {
        errorMessage.value = 'CAPTCHA expirado. Por favor, complete novamente.';
        isLoading.value = false;
      },
    });

    isLoading.value = true;
    return;
  }

  // Se já tem token, procede com o login
  if (turnstileToken.value) {
    await proceedWithLogin(turnstileToken.value);
  } else {
    errorMessage.value = 'Complete a verificação de segurança!';
  }
}

async function proceedWithLogin(token: string) {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        turnstileToken: token,
      },
    });

    if (response.success) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      await navigateTo('/dashboard');
    }
  } catch (error: any) {
    console.error('Erro no login:', error);
    errorMessage.value =
      error.data?.message || 'Erro ao fazer login. Tente novamente.';
    resetTurnstile();
    showTurnstile.value = false; // Permite tentar novamente
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <fieldset
      class="w-[90%] fieldset bg-base-200 border-base-300 rounded-box border mt-4 p-4 md:w-[380px] mx-auto"
    >
      <legend class="fieldset-legend text-lg py-4">Login</legend>

      <!-- Mensagem de erro -->
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

      <!-- Widget do Cloudflare Turnstile - só aparece quando necessário -->
      <div v-if="showTurnstile" class="mt-4">
        <label class="label">Verificação de Segurança</label>
        <div id="turnstile-widget" class="flex justify-center"></div>
        <div class="text-xs text-gray-500 mt-2 text-center">
          Complete a verificação para continuar
        </div>
      </div>

      <button
        type="button"
        class="btn btn-primary mt-4 w-full"
        :class="{ loading: isLoading }"
        :disabled="isLoading"
        @click="handleLogin"
      >
        <span v-if="!isLoading && !showTurnstile">Entrar</span>
        <span v-else-if="!isLoading && showTurnstile"
          >Aguardando verificação...</span
        >
        <span v-else>Entrando...</span>
      </button>

      <!-- Informação sobre o CAPTCHA -->
      <div class="text-xs text-gray-500 mt-2 text-center">
        Este site é protegido pelo Cloudflare Turnstile
      </div>
    </fieldset>
  </div>
</template>
