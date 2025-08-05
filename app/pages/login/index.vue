<script setup lang="ts"></script>

<template>
  <div class="flex items-center justify-center h-full">
    <fieldset
      class="w-[90%] fieldset bg-base-200 border-base-300 rounded-box border mt-4 p-4 md:w-[380px] mx-auto"
    >
      <legend class="fieldset-legend text-lg py-4">Login</legend>

      <label class="email">Email</label>
      <input
        type="email"
        id="email"
        class="input w-full"
        placeholder="ex: bob@gmail.com"
      />

      <label class="label">Senha</label>
      <input
        type="password"
        id="password"
        class="input w-full"
        placeholder="*********"
      />

      <button type="submit" class="btn btn-primary mt-4">Entrar</button>
    </fieldset>
  </div>
</template>
