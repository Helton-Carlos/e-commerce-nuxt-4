import { ref } from 'vue';

export interface TurnstileOptions {
  sitekey: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
}

export const useTurnstile = () => {
  const turnstileToken = ref<string>('');
  const isLoaded = ref(false);
  const widgetId = ref<string>('');

  const loadTurnstileScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src*="challenges.cloudflare.com"]')) {
        isLoaded.value = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        isLoaded.value = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Falha ao carregar o script do Turnstile'));
      };

      document.head.appendChild(script);
    });
  };

  const renderTurnstile = (elementId: string, options: TurnstileOptions) => {
    if (!window.turnstile || !isLoaded.value) {
      console.error('Turnstile não está carregado');
      return;
    }

    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Elemento com ID ${elementId} não encontrado`);
      return;
    }

    widgetId.value = window.turnstile.render(element, {
      ...options,
      callback: (token: string) => {
        turnstileToken.value = token;
        if (options.callback) {
          options.callback(token);
        }
      },
      'error-callback': () => {
        turnstileToken.value = '';
        if (options['error-callback']) {
          options['error-callback']();
        }
      },
      'expired-callback': () => {
        turnstileToken.value = '';
        if (options['expired-callback']) {
          options['expired-callback']();
        }
      },
    });
  };

  const resetTurnstile = () => {
    if (window.turnstile && widgetId.value) {
      window.turnstile.reset(widgetId.value);
      turnstileToken.value = '';
    }
  };

  const removeTurnstile = () => {
    if (window.turnstile && widgetId.value) {
      window.turnstile.remove(widgetId.value);
      turnstileToken.value = '';
      widgetId.value = '';
    }
  };

  return {
    turnstileToken: readonly(turnstileToken),
    isLoaded: readonly(isLoaded),
    loadTurnstileScript,
    renderTurnstile,
    resetTurnstile,
    removeTurnstile,
  };
};

// Declaração global para TypeScript
declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}
