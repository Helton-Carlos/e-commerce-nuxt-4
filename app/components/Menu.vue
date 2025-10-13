<script lang="ts" setup>
const { isAuthenticated } = useUserStore();
</script>

<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        >
      </div>
    </div>
    <ul
      tabindex="0"
      class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
    >
      <li class="text-xl">
        <NuxtLink to="/login">Login</NuxtLink>
      </li>
       <li v-if="!isAuthenticated" class="text-xl">
        <NuxtLink to="/register">Cadastrar</NuxtLink>
      </li>
      <div v-if="isAuthenticated">
        <li class="text-xl"><a>Perfil</a></li>
        <li class="text-xl"><a>Configuração</a></li>
        <li class="text-xl"><a>Sair</a></li>
      </div>
    </ul>
  </div>
</template>
