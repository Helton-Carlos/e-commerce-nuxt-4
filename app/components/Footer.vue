<template>
  <footer class="w-full bg-black text-white mt-10 pt-10">
    <div class="container flex justify-between">
      <div>
        <h1 class="mb-5 text-2xl font-bold" data-testid="title-footer">
          E-commerce Store
        </h1>
        <p class="mb-5">
          Loja de e-commerce feita com Nuxt 4, Tailwind CSS e DaisyUI.
        </p>
      </div>

      <nav>
        <ul>
          <li>Sobre-nós</li>
        </ul>
      </nav>
    </div>

    <div class="text-center mt-5 py-2" data-testid="date-footer">
      Todos os direitos reservados &copy; {{ new Date().getFullYear() }}
    </div>
  </footer>
</template>
