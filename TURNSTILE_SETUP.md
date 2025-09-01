# Configuração do Cloudflare Turnstile

Este projeto implementa o Cloudflare Turnstile como sistema de CAPTCHA na página de login.

## Configuração

### 1. Obter Chaves do Cloudflare Turnstile

1. Acesse o [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vá para "Turnstile" no menu lateral
3. Clique em "Add Site"
4. Configure seu domínio e obtenha:
   - **Site Key** (chave pública)
   - **Secret Key** (chave privada)

### 2. Configurar Variáveis de Ambiente

Atualize o arquivo `.env` com suas chaves reais:

```env
# Cloudflare Turnstile
NUXT_PUBLIC_TURNSTILE_SITE_KEY=sua_chave_publica_aqui
TURNSTILE_SECRET_KEY=sua_chave_secreta_aqui
```

### 3. Domínios de Teste

Para desenvolvimento, você pode usar as chaves de teste do Cloudflare:

- **Site Key de Teste**: `1x00000000000000000000AA`
- **Secret Key de Teste**: `1x0000000000000000000000000000000AA`

Essas chaves sempre retornam sucesso e são úteis para desenvolvimento.

## Como Funciona

### Frontend (`app/pages/login/index.vue`)

1. Carrega o script do Turnstile automaticamente
2. Renderiza o widget de verificação
3. Captura o token quando o usuário completa o desafio
4. Envia o token junto com as credenciais de login

### Backend (`server/api/auth/`)

1. **`verify-turnstile.post.ts`**: Valida o token com a API do Cloudflare
2. **`login.post.ts`**: Processa o login e valida o Turnstile

### Composable (`app/composable/useTurnstile.ts`)

Gerencia toda a lógica do Turnstile:

- Carregamento do script
- Renderização do widget
- Gerenciamento de tokens
- Reset e limpeza

## Personalização

### Temas e Tamanhos

Você pode personalizar o widget editando as opções em `renderTurnstile`:

```typescript
renderTurnstile('turnstile-widget', {
  sitekey: TURNSTILE_SITE_KEY,
  theme: 'light', // 'light', 'dark', 'auto'
  size: 'normal', // 'normal', 'compact'
  // ... outras opções
});
```

### Callbacks Personalizados

O composable suporta callbacks para diferentes eventos:

- `callback`: Sucesso na verificação
- `error-callback`: Erro na verificação
- `expired-callback`: Token expirado

## Segurança

- A **Site Key** é pública e pode ser exposta no frontend
- A **Secret Key** deve ser mantida secreta no backend
- Sempre valide o token no servidor antes de processar o login
- O token do Turnstile é de uso único e expira

## Troubleshooting

### Widget não aparece

- Verifique se a Site Key está correta
- Confirme se o domínio está configurado no Cloudflare
- Verifique o console do navegador para erros

### Validação falha no backend

- Confirme se a Secret Key está correta
- Verifique se o token não expirou
- Confirme se o domínio da requisição está autorizado

### Erro de CORS

- Configure os domínios permitidos no Cloudflare Dashboard
- Para desenvolvimento local, adicione `localhost` e `127.0.0.1`

## Exemplo de Uso

```typescript
// Usar o composable em qualquer componente
const { turnstileToken, renderTurnstile } = useTurnstile();

// Renderizar o widget
onMounted(() => {
  renderTurnstile('my-widget', {
    sitekey: 'sua-site-key',
    callback: (token) => {
      console.log('Token recebido:', token);
    },
  });
});

// Usar o token em uma requisição
if (turnstileToken.value) {
  await $fetch('/api/protected-endpoint', {
    method: 'POST',
    body: { turnstileToken: turnstileToken.value },
  });
}
```
