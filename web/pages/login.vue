<template>
  <div class="flex-grow flex items-center justify-center">
    <div class="login-element">

      <span class="text-9xl">Hello </span> <span class="text-9xl font-mono font-bold"> USER</span>
      <h2 class="pt-4 pb-2">What's your name?</h2>
      <input type="text" v-model="user" @click="" class="input input-bordered w-full input-accent">
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';

  const user = ref('');
  const inputActive = ref(false);


</script>

<style scoped>
div {
  font-family: "Oswald", sans-serif;
}

</style>
